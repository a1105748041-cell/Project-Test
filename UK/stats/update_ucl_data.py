import PyPDF2
import json
import re

# 读取PDF文件
def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                page_text = page.extract_text() or ""
                text += page_text
    except Exception as e:
        print(f"读取PDF时出错: {e}")
    return text

# 解析PDF数据
def parse_pdf_data(text):
    # 按行分割文本
    lines = text.split('\n')
    
    # 定义院系映射
    faculty_mapping = {
        'Arts and Humanities': ['Art History', 'Arts and Sciences', 'English', 'European Social and Political Studies', 'Greek & Latin', 'Hebrew & Jewish Studies', 'Information Studies', 'Philosophy', 'Slade School of Fine Art', 'SSEES', 'SELCS'],
        'Brain Sciences': ['Ear Institute', 'Psychology and Language Sciences', 'Psychology', 'UCL Queen Square Institute of Neurology'],
        'Built Environment': ['Architecture', 'Bartlett Development Planning Unit', 'Bartlett School of Environment, Energy and Resources', 'Bartlett School of Planning', 'Bartlett School of Sustainable Construction', 'IOE, UCL\'s Faculty of Education and Society'],
        'Engineering Sciences': ['Biochemical Engineering', 'Chemical Engineering', 'Civil, Environmental and Geomatic Engineering', 'Computer Science', 'Electrical and Electronic Engineering', 'Mechanical Engineering', 'Med Phys'],
        'Education': ['Culture Communication & Media', 'Education, Practice and Society', 'Learning and Leadership', 'Psychology and Human Development', 'Social Science'],
        'Laws': ['Faculty of Laws'],
        'Life Sciences': ['Biochemistry and Biotechnology', 'Biological Sciences', 'Biomedical Sciences', 'Human Sciences', 'Neuroscience', 'Pharmacology', 'School of Pharmacy'],
        'Mathematical and Physical Sciences': ['Chemistry', 'Earth Sciences', 'Mathematics', 'Natural Sciences', 'Physics & Astronomy', 'Risk & Disaster Reduction', 'Science & Tech. Stds', 'Statistical Sci.'],
        'Medical Sciences': ['Cancer Institute', 'Division of Infection and Immunity', 'Division of Medicine', 'UCL Medical School', 'Surgery and Interventional Medicine'],
        'Population Health Sciences': ['Faculty of Population Health Sciences'],
        'Social and Historical Sciences': ['Inst. of Americas', 'Anthropology', 'Inst. of Archaeology', 'Economics', 'Geography', 'History', 'History of Art', 'Political Science']
    }
    
    # 创建反向映射：专业 -> 院系
    reverse_faculty_map = {}
    for faculty, programs in faculty_mapping.items():
        for program in programs:
            reverse_faculty_map[program.lower()] = faculty
    
    # 解析数据行
    data = []
    current_faculty = None
    
    # 处理每一行
    for line in lines:
        line = line.strip()
        if not line or line.startswith('Total') or 'Undergraduate Entry' in line:
            continue
        
        # 使用正则表达式匹配数据行格式: 专业名称 数字 数字 数字 数字 数字
        # 例如: "Security and Crime Science 252 160 60 1.6 4.2"
        match = re.match(r'^(.*?)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)$', line)
        if match:
            program_name = match.group(1).strip()
            # 移除可能的行号前缀，例如 "34: Security and Crime Science" -> "Security and Crime Science"
            program_name = re.sub(r'^\d+:\s*', '', program_name)
            
            # 确定院系
            faculty = None
            # 首先尝试精确匹配
            for keyword, f in reverse_faculty_map.items():
                if keyword in program_name.lower():
                    faculty = f
                    break
            
            # 如果没有找到匹配，尝试一些特殊处理
            if not faculty:
                if 'Med Phys' in program_name:
                    faculty = 'Engineering Sciences'
                elif 'Security and Crime Science' in program_name:
                    faculty = 'Engineering Sciences'
                elif 'Science, Technology, Engineering and Public Policy' in program_name:
                    faculty = 'Engineering Sciences'
                elif 'UCL Medical School' in program_name:
                    faculty = 'Medical Sciences'
                elif 'IOE' in program_name:
                    faculty = 'Education'
                else:
                    # 默认院系
                    faculty = 'Unknown'
            
            # 创建数据项
            item = {
                'Faculty': faculty,
                'Programme': program_name,
                'Apps': int(match.group(2)),
                'Offers': int(match.group(3)),
                'Places': int(match.group(4)),
                'Apps per offer': float(match.group(5)),
                'Apps per place': float(match.group(6))
            }
            data.append(item)
    
    return data

# 读取现有JSON数据
def read_existing_json(json_path):
    try:
        with open(json_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        print(f"读取JSON时出错: {e}")
        return []

# 更新JSON数据
def update_json_data(existing_data, new_data):
    updated_data = []
    new_data_dict = {item['Programme'].lower(): item for item in new_data}
    
    # 更新或添加数据
    for existing_item in existing_data:
        program_key = existing_item['Programme'].lower()
        if program_key in new_data_dict:
            # 更新现有项目
            updated_item = existing_item.copy()
            new_item = new_data_dict[program_key]
            updated_item.update({
                'Apps': new_item['Apps'],
                'Offers': new_item['Offers'],
                'Places': new_item['Places'],
                'Apps per offer': new_item['Apps per offer'],
                'Apps per place': new_item['Apps per place']
            })
            updated_data.append(updated_item)
            del new_data_dict[program_key]  # 从新数据字典中删除已处理的项目
        else:
            # 保留未更新的项目
            updated_data.append(existing_item)
    
    # 添加新的项目
    for new_item in new_data_dict.values():
        updated_data.append(new_item)
    
    return updated_data

# 保存JSON数据
def save_json_data(data, json_path):
    try:
        with open(json_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        print(f"成功保存更新后的JSON数据到: {json_path}")
        print(f"总数据项数: {len(data)}")
    except Exception as e:
        print(f"保存JSON时出错: {e}")

# 主函数
if __name__ == "__main__":
    pdf_path = "/Users/eliot/Desktop/工作相关/UK宣讲/stats/ucl-ug-apps-offers-places-2024-25.pdf"
    json_path = "/Users/eliot/Desktop/工作相关/UK宣讲/stats/ucl_apps_data.json"
    
    print("开始读取PDF文件...")
    # 提取PDF文本
    pdf_text = extract_text_from_pdf(pdf_path)
    
    if pdf_text:
        print("解析PDF数据...")
        # 解析数据
        new_data = parse_pdf_data(pdf_text)
        print(f"从PDF中提取了 {len(new_data)} 条数据")
        
        # 读取现有JSON
        existing_data = read_existing_json(json_path)
        print(f"现有JSON数据项数: {len(existing_data)}")
        
        # 更新数据
        updated_data = update_json_data(existing_data, new_data)
        
        # 保存更新后的数据
        save_json_data(updated_data, json_path)
        
        # 显示一些示例数据
        print("\n更新后的部分数据示例:")
        for i, item in enumerate(updated_data[:5]):
            print(f"{i+1}. {item['Faculty']} - {item['Programme']}: Apps={item['Apps']}, Offers={item['Offers']}, Places={item['Places']}")
    else:
        print("未成功提取PDF内容")
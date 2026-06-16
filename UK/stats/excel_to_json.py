import pandas as pd
import json
import os

# 读取Excel文件
excel_file = '/Users/eliot/Desktop/项目/New/UK/stats/英国热门院校.xlsx'
output_json = '/Users/eliot/Desktop/项目/New/UK/stats/uk_universities_data.json'

try:
    # 读取现有的JSON数据，以便保留模板字段
    existing_data = {}
    if os.path.exists(output_json):
        with open(output_json, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    
    # 读取Excel文件的所有工作表
    excel_data = pd.ExcelFile(excel_file)
    
    # 查看所有工作表名称
    sheets = excel_data.sheet_names
    print(f"Excel文件包含以下工作表: {sheets}")
    
    # 创建一个字典来存储所有数据
    all_data = {}
    
    # 遍历每个工作表
    for sheet_name in sheets:
        # 读取工作表数据
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        
        # 转换为JSON格式
        # 将NaN值替换为空字符串
        df = df.fillna('')
        
        # 将数据转换为列表的字典格式
        sheet_data = []
        
        # 读取旧数据的备份，以便获取模板
        old_data_backup = {}
        backup_path = '/Users/eliot/Desktop/项目/New/UK/stats/uk_universities_data.json.bak'
        if os.path.exists(backup_path):
            with open(backup_path, 'r', encoding='utf-8') as f:
                old_data_backup = json.load(f)
        
        # 用于跟踪当前处理的学校，以便将专业信息与其关联
        current_school = None
        
        for _, row in df.iterrows():
            # 创建行字典，只包含非空值
            row_dict = {}
            for col in df.columns:
                if row[col] != '':
                    row_dict[col] = row[col]
            
            # 检查是否是学校名称行
            if '学校名称' in row_dict and row_dict['学校名称']:
                current_school = row_dict['学校名称']
                
                # 从现有数据或备份数据中查找模板
                data_sources = []
                if existing_data and sheet_name in existing_data:
                    data_sources.append(existing_data[sheet_name])
                if old_data_backup and sheet_name in old_data_backup:
                    data_sources.append(old_data_backup[sheet_name])
                
                for source in data_sources:
                    for existing_school in source:
                        if '学校名称' in existing_school:
                            # 使用更灵活的匹配方式，检查学校名称是否包含关键部分
                            existing_name = existing_school['学校名称']
                            new_name = current_school
                            
                            # 提取学校名称的关键部分进行匹配
                            # 例如："圣安德鲁斯University of St Andrews" 应该匹配 "圣安德鲁斯"
                            if (existing_name in new_name or new_name in existing_name or
                                '圣安德鲁斯' in new_name and '圣安德鲁斯' in existing_name or
                                '杜伦' in new_name and '杜伦' in existing_name or
                                '帝国理工' in new_name and '帝国理工' in existing_name or
                                'UCL' in new_name and 'UCL' in existing_name or
                                '爱丁堡' in new_name and '爱丁堡' in existing_name or
                                '曼彻斯特' in new_name and '曼彻斯特' in existing_name):
                                # 保留现有的html_template和visualization_template
                                if 'html_template' in existing_school:
                                    row_dict['html_template'] = existing_school['html_template']
                                if 'visualization_template' in existing_school:
                                    row_dict['visualization_template'] = existing_school['visualization_template']
                                break
                    if 'html_template' in row_dict or 'visualization_template' in row_dict:
                        break
            
            sheet_data.append(row_dict)
        
        all_data[sheet_name] = sheet_data
        print(f"已处理工作表: {sheet_name}，包含 {len(sheet_data)} 条数据")
    
    # 将所有数据写入JSON文件
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print(f"JSON文件已成功生成: {output_json}")
    print(f"文件大小: {os.path.getsize(output_json)} 字节")
    
    # 验证生成的JSON文件
    with open(output_json, 'r', encoding='utf-8') as f:
        loaded_data = json.load(f)
    
    print(f"JSON文件验证成功，包含 {len(loaded_data)} 个工作表的数据")
    
    # 提供文件内容预览
    print("\nJSON文件内容预览:")
    for sheet_name, data in loaded_data.items():
        print(f"\n--- {sheet_name} ---")
        # 只显示前2条记录作为预览
        preview_data = data[:2] if len(data) > 2 else data
        print(json.dumps(preview_data, ensure_ascii=False, indent=2))
        print(f"(共 {len(data)} 条记录)")
        
except Exception as e:
    print(f"处理过程中出错: {str(e)}")
    import traceback
    traceback.print_exc()
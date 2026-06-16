import pandas as pd
import json
import re

# 读取Excel表格中的最新专业数据
excel_file = '/Users/eliot/Desktop/项目/New/UK/stats/英国热门院校.xlsx'
df = pd.read_excel(excel_file, sheet_name='6-10')

# 读取school_programs_data.js文件内容
with open('/Users/eliot/Desktop/项目/New/UK/stats/school_programs_data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 处理Excel数据，按学校分组
school_data = {}
current_school = None
school_programs = []

for index, row in df.iterrows():
    # 检查是否是学校名称行
    if pd.notna(row['学校名称']) and row['学校名称'].strip():
        # 如果已经有当前学校的专业数据，保存起来
        if current_school and school_programs:
            school_data[current_school] = school_programs
        
        # 更新当前学校
        current_school = row['学校名称'].strip()
        school_programs = []
    
    # 检查是否有专业数据
    if pd.notna(row['热门专业']) and row['热门专业'].strip():
        # 提取专业信息
        major_info = {
            'major': row['热门专业'].strip(),
            'admission_requirements': str(row['录取要求']) if pd.notna(row['录取要求']) else '',
            'language_requirements': str(row['语言要求']) if pd.notna(row['语言要求']) else '',
            'additional_requirements': str(row['额外要求']) if pd.notna(row['额外要求']) else ''
        }
        school_programs.append(major_info)

# 保存最后一个学校的数据
if current_school and school_programs:
    school_data[current_school] = school_programs

# 打印处理结果
print('从Excel中提取的专业数据：')
print('=' * 50)
for school, programs in school_data.items():
    print(f'{school}: {len(programs)} 个专业')
    for i, program in enumerate(programs):
        print(f'  {i+1}. {program["major"]}')
    print()

# 更新school_programs_data.js文件
updated_content = content

# 学校名称映射，用于匹配
name_mapping = {
    '圣安德鲁斯University of St Andrews': '圣安德鲁斯University of St Andrews',
    '杜伦大学Durham University': '杜伦大学Durham University',
    '帝国理工Imperial College London': '帝国理工Imperial College London',
    'UCL': 'UCL',
    '爱丁堡大学The University of Edinburgh': '爱丁堡大学The University of Edinburgh',
    '曼彻斯特大学University of Manchester': '曼彻斯特大学University of Manchester',
    '伦敦国王学院\nKing\'s College London': '伦敦国王学院King\'s College London',
    '华威大学\nUniversity of Warwick': '华威大学University of Warwick',
    '伯明翰大学\nUniversity of Birmingham': '伯明翰大学University of Birmingham',
    '利兹大学\nUniversity of Leeds': '利兹大学University of Leeds'
}

print('更新school_programs_data.js中的专业数据：')
print('=' * 50)

for excel_school, programs in school_data.items():
    # 查找对应的目标学校名称
    target_school = name_mapping.get(excel_school, excel_school)
    
    # 构建新的programs数组，每个学校只保留前3个专业
    new_programs = []
    for i, program in enumerate(programs):
        # 每个学校只保留前3个专业
        if i >= 3:
            break
            
        # 从专业名称中提取链接和实际专业名称
        major = program['major']
        link = '#'
        
        # 检查是否包含链接，提取专业名称和链接
        if 'https' in major:
            # 找到https的位置，分离专业名称和链接
            major_part, link_part = major.split('https', 1)
            # 提取专业名称，去掉可能的分隔符
            major = major_part.strip()
            if major.endswith('：') or major.endswith(':'):
                major = major[:-1].strip()
            # 提取链接，确保是完整的URL
            link = 'https' + link_part.strip()
        
        # 检查是否包含其他分隔符
        if '：' in major and ':' not in major.split('：')[1]:
            major = major.split('：')[0].strip()
        elif ':' in major and ':' not in major.split(':')[1]:
            major = major.split(':')[0].strip()
        
        new_program = {
            'major': major,
            'link': link,
            'admission_requirements': program['admission_requirements'],
            'language_requirements': program['language_requirements'],
            'additional_requirements': program['additional_requirements'] if program['additional_requirements'] != 'nan' else ''
        }
        new_programs.append(new_program)
    
    # 生成新的programs JSON字符串
    programs_json = json.dumps(new_programs, ensure_ascii=False, indent=8)
    
    # 替换school_programs_data.js中的programs部分
    # 使用正则表达式找到programs数组的位置
    school_pattern = rf'"{re.escape(target_school)}"\s*:\s*\{{'
    school_match = re.search(school_pattern, updated_content)
    
    if school_match:
        # 找到学校对象的起始位置
        school_start = school_match.end() - 1
        
        # 找到programs键的位置
        programs_pattern = r'"programs"\s*:'
        programs_match = re.search(programs_pattern, updated_content[school_start:], re.DOTALL)
        
        if programs_match:
            # 找到programs数组的起始位置
            programs_start = school_start + programs_match.end()
            
            # 找到programs数组的结束位置
            # 使用计数器来处理嵌套的数组和对象
            bracket_count = 0
            programs_end = programs_start
            found_array_start = False
            
            for i, char in enumerate(updated_content[programs_start:]):
                if char == '[':
                    bracket_count += 1
                    found_array_start = True
                elif char == ']':
                    bracket_count -= 1
                    if found_array_start and bracket_count == 0:
                        programs_end = programs_start + i + 1
                        break
            
            if found_array_start and bracket_count == 0:
                # 构建新的programs数组字符串
                # 确保缩进正确
                indent = '        '
                programs_json = json.dumps(new_programs, ensure_ascii=False, indent=8).replace('\n', f'\n{indent}')
                
                # 替换programs数组
                new_content = updated_content[:programs_start] + ' ' + programs_json + updated_content[programs_end:]
                updated_content = new_content
                print(f'✅ 更新了 {target_school} 的专业数据')
            else:
                print(f'❌ 未找到 {target_school} 的programs数组结束位置')
        else:
            print(f'❌ 未找到 {target_school} 的programs键')
    else:
        print(f'❌ 未找到 {target_school} 的起始位置')

# 保存更新后的文件
with open('/Users/eliot/Desktop/项目/New/UK/stats/school_programs_data.js', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print('\n✅ 专业数据更新完成！')

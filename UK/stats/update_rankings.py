import pandas as pd
import re

# 读取Excel表格中的最新排名
excel_file = '/Users/eliot/Desktop/项目/New/UK/stats/英国热门院校.xlsx'
df = pd.read_excel(excel_file, sheet_name='6-10')
schools = df[df['学校名称'].notna()]

# 读取school_programs_data.js文件内容
with open('/Users/eliot/Desktop/项目/New/UK/stats/school_programs_data.js', 'r', encoding='utf-8') as f:
    content = f.read()

print('当前school_programs_data.js中的排名与Excel表格中的排名对比：')
print('=' * 60)

# 创建一个字典来存储需要更新的学校排名
updates_needed = {}

# 学校名称映射，处理中文名称和英文名称的对应关系
school_name_map = {
    '圣安德鲁斯': '圣安德鲁斯University of St Andrews',
    '杜伦': '杜伦大学Durham University',
    '帝国理工': '帝国理工Imperial College London',
    'UCL': 'UCL',
    '爱丁堡': '爱丁堡大学The University of Edinburgh',
    '曼彻斯特': '曼彻斯特大学University of Manchester',
    '伦敦国王学院': '伦敦国王学院King\'s College London',
    '华威': '华威大学University of Warwick',
    '伯明翰': '伯明翰大学University of Birmingham',
    '利兹': '利兹大学University of Leeds'
}

for index, row in schools.iterrows():
    school_name = row['学校名称'].strip()
    excel_ranking = row['排名']
    
    # 提取中文学校名称
    chinese_name = re.match(r'([\u4e00-\u9fa5]+)', school_name).group(1) if re.match(r'([\u4e00-\u9fa5]+)', school_name) else school_name
    
    # 查找对应的完整学校名称
    full_name = school_name_map.get(chinese_name, chinese_name)
    
    # 在school_programs_data.js中查找该学校的排名
    pattern = rf'{re.escape(full_name)}\s*:\s*\{{[^\}}]*"ranking"\s*:\s*(\d+\.?\d*)'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        current_ranking = float(match.group(1))
        print(f'{chinese_name}：')
        print(f'  当前排名：{current_ranking}')
        print(f'  Excel排名：{excel_ranking}')
        
        if current_ranking != excel_ranking:
            print(f'  ⚠️ 需要更新')
            updates_needed[full_name] = excel_ranking
        else:
            print(f'  ✅ 排名一致')
    else:
        print(f'{chinese_name}：')
        print(f'  ❌ 在school_programs_data.js中未找到')
    
    print()

print('需要更新的学校：')
for school, ranking in updates_needed.items():
    print(f'- {school}: {ranking}')

# 重新读取文件内容，使用更简单的方式更新排名
with open('/Users/eliot/Desktop/项目/New/UK/stats/school_programs_data.js', 'r', encoding='utf-8') as f:
    content = f.read()

updated_content = content

# 直接使用简单的字符串替换，因为我们知道学校名称的准确格式
school_updates = {
    '圣安德鲁斯University of St Andrews': 2.0,
    '杜伦大学Durham University': 3.0,
    '帝国理工Imperial College London': 6.0,
    'UCL': 9.0,
    '爱丁堡大学The University of Edinburgh': 25.0,
    '曼彻斯特大学University of Manchester': 27.0,
    '伦敦国王学院King\'s College London': 19.0,
    '华威大学University of Warwick': 8.0,
    '伯明翰大学University of Birmingham': 16.0,
    '利兹大学University of Leeds': 26.0
}

print('直接更新所有学校的排名：')
print('=' * 50)

for school, ranking in school_updates.items():
    # 使用更简单的匹配方式
    pattern = rf'"{school}"\s*:\s*\{{[^\}}]*"ranking"\s*:\s*(\d+\.?\d*)'
    match = re.search(pattern, updated_content, re.DOTALL)
    
    if match:
        current_ranking = float(match.group(1))
        if current_ranking != ranking:
            updated_content = re.sub(pattern, f'"{school}": {{\n        "ranking": {ranking}', updated_content, count=1, flags=re.DOTALL)
            print(f'✅ {school}: {current_ranking} -> {ranking}')
        else:
            print(f'✅ {school}: 排名已为 {ranking}，无需更新')
    else:
        print(f'❌ {school}: 未找到，跳过更新')

# 写入更新后的内容
with open('/Users/eliot/Desktop/项目/New/UK/stats/school_programs_data.js', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print('\n✅ 排名更新完成！')

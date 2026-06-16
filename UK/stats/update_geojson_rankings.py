import pandas as pd
import json
import re

# 读取Excel表格中的最新排名
excel_file = '/Users/eliot/Desktop/项目/New/UK/stats/英国热门院校.xlsx'
df = pd.read_excel(excel_file, sheet_name='6-10')
schools = df[df['学校名称'].notna()]

# 读取uk-universities.geojson文件内容
with open('/Users/eliot/Desktop/项目/New/UK/stats/uk-universities.geojson', 'r', encoding='utf-8') as f:
    geojson_data = json.load(f)

# 创建一个字典来存储需要更新的学校排名，使用更灵活的匹配方式
school_rankings = {
    '圣安德鲁斯': 2.0,
    '杜伦': 3.0,
    '帝国理工': 6.0,
    'UCL': 9.0,
    '爱丁堡': 25.0,
    '曼彻斯特': 27.0,
    '伦敦国王学院': 19.0,
    '华威': 8.0,
    '伯明翰': 16.0,
    '利兹': 26.0
}

# 更新uk-universities.geojson文件中的排名
print('更新uk-universities.geojson中的排名：')
print('=' * 50)

# 学校名称映射，用于更灵活的匹配
name_mapping = {
    '圣安德鲁斯大学': '圣安德鲁斯',
    '曼彻斯特大学': '曼彻斯特',
    '伦敦大学学院(UCL)': 'UCL',
    '爱丁堡大学': '爱丁堡',
    '伦敦国王学院(KCL)': '伦敦国王学院',
    '华威大学': '华威',
    '杜伦大学': '杜伦',
    '利兹大学': '利兹',
    '伯明翰大学': '伯明翰'
}

for feature in geojson_data['features']:
    name = feature['properties']['name']
    current_ranking = feature['properties']['ranking']
    
    # 查找对应的学校简称
    school_key = name_mapping.get(name, None)
    
    if school_key in school_rankings:
        # 获取新的Times排名，并格式化为整数
        new_times_ranking = int(school_rankings[school_key])
        
        # 提取QS排名
        qs_match = re.search(r'QS 第(\d+)名', current_ranking)
        qs_ranking = qs_match.group(1) if qs_match else '未知'
        
        # 更新排名
        new_ranking = f'2026 Times 第{new_times_ranking}名，QS 第{qs_ranking}名'
        
        if current_ranking != new_ranking:
            feature['properties']['ranking'] = new_ranking
            print(f'✅ {name}: {current_ranking} -> {new_ranking}')
        else:
            print(f'✅ {name}: 排名已为 {new_ranking}，无需更新')
    else:
        print(f'❌ {name}: 未找到对应的排名数据')

# 保存更新后的文件
with open('/Users/eliot/Desktop/项目/New/UK/stats/uk-universities.geojson', 'w', encoding='utf-8') as f:
    json.dump(geojson_data, f, ensure_ascii=False, indent=2)

print('\n✅ uk-universities.geojson排名更新完成！')

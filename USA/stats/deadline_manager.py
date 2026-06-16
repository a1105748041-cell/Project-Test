#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
截止日期管理器 - 用于处理美国院校截止日期数据
"""

import re
import json
from pdf_utils import open_pdf, extract_school_deadlines, write_schools_to_file, find_school_in_pdf

def read_system_deadlines():
    """读取系统中的截止日期数据"""
    file_path = "/Users/eliot/Desktop/项目/New/USA/stats/university_deadlines.js"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 使用正则表达式提取截止日期数据
    system_schools = {}
    school_pattern = r'"([^"]+)":\s*\{([^\}]+)\}'
    deadline_pattern = r'"(ED|EDII|EA|EAII|RD)":\s*"([^"]*)"'
    
    matches = re.findall(school_pattern, content)
    for school_name, deadlines_str in matches:
        deadlines = {}
        deadline_matches = re.findall(deadline_pattern, deadlines_str)
        for deadline_type, date in deadline_matches:
            deadlines[deadline_type] = date
        system_schools[school_name] = deadlines
    
    return system_schools

def write_system_deadlines(deadlines_data):
    """将截止日期数据写入系统文件"""
    file_path = "/Users/eliot/Desktop/项目/New/USA/stats/university_deadlines.js"
    
    # 生成JavaScript代码
    js_code = "// 美国院校截止日期数据\n"
    js_code += "const universityDeadlines = {\n"
    
    for school_name, deadlines in deadlines_data.items():
        js_code += f'  "{school_name}": {{\n'
        js_code += f'    "ED": "{deadlines["ED"]}",\n'
        js_code += f'    "EDII": "{deadlines["EDII"]}",\n'
        js_code += f'    "EA": "{deadlines["EA"]}",\n'
        js_code += f'    "EAII": "{deadlines["EAII"]}",\n'
        js_code += f'    "RD": "{deadlines["RD"]}"\n'
        js_code += '  },\n'
    
    # 移除最后一个逗号
    js_code = js_code.rstrip(",\n")
    js_code += "\n};\n"
    js_code += "// 导出数据供其他模块使用\n"
    js_code += "if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {\n"
    js_code += "  module.exports = universityDeadlines;\n"
    js_code += "} else {\n"
    js_code += "  window.universityDeadlines = universityDeadlines;\n"
    js_code += "}\n"
    
    # 写入文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(js_code)
    
    print("截止日期数据文件已更新！")

def write_deadlines_to_file(deadlines_data, output_file):
    """将截止日期数据写入文本文件"""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('系统中的学校截止日期信息\n')
        f.write('=' * 60 + '\n\n')
        
        for school_name, deadlines in deadlines_data.items():
            f.write(f"学校名称：{school_name}\n")
            f.write("截止日期：\n")
            f.write(f"  ED: {deadlines.get('ED', '')}\n")
            f.write(f"  EDII: {deadlines.get('EDII', '')}\n")
            f.write(f"  EA: {deadlines.get('EA', '')}\n")
            f.write(f"  EAII: {deadlines.get('EAII', '')}\n")
            f.write(f"  RD: {deadlines.get('RD', '')}\n")
            f.write('\n' + '-' * 60 + '\n\n')

def compare_deadlines(system_deadlines, pdf_schools):
    """比较系统中的截止日期与PDF提取的截止日期"""
    output_file = '/Users/eliot/Desktop/项目/New/USA/stats/deadline_comparison.txt'
    
    # 学校中英文名称映射
    school_name_map = {
        "范德堡大学": "Vanderbilt University",
        "密歇根大学安娜堡分校": "University of Michigan",
        "北卡罗来纳大学教堂山分校": "University of North Carolina",
        "纽约大学": "New York University",
        "伊利诺伊大学香槟分校": "University of Illinois",
        "威斯康星大学麦迪逊分校": "University of Wisconsin",
        "俄亥俄州立大学": "Ohio State University",
        "波士顿大学": "Boston University",
        "南加州大学": "University of Southern California",
        "罗格斯大学": "Rutgers University",
        "罗切斯特大学": "University of Rochester",
        "康奈尔大学": "Cornell University",
        "布朗大学": "Brown University",
        "哥伦比亚大学": "Columbia University",
        "圣路易斯华盛顿大学": "Washington University"
    }
    
    def write_deadline_comparison(file, school_name, matching_school, system_deadlines_data, is_loose_match=False):
        """写入单个学校的截止日期对比结果"""
        if is_loose_match:
            file.write(f"PDF中匹配的学校名称（宽松匹配）：{matching_school['name']}\n")
        else:
            file.write(f"PDF中匹配的学校名称：{matching_school['name']}\n")
        file.write(f"PDF页码：第 {matching_school['page']} 页\n")
        
        pdf_deadlines = matching_school['deadlines']
        
        # 对比每个截止日期类型
        for deadline_type in ['ED', 'EDII', 'EA', 'EAII', 'RD']:
            system_date = system_deadlines_data.get(deadline_type, '')
            pdf_date = pdf_deadlines.get(deadline_type, '')
            
            # 统一日期格式进行比较（去除年份）
            system_date_short = system_date[:5] if len(system_date) > 5 else system_date
            pdf_date_short = pdf_date[:5] if len(pdf_date) > 5 else pdf_date
            
            if system_date_short != pdf_date_short:
                file.write(f"  ❌ {deadline_type}: 系统 = '{system_date}', PDF = '{pdf_date}'\n")
            else:
                file.write(f"  ✅ {deadline_type}: {system_date}\n")
    
    with open(output_file, 'w', encoding='utf-8') as f:      
        f.write('系统与PDF截止日期信息对比\n')
        f.write('=' * 60 + '\n\n')
        
        # 遍历系统中的所有学校
        for school_name, system_deadlines_data in system_deadlines.items():   
            f.write(f"对比学校：{school_name}\n")
            
            # 获取英文名称
            english_name = school_name_map.get(school_name, school_name)
            f.write(f"英文名称：{english_name}\n")
            
            # 在PDF提取的信息中查找匹配的学校
            matching_pdf_schools = []
            for pdf_school in pdf_schools:
                pdf_school_name = pdf_school['name']
                
                # 精确匹配或包含关键部分
                if pdf_school_name == english_name or (english_name in pdf_school_name and len(pdf_school_name) > len("University")):
                    matching_pdf_schools.append(pdf_school)
            
            if matching_pdf_schools:
                # 使用第一个匹配的结果
                write_deadline_comparison(f, school_name, matching_pdf_schools[0], system_deadlines_data)
            else:
                # 尝试使用更宽松的匹配
                loose_matches = []
                for pdf_school in pdf_schools:
                    if any(keyword in pdf_school['name'] for keyword in english_name.split()) and len(pdf_school['name']) > 10:
                        loose_matches.append(pdf_school)
                
                if loose_matches:
                    write_deadline_comparison(f, school_name, loose_matches[0], system_deadlines_data, is_loose_match=True)
                else:
                    f.write("  ❌ 未在PDF中找到匹配的学校\n")
            
            f.write('\n' + '-' * 60 + '\n\n')
    
    print(f"对比结果已保存到 {output_file}")

def fix_deadlines_file():
    """修复美国院校截止日期数据文件中的语法错误"""
    file_path = "/Users/eliot/Desktop/项目/New/USA/stats/university_deadlines.js"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def fix_school_name(match):
        match_str = match.group(0)
        # 移除换行符
        fixed = match_str.replace('\n', '')
        # 移除多余的空格
        fixed = re.sub(r'\s+', ' ', fixed)
        # 移除开头和结尾的多余空格
        fixed = re.sub(r'"\s+', '"', fixed)
        fixed = re.sub(r'\s+"', '"', fixed)
        # 清理学校名称，只保留字母、数字、空格、连字符、&符号
        def clean_name(name):
            return re.sub(r"[^a-zA-Z0-9\s&\-]+", "", name).strip()
        
        fixed = re.sub(r'"([^"]*)"', lambda x: '"' + clean_name(x.group(1)) + '"', fixed)
        # 移除无效的前缀（如Y、Y Y、ACT Tests等）
        fixed = re.sub(r'"^(Y|ACT Tests|Used INTL|Forms)\s*', '"', fixed, flags=re.IGNORECASE)
        return fixed
    
    content = re.sub(r'"[\s\S]*?": {', fix_school_name, content)
    
    # 写入修复后的内容
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('文件修复完成！')

def generate_accurate_deadlines():
    """生成准确的美国院校截止日期数据"""
    # 从PDF文件中提取的截止日期信息，以及用户提供的正确信息
    deadlines_data = {
        "范德堡大学": {
            "ED": "11/1/2025",
            "EDII": "1/1/2026",
            "EA": "",
            "EAII": "",
            "RD": "1/1/2026"
        },
        "密歇根大学安娜堡分校": {
            "ED": "",
            "EDII": "",
            "EA": "11/1/2025",
            "EAII": "",
            "RD": "2/1/2026"
        },
        "北卡罗来纳大学教堂山分校": {
            "ED": "",
            "EDII": "",
            "EA": "10/15/2025",
            "EAII": "",
            "RD": "1/15/2026"
        },
        "纽约大学": {
            "ED": "11/1/2025",
            "EDII": "1/1/2026",
            "EA": "",
            "EAII": "",
            "RD": "1/5/2026"
        },
        "伊利诺伊大学香槟分校": {
            "ED": "",
            "EDII": "",
            "EA": "11/1/2025",
            "EAII": "",
            "RD": "1/5/2026"
        },
        "威斯康星大学麦迪逊分校": {
            "ED": "",
            "EDII": "",
            "EA": "11/1/2025",
            "EAII": "",
            "RD": "2/1/2026"
        },
        "俄亥俄州立大学": {
            "ED": "",
            "EDII": "",
            "EA": "11/1/2025",
            "EAII": "",
            "RD": "2/1/2026"
        },
        "波士顿大学": {
            "ED": "11/1/2025",
            "EDII": "1/5/2026",
            "EA": "",
            "EAII": "",
            "RD": "1/5/2026"
        },
        "南加州大学": {
            "ED": "11/1/2025",
            "EDII": "",
            "EA": "11/1/2025",
            "EAII": "",
            "RD": "1/10/2026"
        },
        "罗格斯大学": {
            "ED": "",
            "EDII": "",
            "EA": "12/01/2025",
            "EAII": "",
            "RD": ""
        },
        "罗切斯特大学": {
            "ED": "11/1/2025",
            "EDII": "1/5/2026",
            "EA": "11/1/2025",
            "EAII": "",
            "RD": "1/5/2026"
        },
        "康奈尔大学": {
            "ED": "11/1/2025",
            "EDII": "",
            "EA": "",
            "EAII": "",
            "RD": "1/2/2026"
        },
        "布朗大学": {
            "ED": "11/1/2025",
            "EDII": "",
            "EA": "",
            "EAII": "",
            "RD": "1/5/2026"
        },
        "哥伦比亚大学": {
            "ED": "11/1/2025",
            "EDII": "",
            "EA": "",
            "EAII": "",
            "RD": "1/2/2026"
        },
        "圣路易斯华盛顿大学": {
            "ED": "11/3/2025",
            "EDII": "1/2/2026",
            "EA": "",
            "EAII": "",
            "RD": "1/2/2026"
        }
    }
    
    write_system_deadlines(deadlines_data)
    print("准确的截止日期数据文件生成完成！")

def batch_process_deadlines():
    """批量处理截止日期数据"""
    print("开始批量处理截止日期数据...")
    
    # 1. 提取学校截止日期
    schools = extract_school_deadlines()
    print(f"成功提取了 {len(schools)} 所学校的截止日期信息")
    
    # 2. 写入PDF提取的信息到文件
    write_schools_to_file(schools, '/Users/eliot/Desktop/项目/New/USA/stats/pdf_deadlines.txt')
    print("提取的信息已保存到 pdf_deadlines.txt 文件中")
    
    # 3. 读取系统中的截止日期
    system_deadlines = read_system_deadlines()
    
    # 4. 写入系统中的信息到文件
    write_deadlines_to_file(system_deadlines, '/Users/eliot/Desktop/项目/New/USA/stats/system_deadlines.txt')
    print(f"成功提取了系统中 {len(system_deadlines)} 所学校的截止日期信息")
    print("系统中的信息已保存到 system_deadlines.txt 文件中")
    
    # 5. 对比两个文件中的信息
    compare_deadlines(system_deadlines, schools)
    print("对比结果已保存到 deadline_comparison.txt 文件中")
    print("请查看这些文件，找出所有截止日期错误")

def get_uni_coordinates():
    """获取美国大学的坐标信息"""
    file_path = "/Users/eliot/Desktop/项目/New/USA/stats/usa-universities.geojson"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        geojson_data = json.load(f)
    
    # 输出美国大学的坐标信息
    for feature in geojson_data['features']:
        name = feature['properties']['name']
        coordinates = feature['geometry']['coordinates']
        print(f"大学名称: {name}")
        print(f"坐标: {coordinates}")
        print("-" * 50)

if __name__ == "__main__":
    # 主菜单
    print("美国院校截止日期管理工具")
    print("=" * 30)
    print("1. 批量处理截止日期数据 - 从PDF提取并与系统对比")
    print("2. 生成准确的截止日期文件 - 使用预定义的准确数据更新系统")
    print("3. 修复截止日期文件 - 清理和修复系统截止日期文件格式")
    print("4. 获取大学坐标信息 - 查看所有大学的地理位置坐标")
    print("0. 退出程序")
    print("=" * 30)
    
    choice = input("请选择操作 (0-4): ")
    
    if choice == '1':
        batch_process_deadlines()
    elif choice == '2':
        generate_accurate_deadlines()
    elif choice == '3':
        fix_deadlines_file()
    elif choice == '4':
        get_uni_coordinates()
    elif choice == '0':
        print("程序已退出")
    else:
        print(f"无效的选择: {choice}，请输入0-4之间的数字")
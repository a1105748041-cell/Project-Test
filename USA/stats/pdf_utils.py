#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PDF工具集 - 用于处理ReqGrid.pdf文件的所有功能
"""

import PyPDF2
import re

def open_pdf(pdf_path):
    """打开PDF文件并返回PDF阅读器对象"""
    return PyPDF2.PdfReader(open(pdf_path, 'rb'))

def get_pdf_info(pdf_reader):
    """获取PDF文件的基本信息"""
    return {
        'total_pages': len(pdf_reader.pages),
        'metadata': pdf_reader.metadata
    }

def extract_page_text(pdf_reader, page_num):
    """提取指定页面的文本"""
    if page_num < 0 or page_num >= len(pdf_reader.pages):
        raise ValueError(f"页码超出范围，PDF共有 {len(pdf_reader.pages)} 页")
    
    page = pdf_reader.pages[page_num]
    return page.extract_text()

def search_text_in_pdf(pdf_reader, keywords, case_sensitive=False):
    """在PDF中搜索指定关键词，返回匹配的页面和文本片段"""
    results = []
    
    for page_num in range(len(pdf_reader.pages)):
        text = extract_page_text(pdf_reader, page_num)
        
        if not case_sensitive:
            text = text.lower()
            keywords = [kw.lower() for kw in keywords]
        
        for keyword in keywords:
            if keyword in text:
                results.append({
                    'page_num': page_num + 1,
                    'keyword': keyword,
                    'text_snippet': text[:2000]  # 返回前2000个字符作为片段
                })
    
    return results

def find_school_in_pdf(pdf_reader, school_name, chinese_name=""):
    """在PDF中查找特定学校的信息"""
    results = []
    
    for page_num in range(len(pdf_reader.pages)):
        text = extract_page_text(pdf_reader, page_num)
        
        # 检查是否包含学校名称
        if school_name in text:
            results.append({
                'page_num': page_num + 1,
                'full_text': text
            })
    
    return results

def extract_school_deadlines():
    """从PDF中提取所有学校的截止日期信息"""
    all_schools = []
    pdf_path = '/Users/eliot/Desktop/项目/New/USA/stats/ReqGrid.pdf'
    
    # 直接在函数内打开PDF文件
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            lines = text.split('\n')
            
            # 查找包含大学信息的行
            for i, line in enumerate(lines):
                # 检查是否包含日期格式
                if re.search(r'\d{1,2}/\d{1,2}/\d{4}', line):
                    # 学校名称通常在这一行的开头
                    # 尝试从行首提取学校名称，直到遇到日期或学校类型
                    school_match = re.match(r'([A-Za-z\s&\-]+?)\s*(Coed|Women|Men|Coordinate|\d{1,2}/\d{1,2}/\d{4})', line)
                    if school_match:
                        school_name = school_match.group(1).strip()
                        
                        # 提取所有日期
                        dates = re.findall(r'(\d{1,2}/\d{1,2}/\d{4})', line)
                        
                        # 根据位置分配截止日期类型
                        deadlines = {
                            'ED': dates[0] if len(dates) > 0 else '',
                            'EDII': dates[1] if len(dates) > 1 else '',
                            'EA': dates[2] if len(dates) > 2 else '',
                            'EAII': dates[3] if len(dates) > 3 else '',
                            'RD': dates[4] if len(dates) > 4 else ''
                        }
                        
                        # 只添加有效的学校名称（排除"Forms"等无效名称）
                        if school_name and school_name not in ['Forms', 'ACT Tests', 'Used INTL']:
                            all_schools.append({
                                'name': school_name,
                                'page': page_num + 1,
                                'deadlines': deadlines
                            })
    
    return all_schools

def print_school_deadlines(schools):
    """打印提取的学校截止日期信息"""
    for school in schools:
        print(f"学校名称：{school['name']}")
        print(f"所在页码：第 {school['page']} 页")
        print("截止日期：")
        print(f"  ED: {school['deadlines']['ED']}")
        print(f"  EDII: {school['deadlines']['EDII']}")
        print(f"  EA: {school['deadlines']['EA']}")
        print(f"  EAII: {school['deadlines']['EAII']}")
        print(f"  RD: {school['deadlines']['RD']}")
        print('\n' + '-' * 60 + '\n')

def write_schools_to_file(schools, output_file):
    """将提取的学校信息写入文件"""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('从PDF中提取的学校截止日期信息\n')
        f.write('=' * 60 + '\n\n')
        
        for school in schools:
            f.write(f"学校名称：{school['name']}\n")
            f.write(f"所在页码：第 {school['page']} 页\n")
            f.write(f"截止日期：\n")
            f.write(f"  ED: {school['deadlines']['ED']}\n")
            f.write(f"  EDII: {school['deadlines']['EDII']}\n")
            f.write(f"  EA: {school['deadlines']['EA']}\n")
            f.write(f"  EAII: {school['deadlines']['EAII']}\n")
            f.write(f"  RD: {school['deadlines']['RD']}\n")
            f.write('\n' + '-' * 60 + '\n\n')

def manual_check_school(pdf_reader, chinese_name, english_name):
    """手动检查特定学校的信息"""
    print(f"\n=== 查找学校：{chinese_name} ({english_name}) ===")
    
    # 遍历每一页
    found = False
    for page_num in range(len(pdf_reader.pages)):
        text = extract_page_text(pdf_reader, page_num)
        
        # 检查是否包含英文名称
        if english_name in text:
            print(f"在第 {page_num + 1} 页找到匹配的学校")
            
            # 打印该页的内容片段
            print(f"\n=== 第 {page_num + 1} 页内容片段 ===")
            lines = text.split('\n')
            # 找到包含学校名称的行
            for i, line in enumerate(lines):
                if english_name in line:
                    # 打印该行及其前后各5行
                    start = max(0, i - 5)
                    end = min(len(lines), i + 10)
                    for j in range(start, end):
                        print(f"{j + 1:3d}: {lines[j]}")
                    break
            
            found = True
            break
    
    if not found:
        # 尝试使用部分名称匹配
        print("未找到完全匹配的学校，尝试使用部分名称匹配...")
        for page_num in range(len(pdf_reader.pages)):
            text = extract_page_text(pdf_reader, page_num)
            
            # 提取学校名称中的关键词
            keywords = english_name.split()[-2:]
            keyword = ' '.join(keywords)
            
            if keyword in text:
                print(f"在第 {page_num + 1} 页找到可能匹配的内容（关键词：{keyword}）")
                print(f"\n=== 第 {page_num + 1} 页内容片段 ===")
                lines = text.split('\n')
                for i, line in enumerate(lines):
                    if keyword in line:
                        start = max(0, i - 5)
                        end = min(len(lines), i + 10)
                        for j in range(start, end):
                            print(f"{j + 1:3d}: {lines[j]}")
                        break
                break
    
    print('\n' + '='*50)

if __name__ == "__main__":
    # 示例用法
    pdf_path = '/Users/eliot/Desktop/项目/New/USA/stats/ReqGrid.pdf'
    pdf_reader = open_pdf(pdf_path)
    
    print(f"PDF文件共有 {len(pdf_reader.pages)} 页")
    
    # 搜索示例
    results = search_text_in_pdf(pdf_reader, ['Michigan', 'Wisconsin'], case_sensitive=False)
    print(f"找到 {len(results)} 个匹配结果")
    
    # 提取学校截止日期示例
    schools = extract_school_deadlines(pdf_reader)
    print(f"提取了 {len(schools)} 所学校的截止日期信息")
    
    # 手动检查示例
    manual_check_school(pdf_reader, "密歇根大学安娜堡分校", "University of Michigan-Ann Arbor")
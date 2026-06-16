import pandas as pd

# 读取Excel文件
excel_file = '/Users/eliot/Desktop/项目/New/UK/stats/英国热门院校.xlsx'

try:
    # 读取Excel文件的所有工作表
    excel_data = pd.ExcelFile(excel_file)
    
    # 查看所有工作表名称
    sheets = excel_data.sheet_names
    print(f"Excel文件包含以下工作表: {sheets}")
    
    # 遍历每个工作表
    for sheet_name in sheets:
        # 读取工作表数据
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        
        print(f"\n--- {sheet_name} ---\n")
        print(f"列名: {list(df.columns)}")
        print(f"\n前2行数据:\n")
        print(df.head(2))
        print(f"\n数据量: {len(df)} 行")
        
except Exception as e:
    print(f"处理过程中出错: {str(e)}")
    import traceback
    traceback.print_exc()

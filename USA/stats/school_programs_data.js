// 美国大学专业数据
const universityPrograms = {
  "普林斯顿大学": {
    "admissions": {
      "acceptanceRate": "4.4%",
      "avgSAT": "1470-1570",
      "avgACT": "33-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "工程与应用科学学院",
        "englishName": "School of Engineering and Applied Science",
        "description": "普林斯顿大学工程与应用科学学院在工程领域处于世界领先地位，拥有多个顶尖的研究中心和实验室。",
        "popularMajors": ["电气工程", "机械工程", "化学工程", "计算机科学", "材料科学"]
      },
      {
        "name": "文理学院",
        "englishName": "School of Arts and Sciences",
        "description": "普林斯顿大学文理学院涵盖人文、社会科学和自然科学等多个领域，拥有世界顶尖的数学系和物理系。",
        "popularMajors": ["数学", "物理学", "经济学", "哲学", "历史"]
      }
    ]
  },
  "麻省理工学院": {
    "admissions": {
      "acceptanceRate": "4.1%",
      "avgSAT": "1510-1570",
      "avgACT": "34-36",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "工程学院",
        "englishName": "School of Engineering",
        "description": "MIT工程学院是世界顶尖的工程学院之一，在航空航天、电子工程、计算机科学等领域处于领先地位。",
        "popularMajors": ["航空航天工程", "电子工程", "计算机科学", "机械工程", "化学工程"]
      },
      {
        "name": "理学院",
        "englishName": "School of Science",
        "description": "MIT理学院在数学、物理学、化学和生物学等领域处于世界领先地位，拥有众多诺贝尔奖获得者。",
        "popularMajors": ["物理学", "数学", "化学", "生物学", "脑与认知科学"]
      },
      {
        "name": "斯隆管理学院",
        "englishName": "Sloan School of Management",
        "description": "MIT斯隆管理学院是世界顶尖的商学院之一，在创新和创业方面处于领先地位。",
        "popularMajors": ["管理学", "金融学", "创业", "商业分析", "运筹学"]
      }
    ]
  },
  "哈佛大学": {
    "admissions": {
      "acceptanceRate": "3.4%",
      "avgSAT": "1510-1580",
      "avgACT": "34-36",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "哈佛学院",
        "englishName": "Harvard College",
        "description": "哈佛学院是哈佛大学的本科教育核心，提供广泛的文理学科教育。",
        "popularMajors": ["经济学", "计算机科学", "政府学", "心理学", "历史"]
      },
      {
        "name": "哈佛商学院",
        "englishName": "Harvard Business School",
        "description": "哈佛商学院是世界最顶尖的商学院之一，培养了众多商业领袖。",
        "popularMajors": ["工商管理", "金融学", "市场营销", "战略管理", "创业"]
      },
      {
        "name": "哈佛法学院",
        "englishName": "Harvard Law School",
        "description": "哈佛法学院是美国顶尖的法学院之一，在法律教育和研究方面处于领先地位。",
        "popularMajors": ["公司法", "国际法", "宪法", "知识产权法", "税法"]
      },
      {
        "name": "哈佛医学院",
        "englishName": "Harvard Medical School",
        "description": "哈佛医学院是世界顶尖的医学院之一，在医学研究和临床实践方面处于领先地位。",
        "popularMajors": ["医学", "生物医学研究", "公共卫生", "神经科学", "遗传学"]
      }
    ]
  },
  "斯坦福大学": {
    "admissions": {
      "acceptanceRate": "3.9%",
      "avgSAT": "1500-1570",
      "avgACT": "33-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "工程学院",
        "englishName": "School of Engineering",
        "description": "斯坦福大学工程学院与硅谷紧密合作，在计算机科学、人工智能和生物工程等领域处于世界领先地位。",
        "popularMajors": ["计算机科学", "电气工程", "生物工程", "机械工程", "材料科学"]
      },
      {
        "name": "商学院",
        "englishName": "Graduate School of Business",
        "description": "斯坦福商学院是世界顶尖的商学院之一，在创业和创新方面排名全美第一。",
        "popularMajors": ["创业", "金融学", "管理学", "市场营销", "领导力"]
      },
      {
        "name": "文理学院",
        "englishName": "School of Humanities and Sciences",
        "description": "斯坦福大学文理学院涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["经济学", "心理学", "生物学", "数学", "英语"]
      },
      {
        "name": "医学院",
        "englishName": "School of Medicine",
        "description": "斯坦福医学院在生物医学研究和临床实践方面处于世界前沿。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "免疫学"]
      }
    ]
  },
  "芝加哥大学": {
    "admissions": {
      "acceptanceRate": "6.5%",
      "avgSAT": "1500-1570",
      "avgACT": "33-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "13%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "芝加哥大学学院",
        "englishName": "University of Chicago College",
        "description": "芝加哥大学学院以其核心课程和严谨的学术氛围而闻名，培养了众多诺贝尔奖获得者。",
        "popularMajors": ["经济学", "数学", "物理学", "政治学", "哲学"]
      },
      {
        "name": "布斯商学院",
        "englishName": "Booth School of Business",
        "description": "芝加哥大学布斯商学院在金融学和经济学方面处于世界领先地位。",
        "popularMajors": ["金融学", "经济学", "市场营销", "管理学", "会计学"]
      },
      {
        "name": "法学院",
        "englishName": "Law School",
        "description": "芝加哥大学法学院在法律理论和实证研究方面享有盛誉。",
        "popularMajors": ["公司法", "宪法", "国际法", "知识产权法", "税法"]
      },
      {
        "name": "普利兹克医学院",
        "englishName": "Pritzker School of Medicine",
        "description": "芝加哥大学普利兹克医学院在医学研究和临床实践方面处于领先地位。",
        "popularMajors": ["医学", "生物医学研究", "公共卫生", "神经科学", "遗传学"]
      }
    ]
  },
  "宾夕法尼亚大学": {
    "admissions": {
      "acceptanceRate": "5.7%",
      "avgSAT": "1500-1560",
      "avgACT": "33-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "沃顿商学院",
        "englishName": "Wharton School",
        "description": "沃顿商学院是世界最顶尖的商学院之一，在金融、会计和创业方面排名全美第一。",
        "popularMajors": ["金融学", "会计学", "市场营销", "创业", "管理学"]
      },
      {
        "name": "文理学院",
        "englishName": "School of Arts and Sciences",
        "description": "宾夕法尼亚大学文理学院涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["经济学", "心理学", "生物学", "英语", "历史学"]
      },
      {
        "name": "工程与应用科学学院",
        "englishName": "School of Engineering and Applied Science",
        "description": "宾夕法尼亚大学工程学院在计算机科学和生物工程方面表现优秀。",
        "popularMajors": ["计算机科学", "电气工程", "生物工程", "机械工程", "材料科学"]
      },
      {
        "name": "法学院",
        "englishName": "Carey Law School",
        "description": "宾夕法尼亚大学法学院在国际法和商法方面排名全美前10。",
        "popularMajors": ["国际法", "商法", "公司法", "知识产权法", "宪法"]
      }
    ]
  },
  "加州理工学院": {
    "admissions": {
      "acceptanceRate": "6.4%",
      "avgSAT": "1530-1580",
      "avgACT": "35-36",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "15%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "工程与应用科学学院",
        "englishName": "Division of Engineering and Applied Science",
        "description": "加州理工学院工程学院在航空航天、计算机科学和电子工程等领域处于世界领先地位。",
        "popularMajors": ["航空航天工程", "计算机科学", "电子工程", "机械工程", "化学工程"]
      },
      {
        "name": "物理科学学院",
        "englishName": "Division of Physical Sciences",
        "description": "加州理工学院物理科学学院在物理学、化学和天文学方面处于世界领先地位。",
        "popularMajors": ["物理学", "化学", "天文学", "数学", "计算机科学"]
      },
      {
        "name": "生物与生物工程学院",
        "englishName": "Division of Biology and Biological Engineering",
        "description": "加州理工学院生物学院在分子生物学和神经科学方面处于世界前沿。",
        "popularMajors": ["生物学", "生物化学", "神经科学", "生物工程", "遗传学"]
      }
    ]
  },
  "杜克大学": {
    "admissions": {
      "acceptanceRate": "6.3%",
      "avgSAT": "1480-1570",
      "avgACT": "33-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "三一学院",
        "englishName": "Trinity College of Arts and Sciences",
        "description": "杜克大学三一学院是该校最大的学院，涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["经济学", "心理学", "生物学", "公共政策", "计算机科学"]
      },
      {
        "name": "工程学院",
        "englishName": "School of Engineering",
        "description": "杜克大学工程学院在生物医学工程和环境工程方面处于领先地位。",
        "popularMajors": ["生物医学工程", "环境工程", "计算机科学", "电气工程", "机械工程"]
      },
      {
        "name": "福库商学院",
        "englishName": "Fuqua School of Business",
        "description": "杜克大学福库商学院在管理教育方面排名全美前10。",
        "popularMajors": ["管理学", "金融学", "市场营销", "创业", "战略管理"]
      },
      {
        "name": "法学院",
        "englishName": "School of Law",
        "description": "杜克大学法学院排名全美前10，在国际法和知识产权法方面表现优秀。",
        "popularMajors": ["国际法", "知识产权法", "公司法", "宪法", "环境法"]
      }
    ]
  },
  "约翰霍普金斯大学": {
    "admissions": {
      "acceptanceRate": "6.4%",
      "avgSAT": "1500-1560",
      "avgACT": "33-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "克里格艺术与科学学院",
        "englishName": "Krieger School of Arts and Sciences",
        "description": "约翰霍普金斯大学克里格学院涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["生物学", "心理学", "经济学", "政治学", "历史学"]
      },
      {
        "name": "怀廷工程学院",
        "englishName": "Whiting School of Engineering",
        "description": "约翰霍普金斯大学怀廷工程学院在生物医学工程方面排名全美第一。",
        "popularMajors": ["生物医学工程", "计算机科学", "电气工程", "机械工程", "化学工程"]
      },
      {
        "name": "医学院",
        "englishName": "School of Medicine",
        "description": "约翰霍普金斯大学医学院排名全美第一，在医学研究方面处于世界领先地位。",
        "popularMajors": ["医学", "生物医学研究", "公共卫生", "神经科学", "遗传学"]
      },
      {
        "name": "布隆伯格公共卫生学院",
        "englishName": "Bloomberg School of Public Health",
        "description": "约翰霍普金斯大学布隆伯格公共卫生学院排名全美第一。",
        "popularMajors": ["公共卫生", "流行病学", "生物统计学", "健康政策", "环境健康"]
      }
    ]
  },
  "达特茅斯学院": {
    "admissions": {
      "acceptanceRate": "6.2%",
      "avgSAT": "1470-1560",
      "avgACT": "32-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "11%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "文理学院",
        "englishName": "Faculty of Arts and Sciences",
        "description": "达特茅斯学院文理学院提供广泛的文理学科教育，注重本科教育质量。",
        "popularMajors": ["经济学", "心理学", "计算机科学", "政府学", "历史学"]
      },
      {
        "name": "工程学院",
        "englishName": "Thayer School of Engineering",
        "description": "达特茅斯学院工程学院在工程设计和创新方面表现优秀。",
        "popularMajors": ["工程科学", "计算机科学", "生物医学工程", "电气工程", "机械工程"]
      },
      {
        "name": "塔克商学院",
        "englishName": "Tuck School of Business",
        "description": "达特茅斯学院塔克商学院是世界顶尖的商学院之一，提供全时间MBA课程。",
        "popularMajors": ["管理学", "金融学", "市场营销", "创业", "战略管理"]
      }
    ]
  },
  "西北大学": {
    "admissions": {
      "acceptanceRate": "7.1%",
      "avgSAT": "1490-1560",
      "avgACT": "33-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "文理学院",
        "englishName": "Weinberg College of Arts and Sciences",
        "description": "西北大学文理学院涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["经济学", "心理学", "计算机科学", "政治学", "英语"]
      },
      {
        "name": "凯洛格商学院",
        "englishName": "Kellogg School of Management",
        "description": "西北大学凯洛格商学院在管理学方面排名全美前三。",
        "popularMajors": ["管理学", "市场营销", "金融学", "创业", "战略管理"]
      },
      {
        "name": "梅迪尔新闻学院",
        "englishName": "Medill School of Journalism",
        "description": "西北大学梅迪尔新闻学院排名全美第一，在新闻传播教育方面处于领先地位。",
        "popularMajors": ["新闻学", "媒体管理", "公共关系", "广告学", "数字媒体"]
      },
      {
        "name": "工程与应用科学学院",
        "englishName": "McCormick School of Engineering and Applied Science",
        "description": "西北大学工程学院在计算机科学和材料科学方面表现优秀。",
        "popularMajors": ["计算机科学", "材料科学", "电气工程", "机械工程", "生物医学工程"]
      }
    ]
  },
  "圣母大学": {
    "admissions": {
      "acceptanceRate": "13.4%",
      "avgSAT": "1400-1550",
      "avgACT": "32-35",
      "avgGPA": "3.8-4.0",
      "internationalStudents": "6%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "文理学院",
        "englishName": "College of Arts and Letters",
        "description": "圣母大学文理学院涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["政治学", "心理学", "经济学", "英语", "历史学"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "圣母大学工程学院在航空航天和土木工程方面排名全美前20。",
        "popularMajors": ["航空航天工程", "土木工程", "电气工程", "机械工程", "计算机科学"]
      },
      {
        "name": "门多萨商学院",
        "englishName": "Mendoza College of Business",
        "description": "圣母大学门多萨商学院在管理学和创业方面排名全美前20。",
        "popularMajors": ["管理学", "金融学", "会计学", "市场营销", "创业"]
      },
      {
        "name": "建筑学院",
        "englishName": "School of Architecture",
        "description": "圣母大学建筑学院在建筑设计方面享有盛誉。",
        "popularMajors": ["建筑学", "景观建筑", "城市设计", "建筑历史", "可持续设计"]
      }
    ]
  },
  "乔治城大学": {
    "admissions": {
      "acceptanceRate": "12.1%",
      "avgSAT": "1380-1530",
      "avgACT": "31-34",
      "avgGPA": "3.8-4.0",
      "internationalStudents": "14%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "沃尔什外交学院",
        "englishName": "Walsh School of Foreign Service",
        "description": "乔治城大学沃尔什外交学院在国际关系方面排名全美第一。",
        "popularMajors": ["国际事务", "国际关系", "国际经济", "国家安全", "全球健康"]
      },
      {
        "name": "麦克多诺商学院",
        "englishName": "McDonough School of Business",
        "description": "乔治城大学麦克多诺商学院在国际商务方面排名全美前10。",
        "popularMajors": ["国际商务", "金融学", "管理学", "市场营销", "会计"]
      },
      {
        "name": "法学院",
        "englishName": "Law Center",
        "description": "乔治城大学法学院排名全美前15，在国际法方面领先。",
        "popularMajors": ["国际法", "知识产权法", "商法", "宪法", "公共利益法"]
      },
      {
        "name": "文理学院",
        "englishName": "College of Arts and Sciences",
        "description": "乔治城大学文理学院涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["经济学", "心理学", "英语", "历史学", "生物学"]
      }
    ]
  },
  "弗吉尼亚大学": {
    "admissions": {
      "acceptanceRate": "16.3%",
      "avgSAT": "1380-1520",
      "avgACT": "31-34",
      "avgGPA": "3.8-4.0",
      "internationalStudents": "8%",
      "toefl": "90"
    },
    "programs": [
      {
        "name": "文理学院",
        "englishName": "College of Arts and Sciences",
        "description": "弗吉尼亚大学文理学院是该校最大的学院，涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["经济学", "心理学", "英语", "历史学", "生物学"]
      },
      {
        "name": "达顿商学院",
        "englishName": "Darden School of Business",
        "description": "弗吉尼亚大学达顿商学院在MBA教育方面排名全美前10。",
        "popularMajors": ["管理学", "金融学", "市场营销", "战略管理", "创业"]
      },
      {
        "name": "法学院",
        "englishName": "School of Law",
        "description": "弗吉尼亚大学法学院排名全美前10，在宪法和国际法方面领先。",
        "popularMajors": ["宪法", "国际法", "公司法", "知识产权法", "税法"]
      },
      {
        "name": "工程与应用科学学院",
        "englishName": "School of Engineering and Applied Science",
        "description": "弗吉尼亚大学工程学院在计算机科学和电气工程方面排名全美前30。",
        "popularMajors": ["计算机科学", "电气工程", "机械工程", "土木工程", "材料科学"]
      }
    ]
  },
  "佛罗里达大学": {
    "admissions": {
      "acceptanceRate": "31.1%",
      "avgSAT": "1280-1460",
      "avgACT": "29-33",
      "avgGPA": "3.7-4.0",
      "internationalStudents": "6%",
      "toefl": "80"
    },
    "programs": [
      {
        "name": "文理学院",
        "englishName": "College of Liberal Arts and Sciences",
        "description": "佛罗里达大学文理学院涵盖人文、社会科学和自然科学等多个领域。",
        "popularMajors": ["心理学", "生物学", "经济学", "英语", "政治学"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "佛罗里达大学工程学院在计算机科学和电气工程方面排名全美前30。",
        "popularMajors": ["计算机科学", "电气工程", "机械工程", "土木工程", "化学工程"]
      },
      {
        "name": "沃灵顿商学院",
        "englishName": "Warrington College of Business",
        "description": "佛罗里达大学沃灵顿商学院在金融和市场营销方面排名全美前30。",
        "popularMajors": ["金融学", "市场营销", "会计学", "管理学", "创业"]
      },
      {
        "name": "农业与生命科学学院",
        "englishName": "College of Agricultural and Life Sciences",
        "description": "佛罗里达大学农业与生命科学学院排名全美前五。",
        "popularMajors": ["农业科学", "食品科学", "环境科学", "动物科学", "营养学"]
      }
    ]
  },
  "宾夕法尼亚州立大学": {
    "admissions": {
      "acceptanceRate": "50.6%",
      "avgSAT": "1230-1420",
      "avgACT": "26-31",
      "avgGPA": "3.6-4.0",
      "internationalStudents": "10%",
      "toefl": "80"
    },
    "programs": [
      {
        "name": "工程学院",
        "englishName": "Penn State College of Engineering",
        "description": "宾夕法尼亚州立大学工程学院是美国顶尖的工程学院之一，在石油工程、材料工程和机械工程等领域处于领先地位。",
        "popularMajors": ["石油工程", "材料工程", "机械工程", "电气工程", "计算机科学"]
      },
      {
        "name": "斯米尔商学院",
        "englishName": "Smeal College of Business",
        "description": "宾夕法尼亚州立大学斯米尔商学院在供应链管理、市场营销和会计等领域享有盛誉，是美国顶尖的商学院之一。",
        "popularMajors": ["供应链管理", "市场营销", "会计", "金融", "工商管理"]
      },
      {
        "name": "地球与矿物科学学院",
        "englishName": "College of Earth and Mineral Sciences",
        "description": "宾夕法尼亚州立大学地球与矿物科学学院在气象学、地质学和地球物理学等领域处于领先地位。",
        "popularMajors": ["气象学", "地质学", "地球物理学", "环境科学", "地理学"]
      },
      {
        "name": "文学院",
        "englishName": "College of the Liberal Arts",
        "description": "宾夕法尼亚州立大学文学院涵盖人文、社会科学等多个领域，是该校最大的学院之一。",
        "popularMajors": ["经济学", "心理学", "政治学", "社会学", "历史学"]
      },
      {
        "name": "农业科学学院",
        "englishName": "College of Agricultural Sciences",
        "description": "宾夕法尼亚州立大学农业科学学院在农业科学、环境科学和食品科学等领域处于领先地位。",
        "popularMajors": ["农业科学", "环境科学", "食品科学", "动物科学", "园艺学"]
      }
    ]
  },
  "纽约州立大学石溪分校": {
    "admissions": {
      "acceptanceRate": "42.7%",
      "avgSAT": "1290-1490",
      "avgACT": "28-33",
      "avgGPA": "3.7-4.0",
      "internationalStudents": "18%",
      "toefl": "85"
    },
    "programs": [
      {
        "name": "医学院",
        "englishName": "Renaissance School of Medicine",
        "description": "石溪分校医学院在医学教育和研究方面表现突出，附属医院是长岛最大的医疗机构。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "公共卫生"]
      },
      {
        "name": "工程与应用科学学院",
        "englishName": "College of Engineering and Applied Sciences",
        "description": "石溪分校工程学院在计算机科学、电气工程和材料科学等领域处于领先地位。",
        "popularMajors": ["计算机科学", "电气工程", "应用数学", "材料科学", "机械工程"]
      },
      {
        "name": "艺术与科学学院",
        "englishName": "College of Arts and Sciences",
        "description": "石溪分校艺术与科学学院涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["心理学", "生物学", "化学", "物理学", "数学"]
      },
      {
        "name": "海洋科学与政策学院",
        "englishName": "School of Marine and Atmospheric Sciences",
        "description": "石溪分校海洋科学与政策学院在海洋生物学和环境科学方面表现优秀。",
        "popularMajors": ["海洋生物学", "海洋学", "环境科学", "大气科学", "气候变化"]
      }
    ]
  },
  "明尼苏达大学双城分校": {
    "admissions": {
      "acceptanceRate": "44.8%",
      "avgSAT": "1330-1530",
      "avgACT": "28-33",
      "avgGPA": "3.7-4.0",
      "internationalStudents": "12%",
      "toefl": "80"
    },
    "programs": [
      {
        "name": "卡尔森商学院",
        "englishName": "Carlson School of Management",
        "description": "明尼苏达大学卡尔森商学院在管理学、创业和金融等领域享有盛誉，是美国顶尖的商学院之一。",
        "popularMajors": ["管理学", "创业", "金融", "市场营销", "会计"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Science and Engineering",
        "description": "明尼苏达大学工程学院在化学工程、材料工程和机械工程等领域处于领先地位。",
        "popularMajors": ["化学工程", "材料工程", "机械工程", "电气工程", "计算机科学"]
      },
      {
        "name": "文学院",
        "englishName": "College of Liberal Arts",
        "description": "明尼苏达大学文学院涵盖人文、社会科学等多个领域，是该校最大的学院之一。",
        "popularMajors": ["经济学", "心理学", "政治学", "社会学", "英语"]
      },
      {
        "name": "食品、农业与自然资源学院",
        "englishName": "College of Food, Agricultural and Natural Resource Sciences",
        "description": "明尼苏达大学食品、农业与自然资源学院在农业科学和环境科学方面表现优秀。",
        "popularMajors": ["农业科学", "食品科学", "环境科学", "动物科学", "营养学"]
      },
      {
        "name": "公共卫生学院",
        "englishName": "School of Public Health",
        "description": "明尼苏达大学公共卫生学院在流行病学、生物统计学和健康政策方面处于领先地位。",
        "popularMajors": ["公共卫生", "流行病学", "生物统计学", "健康政策", "环境健康"]
      }
    ]
  },
  "密歇根州立大学": {
    "admissions": {
      "acceptanceRate": "60.4%",
      "avgSAT": "1210-1420",
      "avgACT": "25-30",
      "avgGPA": "3.6-4.0",
      "internationalStudents": "15%",
      "toefl": "79"
    },
    "programs": [
      {
        "name": "商学院",
        "englishName": "Eli Broad College of Business",
        "description": "密歇根州立大学商学院在供应链管理（全美第一）、会计和营销等领域享有盛誉，是美国顶尖的商学院之一。",
        "popularMajors": ["供应链管理", "会计", "市场营销", "金融", "工商管理"]
      },
      {
        "name": "教育学院",
        "englishName": "College of Education",
        "description": "密歇根州立大学教育学院在教育政策、课程与教学等领域享有盛誉，是美国顶尖的教育学院之一。",
        "popularMajors": ["教育学", "教育政策", "课程与教学", "教育心理学", "特殊教育"]
      },
      {
        "name": "传播学院",
        "englishName": "College of Communication Arts and Sciences",
        "description": "密歇根州立大学传播学院在广告、公共关系和传播学等领域处于领先地位。",
        "popularMajors": ["广告学", "公共关系", "传播学", "媒体与信息研究", "广播电视"]
      },
      {
        "name": "农业与自然资源学院",
        "englishName": "College of Agriculture and Natural Resources",
        "description": "密歇根州立大学农业与自然资源学院在农业科学、动物科学和环境科学方面表现优秀。",
        "popularMajors": ["农业科学", "动物科学", "环境科学", "食品科学", "园艺学"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "密歇根州立大学工程学院在生物医学工程、材料工程和计算机科学等领域处于领先地位。",
        "popularMajors": ["生物医学工程", "材料工程", "计算机科学", "电气工程", "机械工程"]
      }
    ]
  },
  "匹兹堡大学": {
    "admissions": {
      "acceptanceRate": "49.9%",
      "avgSAT": "1310-1500",
      "avgACT": "29-33",
      "avgGPA": "3.7-4.0",
      "internationalStudents": "10%",
      "toefl": "90"
    },
    "programs": [
      {
        "name": "医学院",
        "englishName": "School of Medicine",
        "description": "匹兹堡大学医学院排名全美前20，UPMC医疗中心是全美最顶尖的医疗机构之一。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "药理学"]
      },
      {
        "name": "护理学院",
        "englishName": "School of Nursing",
        "description": "匹兹堡大学护理学院排名全美前10，在护理教育和临床实践方面表现优秀。",
        "popularMajors": ["护理学", "护理管理", "儿科护理", "精神健康护理", "公共卫生护理"]
      },
      {
        "name": "斯旺森工程学院",
        "englishName": "Swanson School of Engineering",
        "description": "匹兹堡大学斯旺森工程学院在生物医学工程、材料工程和机械工程等领域处于领先地位。",
        "popularMajors": ["生物医学工程", "材料工程", "机械工程", "电气工程", "计算机工程"]
      },
      {
        "name": "艺术与科学学院",
        "englishName": "Kenneth P. Dietrich School of Arts and Sciences",
        "description": "匹兹堡大学艺术与科学学院涵盖人文、社会科学和自然科学等广泛领域，拥有全美顶尖的哲学系。",
        "popularMajors": ["哲学", "心理学", "生物学", "化学", "物理学"]
      },
      {
        "name": "健康与康复学院",
        "englishName": "School of Health and Rehabilitation Sciences",
        "description": "匹兹堡大学健康与康复学院在物理治疗、职业治疗和运动医学等领域处于领先地位。",
        "popularMajors": ["物理治疗", "职业治疗", "运动医学", "康复科学", "语言病理学"]
      }
    ]
  },
  "范德堡大学": {
    "admissions": {
      "acceptanceRate": "10.5%",
      "avgSAT": "1430-1540",
      "avgACT": "32-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "教育与人类发展学院",
        "englishName": "Peabody College of Education and Human Development",
        "description": "范德堡大学教育与人类发展学院是美国顶尖的教育学院之一，在教育政策、儿童发展和特殊教育等领域享有盛誉。",
        "popularMajors": ["教育学", "特殊教育", "儿童发展", "教育政策", "人类发展"]
      },
      {
        "name": "医学院",
        "englishName": "School of Medicine",
        "description": "范德堡大学医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面处于领先地位。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "免疫学"]
      },
      {
        "name": "法学院",
        "englishName": "Law School",
        "description": "范德堡大学法学院在国际法、商业法和宪法学等领域拥有强大的师资力量。",
        "popularMajors": ["法律", "国际法", "商业法", "宪法学", "环境法"]
      },
      {
        "name": "欧文管理学院",
        "englishName": "Owen Graduate School of Management",
        "description": "欧文管理学院以其紧凑的班级规模和个性化的教学方式而闻名。",
        "popularMajors": ["工商管理", "金融", "市场营销", "管理", "战略管理"]
      },
      {
        "name": "工程学院",
        "englishName": "School of Engineering",
        "description": "范德堡大学工程学院在生物医学工程、计算机科学和电气与计算机工程等领域表现出色。",
        "popularMajors": ["生物医学工程", "计算机科学", "电气与计算机工程", "机械工程", "化学工程"]
      },
      {
        "name": "艺术与科学学院",
        "englishName": "College of Arts and Science",
        "description": "范德堡大学艺术与科学学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["经济学", "心理学", "生物学", "化学", "政治学"]
      },
      {
        "name": "音乐学院",
        "englishName": "Blair School of Music",
        "description": "范德堡大学布莱尔音乐学院是美国顶尖的音乐学院之一，在古典音乐表演和音乐教育方面处于领先地位。",
        "popularMajors": ["音乐表演", "音乐教育", "音乐理论", "作曲", "爵士乐研究"]
      },
      {
        "name": "护理学院",
        "englishName": "School of Nursing",
        "description": "范德堡大学护理学院在护理教育和研究方面处于领先地位，培养了大量优秀的护理专业人才。",
        "popularMajors": ["护理学", "护理管理", "儿科护理", "老年护理", "精神健康护理"]
      },
      {
        "name": "神学院",
        "englishName": "Divinity School",
        "description": "范德堡大学神学院在神学教育和研究方面享有盛誉，培养了大量宗教领袖和学者。",
        "popularMajors": ["神学", "宗教研究", "基督教研究", "宗教与社会", "教会历史"]
      }
    ]
  },
  "密歇根大学安娜堡分校": {
    "admissions": {
      "acceptanceRate": "16.2%",
      "avgSAT": "1430-1540",
      "avgACT": "32-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "15%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "罗斯商学院",
        "englishName": "Stephen M. Ross School of Business",
        "description": "密歇根大学罗斯商学院是美国顶尖的商学院之一，在金融、营销和运营管理等领域享有盛誉。",
        "popularMajors": ["工商管理", "金融", "市场营销", "运营管理", "会计"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "密歇根大学工程学院是美国顶尖的工程学院之一，在航空航天工程、机械工程和计算机科学等领域处于领先地位。",
        "popularMajors": ["航空航天工程", "机械工程", "计算机科学", "电气与计算机工程", "土木工程"]
      },
      {
        "name": "法学院",
        "englishName": "Law School",
        "description": "密歇根大学法学院是美国最古老的法学院之一，在宪法学、商法和国际法等领域拥有强大的师资力量。",
        "popularMajors": ["法律", "宪法学", "商法", "国际法", "环境法"]
      },
      {
        "name": "医学院",
        "englishName": "Medical School",
        "description": "密歇根大学医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面表现出色。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "药理学", "公共卫生"]
      },
      {
        "name": "教育学院",
        "englishName": "School of Education",
        "description": "密歇根大学教育学院在教育政策、课程与教学和教育心理学等领域享有盛誉。",
        "popularMajors": ["教育学", "教育政策", "课程与教学", "教育心理学", "高等教育"]
      },
      {
        "name": "文学、科学与艺术学院",
        "englishName": "College of Literature, Science, and the Arts",
        "description": "密歇根大学文学、科学与艺术学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["经济学", "心理学", "生物学", "政治学", "计算机科学"]
      },
      {
        "name": "牙医学院",
        "englishName": "School of Dentistry",
        "description": "密歇根大学牙医学院是美国顶尖的牙医学院之一，在口腔医学和牙科研究方面处于领先地位。",
        "popularMajors": ["牙医学", "口腔生物学", "牙科公共卫生", "牙周病学", "正畸学"]
      },
      {
        "name": "公共卫生学院",
        "englishName": "School of Public Health",
        "description": "密歇根大学公共卫生学院在流行病学、生物统计学和环境健康科学等领域享有盛誉。",
        "popularMajors": ["公共卫生", "流行病学", "生物统计学", "环境健康科学", "健康政策"]
      }
    ]
  },
  "北卡罗来纳大学教堂山分校": {
    "admissions": {
      "acceptanceRate": "19.2%",
      "avgSAT": "1400-1520",
      "avgACT": "31-34",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "10%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "凯南-弗拉格勒商学院",
        "englishName": "Kenan-Flagler Business School",
        "description": "北卡罗来纳大学凯南-弗拉格勒商学院是美国顶尖的商学院之一，在供应链管理、金融和营销等领域处于领先地位。",
        "popularMajors": ["工商管理", "供应链管理", "金融", "市场营销", "会计"]
      },
      {
        "name": "医学院",
        "englishName": "School of Medicine",
        "description": "北卡罗来纳大学医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面表现出色。",
        "popularMajors": ["医学", "生物医学工程", "遗传学", "神经科学", "免疫学"]
      },
      {
        "name": "法学院",
        "englishName": "School of Law",
        "description": "北卡罗来纳大学法学院在知识产权法、环境法和公共利益法等领域享有盛誉。",
        "popularMajors": ["法律", "知识产权法", "环境法", "公共利益法", "商法"]
      },
      {
        "name": "教育学院",
        "englishName": "School of Education",
        "description": "北卡罗来纳大学教育学院在教育政策、课程与教学和教育心理学等领域处于领先地位。",
        "popularMajors": ["教育学", "教育政策", "课程与教学", "教育心理学", "特殊教育"]
      },
      {
        "name": "信息与图书馆科学学院",
        "englishName": "School of Information and Library Science",
        "description": "北卡罗来纳大学信息与图书馆科学学院是美国顶尖的信息学院之一，在图书馆学、信息科学和数据科学等领域享有盛誉。",
        "popularMajors": ["图书馆学", "信息科学", "数据科学", "信息管理", "人机交互"]
      },
      {
        "name": "文理学院",
        "englishName": "College of Arts and Sciences",
        "description": "北卡罗来纳大学文理学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["生物学", "心理学", "经济学", "计算机科学", "政治学"]
      },
      {
        "name": "牙医学院",
        "englishName": "School of Dentistry",
        "description": "北卡罗来纳大学牙医学院是美国顶尖的牙医学院之一，在口腔医学和牙科研究方面处于领先地位。",
        "popularMajors": ["牙医学", "口腔生物学", "牙科公共卫生", "牙周病学", "口腔颌面外科"]
      },
      {
        "name": "公共卫生学院",
        "englishName": "Gillings School of Global Public Health",
        "description": "北卡罗来纳大学吉林斯全球公共卫生学院在公共卫生领域享有盛誉，尤其在流行病学和生物统计学方面处于领先地位。",
        "popularMajors": ["公共卫生", "流行病学", "生物统计学", "环境健康科学", "健康政策"]
      },
      {
        "name": "药学院",
        "englishName": "Eshelman School of Pharmacy",
        "description": "北卡罗来纳大学埃舍尔曼药学院是美国顶尖的药学院之一，在药学教育和研究方面处于领先地位。",
        "popularMajors": ["药学", "药物化学", "药理学", "药剂学", "药物流行病学"]
      }
    ]
  },
  "纽约大学": {
    "admissions": {
      "acceptanceRate": "12.2%",
      "avgSAT": "1450-1570",
      "avgACT": "32-35",
      "avgGPA": "3.8-4.0",
      "internationalStudents": "20%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "斯特恩商学院",
        "englishName": "Stern School of Business",
        "description": "纽约大学斯特恩商学院是美国顶尖的商学院之一，在金融、营销和创业等领域处于领先地位。",
        "popularMajors": ["工商管理", "金融", "市场营销", "创业", "会计学"]
      },
      {
        "name": "蒂施艺术学院",
        "englishName": "Tisch School of the Arts",
        "description": "纽约大学蒂施艺术学院是美国顶尖的艺术学院之一，在电影、戏剧和表演艺术等领域享有盛誉。",
        "popularMajors": ["电影制作", "戏剧表演", "舞蹈", "摄影", "游戏设计"]
      },
      {
        "name": "法学院",
        "englishName": "School of Law",
        "description": "纽约大学法学院是美国顶尖的法学院之一，在国际法、商法和宪法学等领域拥有强大的师资力量。",
        "popularMajors": ["法律", "国际法", "商法", "宪法学", "知识产权法"]
      },
      {
        "name": "医学院",
        "englishName": "Grossman School of Medicine",
        "description": "纽约大学格罗斯曼医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面表现出色。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "免疫学"]
      },
      {
        "name": "社会工作学院",
        "englishName": "Silver School of Social Work",
        "description": "纽约大学西尔弗社会工作学院是美国顶尖的社会工作学院之一，在社会政策、临床社会工作和社区发展等领域处于领先地位。",
        "popularMajors": ["社会工作", "社会政策", "临床社会工作", "社区发展", "儿童福利"]
      },
      {
        "name": "艺术与科学学院",
        "englishName": "College of Arts and Science",
        "description": "纽约大学艺术与科学学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["经济学", "心理学", "计算机科学", "生物学", "政治学"]
      },
      {
        "name": "库兰公共卫生学院",
        "englishName": "College of Global Public Health",
        "description": "纽约大学库兰公共卫生学院致力于全球公共卫生研究和教育，在传染病学和卫生政策方面处于领先地位。",
        "popularMajors": ["公共卫生", "流行病学", "全球卫生", "卫生政策", "环境健康"]
      },
      {
        "name": "工程学院",
        "englishName": "Tandon School of Engineering",
        "description": "纽约大学坦顿工程学院在工程领域享有盛誉，尤其在计算机科学和电气工程方面处于领先地位。",
        "popularMajors": ["计算机科学", "电气工程", "机械工程", "化学工程", "生物医学工程"]
      },
      {
        "name": "教育学院",
        "englishName": "Steinhardt School of Culture, Education, and Human Development",
        "description": "纽约大学斯坦哈特文化、教育与人类发展学院在教育、传媒和表演艺术教育方面处于领先地位。",
        "popularMajors": ["教育学", "传媒研究", "音乐教育", "艺术教育", "教育心理学"]
      },
      {
        "name": "职业研究学院",
        "englishName": "School of Professional Studies",
        "description": "纽约大学职业研究学院提供面向职业发展的教育项目，涵盖多个专业领域。",
        "popularMajors": ["酒店管理", "房地产", "体育管理", "人力资源管理", "市场营销管理"]
      }
    ]
  },
  "伊利诺伊大学香槟分校": {
    "admissions": {
      "acceptanceRate": "62.8%",
      "avgSAT": "1340-1520",
      "avgACT": "29-34",
      "avgGPA": "3.7-4.0",
      "internationalStudents": "19%",
      "toefl": "80"
    },
    "programs": [
      {
        "name": "工程学院",
        "englishName": "Grainger College of Engineering",
        "description": "伊利诺伊大学香槟分校工程学院是美国顶尖的工程学院之一，在计算机科学、电气与计算机工程和机械工程等领域处于领先地位。",
        "popularMajors": ["计算机科学", "电气与计算机工程", "机械工程", "土木工程", "化学工程"]
      },
      {
        "name": "商学院",
        "englishName": "Gies College of Business",
        "description": "伊利诺伊大学香槟分校吉斯商学院在会计、金融和供应链管理等领域享有盛誉。",
        "popularMajors": ["会计", "金融", "供应链管理", "市场营销", "工商管理"]
      },
      {
        "name": "信息科学学院",
        "englishName": "School of Information Sciences",
        "description": "伊利诺伊大学香槟分校信息科学学院是美国顶尖的信息学院之一，在图书馆学、信息科学和数据科学等领域处于领先地位。",
        "popularMajors": ["信息科学", "数据科学", "图书馆学", "人机交互", "信息管理"]
      },
      {
        "name": "教育学院",
        "englishName": "College of Education",
        "description": "伊利诺伊大学香槟分校教育学院在教育政策、课程与教学和教育心理学等领域享有盛誉。",
        "popularMajors": ["教育学", "教育政策", "课程与教学", "教育心理学", "特殊教育"]
      },
      {
        "name": "农业、消费者与环境科学学院",
        "englishName": "College of Agricultural, Consumer and Environmental Sciences",
        "description": "伊利诺伊大学香槟分校农业、消费者与环境科学学院在农业科学、环境科学和食品科学等领域处于领先地位。",
        "popularMajors": ["农业科学", "环境科学", "食品科学", "动物科学", "植物科学"]
      },
      {
        "name": "文理学院",
        "englishName": "College of Liberal Arts and Sciences",
        "description": "伊利诺伊大学香槟分校文理学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["心理学", "经济学", "生物学", "化学", "政治学"]
      },
      {
        "name": "传媒学院",
        "englishName": "College of Media",
        "description": "伊利诺伊大学香槟分校传媒学院在新闻、广告和传媒研究等领域处于领先地位。",
        "popularMajors": ["新闻学", "广告学", "传媒研究", "媒体管理", "公共关系"]
      },
      {
        "name": "法学院",
        "englishName": "College of Law",
        "description": "伊利诺伊大学香槟分校法学院在知识产权法、商法和宪法学等领域享有盛誉。",
        "popularMajors": ["法律", "知识产权法", "商法", "宪法学", "环境法"]
      },
      {
        "name": "兽医学院",
        "englishName": "College of Veterinary Medicine",
        "description": "伊利诺伊大学香槟分校兽医学院在兽医学和动物科学研究方面处于领先地位。",
        "popularMajors": ["兽医学", "动物科学", "兽医病理学", "兽医公共卫生", "小动物医学"]
      },
      {
        "name": "社会工作学院",
        "englishName": "School of Social Work",
        "description": "伊利诺伊大学香槟分校社会工作学院在社会工作教育和研究方面处于领先地位。",
        "popularMajors": ["社会工作", "社会政策", "临床社会工作", "社区发展", "儿童福利"]
      }
    ]
  },
  "威斯康星大学麦迪逊分校": {
    "admissions": {
      "acceptanceRate": "54.5%",
      "avgSAT": "1370-1530",
      "avgACT": "30-34",
      "avgGPA": "3.8-4.0",
      "internationalStudents": "11%",
      "toefl": "87"
    },
    "programs": [
      {
        "name": "商学院",
        "englishName": "Wisconsin School of Business",
        "description": "威斯康星大学麦迪逊分校商学院在会计、金融和供应链管理等领域享有盛誉。",
        "popularMajors": ["会计", "金融", "供应链管理", "市场营销", "工商管理"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "威斯康星大学麦迪逊分校工程学院在生物医学工程、计算机科学和电气与计算机工程等领域处于领先地位。",
        "popularMajors": ["生物医学工程", "计算机科学", "电气与计算机工程", "机械工程", "化学工程"]
      },
      {
        "name": "教育学院",
        "englishName": "School of Education",
        "description": "威斯康星大学麦迪逊分校教育学院在教育政策、课程与教学和教育心理学等领域享有盛誉。",
        "popularMajors": ["教育学", "教育政策", "课程与教学", "教育心理学", "特殊教育"]
      },
      {
        "name": "法学院",
        "englishName": "Law School",
        "description": "威斯康星大学麦迪逊分校法学院在宪法学、商法和环境法等领域拥有强大的师资力量。",
        "popularMajors": ["法律", "宪法学", "商法", "环境法", "知识产权法"]
      },
      {
        "name": "农业与生命科学学院",
        "englishName": "College of Agricultural and Life Sciences",
        "description": "威斯康星大学麦迪逊分校农业与生命科学学院在农业科学、生命科学和环境科学等领域处于领先地位。",
        "popularMajors": ["农业科学", "生命科学", "环境科学", "动物科学", "植物科学"]
      },
      {
        "name": "文理学院",
        "englishName": "College of Letters & Science",
        "description": "威斯康星大学麦迪逊分校文理学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["心理学", "经济学", "生物学", "化学", "政治学"]
      },
      {
        "name": "公共卫生学院",
        "englishName": "School of Medicine and Public Health",
        "description": "威斯康星大学麦迪逊分校医学院和公共卫生学院在医学和公共卫生研究方面处于领先地位。",
        "popularMajors": ["医学", "公共卫生", "流行病学", "生物统计学", "医学遗传学"]
      },
      {
        "name": "药学院",
        "englishName": "School of Pharmacy",
        "description": "威斯康星大学麦迪逊分校药学院在药学教育和研究方面处于领先地位。",
        "popularMajors": ["药学", "药物化学", "药理学", "药剂学", "药物经济学"]
      },
      {
        "name": "兽医学院",
        "englishName": "School of Veterinary Medicine",
        "description": "威斯康星大学麦迪逊分校兽医学院在兽医学和动物科学研究方面处于领先地位。",
        "popularMajors": ["兽医学", "动物科学", "兽医病理学", "兽医公共卫生", "小动物医学"]
      },
      {
        "name": "信息学院",
        "englishName": "School of Information Studies",
        "description": "威斯康星大学麦迪逊分校信息学院在信息科学、图书馆学和数据科学等领域处于领先地位。",
        "popularMajors": ["信息科学", "图书馆学", "数据科学", "信息管理", "人机交互"]
      }
    ]
  },
  "俄亥俄州立大学": {
    "admissions": {
      "acceptanceRate": "48.4%",
      "avgSAT": "1320-1470",
      "avgACT": "29-33",
      "avgGPA": "3.7-4.0",
      "internationalStudents": "12%",
      "toefl": "80"
    },
    "programs": [
      {
        "name": "费舍尔商学院",
        "englishName": "Fisher College of Business",
        "description": "俄亥俄州立大学费舍尔商学院在会计、金融和供应链管理等领域享有盛誉。",
        "popularMajors": ["会计", "金融", "供应链管理", "市场营销", "工商管理"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "俄亥俄州立大学工程学院在航空航天工程、机械工程和电气与计算机工程等领域处于领先地位。",
        "popularMajors": ["航空航天工程", "机械工程", "电气与计算机工程", "土木工程", "计算机科学"]
      },
      {
        "name": "医学院",
        "englishName": "College of Medicine",
        "description": "俄亥俄州立大学医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面表现出色。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "免疫学"]
      },
      {
        "name": "教育与人类生态学院",
        "englishName": "College of Education and Human Ecology",
        "description": "俄亥俄州立大学教育与人类生态学院在教育政策、课程与教学和人类发展等领域处于领先地位。",
        "popularMajors": ["教育学", "教育政策", "课程与教学", "人类发展", "家庭科学"]
      },
      {
        "name": "食品、农业与环境科学学院",
        "englishName": "College of Food, Agricultural and Environmental Sciences",
        "description": "俄亥俄州立大学食品、农业与环境科学学院在农业科学、环境科学和食品科学等领域享有盛誉。",
        "popularMajors": ["农业科学", "环境科学", "食品科学", "动物科学", "植物科学"]
      },
      {
        "name": "文理学院",
        "englishName": "College of Arts and Sciences",
        "description": "俄亥俄州立大学文理学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["心理学", "经济学", "生物学", "化学", "政治学"]
      },
      {
        "name": "法学院",
        "englishName": "Michael E. Moritz College of Law",
        "description": "俄亥俄州立大学莫里茨法学院在商法、知识产权法和宪法学等领域享有盛誉。",
        "popularMajors": ["法律", "商法", "知识产权法", "宪法学", "环境法"]
      },
      {
        "name": "药学院",
        "englishName": "College of Pharmacy",
        "description": "俄亥俄州立大学药学院在药学教育和研究方面处于领先地位。",
        "popularMajors": ["药学", "药物化学", "药理学", "药剂学", "药物经济学"]
      },
      {
        "name": "公共卫生学院",
        "englishName": "College of Public Health",
        "description": "俄亥俄州立大学公共卫生学院在公共卫生研究和教育方面处于领先地位。",
        "popularMajors": ["公共卫生", "流行病学", "生物统计学", "环境健康", "卫生政策"]
      },
      {
        "name": "兽医学院",
        "englishName": "College of Veterinary Medicine",
        "description": "俄亥俄州立大学兽医学院在兽医学和动物科学研究方面处于领先地位。",
        "popularMajors": ["兽医学", "动物科学", "兽医病理学", "兽医公共卫生", "小动物医学"]
      },
      {
        "name": "艺术学院",
        "englishName": "College of Arts and Sciences - Arts",
        "description": "俄亥俄州立大学艺术学院在视觉艺术、表演艺术和设计等领域处于领先地位。",
        "popularMajors": ["视觉艺术", "戏剧表演", "音乐", "舞蹈", "设计"]
      }
    ]
  },
  "波士顿大学": {
    "admissions": {
      "acceptanceRate": "20.1%",
      "avgSAT": "1420-1540",
      "avgACT": "32-35",
      "avgGPA": "3.8-4.0",
      "internationalStudents": "22%",
      "toefl": "80"
    },
    "programs": [
      {
        "name": "奎斯特罗姆商学院",
        "englishName": "Questrom School of Business",
        "description": "波士顿大学奎斯特罗姆商学院在金融、营销和创业等领域享有盛誉。",
        "popularMajors": ["金融", "市场营销", "创业", "工商管理", "会计"]
      },
      {
        "name": "传播学院",
        "englishName": "College of Communication",
        "description": "波士顿大学传播学院是美国顶尖的传播学院之一，在新闻学、大众传播和广告学等领域处于领先地位。",
        "popularMajors": ["新闻学", "大众传播", "广告学", "电影制作", "公共关系"]
      },
      {
        "name": "法学院",
        "englishName": "School of Law",
        "description": "波士顿大学法学院在国际法、商法和知识产权法等领域拥有强大的师资力量。",
        "popularMajors": ["法律", "国际法", "商法", "知识产权法", "宪法学"]
      },
      {
        "name": "医学院",
        "englishName": "School of Medicine",
        "description": "波士顿大学医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面表现出色。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "免疫学"]
      },
      {
        "name": "艺术与科学学院",
        "englishName": "College of Arts and Sciences",
        "description": "波士顿大学艺术与科学学院在人文、社会科学和自然科学等领域享有盛誉，拥有强大的师资力量和丰富的研究资源。",
        "popularMajors": ["心理学", "经济学", "生物学", "化学", "政治学"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "波士顿大学工程学院在生物医学工程、计算机科学和电气与计算机工程等领域处于领先地位。",
        "popularMajors": ["生物医学工程", "计算机科学", "电气与计算机工程", "机械工程", "化学工程"]
      },
      {
        "name": "教育学院",
        "englishName": "Wheelock College of Education & Human Development",
        "description": "波士顿大学威洛克教育与人类发展学院在教育政策、儿童发展和特殊教育等领域处于领先地位。",
        "popularMajors": ["教育学", "教育政策", "儿童发展", "特殊教育", "教育心理学"]
      },
      {
        "name": "公共卫生学院",
        "englishName": "School of Public Health",
        "description": "波士顿大学公共卫生学院在流行病学、生物统计学和环境健康科学等领域享有盛誉。",
        "popularMajors": ["公共卫生", "流行病学", "生物统计学", "环境健康", "卫生政策"]
      },
      {
        "name": "牙医学院",
        "englishName": "Henry M. Goldman School of Dental Medicine",
        "description": "波士顿大学高盛牙医学院在口腔医学和牙科研究方面处于领先地位。",
        "popularMajors": ["牙医学", "口腔生物学", "牙科公共卫生", "牙周病学", "正畸学"]
      },
      {
        "name": "神学院",
        "englishName": "School of Theology",
        "description": "波士顿大学神学院在神学教育和研究方面处于领先地位。",
        "popularMajors": ["神学", "宗教研究", "基督教研究", "宗教与社会", "教会历史"]
      },
      {
        "name": "社会工作学院",
        "englishName": "School of Social Work",
        "description": "波士顿大学社会工作学院在社会工作教育和研究方面处于领先地位。",
        "popularMajors": ["社会工作", "社会政策", "临床社会工作", "社区发展", "儿童福利"]
      }
    ]
  },
  "南加州大学": {
    "admissions": {
      "acceptanceRate": "12.5%",
      "avgSAT": "1440-1560",
      "avgACT": "32-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "23%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "电影艺术学院",
        "englishName": "School of Cinematic Arts",
        "description": "南加州大学电影艺术学院是全球最顶尖的电影学院之一，培养了众多奥斯卡奖得主和好莱坞著名导演、制片人。",
        "popularMajors": ["电影制作", "电影理论", "动画", "数字媒体", "影视制作"]
      },
      {
        "name": "马歇尔商学院",
        "englishName": "Marshall School of Business",
        "description": "南加州大学马歇尔商学院是美国顶尖的商学院之一，在金融、创业和市场营销等领域享有盛誉。",
        "popularMajors": ["工商管理", "金融", "创业", "市场营销", "会计"]
      },
      {
        "name": "维特比工程学院",
        "englishName": "Viterbi School of Engineering",
        "description": "南加州大学维特比工程学院在计算机科学、电气工程和航空航天工程等领域处于领先地位。",
        "popularMajors": ["计算机科学", "电气工程", "航空航天工程", "机械工程", "生物医学工程"]
      },
      {
        "name": "安嫩伯格传播与新闻学院",
        "englishName": "Annenberg School for Communication and Journalism",
        "description": "南加州大学安嫩伯格传播与新闻学院是美国顶尖的传播学院之一，在新闻学、传播学和公共关系等领域处于领先地位。",
        "popularMajors": ["新闻学", "传播学", "公共关系", "数字媒体", "战略传播"]
      },
      {
        "name": "多恩西夫文学、艺术与科学学院",
        "englishName": "Dornsife College of Letters, Arts and Sciences",
        "description": "南加州大学多恩西夫文学、艺术与科学学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["心理学", "经济学", "生物学", "政治学", "计算机科学"]
      }
    ]
  },
  "罗格斯大学": {
    "admissions": {
      "acceptanceRate": "67.9%",
      "avgSAT": "1260-1460",
      "avgACT": "28-33",
      "avgGPA": "3.6-4.0",
      "internationalStudents": "13%",
      "toefl": "70"
    },
    "programs": [
      {
        "name": "工程学院",
        "englishName": "School of Engineering",
        "description": "罗格斯大学工程学院在生物医学工程、电气与计算机工程和机械工程等领域处于领先地位。",
        "popularMajors": ["生物医学工程", "电气与计算机工程", "机械工程", "计算机科学", "土木工程"]
      },
      {
        "name": "商学院",
        "englishName": "Rutgers Business School",
        "description": "罗格斯大学商学院在会计、金融和供应链管理等领域享有盛誉，是美国东北部重要的商业教育中心。",
        "popularMajors": ["会计", "金融", "供应链管理", "市场营销", "工商管理"]
      },
      {
        "name": "新伯朗士威学院",
        "englishName": "School of Arts and Sciences",
        "description": "罗格斯大学新伯朗士威学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域，拥有强大的研究实力。",
        "popularMajors": ["心理学", "经济学", "生物学", "政治学", "计算机科学"]
      },
      {
        "name": "环境与生物科学学院",
        "englishName": "School of Environmental and Biological Sciences",
        "description": "罗格斯大学环境与生物科学学院在环境科学、农业科学和生命科学等领域处于领先地位，拥有丰富的研究资源。",
        "popularMajors": ["环境科学", "生物科学", "农业科学", "食品科学", "海洋科学"]
      },
      {
        "name": "药学院",
        "englishName": "Ernest Mario School of Pharmacy",
        "description": "罗格斯大学欧内斯特·马里奥药学院是美国顶尖的药学院之一，在药学教育和研究方面处于领先地位。",
        "popularMajors": ["药学", "药物化学", "药理学", "药剂学", "药物流行病学"]
      }
    ]
  },
  "罗切斯特大学": {
    "admissions": {
      "acceptanceRate": "29.7%",
      "avgSAT": "1360-1510",
      "avgACT": "31-34",
      "avgGPA": "3.8-4.0",
      "internationalStudents": "20%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "伊士曼音乐学院",
        "englishName": "Eastman School of Music",
        "description": "罗切斯特大学伊士曼音乐学院是全球最顶尖的音乐学院之一，以其卓越的音乐教育和表演而闻名。",
        "popularMajors": ["音乐表演", "音乐理论", "作曲", "音乐教育", "爵士乐研究"]
      },
      {
        "name": "哈基姆工程与应用科学学院",
        "englishName": "Hajim School of Engineering and Applied Sciences",
        "description": "罗切斯特大学哈基姆工程与应用科学学院在光学、计算机科学和生物医学工程等领域处于领先地位，拥有世界著名的光学研究所。",
        "popularMajors": ["光学工程", "计算机科学", "生物医学工程", "电气与计算机工程", "机械工程"]
      },
      {
        "name": "艺术、科学与工程学院",
        "englishName": "College of Arts, Sciences, and Engineering",
        "description": "罗切斯特大学艺术、科学与工程学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域，拥有强大的跨学科研究实力。",
        "popularMajors": ["心理学", "经济学", "生物学", "政治学", "计算机科学"]
      },
      {
        "name": "西蒙商学院",
        "englishName": "Simon Business School",
        "description": "罗切斯特大学西蒙商学院是美国顶尖的商学院之一，在金融、会计和管理等领域享有盛誉，以其量化分析方法而闻名。",
        "popularMajors": ["金融", "会计", "工商管理", "市场营销", "管理信息系统"]
      },
      {
        "name": "医学与牙医学院",
        "englishName": "School of Medicine and Dentistry",
        "description": "罗切斯特大学医学与牙医学院是美国顶尖的医学院之一，在医学教育和研究方面处于领先地位，尤其是在免疫学和神经科学领域。",
        "popularMajors": ["医学", "牙医学", "生物医学科学", "免疫学", "神经科学"]
      }
    ]
  },
  "康奈尔大学": {
    "admissions": {
      "acceptanceRate": "7.3%",
      "avgSAT": "1490-1550",
      "avgACT": "34-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "12%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "农业与生命科学学院",
        "englishName": "College of Agriculture and Life Sciences",
        "description": "康奈尔大学农业与生命科学学院是美国顶尖的农业学院之一，在农业科学、生命科学和环境科学等领域享有盛誉。",
        "popularMajors": ["农业科学", "生命科学", "环境科学", "动物科学", "植物科学"]
      },
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "康奈尔大学工程学院是美国顶尖的工程学院之一，在航空航天工程、机械工程和计算机科学等领域处于领先地位。",
        "popularMajors": ["航空航天工程", "机械工程", "计算机科学", "电气与计算机工程", "土木工程"]
      },
      {
        "name": "商学院",
        "englishName": "Samuel Curtis Johnson Graduate School of Management",
        "description": "康奈尔大学约翰逊商学院是美国顶尖的商学院之一，在金融、营销和运营管理等领域享有盛誉。",
        "popularMajors": ["工商管理", "金融", "市场营销", "运营管理", "会计"]
      },
      {
        "name": "医学院",
        "englishName": "Weill Cornell Medicine",
        "description": "康奈尔大学威尔医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面处于领先地位。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "免疫学"]
      },
      {
        "name": "艺术与科学学院",
        "englishName": "College of Arts and Sciences",
        "description": "康奈尔大学艺术与科学学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["心理学", "经济学", "生物学", "化学", "政治学"]
      },
      {
        "name": "建筑、艺术与规划学院",
        "englishName": "College of Architecture, Art, and Planning",
        "description": "康奈尔大学建筑、艺术与规划学院是美国顶尖的设计学院之一，在建筑设计、城市规划和视觉艺术领域享有盛誉。",
        "popularMajors": ["建筑学", "城市规划", "视觉艺术", "风景园林", "艺术史"]
      },
      {
        "name": "酒店管理学院",
        "englishName": "School of Hotel Administration",
        "description": "康奈尔大学酒店管理学院是全球顶尖的酒店管理学院，在 hospitality 领域处于绝对领先地位。",
        "popularMajors": ["酒店管理", "食品与饮料管理", "酒店财务", "酒店营销", "旅游管理"]
      },
      {
        "name": "人类生态学院",
        "englishName": "College of Human Ecology",
        "description": "康奈尔大学人类生态学院专注于人类行为、健康和环境的交叉研究，在营养学、设计和政策领域享有盛誉。",
        "popularMajors": ["营养学", "人类发展", "设计与环境分析", "政策分析与管理", "纤维科学与服装设计"]
      },
      {
        "name": "工业与劳动关系学院",
        "englishName": "School of Industrial and Labor Relations",
        "description": "康奈尔大学工业与劳动关系学院是全球顶尖的劳动经济学和人力资源管理学院，专注于工作场所研究和政策制定。",
        "popularMajors": ["劳动经济学", "人力资源管理", "劳动关系", "国际与比较劳动关系", "集体谈判"]
      }
    ]
  },
  "布朗大学": {
    "admissions": {
      "acceptanceRate": "5.4%",
      "avgSAT": "1500-1560",
      "avgACT": "34-35",
      "avgGPA": "4.0-4.1",
      "internationalStudents": "15%",
      "toefl": "105"
    },
    "programs": [
      {
        "name": "工程学院",
        "englishName": "School of Engineering",
        "description": "布朗大学工程学院是美国顶尖的工程学院之一，在生物医学工程、计算机科学和电气与计算机工程等领域处于领先地位。",
        "popularMajors": ["生物医学工程", "计算机科学", "电气与计算机工程", "机械工程", "化学工程"]
      },
      {
        "name": "艺术与科学学院",
        "englishName": "College of Arts and Sciences",
        "description": "布朗大学艺术与科学学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域，以其开放的课程体系而闻名。",
        "popularMajors": ["经济学", "生物学", "计算机科学", "政治学", "心理学"]
      },
      {
        "name": "公共卫生学院",
        "englishName": "School of Public Health",
        "description": "布朗大学公共卫生学院在公共卫生研究和教育方面处于领先地位，尤其在流行病学和生物统计学领域。",
        "popularMajors": ["公共卫生", "流行病学", "生物统计学", "环境健康", "卫生政策"]
      },
      {
        "name": "医学院",
        "englishName": "Alpert Medical School",
        "description": "布朗大学阿尔珀特医学院是美国顶尖的医学院之一，在医学教育和研究方面处于领先地位。",
        "popularMajors": ["医学", "生物医学科学", "神经科学", "遗传学", "免疫学"]
      },
      {
        "name": "教育学院",
        "englishName": "Watson Institute for International and Public Affairs",
        "description": "布朗大学沃森国际与公共事务研究所是全球顶尖的国际关系和公共政策研究机构，专注于全球事务和政策分析。",
        "popularMajors": ["国际关系", "公共政策", "发展研究", "全球健康", "安全研究"]
      },
      {
        "name": "教育研究学院",
        "englishName": "Annenberg Institute for School Reform",
        "description": "布朗大学教育研究学院专注于教育政策、教学实践和学习科学的研究，培养教育领域的领导者和研究者。",
        "popularMajors": ["教育政策", "教学实践", "学习科学", "教育心理学", "高等教育管理"]
      },


    ]
  },
  "哥伦比亚大学": {
    "admissions": {
      "acceptanceRate": "3.9%",
      "avgSAT": "1510-1570",
      "avgACT": "34-35",
      "avgGPA": "4.0-4.1",
      "internationalStudents": "17%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "商学院",
        "englishName": "Columbia Business School",
        "description": "哥伦比亚大学商学院是美国顶尖的商学院之一，在金融、营销和创业等领域处于领先地位。",
        "popularMajors": ["工商管理", "金融", "市场营销", "创业", "会计"]
      },
      {
        "name": "工程学院",
        "englishName": "Fu Foundation School of Engineering and Applied Science",
        "description": "哥伦比亚大学工程学院是美国顶尖的工程学院之一，在计算机科学、电气工程和机械工程等领域处于领先地位。",
        "popularMajors": ["计算机科学", "电气工程", "机械工程", "化学工程", "生物医学工程"]
      },
      {
        "name": "法学院",
        "englishName": "Columbia Law School",
        "description": "哥伦比亚大学法学院是美国顶尖的法学院之一，在商法、宪法学和国际法等领域拥有强大的师资力量。",
        "popularMajors": ["法律", "商法", "宪法学", "国际法", "知识产权法"]
      },
      {
        "name": "医学院",
        "englishName": "Vagelos College of Physicians and Surgeons",
        "description": "哥伦比亚大学医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面处于领先地位。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "免疫学"]
      },
      {
        "name": "新闻学院",
        "englishName": "Columbia Journalism School",
        "description": "哥伦比亚大学新闻学院是全球最顶尖的新闻学院之一，培养了众多普利策奖得主。",
        "popularMajors": ["新闻学", "传播学", "媒体研究", "新闻编辑", "广播电视新闻"]
      },
      {
        "name": "艺术学院",
        "englishName": "School of the Arts",
        "description": "哥伦比亚大学艺术学院是美国顶尖的艺术学院之一，在电影、戏剧、视觉艺术和写作等领域培养了众多杰出艺术家。",
        "popularMajors": ["电影制作", "戏剧", "视觉艺术", "创意写作", "编剧"]
      },
      {
        "name": "国际与公共事务学院",
        "englishName": "School of International and Public Affairs",
        "description": "哥伦比亚大学国际与公共事务学院是全球顶尖的国际关系和公共政策学院，专注于全球事务和政策制定。",
        "popularMajors": ["国际关系", "公共政策", "经济政策", "可持续发展", "人权"]
      },
      {
        "name": "教育学院",
        "englishName": "Teachers College, Columbia University",
        "description": "哥伦比亚大学教育学院是全球顶尖的教育学院，在教育政策、教学实践和学习科学等领域处于领先地位。",
        "popularMajors": ["教育学", "教育政策", "心理学", "课程与教学", "教育领导"]
      },
      {
        "name": "公共卫生学院",
        "englishName": "Mailman School of Public Health",
        "description": "哥伦比亚大学梅尔曼公共卫生学院是美国顶尖的公共卫生学院之一，在流行病学、生物统计学和环境健康等领域享有盛誉。",
        "popularMajors": ["公共卫生", "流行病学", "生物统计学", "环境健康", "卫生政策"]
      },
      {
        "name": "建筑、规划与保护研究生院",
        "englishName": "Graduate School of Architecture, Planning and Preservation",
        "description": "哥伦比亚大学建筑学院是美国顶尖的建筑学院之一，在建筑设计、城市规划和历史保护等领域处于领先地位。",
        "popularMajors": ["建筑设计", "城市规划", "历史保护", "房地产开发", "景观建筑"]
      },
      {
        "name": "文理学院",
        "englishName": "Faculty of Arts and Sciences",
        "description": "哥伦比亚大学文理学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域，以其核心课程而闻名。",
        "popularMajors": ["经济学", "政治学", "心理学", "生物学", "计算机科学"]
      },
      {
        "name": "社会工作学院",
        "englishName": "School of Social Work",
        "description": "哥伦比亚大学社会工作学院是美国顶尖的社会工作学院之一，专注于社会正义、临床实践和政策倡导。",
        "popularMajors": ["临床社会工作", "社会政策", "社区组织", "儿童福利", "精神健康"]
      }
    ]
  },
  "圣路易斯华盛顿大学": {
    "admissions": {
      "acceptanceRate": "11%",
      "avgSAT": "1470-1560",
      "avgACT": "33-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "13%",
      "toefl": "90"
    },
    "programs": [
      {
        "name": "艺术与科学学院",
        "englishName": "College of Arts & Sciences",
        "description": "圣路易斯华盛顿大学艺术与科学学院是该校最大的学院，涵盖人文、社会科学和自然科学等广泛领域。",
        "popularMajors": ["生物学", "心理学", "经济学", "计算机科学", "政治学"]
      },
      {
        "name": "奥林商学院",
        "englishName": "Olin Business School",
        "description": "奥林商学院是美国顶尖的商学院之一，以其创新的教学方法和强大的就业前景而闻名。",
        "popularMajors": ["工商管理", "金融", "市场营销", "会计", "创业"]
      },
      {
        "name": "麦肯纳工程与应用科学学院",
        "englishName": "McKelvey School of Engineering",
        "description": "麦肯纳工程与应用科学学院在生物医学工程、计算机科学和材料科学等领域处于领先地位。",
        "popularMajors": ["生物医学工程", "计算机科学", "电气与计算机工程", "机械工程", "材料科学"]
      },
      {
        "name": "建筑与城市设计学院",
        "englishName": "Sam Fox School of Design & Visual Arts",
        "description": "山姆·福克斯设计与视觉艺术学院整合了建筑、艺术和设计学科，培养创意领袖和创新者。",
        "popularMajors": ["建筑设计", "城市规划", "视觉艺术", "插画", "室内设计"]
      },
      {
        "name": "医学院",
        "englishName": "School of Medicine",
        "description": "圣路易斯华盛顿大学医学院是美国顶尖的医学院之一，在生物医学研究和临床医疗方面处于领先地位。",
        "popularMajors": ["医学", "生物医学工程", "神经科学", "遗传学", "免疫学"]
      },
      {
        "name": "法学院",
        "englishName": "School of Law",
        "description": "圣路易斯华盛顿大学法学院在国际法、商业法和宪法学等领域拥有强大的师资力量。",
        "popularMajors": ["法律", "国际法", "商业法", "宪法学", "环境法"]
      },
      {
        "name": "布朗社会工作学院",
        "englishName": "George Warren Brown School of Social Work",
        "description": "布朗社会工作学院是美国顶尖的社会工作学院之一，专注于社会政策和临床实践。",
        "popularMajors": ["社会工作", "社会政策", "临床社会工作", "社区发展", "儿童福利"]
      }
    ]
  },
  "东北大学": {
    "admissions": {
      "acceptanceRate": "18.4%",
      "avgSAT": "1390-1540",
      "avgACT": "32-34",
      "avgGPA": "3.7-4.0",
      "internationalStudents": "20%",
      "toefl": "100"
    },
    "programs": [
      {
        "name": "工程学院",
        "englishName": "College of Engineering",
        "description": "东北大学工程学院在计算机科学、电气与计算机工程和机械工程等领域处于领先地位，以其合作教育项目（Co-op）而闻名。",
        "popularMajors": ["计算机科学", "电气与计算机工程", "机械工程", "生物医学工程", "化学工程"]
      },
      {
        "name": "商学院",
        "englishName": "D'Amore-McKim School of Business",
        "description": "东北大学达莫尔-麦金商学院在创业、供应链管理和市场营销等领域享有盛誉，注重实践学习和行业合作。",
        "popularMajors": ["工商管理", "金融", "市场营销", "创业", "供应链管理"]
      },
      {
        "name": "艺术、媒体与设计学院",
        "englishName": "College of Arts, Media and Design",
        "description": "东北大学艺术、媒体与设计学院在数字媒体、平面设计和建筑等领域培养创意人才，注重跨学科合作。",
        "popularMajors": ["数字媒体", "平面设计", "建筑", "艺术史", "音乐"]
      },
      {
        "name": "社会科学与人文学院",
        "englishName": "College of Social Sciences and Humanities",
        "description": "东北大学社会科学与人文学院涵盖广泛的人文学科和社会科学领域，培养批判性思维和全球视野。",
        "popularMajors": ["心理学", "经济学", "政治学", "国际事务", "历史"]
      },
      {
        "name": "健康科学学院",
        "englishName": "College of Health Sciences",
        "description": "东北大学健康科学学院在物理治疗、药学和护理等领域提供专业教育，注重实践和临床经验。",
        "popularMajors": ["物理治疗", "药学", "护理", "健康科学", "公共卫生"]
      }
    ]
  },
  "康涅狄格大学": {
    "admissions": {
      "acceptanceRate": "49.8%",
      "avgSAT": "1280-1460",
      "avgACT": "28-33",
      "avgGPA": "3.6-4.0",
      "internationalStudents": "8%",
      "toefl": "79"
    },
    "programs": [
      {
        "name": "工程学院",
        "englishName": "School of Engineering",
        "description": "康涅狄格大学工程学院在土木工程、机械工程和计算机科学等领域处于领先地位，注重实践学习和研究创新。",
        "popularMajors": ["土木工程", "机械工程", "计算机科学", "电气与计算机工程", "生物医学工程"]
      },
      {
        "name": "商学院",
        "englishName": "School of Business",
        "description": "康涅狄格大学商学院在金融、会计和市场营销等领域享有盛誉，培养具有全球视野的商业领袖。",
        "popularMajors": ["金融", "会计", "市场营销", "工商管理", "管理信息系统"]
      },
      {
        "name": "农业、健康与自然资源学院",
        "englishName": "College of Agriculture, Health and Natural Resources",
        "description": "康涅狄格大学农业、健康与自然资源学院在农业科学、营养科学和环境科学等领域处于领先地位。",
        "popularMajors": ["农业科学", "营养科学", "环境科学", "动物科学", "植物科学"]
      },
      {
        "name": "文理学院",
        "englishName": "College of Liberal Arts and Sciences",
        "description": "康涅狄格大学文理学院涵盖广泛的人文学科和自然科学领域，培养批判性思维和学术研究能力。",
        "popularMajors": ["心理学", "经济学", "生物学", "政治学", "英语"]
      },
      {
        "name": "教育学院",
        "englishName": "Neag School of Education",
        "description": "康涅狄格大学内格教育学院在教育政策、课程与教学和教育心理学等领域享有盛誉。",
        "popularMajors": ["教育学", "教育政策", "课程与教学", "教育心理学", "特殊教育"]
      }
    ]
  }
};

// 导出数据供其他模块使用
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = universityPrograms;
} else {
  window.universityPrograms = universityPrograms;
}
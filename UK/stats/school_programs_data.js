// 学校专业数据
const schoolProgramsData = {
    "University of St Andrews": {
        "ranking": 113.0,
        "programs": [
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.st-andrews.ac.uk/subjects/computer-science/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC)",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": "建议SAT 1350+"
            },
            {
                "major": "MA (Hons) Economics",
                "link": "https://www.st-andrews.ac.uk/subjects/economics/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC)",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": "建议Micro/Macro Economics"
            },
            {
                "major": "MA (Hons) Management",
                "link": "https://www.st-andrews.ac.uk/subjects/management/",
                "admission_requirements": "3门AP 5+5+4",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": ""
            }
        ],
        "query_address": "https://www.st-andrews.ac.uk/subjects/entry/usa/"
    },
    "The University of Manchester": {
        "ranking": 35.0,
        "programs": [
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.manchester.ac.uk/study/undergraduate/courses/2026/00653/bsc-computer-science/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+, SAT 1290+"
            },
            {
                "major": "BSc (Hons) Management",
                "link": "https://www.manchester.ac.uk/study/undergraduate/courses/2026/00579/bsc-management/",
                "admission_requirements": "3门AP 5+5+4",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.manchester.ac.uk/study/undergraduate/courses/2026/00751/beng-mechanical-engineering/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.1+"
            }
        ],
        "query_address": "https://www.manchester.ac.uk/study/international/country-specific-information/usa/entry-requirements/"
    },
    "伦敦大学学院(UCL)University College London": {
        "ranking": 9.0,
        "programs": [
            {
                "major": "BSc Computer Science",
                "link": "https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/computer-science-bsc/",
                "admission_requirements": "5门AP 5分 或 4门AP 5分+SAT 1440+",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": "需参加STAT考试"
            },
            {
                "major": "BSc Economics",
                "link": "https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/economics-bsc/",
                "admission_requirements": "5门AP 5分 或 4门AP 5分+SAT 1440+ (含Calculus BC)",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": "强烈建议Micro/Macro Economics"
            },
            {
                "major": "BEng Electronic and Electrical Engineering",
                "link": "https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/electronic-electrical-engineering-beng/",
                "admission_requirements": "5门AP 5+5+5+5+5 或 4门AP 5分+SAT 1440+ (含Calculus BC + Physics C)",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": ""
            }
        ],
        "query_address": "https://www.ucl.ac.uk/prospective-students/international/united-states-america"
    },
    "University of Edinburgh": {
        "ranking": 34.0,
        "programs": [
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.ed.ac.uk/studying/undergraduate/degrees/index.php?action=view&code=G400",
                "admission_requirements": "3门AP 4-5分 (含Calculus BC为5分)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "建议SAT 1290+"
            },
            {
                "major": "MA (Hons) Business Management",
                "link": "https://www.ed.ac.uk/studying/undergraduate/degrees/index.php?action=view&code=N200",
                "admission_requirements": "3门AP 4-5分",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": "建议SAT 1290+"
            },
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.ed.ac.uk/studying/undergraduate/degrees/index.php?action=view&code=H300",
                "admission_requirements": "3门AP 4-5分 (含Calculus BC 5分 + Physics C)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "建议SAT 1290+"
            }
        ],
        "query_address": "https://www.ed.ac.uk/science-engineering/studying/undergraduate/applying/entrancerequirements/entry-requirements-for-usa-qualifications"
    },
    "King's College London(KCL)": {
        "ranking": 31.0,
        "programs": [
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.kcl.ac.uk/study/undergraduate/courses/computer-science-bsc",
                "admission_requirements": "3-5门AP 4-5分",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "建议SAT 1350+"
            },
            {
                "major": "BSc (Hons) Business Management",
                "link": "https://www.kcl.ac.uk/study/undergraduate/courses/business-management-bsc",
                "admission_requirements": "3-5门AP 5+5+5",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": ""
            },
            {
                "major": "BSc (Hons) Economics",
                "link": "https://www.kcl.ac.uk/study/undergraduate/courses/economics-bsc",
                "admission_requirements": "3-5门AP 5+5+5+4 (含Calculus BC)",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": "建议SAT 1380+"
            }
        ],
        "query_address": "https://www.kcl.ac.uk/study/international/your-country/usa"
    },
    "University of Warwick": {
        "ranking": 74.0,
        "programs": [
            {
                "major": "BSc Accounting & Finance",
                "link": "https://warwick.ac.uk/study/undergraduate/courses/accountingfinance/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC)",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": "建议SAT 1350+"
            },
            {
                "major": "BSc Economics",
                "link": "https://warwick.ac.uk/study/undergraduate/courses/economics/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC + Micro/Macro)",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": "建议SAT 1380+"
            },
            {
                "major": "MEng Computer Science",
                "link": "https://warwick.ac.uk/study/undergraduate/courses/computersciencemeng/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "建议Physics或CS相关AP"
            }
        ],
        "query_address": "https://warwick.ac.uk/study/international/admissions/entry-requirements/usa"
    },
    "Durham University": {
        "ranking": 94.0,
        "programs": [
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.durham.ac.uk/study/courses/g400/",
                "admission_requirements": "3门AP 5+5+5",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "建议SAT 1350+"
            },
            {
                "major": "BA (Hons) Business and Management",
                "link": "https://www.durham.ac.uk/study/courses/n201/",
                "admission_requirements": "3门AP 5+5+4",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": ""
            },
            {
                "major": "BSc (Hons) Economics",
                "link": "https://www.durham.ac.uk/study/courses/l100/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "建议SAT 1350+"
            }
        ],
        "query_address": "https://www.durham.ac.uk/study/international/entry-requirements/international-qualifications/"
    },
    "University of Leeds": {
        "ranking": 86.0,
        "programs": [
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://courses.leeds.ac.uk/g400/computer-science-bsc",
                "admission_requirements": "3门AP 4-5分",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BSc (Hons) Business Management",
                "link": "https://courses.leeds.ac.uk/n200/business-management-bsc",
                "admission_requirements": "3门AP 4-5分",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://courses.leeds.ac.uk/h300/mechanical-engineering-beng",
                "admission_requirements": "3门AP 4-5分 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            }
        ],
        "query_address": "https://www.leeds.ac.uk/international-country-usa"
    },
    "University of Birmingham": {
        "ranking": 76.0,
        "programs": [
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.birmingham.ac.uk/undergraduate/courses/computer-science/computer-science-bsc.aspx",
                "admission_requirements": "3门AP 4-5分",
                "language_requirements": "雅思6.5 / 托福88+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BSc (Hons) Business Management",
                "link": "https://www.birmingham.ac.uk/undergraduate/courses/business/business-management-bsc.aspx",
                "admission_requirements": "3门AP 4-5分",
                "language_requirements": "雅思6.5 / 托福88+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.birmingham.ac.uk/undergraduate/courses/mechanical-engineering/mechanical-engineering-beng.aspx",
                "admission_requirements": "3门AP 4-5分 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.0 / 托福80+",
                "additional_requirements": "GPA 3.0+"
            }
        ],
        "query_address": "https://www.birmingham.ac.uk/international/students/country/usa/index.aspx"
    },
    "University of Oxford": {
        "ranking": 4.0,
        "programs": [
            {
                "major": "BA Economics and Management",
                "link": "https://www.ox.ac.uk/admissions/undergraduate/courses/economics-and-management/",
                "admission_requirements": "4门AP 5分 或 3门AP 5分+SAT 1470+/ACT 32+ (含Calculus BC)",
                "language_requirements": "雅思7.5 / 托福110+",
                "additional_requirements": "TSA考试 + 面试"
            },
            {
                "major": "MEng Engineering Science",
                "link": "https://www.ox.ac.uk/admissions/undergraduate/courses/engineering-science/",
                "admission_requirements": "4门AP 5分 或 3门AP 5分+SAT 1480+/ACT 33+ (含Calculus BC + Physics C)",
                "language_requirements": "雅思7.5 / 托福110+",
                "additional_requirements": "PAT考试 + 面试"
            },
            {
                "major": "BA Computer Science",
                "link": "https://www.ox.ac.uk/admissions/undergraduate/courses/computer-science/",
                "admission_requirements": "4门AP 5分 或 3门AP 5分+SAT 1470+/ACT 32+ (含Calculus BC)",
                "language_requirements": "雅思7.5 / 托福110+",
                "additional_requirements": "MAT考试 + 面试"
            }
        ],
        "query_address": "https://www.ox.ac.uk/admissions/undergraduate/international-students/international-qualifications"
    },
    "University of Cambridge": {
        "ranking": 6.0,
        "programs": [
            {
                "major": "BA (Hons) Economics",
                "link": "https://www.undergraduate.study.cam.ac.uk/courses/economics",
                "admission_requirements": "5门AP 5分 (含Calculus BC, 2年内)",
                "language_requirements": "雅思7.5 / 托福110+",
                "additional_requirements": "TMUA考试 + 面试"
            },
            {
                "major": "BA (Hons) & MEng Engineering",
                "link": "https://www.undergraduate.study.cam.ac.uk/courses/engineering",
                "admission_requirements": "5门AP 5分 (含Calculus BC + Physics C, 2年内)",
                "language_requirements": "雅思7.5 / 托福110+",
                "additional_requirements": "ENGAA考试 + 面试"
            },
            {
                "major": "BA (Hons) Computer Science",
                "link": "https://www.undergraduate.study.cam.ac.uk/courses/computer-science",
                "admission_requirements": "5门AP 5分 (含Calculus BC, 2年内)",
                "language_requirements": "雅思7.5 / 托福110+",
                "additional_requirements": "TMUA考试 + 面试"
            }
        ],
        "query_address": "https://www.undergraduate.study.cam.ac.uk/apply/before/accepted-qualifications"
    },
    "University of Bath": {
        "ranking": 132.0,
        "programs": [
            {
                "major": "BSc (Hons) Management",
                "link": "https://www.bath.ac.uk/courses/undergraduate-2026/management/bsc-management/",
                "admission_requirements": "3门AP 5+5+4",
                "language_requirements": "雅思7.0 / 托福100+",
                "additional_requirements": ""
            },
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.bath.ac.uk/courses/undergraduate-2026/mechanical-engineering/beng-mechanical-engineering/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": ""
            },
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.bath.ac.uk/courses/undergraduate-2026/computer-science/bsc-computer-science/",
                "admission_requirements": "3门AP 5+5+5 (含Calculus BC)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": ""
            }
        ],
        "query_address": "https://www.bath.ac.uk/topics/undergraduate-entry-requirements-for-international-students/"
    },
    "Loughborough University": {
        "ranking": 225.0,
        "programs": [
            {
                "major": "BSc (Hons) Sport and Exercise Science",
                "link": "https://www.lboro.ac.uk/study/undergraduate/courses/sport-and-exercise-science/",
                "admission_requirements": "3门AP 3-4分",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.lboro.ac.uk/study/undergraduate/courses/mechanical-engineering/",
                "admission_requirements": "3门AP 4-5分 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BSc (Hons) Business Analytics",
                "link": "https://www.lboro.ac.uk/study/undergraduate/courses/business-analytics/",
                "admission_requirements": "3门AP 3-4分",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            }
        ],
        "query_address": "https://www.lboro.ac.uk/international/country/usa/"
    },
    "University of Sheffield": {
        "ranking": 92.0,
        "programs": [
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.sheffield.ac.uk/undergraduate/courses/2026/mechanical-engineering-beng",
                "admission_requirements": "3门AP 4分 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.5 / 托福88+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.sheffield.ac.uk/undergraduate/courses/2026/computer-science-bsc",
                "admission_requirements": "3门AP 4分",
                "language_requirements": "雅思6.5 / 托福88+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BA (Hons) Architecture",
                "link": "https://www.sheffield.ac.uk/undergraduate/courses/2026/architecture-ba",
                "admission_requirements": "3门AP 4分",
                "language_requirements": "雅思6.5 / 托福88+",
                "additional_requirements": "需提交作品集"
            }
        ],
        "query_address": "https://www.sheffield.ac.uk/international/country/usa"
    },
    "University of Glasgow": {
        "ranking": 79.0,
        "programs": [
            {
                "major": "BSc (Hons) Computing Science",
                "link": "https://www.gla.ac.uk/undergraduate/degrees/computingscience/",
                "admission_requirements": "3门AP 4分",
                "language_requirements": "雅思6.5 / 托福90+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "MA (Hons) Business & Management",
                "link": "https://www.gla.ac.uk/undergraduate/degrees/businessmanagement/",
                "admission_requirements": "3门AP 4分",
                "language_requirements": "雅思6.5 / 托福90+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.gla.ac.uk/undergraduate/degrees/mechanicalengineering/",
                "admission_requirements": "3门AP 4分 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.5 / 托福90+",
                "additional_requirements": "GPA 3.0+"
            }
        ],
        "query_address": "https://www.gla.ac.uk/international/country/usa/"
    },
    "University of Southampton": {
        "ranking": 87.0,
        "programs": [
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.southampton.ac.uk/courses/computer-science-bsc",
                "admission_requirements": "3门AP 4-5分",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.southampton.ac.uk/courses/mechanical-engineering-beng",
                "admission_requirements": "3门AP 4-5分 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BSc (Hons) Business Management",
                "link": "https://www.southampton.ac.uk/courses/business-management-bsc",
                "admission_requirements": "3门AP 4-5分",
                "language_requirements": "雅思6.5 / 托福92+",
                "additional_requirements": "GPA 3.0+"
            }
        ],
        "query_address": "https://www.southampton.ac.uk/international/country/usa.page"
    },
    "University of Liverpool": {
        "ranking": 147.0,
        "programs": [
            {
                "major": "BEng (Hons) Mechanical Engineering",
                "link": "https://www.liverpool.ac.uk/study/undergraduate/courses/mechanical-engineering-beng/",
                "admission_requirements": "3门AP 4分 (含Calculus BC + Physics C)",
                "language_requirements": "雅思6.5 / 托福88+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BSc (Hons) Computer Science",
                "link": "https://www.liverpool.ac.uk/study/undergraduate/courses/computer-science-bsc/",
                "admission_requirements": "3门AP 4分",
                "language_requirements": "雅思6.5 / 托福88+",
                "additional_requirements": "GPA 3.0+"
            },
            {
                "major": "BA (Hons) Business Management",
                "link": "https://www.liverpool.ac.uk/study/undergraduate/courses/business-management-ba/",
                "admission_requirements": "3门AP 4分",
                "language_requirements": "雅思6.5 / 托福88+",
                "additional_requirements": "GPA 3.0+"
            }
        ],
        "query_address": "https://www.liverpool.ac.uk/international/countries-and-regions/americas/united-states/"
    }
};

// 工具函数：格式化文本中的换行符
function formatText(text) {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
}

// 工具函数：查找匹配的学校数据
function findSchoolData(schoolName) {
    if (!schoolName) return null;
    
    // 标准化学校名称，用于更准确的匹配
    const normalizedName = schoolName.toLowerCase().trim();
    
    // 1. 首先尝试精确匹配
    for (let key in schoolProgramsData) {
        const normalizedKey = key.toLowerCase().trim();
        if (normalizedKey === normalizedName) {
            return schoolProgramsData[key];
        }
    }
    
    // 2. 然后尝试精确的部分匹配（学校名称包含关键部分）
    for (let key in schoolProgramsData) {
        const normalizedKey = key.toLowerCase().trim();
        // 检查学校名称是否完全包含在数据键中，或者数据键完全包含在学校名称中
        if (normalizedKey.includes(normalizedName) || normalizedName.includes(normalizedKey)) {
            return schoolProgramsData[key];
        }
    }
    
    // 3. 使用中英文名称映射进行匹配
    const nameMapping = {
        '圣安德鲁斯大学': 'University of St Andrews',
        'st andrews': 'University of St Andrews',
        '曼彻斯特大学': 'The University of Manchester',
        'manchester': 'The University of Manchester',
        '伦敦大学学院': '伦敦大学学院(UCL)University College London',
        'ucl': '伦敦大学学院(UCL)University College London',
        '爱丁堡大学': 'University of Edinburgh',
        'edinburgh': 'University of Edinburgh',
        '伦敦国王学院': "King's College London(KCL)",
        'kcl': "King's College London(KCL)",
        'king\'s': "King's College London(KCL)",
        '国王学院': "King's College London(KCL)",
        '华威大学': 'University of Warwick',
        'warwick': 'University of Warwick',
        '杜伦大学': 'Durham University',
        'durham': 'Durham University',
        '利兹大学': 'University of Leeds',
        'leeds': 'University of Leeds',
        '伯明翰大学': 'University of Birmingham',
        'birmingham': 'University of Birmingham',
        '牛津大学': 'University of Oxford',
        'oxford': 'University of Oxford',
        '剑桥大学': 'University of Cambridge',
        'cambridge': 'University of Cambridge',
        '巴斯大学': 'University of Bath',
        'bath': 'University of Bath',
        '拉夫堡大学': 'Loughborough University',
        'loughborough': 'Loughborough University',
        '谢菲尔德大学': 'University of Sheffield',
        'sheffield': 'University of Sheffield',
        '格拉斯哥大学': 'University of Glasgow',
        'glasgow': 'University of Glasgow',
        '南安普顿大学': 'University of Southampton',
        'southampton': 'University of Southampton',
        '利物浦大学': 'University of Liverpool',
        'liverpool': 'University of Liverpool'
    };
    
    for (const [nameFragment, dataKey] of Object.entries(nameMapping)) {
        if (normalizedName.includes(nameFragment)) {
            if (schoolProgramsData[dataKey]) {
                return schoolProgramsData[dataKey];
            }
        }
    }
    
    // 4. 如果没有找到匹配的学校，返回null
    return null;
}

// 工具函数：创建费用数据表格HTML
function createFeesTableHtml() {
    return `
    <h3>费用参考（2024-2026学年）</h3>
    <table class="programs-table">
        <thead>
            <tr>
                <th>大学</th>
                <th>地点/特色</th>
                <th>国际学生本科学费（近似）</th>
                <th>推荐生活费估算</th>
                <th>年度总预算大致</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>University College London（UCL）</td>
                <td>伦敦市区</td>
                <td>≈ £37,500/年 起（2024-25入学国际生）</td>
                <td>建议 £15,000-£20,000/年（伦敦高生活成本）</td>
                <td>约 £52,000-£57,000/年</td>
            </tr>
            <tr>
                <td>The University of Manchester</td>
                <td>曼彻斯特（非伦敦大城市）</td>
                <td>≈ £33,100/年（2026/27入学部分课程）</td>
                <td>建议 £10,000-£13,000/年</td>
                <td>约 £43,000-£46,000/年</td>
            </tr>
            <tr>
                <td>University of St Andrews</td>
                <td>苏格兰，非伦敦</td>
                <td>≈ £35,260/年（2025-26学年国际生）</td>
                <td>学校估算约 £15,000-£16,000/年</td>
                <td>约 £50,000-£52,000/年</td>
            </tr>
            <tr>
                <td>University of Edinburgh</td>
                <td>爱丁堡（苏格兰）</td>
                <td>文科/非实验科目约 £24,000-£36,000/年 起；实验/理工科目约 £32,200/年 起</td>
                <td>学校估算约 £12,000-£18,000/年</td>
                <td>约 £36,000-£50,000/年（视专业及住宿）</td>
            </tr>
        </tbody>
    </table>
    `;
}

// 工具函数：创建专业信息表格HTML
function createProgramTableHtml(schoolData) {
    if (!schoolData || !schoolData.programs || schoolData.programs.length === 0) {
        return '';
    }
    
    let programTableHtml = `
    <h3>热门专业详细信息</h3>
    <table class="programs-table">
        <thead>
            <tr>
                <th>专业名称</th>
                <th>录取要求</th>
                <th>语言要求</th>
                <th>额外要求</th>
            </tr>
        </thead>
        <tbody>`;
    
    schoolData.programs.forEach(program => {
        const major = program.major || '未知专业';
        const link = program.link || '#';
        const admissionReqs = formatText(program.admission_requirements || '暂无数据');
        const languageReqs = program.language_requirements || '暂无数据';
        const additionalReqs = program.additional_requirements || '-';
        
        programTableHtml += `
                <tr>
                    <td>
                        <a href="${link}" target="_blank" rel="noopener noreferrer" title="查看专业详情">${major}</a>
                    </td>
                    <td>${admissionReqs}</td>
                    <td>${languageReqs}</td>
                    <td>${additionalReqs}</td>
                </tr>`;
    });
    
    programTableHtml += `
        </tbody>
    </table>
    ${schoolData.query_address ? `
    <div class="query-info">
        <h4>查询信息</h4>
        <p>${formatText(schoolData.query_address)}</p>
    </div>
    ` : ''}`;
    
    return programTableHtml;
}

// 增强showFull函数以显示专业信息
function enhanceSidebarWithPrograms() {
    // 保存原始的showFull函数
    const originalShowFull = window.showFull;
    
    // 创建增强版的showFull函数
    window.showFull = function(props) {
        console.log('增强版showFull函数被调用，学校名称:', props.name);
        
        try {
            // 调用原始函数
            if (typeof originalShowFull === 'function') {
                originalShowFull(props);
            }
            
            // 查找当前学校的专业数据
            const schoolData = findSchoolData(props.name);
            console.log('找到学校数据:', schoolData ? schoolData.programs.length + '个专业' : '未找到');
            
            // 如果有专业数据，添加专业信息表格
            if (schoolData) {
                // 等待DOM更新完成后再添加表格
                setTimeout(() => {
                    const infoDiv = document.getElementById('info');
                    console.log('infoDiv存在:', !!infoDiv);
                    
                    // 查找school-container或直接使用infoDiv
                    let targetElement = infoDiv.querySelector('.school-container');
                    if (!targetElement) {
                        console.log('未找到school-container，使用infoDiv作为目标元素');
                        targetElement = infoDiv;
                    }
                    
                    if (targetElement) {
                        // 先移除之前可能存在的所有表格
                        const existingTables = targetElement.querySelectorAll('.programs-table');
                        existingTables.forEach(table => table.remove());
                        
                        // 创建费用表格和专业表格
                        const feesTableHtml = createFeesTableHtml();
                        const programTableHtml = createProgramTableHtml(schoolData);
                        
                        // 1. 费用参考表格：插入到学校特色（college-system-section）之后
                        const collegeSection = targetElement.querySelector('.college-system-section');
                        if (collegeSection) {
                            collegeSection.insertAdjacentHTML('afterend', feesTableHtml);
                            console.log('费用表格已添加到学校特色下方');
                        }
                        
                        // 2. 专业信息表格：插入到学院概览（faculties-section）之后
                        const facultiesSection = targetElement.querySelector('.faculties-section');
                        if (facultiesSection) {
                            facultiesSection.insertAdjacentHTML('afterend', programTableHtml);
                            console.log('专业表格已添加到学院概览下方');
                        }
                    }
                }, 100); // 增加延迟，确保DOM已完全更新
            }
        } catch (error) {
            console.error('添加专业信息时出错:', error);
        }
    };
}

// 页面滚动优化：添加返回顶部按钮功能
function addScrollToTopFeature() {
    // 检查是否已经存在返回顶部按钮
    if (document.getElementById('scroll-top-btn')) return;
    
    // 创建返回顶部按钮
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-top-btn';
    scrollBtn.innerText = '↑';
    scrollBtn.title = '返回顶部';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
    
    // 添加点击事件
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 当文档加载完成后执行增强函数
function initEnhancements() {
    enhanceSidebarWithPrograms();
    addScrollToTopFeature();
}

document.addEventListener('DOMContentLoaded', initEnhancements);

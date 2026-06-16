// 测试合并学校数据的匹配逻辑

// 模拟universityPrograms数据
const universityPrograms = {
  "密歇根大学": {
    "admissions": {
      "acceptanceRate": "16.2%",
      "avgSAT": "1430-1540",
      "avgACT": "32-35",
      "avgGPA": "3.9-4.0",
      "internationalStudents": "15%"
    },
    "programs": []
  }
};

// 模拟universityDeadlines数据
const universityDeadlines = {
  "密歇根大学安娜堡分校": {
    "ED": "11/1/2025",
    "EDII": "1/1/2026",
    "EA": "11/1/2025",
    "EAII": "",
    "RD": "2/1/2026"
  }
};

// 合并数据的函数
function combineSchoolData() {
  // 创建一个新的对象来存储合并后的数据
  const combinedData = {};
  
  // 遍历 universityPrograms 中的所有学校
  for (const schoolName in universityPrograms) {
    if (universityPrograms.hasOwnProperty(schoolName)) {
      // 获取学校的基本信息
      const schoolInfo = universityPrograms[schoolName];
      
      // 初始化合并后的数据
      combinedData[schoolName] = {
        ...schoolInfo,
        deadlines: {
          ED: "",
          EDII: "",
          EA: "",
          EAII: "",
          RD: ""
        }
      };
      
      // 查找对应的截止日期数据
      // 由于 universityDeadlines 中的学校名称可能包含额外信息，我们需要进行模糊匹配
      for (const deadlineSchool in universityDeadlines) {
        if (universityDeadlines.hasOwnProperty(deadlineSchool)) {
          // 检查学校名称是否匹配（不区分大小写，忽略额外信息）
          if (schoolName.toLowerCase().includes(deadlineSchool.toLowerCase()) || deadlineSchool.toLowerCase().includes(schoolName.toLowerCase())) {
            combinedData[schoolName].deadlines = universityDeadlines[deadlineSchool];
            break;
          }
        }
      }
    }
  }
  
  return combinedData;
}

// 执行测试
const combinedData = combineSchoolData();
console.log("合并后的数据:");
console.log(JSON.stringify(combinedData, null, 2));

// 验证结果
if (combinedData["密歇根大学"] && combinedData["密歇根大学"].deadlines.ED) {
  console.log("\n✅ 测试成功！密歇根大学成功匹配到了截止日期数据");
  console.log(`密歇根大学ED截止日期: ${combinedData["密歇根大学"].deadlines.ED}`);
} else {
  console.log("\n❌ 测试失败！密歇根大学没有匹配到截止日期数据");
}
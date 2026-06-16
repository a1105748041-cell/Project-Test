// 合并美国大学数据和截止日期数据
// 假设 universityPrograms 和 universityDeadlines 已经在页面中定义

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

// 执行合并 - 由于脚本使用defer加载，所有依赖数据会在脚本执行前加载完成
const combinedSchoolData = combineSchoolData();

// 导出数据供其他模块使用
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = combinedSchoolData;
} else {
  window.combinedSchoolData = combinedSchoolData;
}

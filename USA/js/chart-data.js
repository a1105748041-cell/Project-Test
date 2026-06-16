// 模拟大学数据，用于图表展示
const universityChartData = {
  // 录取率趋势数据
  acceptanceRate: {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: '录取率 (%)',
      data: [22.5, 20.8, 19.2, 17.5, 15.8, 14.3],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      tension: 0.3
    }]
  },
  
  // 专业分布数据
  programDistribution: {
    labels: ['工程', '计算机科学', '商业', '生物科学', '社会科学', '艺术与人文'],
    datasets: [{
      data: [25, 20, 18, 15, 12, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  
  // 录取分数趋势数据
  scoreTrend: {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [{
      label: '平均SAT分数',
      data: [1320, 1350, 1380, 1410, 1430, 1450],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      borderWidth: 2,
      tension: 0.3
    }, {
      label: '平均ACT分数',
      data: [29, 30, 31, 32, 32, 33],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.1)',
      borderWidth: 2,
      tension: 0.3
    }]
  }
};

// 导出数据供浏览器环境使用
window.universityChartData = universityChartData;
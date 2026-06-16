// 澳大利亚地图应用 - 图表工具模块

// 加载并创建图表函数
function loadAndCreateCharts(jsonPath, facultyChartId, competitivenessChartId, colors) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      console.log('加载图表数据成功:', data);
      
      // 创建学院申请与录取人数对比图
      createFacultyChart(data, facultyChartId, colors);
      
      // 创建专业竞争激烈程度图
      createCompetitivenessChart(data, competitivenessChartId, colors);
    })
    .catch(error => {
      console.error('加载图表数据失败:', error);
      
      // 显示错误信息
      const facultyChartContainer = document.getElementById(facultyChartId);
      const competitivenessChartContainer = document.getElementById(competitivenessChartId);
      
      if (facultyChartContainer) {
        facultyChartContainer.parentElement.innerHTML = `<p style="color: #c62828; text-align: center; padding: 20px;">无法加载图表数据，请稍后重试</p>`;
      }
      
      if (competitivenessChartContainer) {
        competitivenessChartContainer.parentElement.innerHTML = `<p style="color: #c62828; text-align: center; padding: 20px;">无法加载图表数据，请稍后重试</p>`;
      }
    });
}

// 创建学院申请与录取人数对比图
function createFacultyChart(data, chartId, colors) {
  const ctx = document.getElementById(chartId);
  if (!ctx) {
    console.error('未找到图表容器:', chartId);
    return;
  }
  
  // 准备数据
  const faculties = data.map(item => item.faculty);
  const applications = data.map(item => item.applications);
  const offers = data.map(item => item.offers);
  
  // 创建图表
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: faculties,
      datasets: [
        {
          label: '申请人数',
          data: applications,
          backgroundColor: colors.appColor || 'rgba(54, 162, 235, 0.7)',
          borderColor: colors.appBorderColor || 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: '录取人数',
          data: offers,
          backgroundColor: colors.offerColor || 'rgba(75, 192, 192, 0.7)',
          borderColor: colors.offerBorderColor || 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '人数'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: '各学院申请与录取人数对比'
        },
        legend: {
          position: 'top'
        }
      }
    }
  });
}

// 创建专业竞争激烈程度图
function createCompetitivenessChart(data, chartId, colors) {
  const ctx = document.getElementById(chartId);
  if (!ctx) {
    console.error('未找到图表容器:', chartId);
    return;
  }
  
  // 计算竞争激烈程度（申请人数/录取人数）
  const competitivenessData = data.map(item => {
    return {
      faculty: item.faculty,
      competitiveness: item.offers > 0 ? (item.applications / item.offers).toFixed(2) : 0
    };
  });
  
  // 按竞争激烈程度排序
  competitivenessData.sort((a, b) => b.competitiveness - a.competitiveness);
  
  // 准备数据
  const faculties = competitivenessData.map(item => item.faculty);
  const competitiveness = competitivenessData.map(item => item.competitiveness);
  
  // 创建图表
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: faculties,
      datasets: [
        {
          label: '竞争激烈程度（申请人数/录取人数）',
          data: competitiveness,
          backgroundColor: colors.competitionColor || 'rgba(255, 99, 132, 0.7)',
          borderColor: colors.competitionBorderColor || 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '竞争激烈程度'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: '专业竞争激烈程度'
        },
        legend: {
          position: 'top'
        }
      }
    }
  });
}

// 创建竞争激烈程度图表（从JSON文件直接创建）
function createCompetitivenessChartFromJSON(jsonPath, chartId) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      console.log('加载竞争激烈程度数据成功:', data);
      
      const ctx = document.getElementById(chartId);
      if (!ctx) {
        console.error('未找到图表容器:', chartId);
        return;
      }
      
      // 准备数据
      const majors = data.map(item => item.major);
      const competitiveness = data.map(item => item.competitiveness);
      
      // 创建图表
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: majors,
          datasets: [
            {
              label: '竞争激烈程度（申请人数/录取人数）',
              data: competitiveness,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: '竞争激烈程度'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: '专业竞争激烈程度'
            },
            legend: {
              position: 'top'
            }
          }
        }
      });
    })
    .catch(error => {
      console.error('加载竞争激烈程度数据失败:', error);
      
      // 显示错误信息
      const chartContainer = document.getElementById(chartId);
      if (chartContainer) {
        chartContainer.parentElement.innerHTML = `<p style="color: #c62828; text-align: center; padding: 20px;">无法加载图表数据，请稍后重试</p>`;
      }
    });
}

// 加载并显示排名前5的学院申请数据表格
function loadTopSchoolsTable(jsonPath) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      console.log('加载排名前5的学院数据成功:', data);
      
      const tableContainer = document.getElementById('topSchoolsTable');
      if (!tableContainer) {
        console.error('未找到表格容器');
        return;
      }
      
      // 创建表格
      let tableHtml = `
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 8px;">排名</th>
              <th style="border: 1px solid #ddd; padding: 8px;">学院名称</th>
              <th style="border: 1px solid #ddd; padding: 8px;">申请人数</th>
              <th style="border: 1px solid #ddd; padding: 8px;">录取人数</th>
              <th style="border: 1px solid #ddd; padding: 8px;">录取率</th>
            </tr>
          </thead>
          <tbody>
      `;
      
      // 添加数据行
      data.forEach((school, index) => {
        const acceptanceRate = school.applications > 0 ? ((school.offers / school.applications) * 100).toFixed(2) + '%' : '0%';
        tableHtml += `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${school.faculty}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${school.applications}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${school.offers}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${acceptanceRate}</td>
          </tr>
        `;
      });
      
      tableHtml += `
          </tbody>
        </table>
      `;
      
      // 插入表格
      tableContainer.innerHTML = tableHtml;
    })
    .catch(error => {
      console.error('加载排名前5的学院数据失败:', error);
      
      // 显示错误信息
      const tableContainer = document.getElementById('topSchoolsTable');
      if (tableContainer) {
        tableContainer.innerHTML = `<p style="color: #c62828; text-align: center; padding: 20px;">无法加载表格数据，请稍后重试</p>`;
      }
    });
}
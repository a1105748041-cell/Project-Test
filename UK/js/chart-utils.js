// 工具函数：显示加载指示器
function showLoadingIndicator(element, message = '正在加载数据...') {
  // 清除现有的错误信息
  const existingError = element.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // 检查是否已有加载指示器
  let loadingIndicator = element.querySelector('.loading-indicator');
  if (!loadingIndicator) {
    loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.9);
      padding: 15px 30px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 10;
    `;
    element.style.position = 'relative';
    element.appendChild(loadingIndicator);
  }
  
  loadingIndicator.textContent = message;
  element.classList.add('loading');
  return loadingIndicator;
}

// 工具函数：显示简单的加载状态（用于非容器元素）
function showSimpleLoading(element, message = '加载数据中...') {
  element.innerHTML = `<div class="loading-indicator" style="
    padding: 20px;
    text-align: center;
    color: #666;
    font-size: 14px;
  ">${message}</div>`;
}

// 工具函数：隐藏加载指示器
function hideLoadingIndicator(element) {
  const loadingIndicator = element.querySelector('.loading-indicator');
  if (loadingIndicator) loadingIndicator.remove();
  element.classList.remove('loading');
}

// 工具函数：显示错误信息
function showErrorMessage(element, message = '数据加载失败，请稍后重试') {
  hideLoadingIndicator(element);
  
  // 检查是否已有错误信息
  let errorMessage = element.querySelector('.error-message');
  if (!errorMessage) {
    errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.style.cssText = `
      padding: 20px;
      background: #ffebee;
      border-radius: 5px;
      color: #c62828;
      text-align: center;
      margin-top: 20px;
    `;
    element.appendChild(errorMessage);
  }
  
  errorMessage.textContent = message;
}

// 工具函数：根据值获取颜色类别
function getRateColorClass(value, thresholds = { low: 30, medium: 40 }) {
  if (value < thresholds.low) return 'low-rate';
  if (value < thresholds.medium) return 'medium-rate';
  return 'high-rate';
}

// 工具函数：显示无数据消息
function showNoDataMessage(element, message = '暂无足够的数据可供显示') {
  const noDataMessage = document.createElement('div');
  noDataMessage.className = 'no-data-message';
  noDataMessage.style.cssText = `
    padding: 40px 20px;
    text-align: center;
    color: #666;
    font-size: 16px;
    background: #f8f9fa;
    border-radius: 5px;
  `;
  noDataMessage.textContent = message;
  element.appendChild(noDataMessage);
}

// 工具函数：带重试机制的fetch数据函数
function fetchData(url, retries = 3, delay = 1000) {
  console.log(`尝试加载数据: ${url}, 剩余重试次数: ${retries}`);
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP错误! 状态: ${res.status}`);
      console.log(`数据加载成功: ${url}`);
      return res.json();
    })
    .catch(error => {
      console.warn(`数据加载失败: ${error.message}`);
      if (retries > 0) {
        console.log(`将在 ${delay}ms 后重试...`);
        return new Promise(resolve => setTimeout(resolve, delay))
          .then(() => fetchData(url, retries - 1, delay * 1.5));
      }
      console.error(`所有重试都已失败: ${url}`);
      throw error;
    });
}

// 加载数据并创建图表的通用函数
function loadAndCreateCharts(dataUrl, facultyChartId, competitivenessChartId, colors) {
  const chartWrapper = document.querySelector(`#${facultyChartId}`).closest('.charts-container');
  if (chartWrapper) {
    showLoadingIndicator(chartWrapper);
  }
  
  fetchData(dataUrl)
    .then(data => {
      if (chartWrapper) hideLoadingIndicator(chartWrapper);
      
      // 创建学院申请与录取对比柱状图
      createFacultyChart(data, facultyChartId, colors, dataUrl);
      
      // 创建专业竞争激烈程度条形图
      createCompetitivenessChart(data, competitivenessChartId);
    })
    .catch(err => {
      console.error('加载数据失败:', err);
      if (chartWrapper) showErrorMessage(chartWrapper);
    });
}

// 工具函数：添加CSS样式
function addStyle(cssText) {
  const style = document.createElement('style');
  style.textContent = cssText;
  document.head.appendChild(style);
}

// 加载并显示排名前5的学院申请数据表格
function loadTopSchoolsTable(dataUrl) {
  const tableContainer = document.getElementById('topSchoolsTable');
  
  // 显示加载状态
  showSimpleLoading(tableContainer);
  
  fetchData(dataUrl)
    .then(data => {
      // 创建表格
      const tableHtml = createTopSchoolsTableHtml(data);
      
      // 添加表格样式
      addSchoolAdmissionsTableStyles();
      
      // 更新表格内容
      tableContainer.innerHTML = tableHtml;
    })
    .catch(err => {
      console.error('加载表格数据失败:', err);
      tableContainer.innerHTML = `<div class="error-message" style="
        padding: 20px;
        background: #ffebee;
        border-radius: 5px;
        color: #c62828;
        text-align: center;
      ">数据加载失败，请稍后重试</div>`;
    });
}

// 创建排名前5的学院表格HTML
function createTopSchoolsTableHtml(data) {
  // 计算最大申请人数，用于进度条计算
  const maxApplications = Math.max(...data.map(d => d.application));
  
  return `
    <table class="school-admissions-table">
      <thead>
        <tr>
          <th>排名</th>
          <th>学院名称</th>
          <th>申请人数</th>
          <th>录取率(%)</th>
          <th>接受率(%)</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((school, index) => {
          // 根据录取率和接受率添加颜色编码
          const offerRateClass = getRateColorClass(school.offer_rate, { low: 30, medium: 40 });
          const acceptanceRateClass = getRateColorClass(school.acceptance_rate, { low: 7, medium: 9 });
          
          return `
            <tr>
              <td class="rank-cell">${index + 1}</td>
              <td class="school-cell">${school.school}</td>
              <td class="application-cell">
                <div class="value">${school.application.toLocaleString()}</div>
                <div class="progress-bar-container">
                  <div class="progress-bar" style="width: ${(school.application / maxApplications) * 100}%">
                  </div>
                </div>
              </td>
              <td class="${offerRateClass}">
                <div class="value">${school.offer_rate}</div>
                <div class="rate-bar-container">
                  <div class="rate-bar" style="width: ${school.offer_rate}%">
                  </div>
                </div>
              </td>
              <td class="${acceptanceRateClass}">
                <div class="value">${school.acceptance_rate}</div>
                <div class="rate-bar-container">
                  <div class="rate-bar" style="width: ${school.acceptance_rate * 5}%">
                  </div>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

// 添加学院录取表格样式
function addSchoolAdmissionsTableStyles() {
  const cssText = `
    .school-admissions-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      font-size: 14px;
      transition: transform 0.2s ease;
    }
    .school-admissions-table:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
    .school-admissions-table th,
    .school-admissions-table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }
    .school-admissions-table th {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-weight: bold;
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .school-admissions-table tr:last-child td {
      border-bottom: none;
    }
    .school-admissions-table tr:hover {
      background-color: #f9f9f9;
    }
    .school-admissions-table tr:nth-child(even) {
      background-color: #fafafa;
    }
    .school-admissions-table tr:nth-child(odd) {
      background-color: #ffffff;
    }
    
    /* 排名单元格样式 */
    .rank-cell {
      font-weight: bold;
      color: #667eea;
      font-size: 16px;
      text-align: center;
    }
    
    /* 学院名称样式 */
    .school-cell {
      font-weight: 600;
      color: #333;
    }
    
    /* 申请人数样式 */
    .application-cell {
      position: relative;
    }
    .application-cell .value {
      font-weight: bold;
      color: #4a5568;
    }
    
    /* 进度条样式 */
    .progress-bar-container {
      width: 100%;
      height: 8px;
      background-color: #e2e8f0;
      border-radius: 4px;
      margin-top: 5px;
      overflow: hidden;
    }
    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
      border-radius: 4px;
      transition: width 1s ease-out;
    }
    
    /* 比率单元格样式 */
    .value {
      font-weight: bold;
    }
    .rate-bar-container {
      width: 100%;
      height: 8px;
      background-color: #e2e8f0;
      border-radius: 4px;
      margin-top: 5px;
      overflow: hidden;
    }
    .rate-bar {
      height: 100%;
      transition: width 1s ease-out;
    }
    
    /* 低录取率样式 */
    .low-rate {
      color: #e53e3e;
    }
    .low-rate .rate-bar {
      background: linear-gradient(90deg, #fc8181 0%, #e53e3e 100%);
    }
    
    /* 中等录取率样式 */
    .medium-rate {
      color: #ed8936;
    }
    .medium-rate .rate-bar {
      background: linear-gradient(90deg, #fbd38d 0%, #ed8936 100%);
    }
    
    /* 高录取率样式 */
    .high-rate {
      color: #48bb78;
    }
    .high-rate .rate-bar {
      background: linear-gradient(90deg, #9ae6b4 0%, #48bb78 100%);
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
      .school-admissions-table {
        font-size: 12px;
      }
      .school-admissions-table th,
      .school-admissions-table td {
        padding: 10px;
      }
    }
  `;
  addStyle(cssText);
}

// 从JSON文件加载数据并创建竞争激烈程度图表
function createCompetitivenessChartFromJSON(dataUrl, chartId) {
  const chartWrapper = document.querySelector(`#${chartId}`).closest('.chart-wrapper');
  
  // 显示加载状态
  if (chartWrapper) {
    showLoadingIndicator(chartWrapper);
  }
  
  fetchData(dataUrl)
    .then(data => {
      // 隐藏加载状态
      if (chartWrapper) hideLoadingIndicator(chartWrapper);
      
      // 创建专业竞争激烈程度图表
      createCompetitivenessChart(data, chartId);
    })
    .catch(err => {
      console.error('加载图表数据失败:', err);
      if (chartWrapper) showErrorMessage(chartWrapper);
    });
}

// 创建学院申请与录取对比柱状图的通用函数
function createFacultyChart(data, chartId, colors, dataUrl) {
  // 1. 按学院统计数据，处理可能的缺失字段
  const facultyStats = {};
  data.forEach(item => {
    if (!item.Faculty || !item.Apps || !item.Offers) return; // 跳过无效数据
    
    if (!facultyStats[item.Faculty]) {
      facultyStats[item.Faculty] = {
        Apps: 0,
        Offers: 0,
        Places: 0
      };
    }
    facultyStats[item.Faculty].Apps += item.Apps || 0;
    facultyStats[item.Faculty].Offers += item.Offers || 0;
    facultyStats[item.Faculty].Places += item.Places || 0;
  });
  
  // 安全检查：确保有数据
  if (Object.keys(facultyStats).length === 0) {
    const chartWrapper = document.getElementById(chartId).closest('.chart-wrapper');
    if (chartWrapper) {
      showNoDataMessage(chartWrapper, '暂无足够的学院数据可供显示');
    }
    return;
  }
  
  // 2. 处理可能的大量数据：按申请人数排序并限制显示数量
  const sortedFaculties = Object.keys(facultyStats).sort((a, b) => 
    facultyStats[b].Apps - facultyStats[a].Apps
  ).slice(0, 12); // 最多显示12个学院，避免图表过于拥挤
  
  const appsData = sortedFaculties.map(faculty => facultyStats[faculty].Apps);
  const offersData = sortedFaculties.map(faculty => facultyStats[faculty].Offers);
  
  // 3. 创建学院申请与录取对比柱状图
  const facultyCtx = document.getElementById(chartId).getContext('2d');
  new Chart(facultyCtx, {
    type: 'bar',
    data: {
      labels: sortedFaculties,
      datasets: [
        {
          label: '申请人数',
          data: appsData,
          backgroundColor: colors.appColor,
          borderColor: colors.appBorderColor,
          borderWidth: 1
        },
        {
          label: '录取人数',
          data: offersData,
          backgroundColor: colors.offerColor,
          borderColor: colors.offerBorderColor,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '人数'
          },
          ticks: {
            callback: function(value) {
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value; // 格式化大数字
            }
          }
        },
        x: {
          title: {
            display: true,
            text: '学院'
          },
          ticks: {
            maxRotation: 45,
            minRotation: 30,
            font: {
              size: 11 // 减小字体大小以适应更多标签
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y.toLocaleString();
              }
              return label;
            },
            afterBody: function(context) {
              // 添加录取率信息
              const index = context[0].dataIndex;
              const faculty = sortedFaculties[index];
              const stats = facultyStats[faculty];
              
              if (stats.Apps > 0) {
                const acceptanceRate = (stats.Offers / stats.Apps * 100).toFixed(1);
                return `录取率: ${acceptanceRate}%`;
              }
              return '';
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  });
  
  // 如果是UCL数据，添加学院统计信息
  if (dataUrl && dataUrl.includes('ucl')) {
    addUCLFacultyStats(facultyStats);
  }
}

// 添加UCL学院统计信息（申请人数最多的3个学院和录取人数最多的2个学院）
function addUCLFacultyStats(facultyStats) {
  // 查找图表容器
  const chartContainer = document.querySelector('.ucl-data-visualization');
  if (!chartContainer) return;
  
  // 1. 计算并获取申请人数最多的3个学院
  const topAppsFaculties = Object.entries(facultyStats)
    .sort((a, b) => b[1].Apps - a[1].Apps)
    .slice(0, 3);
  
  // 2. 计算并获取录取人数最多的2个学院
  const topOffersFaculties = Object.entries(facultyStats)
    .sort((a, b) => b[1].Offers - a[1].Offers)
    .slice(0, 2);
  
  // 3. 创建统计信息HTML
  const statsHtml = `
    <div class="ucl-faculty-stats">
      <h4>UCL学院统计</h4>
      <div class="stats-grid">
        <div class="stats-section">
          <h5>申请人数最多的3个学院</h5>
          <ul>
            ${topAppsFaculties.map(([name, stats], index) => `
              <li><strong>${index + 1}. ${name}:</strong> ${stats.Apps.toLocaleString()}人</li>
            `).join('')}
          </ul>
        </div>
        <div class="stats-section">
          <h5>录取人数最多的2个学院</h5>
          <ul>
            ${topOffersFaculties.map(([name, stats], index) => `
              <li><strong>${index + 1}. ${name}:</strong> ${stats.Offers.toLocaleString()}人</li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  
  // 4. 添加样式
  const cssText = `
    .ucl-faculty-stats {
      margin-top: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }
    .ucl-faculty-stats h4 {
      margin-top: 0;
      color: #333;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .stats-grid {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
    }
    .stats-section {
      flex: 1;
      min-width: 200px;
    }
    .stats-section h5 {
      margin-top: 0;
      color: #555;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .stats-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .stats-section li {
      margin-bottom: 8px;
      font-size: 13px;
      color: #666;
      line-height: 1.4;
    }
    .stats-section strong {
      color: #333;
    }
  `;
  addStyle(cssText);
  
  // 5. 插入统计信息到图表容器中
  chartContainer.insertAdjacentHTML('beforeend', statsHtml);
}

// 创建专业竞争激烈程度条形图的通用函数
function createCompetitivenessChart(data, chartId) {
  // 1. 按竞争激烈程度排序(Apps per place)，处理可能的缺失字段
  const competitiveData = data
    .filter(item => item['Apps per place'] && item['Apps per place'] > 0 && item.Apps && item.Offers) // 过滤有效数据
    .sort((a, b) => b['Apps per place'] - a['Apps per place'])
    .slice(0, 10); // 只显示竞争最激烈的10个专业
  
  // 安全检查：确保有数据
  if (competitiveData.length === 0) {
    const chartWrapper = document.getElementById(chartId).closest('.chart-wrapper');
    if (chartWrapper) {
      showNoDataMessage(chartWrapper, '暂无足够的竞争数据可供显示');
    }
    return;
  }
  
  const programNames = competitiveData.map(item => {
    // 简化专业名称，保持简洁显示
    const name = item.Programme || '未知专业';
    return name.length > 30 ? name.substring(0, 30) + '...' : name;
  });
  const competitionData = competitiveData.map(item => item['Apps per place']);
  
  // 2. 创建专业竞争激烈程度条形图
  const competitivenessCtx = document.getElementById(chartId).getContext('2d');
  new Chart(competitivenessCtx, {
    type: 'bar',
    data: {
      labels: programNames,
      datasets: [
        {
          label: '平均每名额申请人数',
          data: competitionData,
          backgroundColor: function(context) {
            // 根据竞争激烈程度设置不同的颜色
            const value = context.raw;
            if (value > 20) return 'rgba(220, 53, 69, 0.7)'; // 红色 - 非常激烈
            if (value > 10) return 'rgba(255, 193, 7, 0.7)'; // 黄色 - 较激烈
            return 'rgba(40, 167, 69, 0.7)'; // 绿色 - 一般
          },
          borderColor: function(context) {
            const value = context.raw;
            if (value > 20) return 'rgba(220, 53, 69, 1)';
            if (value > 10) return 'rgba(255, 193, 7, 1)';
            return 'rgba(40, 167, 69, 1)';
          },
          borderWidth: 1
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: '平均每名额申请人数'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              // 显示完整的专业名称
              const index = context[0].dataIndex;
              return competitiveData[index].Programme || '未知专业';
            },
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.x !== null) {
                label += context.parsed.x.toFixed(1);
              }
              return label;
            },
            afterLabel: function(context) {
              // 添加额外的录取率信息，避免除以零
              const index = context.dataIndex;
              const item = competitiveData[index];
              
              // 获取并显示更多相关数据
              let additionalInfo = [];
              
              if (item.Faculty) {
                additionalInfo.push(`学院: ${item.Faculty}`);
              }
              
              if (item.Apps && item.Offers) {
                const acceptanceRate = (item.Offers / item.Apps * 100).toFixed(1);
                additionalInfo.push(`录取率: ${acceptanceRate}%`);
              }
              
              if (item.Apps) {
                additionalInfo.push(`申请人数: ${item.Apps.toLocaleString()}`);
              }
              
              if (item.Offers) {
                additionalInfo.push(`录取人数: ${item.Offers.toLocaleString()}`);
              }
              
              if (item.Places) {
                additionalInfo.push(`招生名额: ${item.Places.toLocaleString()}`);
              }
              
              return additionalInfo.join('\n');
            }
          }
        }
      }
    }
  });
}

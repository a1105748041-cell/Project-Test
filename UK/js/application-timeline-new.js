// 申请流程时间线功能 - 参考sample/uc-map.js风格
(function() {
  // 定义DOM元素缓存对象
  const elements = {};
  
  // 初始化函数
  function init() {
    // 缓存所有必要的DOM元素
    cacheAllElements();
    
    // 绑定事件
    bindAllEvents();
    
    // 创建申请统计图表
    createApplicationsChart();
  }
  
  // 缓存所有必要的DOM元素
  function cacheAllElements() {
    // 公共信息区域元素
    elements.commonInfoContent = document.getElementById('common-info-content');
    elements.toggleInfoBtn = document.getElementById('toggle-info-btn');
    
    // 地图和侧边栏元素
    elements.map = document.getElementById('map');
    elements.sidebar = document.getElementById('sidebar');
  }
  
  // 绑定所有事件
  function bindAllEvents() {
    // 公共信息区域折叠/展开功能
    if (elements.toggleInfoBtn && elements.commonInfoContent) {
      elements.toggleInfoBtn.onclick = function() {
        if (elements.commonInfoContent.classList.contains('collapsed')) {
          elements.commonInfoContent.classList.remove('collapsed');
          elements.toggleInfoBtn.textContent = '收起 ▲';
        } else {
          elements.commonInfoContent.classList.add('collapsed');
          elements.toggleInfoBtn.textContent = '展开 ▼';
        }
      };
    }
    
    // 地图点击事件，自动收起公共信息
    if (elements.map && elements.commonInfoContent && elements.toggleInfoBtn) {
      elements.map.onclick = function() {
        // 自动收起公共信息区域
        if (!elements.commonInfoContent.classList.contains('collapsed')) {
          elements.commonInfoContent.classList.add('collapsed');
          elements.toggleInfoBtn.textContent = '展开 ▼';
        }
      };
    }
    

  }
  
  // 创建2025年秋季本科申请统计图表
  function createApplicationsChart() {
    const ctx = document.getElementById('applicationsChart');
    if (ctx) {
      const applicationsChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Oxford', 'Cambridge', 'UCL', 'Imperial', 'Edinburgh', 'Manchester', 'KCL', 'LSE', 'Birmingham'],
          datasets: [{
            label: '国际学生申请量',
            data: [25000, 24000, 32000, 22000, 28000, 26000, 24000, 20000, 21000],
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }, {
            label: '本地学生申请量',
            data: [15000, 14000, 20000, 12000, 18000, 19000, 17000, 14000, 16000],
            backgroundColor: 'rgba(74, 111, 165, 0.7)',
            borderColor: 'rgba(74, 111, 165, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: '英国大学校区'
              }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              title: {
                display: true,
                text: '申请数量'
              },
              ticks: {
                callback: function(value) {
                  return value.toLocaleString();
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.parsed.y.toLocaleString();
                  
                  // 计算占比
                  const total = context.chart.data.datasets.reduce((sum, dataset) => sum + dataset.data[context.dataIndex], 0);
                  const percentage = Math.round((context.parsed.y / total) * 100);
                  
                  return label + ' (' + percentage + '%)';
                }
              }
            }
          }
        }
      });
    }
  }
  
  // 当DOM内容加载完成后执行初始化
  document.addEventListener('DOMContentLoaded', function() {
    init();
  });
})();
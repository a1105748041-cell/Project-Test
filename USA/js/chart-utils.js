// 图表工具函数

/**
 * 创建录取率图表
 * @param {string|HTMLElement} canvas - Canvas元素或元素ID
 */
function createAcceptanceRateChart(canvas) {
  // 如果canvas是字符串，尝试通过ID获取元素
  const canvasElement = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
  if (!canvasElement || !window.universityChartData?.acceptanceRate) return null;
  
  const ctx = canvasElement.getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: window.universityChartData.acceptanceRate,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

/**
 * 创建专业分布饼图
 * @param {string|HTMLElement} canvas - Canvas元素或元素ID
 */
function createProgramDistributionChart(canvas) {
  // 如果canvas是字符串，尝试通过ID获取元素
  const canvasElement = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
  if (!canvasElement || !window.universityChartData?.programDistribution) return null;
  
  const ctx = canvasElement.getContext('2d');
  return new Chart(ctx, {
    type: 'pie',
    data: window.universityChartData.programDistribution,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        }
      }
    }
  });
}

/**
 * 创建录取分数折线图
 * @param {string|HTMLElement} canvas - Canvas元素或元素ID
 */
function createScoreTrendChart(canvas) {
  // 如果canvas是字符串，尝试通过ID获取元素
  const canvasElement = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
  if (!canvasElement || !window.universityChartData?.scoreTrend) return null;
  
  const ctx = canvasElement.getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: window.universityChartData.scoreTrend,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

/**
 * 销毁图表实例
 * @param {Object} chartInstance - Chart.js图表实例
 */
function destroyChart(chartInstance) {
  if (chartInstance && chartInstance.destroy) {
    chartInstance.destroy();
  }
}



// 将函数挂载到window对象，便于在浏览器环境中使用
if (typeof window !== 'undefined') {
  window.createAcceptanceRateChart = createAcceptanceRateChart;
  window.createProgramDistributionChart = createProgramDistributionChart;
  window.createScoreTrendChart = createScoreTrendChart;
  window.destroyChart = destroyChart;
}
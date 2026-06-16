// 申请时间线交互功能

/**
 * 初始化申请时间线交互功能
 */
function initApplicationTimeline() {
  console.log('【申请时间线】初始化时间线交互功能');
  
  // 为时间线项目添加交互事件
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    // 鼠标悬停效果
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = 'rgba(26, 115, 232, 0.05)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = '';
    });
    
    // 点击展开/折叠详情
    const content = item.querySelector('.timeline-content');
    item.addEventListener('click', (e) => {
      // 如果点击的是链接，不触发折叠效果
      if (e.target.tagName === 'A') return;
      
      if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        content.style.maxHeight = 'none';
      } else {
        content.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
  
  console.log('【申请时间线】时间线交互功能初始化完成，共初始化', timelineItems.length, '个时间点');
}

/**
 * 平滑滚动到时间线指定阶段
 * @param {number} stageIndex - 阶段索引（从0开始）
 */
function scrollToTimelineStage(stageIndex) {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timelineItems[stageIndex]) {
    timelineItems[stageIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // 高亮显示目标阶段
    timelineItems.forEach((item, index) => {
      if (index === stageIndex) {
        item.querySelector('.timeline-content').classList.add('highlighted');
        
        // 3秒后移除高亮
        setTimeout(() => {
          item.querySelector('.timeline-content').classList.remove('highlighted');
        }, 3000);
      }
    });
  }
}

/**
 * 显示申请时间线
 */
function showApplicationTimeline() {
  console.log('【申请时间线】显示申请时间线');
  
  // 确保公共信息区域展开
  const commonInfo = document.getElementById('common-info');
  const commonInfoContent = document.getElementById('common-info-content');
  const toggleBtn = document.getElementById('toggle-info-btn');
  
  if (commonInfoContent.classList.contains('collapsed')) {
    commonInfoContent.classList.remove('collapsed');
    commonInfoContent.classList.add('expanded');
    toggleBtn.textContent = '收起 ▲';
  }
  
  // 平滑滚动到时间线部分
  const timelineSection = document.querySelector('.timeline-section');
  if (timelineSection) {
    timelineSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * 为时间线添加过滤功能
 * @param {string} keyword - 过滤关键词
 */
function filterTimeline(keyword) {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const content = item.textContent.toLowerCase();
    const date = item.querySelector('.timeline-date').textContent.toLowerCase();
    
    if (content.includes(keyword.toLowerCase()) || date.includes(keyword.toLowerCase())) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * 重置时间线过滤
 */
function resetTimelineFilter() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.style.display = 'block';
  });
}

/**
 * 初始化公共信息区域的展开/折叠功能
 */
function initCommonInfo() {
  console.log('【公共信息】初始化展开/折叠功能');
  
  // 获取元素
  const toggleBtn = document.getElementById('toggle-info-btn');
  const content = document.getElementById('common-info-content');
  
  if (toggleBtn && content) {
    // 添加点击事件监听器
    toggleBtn.addEventListener('click', () => {
      console.log('【公共信息】点击展开/折叠按钮');
      
      if (content.classList.contains('collapsed')) {
        // 展开内容
        content.classList.remove('collapsed');
        content.classList.add('expanded');
        toggleBtn.textContent = '收起 ▲';
      } else {
        // 折叠内容
        content.classList.remove('expanded');
        content.classList.add('collapsed');
        toggleBtn.textContent = '展开 ▼';
      }
    });
    
    console.log('【公共信息】展开/折叠功能初始化完成');
  }
}

// 当DOM加载完成后初始化
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initApplicationTimeline();
    initCommonInfo();
    
    // 将关键函数挂载到window对象，便于外部调用
    window.showApplicationTimeline = showApplicationTimeline;
    window.scrollToTimelineStage = scrollToTimelineStage;
    window.filterTimeline = filterTimeline;
    window.resetTimelineFilter = resetTimelineFilter;
    
    console.log('【申请时间线】函数已挂载到window对象');
  });
}

// 导出功能（如果在模块化环境中使用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initApplicationTimeline,
    showApplicationTimeline,
    scrollToTimelineStage,
    filterTimeline,
    resetTimelineFilter,
    initCommonInfo
  };
}
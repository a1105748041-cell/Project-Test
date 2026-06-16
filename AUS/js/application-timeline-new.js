// 澳大利亚地图应用 - 申请流程时间线功能模块
// 确保DOM加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApplicationTimeline);
} else {
  initApplicationTimeline();
}

function initApplicationTimeline() {
  console.log('初始化申请流程时间线功能');
  
  // 确保所有时间线阶段默认展开
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.classList.remove('collapsed');
  });
  
  // 公共信息区域展开/收起功能 - 恢复此功能
  const commonInfoHeader = document.getElementById('common-info-header');
  const commonInfoContent = document.getElementById('common-info-content');
  const toggleInfoBtn = document.getElementById('toggle-info-btn');
  
  if (commonInfoHeader && commonInfoContent && toggleInfoBtn) {
    commonInfoHeader.addEventListener('click', () => {
      commonInfoContent.classList.toggle('collapsed');
      if (commonInfoContent.classList.contains('collapsed')) {
        toggleInfoBtn.textContent = '展开 ▼';
      } else {
        toggleInfoBtn.textContent = '收起 ▲';
      }
    });
  }
  
  // 查看申请流程按钮功能 - 保留滚动功能
  const viewApplicationProcessBtn = document.getElementById('view-application-process-btn');
  if (viewApplicationProcessBtn) {
    viewApplicationProcessBtn.addEventListener('click', showApplicationTimeline);
  }
  
  // 将关键函数挂载到window对象，便于外部调用
  window.showApplicationTimeline = showApplicationTimeline;
}

// 显示申请时间线
function showApplicationTimeline() {
  console.log('【申请时间线】显示申请时间线');
  
  // 确保公共信息区域展开
  const commonInfoContent = document.getElementById('common-info-content');
  const toggleBtn = document.getElementById('toggle-info-btn');
  
  if (commonInfoContent.classList.contains('collapsed')) {
    commonInfoContent.classList.remove('collapsed');
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
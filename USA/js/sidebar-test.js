// 侧边栏元素验证脚本
console.log('【侧边栏测试】开始验证侧边栏元素获取');

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  console.log('【侧边栏测试】DOM内容加载完成');
  
  // 验证侧边栏元素
  const sidebar = document.getElementById('sidebar');
  console.log('【侧边栏测试】侧边栏元素:', sidebar);
  console.log('【侧边栏测试】侧边栏类型:', typeof sidebar);
  console.log('【侧边栏测试】侧边栏是否为null:', sidebar === null);
  
  if (sidebar) {
    console.log('【侧边栏测试】侧边栏存在，ID正确获取');
    console.log('【侧边栏测试】侧边栏当前类名:', sidebar.className);
    console.log('【侧边栏测试】侧边栏当前样式:', getComputedStyle(sidebar));
    
    // 验证关闭按钮
    const closeButton = document.querySelector('.close-button');
    const closeButtonById = document.getElementById('close-btn');
    console.log('【侧边栏测试】通过.close-button找到的关闭按钮:', closeButton);
    console.log('【侧边栏测试】通过#close-btn找到的关闭按钮:', closeButtonById);
    
    // 验证info内容区域
    const infoContent = document.getElementById('info');
    console.log('【侧边栏测试】信息内容区域:', infoContent);
    
    // 【已注释】测试添加active类的效果 - 这会导致侧边栏自动闪现
    /*
    console.log('【侧边栏测试】测试添加active类');
    sidebar.classList.add('active');
    console.log('【侧边栏测试】添加active类后样式:', {
      className: sidebar.className,
      computedHeight: getComputedStyle(sidebar).height,
      computedTransform: getComputedStyle(sidebar).transform,
      computedDisplay: getComputedStyle(sidebar).display
    });
    
    // 移除active类
    setTimeout(() => {
      console.log('【侧边栏测试】移除active类');
      sidebar.classList.remove('active');
    }, 1000);
    */
  } else {
    console.error('【侧边栏测试】错误：侧边栏元素不存在');
    console.log('【侧边栏测试】尝试查找可能的侧边栏元素:', document.querySelectorAll('[id*="sidebar"],[class*="sidebar"]'));
  }
  
  // 注释掉测试直接操作样式的代码，避免页面加载时自动显示侧边栏
  /*
  if (sidebar) {
    setTimeout(() => {
      console.log('【侧边栏测试】测试直接设置样式');
      sidebar.style.height = '85%';
      sidebar.style.padding = '20px';
      sidebar.style.transform = 'translateY(0)';
      sidebar.style.bottom = '0';
      sidebar.style.opacity = '1';
      sidebar.style.display = 'block';
      sidebar.style.position = 'fixed';
      sidebar.style.zIndex = '1000';
      
      console.log('【侧边栏测试】直接设置样式后:', {
        height: sidebar.style.height,
        computedHeight: getComputedStyle(sidebar).height,
        computedDisplay: getComputedStyle(sidebar).display
      });
    }, 2000);
  }
  */
  
  // 验证showSidebar函数
  console.log('【侧边栏测试】showSidebar函数类型:', typeof window.showSidebar);
  if (typeof window.showSidebar === 'function') {
    console.log('【侧边栏测试】showSidebar函数已正确加载');
  } else {
    console.warn('【侧边栏测试】警告：showSidebar函数未找到或未正确加载');
  }
});

// 导出一个全局测试函数供调试使用
window.testSidebar = function() {
  console.log('【侧边栏测试】手动测试侧边栏');
  const sidebar = document.getElementById('sidebar');
  console.log('【侧边栏测试】当前侧边栏状态:', {
    element: sidebar,
    visible: window.sidebarVisible,
    locked: window.sidebarLocked
  });
  
  if (sidebar) {
    // 强制显示侧边栏
    sidebar.style.display = 'block';
    sidebar.style.height = '85%';
    sidebar.style.padding = '20px';
    sidebar.style.transform = 'translateY(0)';
    sidebar.style.bottom = '0';
    sidebar.style.opacity = '1';
    sidebar.style.position = 'fixed';
    sidebar.style.zIndex = '1000';
    sidebar.classList.add('active');
    
    console.log('【侧边栏测试】强制显示后状态:', {
      className: sidebar.className,
      computedHeight: getComputedStyle(sidebar).height
    });
  }
};

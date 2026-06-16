// UC地图应用 - 事件处理模块
;(function() {
  // 关闭侧边栏函数
  function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      // 移除active类，触发滑出动画
      sidebar.classList.remove('active', 'preview');
      setTimeout(() => {
        window.ucMapState.sidebarLocked = false;
      }, 400); // 与CSS transition时间保持一致
    }
  }

  // 初始化事件监听
  function initializeEventListeners() {
    const { map } = window.ucMapState;
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const toggleInfoBtn = document.getElementById('toggle-info-btn');
    const commonInfoContent = document.getElementById('common-info-content');

    // 关闭按钮事件监听
    if (closeBtn) {
      closeBtn.onclick = closeSidebar;
    }

    // 公共信息区域折叠/展开功能
    if (toggleInfoBtn && commonInfoContent) {
      toggleInfoBtn.onclick = function() {
        if (commonInfoContent.classList.contains('collapsed')) {
          commonInfoContent.classList.remove('collapsed');
          toggleInfoBtn.textContent = '收起 ▲';
        } else {
          commonInfoContent.classList.add('collapsed');
          toggleInfoBtn.textContent = '展开 ▼';
        }
      };
    }

    // 地图点击事件处理
    map.on('click', function () {
      try {
        // 关闭侧边栏
        if (sidebar.classList.contains('active')) {
          closeSidebar();
        }
        
        // 自动收起公共信息区域
        if (commonInfoContent && !commonInfoContent.classList.contains('collapsed')) {
          commonInfoContent.classList.add('collapsed');
          if (toggleInfoBtn) {
            toggleInfoBtn.textContent = '展开 ▼';
          }
        }
      } catch (error) {
        console.error('地图点击事件处理出错:', error);
      }
    });

    // 全局点击事件 - 处理侧边栏关闭
    document.addEventListener('click', function(event) {
      if (sidebar && sidebar.classList.contains('active')) {
        // 检查点击目标是否在侧边栏内
        if (!sidebar.contains(event.target)) {
          // 检查点击目标是否为关闭按钮（避免重复关闭）
          if (event.target.id !== 'close-btn') {
            // 检查点击目标是否为标记图标
            if (event.target.closest('.leaflet-marker-icon') === null && 
                event.target.closest('.hover-popup') === null) {
              closeSidebar();
            }
          }
        }
      }
    });
  }

  // 添加标记事件监听
  function addMarkerEventListeners(markers) {
    const { map } = window.ucMapState;

    // 遍历所有标记，添加事件监听
    markers.forEach(marker => {
      const feature = marker.feature;
      
      // 鼠标悬停事件
      marker.on("mouseover", () => {
        if (!window.ucMapState.sidebarLocked) {
          try {
            // 关闭现有悬停卡片
            if (window.ucMapState.hoverCard) {
              map.closePopup(window.ucMapState.hoverCard);
            }
            
            const name = feature.properties.name || '未知学校';
            const img = feature.properties.img || '';
            const ranking = feature.properties.ranking || '未提供';
            
            const html = `
              <div class="hover-card">
                ${img ? `<img src="${img}" alt="${name}" loading="lazy" onerror="this.style.display='none'">` : ''}
                <h4>${name}</h4>
                <p>排名：${ranking}</p>
              </div>
            `;
            
            window.ucMapState.hoverCard = L.popup({
              offset: [20, -30],
              autoClose: false,
              closeButton: false,
              className: 'hover-popup'
            })
              .setLatLng(marker.getLatLng())
              .setContent(html)
              .openOn(map);
          } catch (error) {
            console.error(`显示学校悬停信息时出错:`, error);
          }
        }
      });

      // 鼠标移出事件
      marker.on("mouseout", () => {
        if (window.ucMapState.hoverCard) {
          map.closePopup(window.ucMapState.hoverCard);
        }
      });

      // 点击事件
      marker.on("click", () => {
        window.ucMapState.sidebarLocked = true;
        window.ucMapUI.showFull(feature.properties);
        // 平滑滚动到顶部
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
          sidebar.scrollTop = 0;
        }
      });
    });
  }

  // 暴露事件处理函数
  window.ucMapEvents = {
    closeSidebar,
    initializeEventListeners,
    addMarkerEventListeners
  };
})();

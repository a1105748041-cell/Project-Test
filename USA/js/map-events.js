// closeSidebar函数已在sidebar-utils.js中定义并全局暴露

// 全局点击事件监听器 - 处理侧边栏和概述栏的关闭
document.addEventListener('click', function(event) {
  // 等待DOM完全加载
  if (document.readyState !== 'complete') return;
  
  // 处理侧边栏关闭
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    const isSidebarVisible = sidebar.classList.contains('active') || sidebar.classList.contains('preview');
    const mapElement = document.getElementById('map');
    
    if (isSidebarVisible) {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnCloseBtn = event.target.id === 'close-btn';
      const isClickOnMarker = event.target.closest('.leaflet-marker-icon') !== null;
      const isClickOnPopup = event.target.closest('.hover-popup') !== null;
      
      // 关闭侧边栏的逻辑
      if (!isClickInsideSidebar && !isClickOnCloseBtn && !isClickOnMarker && !isClickOnPopup) {
        // 检查是否点击了地图空白区域
        const isClickOnMap = mapElement && (
          event.target.id === 'map' || 
          event.target.closest('.leaflet-container') !== null ||
          event.target.closest('.leaflet-tile-pane') !== null ||
          event.target.closest('.leaflet-overlay-pane') !== null
        );
        
        // 如果点击了地图空白区域，关闭侧边栏
        if (isClickOnMap) {
          window.closeSidebar();
        }
      }
    }
  }
  
  // 处理概述栏关闭
  const commonInfo = document.getElementById('common-info');
  const commonInfoContent = document.getElementById('common-info-content');
  const toggleBtn = document.getElementById('toggle-info-btn');
  
  if (commonInfo && commonInfoContent && toggleBtn) {
    const isExpanded = !commonInfoContent.classList.contains('collapsed') || 
                      commonInfoContent.classList.contains('expanded');
    
    if (isExpanded && !commonInfo.contains(event.target) && event.target.id !== 'toggle-info-btn') {
      commonInfoContent.classList.remove('expanded');
      commonInfoContent.classList.add('collapsed');
      toggleBtn.textContent = '展开 ▼';
    }
  }
});

// 地图事件处理函数
function setupMapEvents() {
  // 检查地图实例是否存在
  if (typeof map === 'undefined') {
    console.error('地图实例未初始化，setupMapEvents函数无法执行');
    return;
  }
  
  // 确保全局状态对象存在
  window.mapState = window.mapState || {};
  
  // 关闭按钮点击事件
  const closeBtn = document.getElementById('close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeSidebar);
  }

  // 数据缓存对象，避免重复加载相同的数据
  const dataCache = {};
  
  // 带重试机制的数据加载函数
  function fetchWithRetry(url, options = {}) {
    const {
      retries = 3,
      delay = 1000,
      cache = true,
      timeout = 10000 // 10秒超时
    } = options;
    
    // 检查缓存
    if (cache && dataCache[url]) {
      return Promise.resolve(dataCache[url]);
    }
    
    // 创建带超时的fetch请求
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`请求超时 (${timeout}ms): ${url}`)), timeout);
    });
    
    return Promise.race([fetchPromise, timeoutPromise])
      .then(res => {
        if (!res.ok) throw new Error(`HTTP错误! 状态: ${res.status}`);
        return res.json();
      })
      .then(data => {
        // 将数据存入缓存
        if (cache) {
          dataCache[url] = data;
        }
        return data;
      })
      .catch(error => {
        if (retries > 0) {
          const nextDelay = delay * 1.5;
          return new Promise(resolve => setTimeout(resolve, nextDelay))
            .then(() => fetchWithRetry(url, {
              ...options,
              retries: retries - 1,
              delay: nextDelay
            }));
        }
        throw error;
      });
  }
  
  // 验证和清理地理数据
  function validateAndCleanGeoData(data) {
    if (!data || !data.features || !Array.isArray(data.features)) {
      throw new Error('无效的地理数据格式，缺少features属性或features不是数组');
    }
    
    // 清理和验证features
    const validFeatures = data.features.filter(feature => {
      if (!feature || !feature.geometry || !feature.geometry.coordinates) {
        return false;
      }
      
      if (!Array.isArray(feature.geometry.coordinates) || feature.geometry.coordinates.length < 2) {
        return false;
      }
      
      feature.properties = feature.properties || {};
      return true;
    });
    
    return {
      ...data,
      features: validFeatures
    };
  }
  
  // 批量添加事件监听器到标记
  function addEventListenersToMarkers(markers) {
    // 鼠标悬停事件处理函数
    function handleMouseOver(e) {
      if (window.mapState.sidebarLocked) return;
      
      const marker = e.target;
      const feature = marker.feature;
      
      if (window.mapState.hoverCard) map.closePopup(window.mapState.hoverCard);
      
      // 使用全局函数获取学校logo
      const logoFileName = window.getSchoolLogo(feature.properties.englishName, feature.properties.name);
      
      const html = `
        <div class="hover-card">
          ${logoFileName ? `<img src="imgs/${logoFileName}" alt="${feature.properties.name || '学校'} logo">` : ''}
          <h4>${feature.properties.name || '未知学校'}</h4>
          <p>${feature.properties.ranking || ''}</p>
        </div>
      `;
      
      window.mapState.hoverCard = L.popup({
        offset: [20, -30],
        autoClose: false,
        closeButton: false,
        className: 'hover-popup'
      })
        .setLatLng(marker.getLatLng())
        .setContent(html)
        .openOn(map);
    }
    
    // 鼠标移出事件处理函数
    function handleMouseOut() {
      if (window.mapState.hoverCard && !window.mapState.sidebarLocked) {
        map.closePopup(window.mapState.hoverCard);
      }
    }
    
    // 点击事件处理函数
    function handleClick(e) {
      const marker = e.target;
      const feature = marker.feature;
      
      window.mapState.sidebarLocked = true;
      
      // 重置所有标记样式
      markers.forEach(m => {
        if (m.feature) {
          m.setIcon(window.createSchoolIcon(m.feature, false));
        }
      });
      
      // 设置当前标记为选中状态
      marker.setIcon(window.createSchoolIcon(feature, true));
      
      // 显示侧边栏预览和完整内容
      if (typeof window.showPreview === 'function') {
        window.showPreview(feature.properties);
      }
      
      // 延迟显示完整侧边栏
      setTimeout(() => {
        if (typeof window.showFull === 'function') {
          window.showFull(feature.properties);
        }
      }, 300);
    }
    
    // 批量添加事件监听器
    markers.forEach(marker => {
      marker.on('mouseover', handleMouseOver);
      marker.on('mouseout', handleMouseOut);
      marker.on('click', handleClick);
    });
  }

  // 加载并处理地理数据
  fetchWithRetry("stats/usa-universities.geojson", {
    retries: 3,
    delay: 1000,
    cache: true,
    timeout: 15000 // 15秒超时
  })
    .then(data => {
      // 验证和清理数据
      const cleanedData = validateAndCleanGeoData(data);
      
      // 创建图层组管理所有标记，提高性能
      window.universityMarkerGroup = window.universityMarkerGroup || L.layerGroup().addTo(map);
      
      // 批量创建标记
      const markers = cleanedData.features.map(feature => {
        const latlng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
        const marker = L.marker(latlng, { icon: window.createSchoolIcon(feature) });
        marker.feature = feature;
        return marker;
      });
      
      // 存储所有标记
      window.universityMarkers = markers;
      
      // 将所有标记添加到图层组
      markers.forEach(marker => {
        window.universityMarkerGroup.addLayer(marker);
      });
      
      // 批量添加事件监听器
      addEventListenersToMarkers(markers);
    })
    .catch(error => {
      console.error("地图数据加载失败:", error);
      // 更友好的错误提示
      alert(`加载大学数据失败: ${error.message}\n请检查网络连接后刷新页面重试。`);
    });
}

function focusOnUniversity(searchName) {
  if (!searchName || typeof map === 'undefined') return;
  
  const searchLower = searchName.toLowerCase();
  
  if (window.universityMarkers && window.universityMarkers.length > 0) {
    for (const marker of window.universityMarkers) {
      const feature = marker.feature;
      const name = (feature.properties.name || '').toLowerCase();
      const englishName = (feature.properties.englishName || '').toLowerCase();
      
      if (name.includes(searchLower) || englishName.includes(searchLower)) {
        const latlng = marker.getLatLng();
        
        map.setView(latlng, 12);
        
        marker.setIcon(window.createSchoolIcon(feature, true));
        
        setTimeout(() => {
          if (typeof window.showPreview === 'function') {
            window.showPreview(feature.properties);
          }
          setTimeout(() => {
            if (typeof window.showFull === 'function') {
              window.showFull(feature.properties);
            }
          }, 300);
        }, 500);
        
        break;
      }
    }
  }
}

function checkSearchParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchName = urlParams.get('search');
  
  if (searchName) {
    const checkInterval = setInterval(() => {
      if (window.universityMarkers && window.universityMarkers.length > 0) {
        clearInterval(checkInterval);
        focusOnUniversity(decodeURIComponent(searchName));
      }
    }, 200);
    
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);
  }
}

// 当DOM加载完成后初始化地图事件
document.addEventListener('DOMContentLoaded', function() {
  checkSearchParam();
  
  if (typeof map === 'undefined') {
    setTimeout(setupMapEvents, 500);
  } else {
    setupMapEvents();
  }
});
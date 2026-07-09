// UC地图应用 - 主应用模块
;(function() {
  let allMarkers = [];

  // 聚焦到指定大学
  function focusOnUniversity(searchName) {
    if (!searchName || !window.ucMapState || !window.ucMapState.map) return;
    
    const { map } = window.ucMapState;
    const searchLower = searchName.toLowerCase();
    
    if (allMarkers && allMarkers.length > 0) {
      for (const marker of allMarkers) {
        const feature = marker.feature;
        const name = (feature.properties.name || '').toLowerCase();
        
        if (name.includes(searchLower)) {
          const latlng = marker.getLatLng();
          
          map.setView(latlng, 12);
          
          setTimeout(() => {
            if (window.ucMapUI && typeof window.ucMapUI.showFull === 'function') {
              window.ucMapUI.showFull(feature.properties);
            }
          }, 500);
          
          break;
        }
      }
    }
  }

  // 检查搜索参数
  function checkSearchParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchName = urlParams.get('search');
    
    if (searchName) {
      const checkInterval = setInterval(() => {
        if (allMarkers && allMarkers.length > 0) {
          clearInterval(checkInterval);
          focusOnUniversity(decodeURIComponent(searchName));
        }
      }, 200);
      
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 10000);
    }
  }

  // 主应用初始化函数
  function initializeApp() {
    // 确保地图已初始化
    if (!window.ucMapState || !window.ucMapState.map) {
      console.error('地图未初始化，等待初始化完成...');
      setTimeout(initializeApp, 100);
      return;
    }

    const { map } = window.ucMapState;

    // 加载GeoJSON数据并添加到地图
    window.ucMapData.loadGeoJsonData("uc-campuses-updated.geojson")
      .then(data => {
        // 创建图层组管理所有标记
        const markersLayer = L.layerGroup().addTo(map);

        // 创建标记
        L.geoJSON(data, {
          pointToLayer: (feature, latlng) => {
            const marker = L.marker(latlng);
            marker.feature = feature;
            allMarkers.push(marker);
            return marker;
          }
        }).addTo(markersLayer);

        // 添加标记事件监听
        window.ucMapEvents.addMarkerEventListeners(allMarkers);

        // 初始化全局事件监听
        window.ucMapEvents.initializeEventListeners();

        // 初始化图表
        initializeCharts();

        // 检查搜索参数
        checkSearchParam();
      })
      .catch(error => {
        console.error('加载GeoJSON数据时出错:', error);
        alert('加载学校数据失败，请刷新页面重试');
      });
  }

  // 初始化图表
  function initializeCharts() {
    let applicationsChart = null;
    try {
      applicationsChart = window.ucMapUI.createApplicationsChart();
    } catch (error) {
      console.error('初始化图表时出错:', error);
    }
  }

  // 确保DOM加载完成后执行初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    // DOM已经加载完成，立即执行初始化
    initializeApp();
  }

  // 暴露主应用函数
  window.ucMapApp = {
    initializeApp,
    initializeCharts
  };
})();

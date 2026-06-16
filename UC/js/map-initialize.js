// UC地图应用 - 地图初始化模块
;(function() {
  // 地图配置常量
  const MAP_CONFIG = {
    CENTER: [36.7, -119.5],
    ZOOM: 6,
    MIN_ZOOM: 5,
    MAX_ZOOM: 16,
    TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION: ''
  };

  // 初始化地图
  function initializeMap() {
    // 创建地图实例
    const map = L.map('map').setView(MAP_CONFIG.CENTER, MAP_CONFIG.ZOOM);
    
    // 添加底图图层
    L.tileLayer(MAP_CONFIG.TILE_LAYER_URL, {
      maxZoom: MAP_CONFIG.MAX_ZOOM,
      minZoom: MAP_CONFIG.MIN_ZOOM,
      attribution: MAP_CONFIG.ATTRIBUTION
    }).addTo(map);

    return map;
  }

  // 全局状态管理对象
  window.ucMapState = {
    sidebarLocked: false,
    hoverCard: null,
    map: null,
    config: MAP_CONFIG
  };

  // 确保DOM加载完成后初始化地图
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.ucMapState.map = initializeMap();
    });
  } else {
    // DOM已经加载完成，立即执行初始化
    window.ucMapState.map = initializeMap();
  }

  // 暴露初始化函数和配置
  window.ucMapInitialize = {
    initializeMap,
    MAP_CONFIG
  };
})();

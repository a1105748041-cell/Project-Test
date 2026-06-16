// 澳大利亚地图应用 - 初始化模块
;(function() {
  // 地图配置常量
  const MAP_CONFIG = {
    CENTER: [-25, 135], // 澳大利亚中心坐标
    ZOOM: 4,
    MIN_ZOOM: 3,
    MAX_ZOOM: 18,
    TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ATTRIBUTION: '© OpenStreetMap contributors'
  };

  // 初始化地图实例
  const map = L.map('map').setView(MAP_CONFIG.CENTER, MAP_CONFIG.ZOOM);
  
  // 添加底图图层
  L.tileLayer(MAP_CONFIG.TILE_LAYER_URL, {
    maxZoom: MAP_CONFIG.MAX_ZOOM,
    minZoom: MAP_CONFIG.MIN_ZOOM,
    attribution: MAP_CONFIG.ATTRIBUTION
  }).addTo(map);

  // 全局状态管理对象
  window.ausMapState = {
    map: map,
    sidebarLocked: false,
    hoverCard: null,
    config: MAP_CONFIG
  };
})();
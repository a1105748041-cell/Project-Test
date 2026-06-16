// 地图初始化和配置
var map;

// 地图配置参数
const MAP_CONFIG = {
  center: [39.8283, -98.5795],
  zoom: 4,
  minZoom: 3,
  maxZoom: 18,
  tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© OpenStreetMap contributors'
};

// 初始化地图
function initMap() {
  if (typeof L === 'undefined') {
    console.log('等待Leaflet库加载...');
    setTimeout(initMap, 100); // 100ms后重试
    return;
  }
  
  // 创建地图实例
  map = L.map('map', {
    minZoom: MAP_CONFIG.minZoom,
    maxZoom: MAP_CONFIG.maxZoom
  }).setView(MAP_CONFIG.center, MAP_CONFIG.zoom);
  
  // 添加地图图层
  L.tileLayer(MAP_CONFIG.tileLayerUrl, {
    attribution: MAP_CONFIG.attribution
  }).addTo(map);
  
  // 地图加载完成后初始化事件
  map.on('load', function() {
    if (window.setupMapEvents) {
      window.setupMapEvents();
    }
  });
}

// 初始化全局状态
window.mapState = {
  sidebarLocked: false,
  hoverCard: null,
  sidebarVisible: false
};

// 学校Logo映射表
const SCHOOL_LOGO_MAP = {
  'princeton|普林斯顿': 'princeton-logo.png',
  'mit|麻省理工': 'mit-logo.png',
  'harvard|哈佛': 'harvard-logo.png',
  'stanford|斯坦福': 'stanford-logo.png',
  'chicago|芝加哥': 'uchicago-logo.png',
  'pennsylvania|upenn|宾大|宾夕法尼亚': 'upenn-logo.png',
  'caltech|加州理工': 'caltech-logo.png',
  'duke|杜克': 'duke-logo.png',
  'johns hopkins|jhu|约翰霍普金斯': 'jhu-logo.png',
  'dartmouth|达特茅斯': 'dartmouth-logo.png',
  'northwestern|西北': 'northwestern-logo.png',
  'notre dame|圣母': 'notre-dame-logo.png',
  'georgetown|乔治城': 'georgetown-logo.png',
  'virginia|弗吉尼亚': 'uvirginia-logo.png',
  'florida|佛罗里达': 'uflorida-logo.png',
  'pennsylvania state|psu|宾夕法尼亚州立': 'penn-state-logo.png',
  'stony brook|石溪': 'stony-brook-logo.png',
  'minnesota|明尼苏达': 'minnesota-logo.png',
  'michigan state|msu|密歇根州立': 'michigan-state-logo.png',
  'pittsburgh|匹兹堡': 'pitt-logo.png',
  'vanderbilt|范德堡': 'vanderbilt-logo.png',
  'michigan|密歇根': 'michigan-logo.jpg',
  'north carolina|北卡罗来纳': 'north-carolina-logo.jpeg',
  'new york university|nyu|纽约': 'nyu-logo.png',
  'illinois|伊利诺伊': 'illinois-logo.png',
  'wisconsin|威斯康星': 'wisconsin-logo.jpg',
  'ohio state|俄亥俄': 'ohio-state-logo.webp',
  'boston|波士顿': 'boston-logo.png',
  'northeastern|东北': 'NU-logo.png',
  'connecticut|康涅狄格': 'connecticut-logo.png',
  'rutgers|罗格斯': 'Rutgers-logo.png',
  'rochester|罗切斯特': 'RU-logo.png',
  'southern california|usc|南加州': 'USC-logo.png',
  'cornell|康奈尔': 'Cornell-logo.png',
  'brown|布朗': 'Brown-logo.png',
  'columbia|哥伦比亚': 'Columbia-logo.png',
  'washington university|wustl|圣路易斯|华盛顿': 'WashU-logo.png'
};

// 根据学校名称获取对应的logo文件 - 支持中文和英文名称
window.getSchoolLogo = function(schoolName, chineseName = '') {
  if (!schoolName && !chineseName) return '';
  
  // 合并名称并转换为小写
  const combinedName = (schoolName + ' ' + chineseName).toLowerCase();
  
  // 使用正则表达式匹配学校名称
  for (const [pattern, logo] of Object.entries(SCHOOL_LOGO_MAP)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(combinedName)) {
      return logo;
    }
  }
  return '';
};

// 创建自定义学校图标 - 支持选中状态
window.createSchoolIcon = function(feature, isSelected = false) {
  const iconUrl = isSelected 
    ? 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png' 
    : 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
  
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });
};

// 启动地图初始化
initMap();
// 英国地图应用 - 事件处理模块
function setupMapEvents() {
  // 确保地图状态对象已经初始化
  if (typeof window.ukMapState === 'undefined') {
    console.warn('地图状态对象尚未初始化，等待初始化...');
    // 等待地图状态对象初始化
    const checkInterval = setInterval(() => {
      if (typeof window.ukMapState !== 'undefined') {
        clearInterval(checkInterval);
        setupMapEvents();
      }
    }, 100);
    
    // 设置超时
    setTimeout(() => {
      clearInterval(checkInterval);
      console.error('地图状态对象初始化超时');
    }, 5000);
    return;
  }

  const { map } = window.ukMapState;
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('close-btn');

  // 关闭侧边栏函数
  const closeSidebar = () => {
    sidebar.classList.remove('active', 'preview');
    window.ukMapState.sidebarLocked = false;
  };

  // 显示悬停卡片函数
  const showHoverCard = (feature) => {
    if (window.ukMapState.sidebarLocked) return;
    
    // 关闭现有悬停卡片
    if (window.ukMapState.hoverCard) {
      map.closePopup(window.ukMapState.hoverCard);
    }

    const html = `
      <div class="hover-card">
        <img src="${feature.properties.img}" alt="${feature.properties.name}">
        <h4>${feature.properties.name}</h4>
        <p>排名：${feature.properties.ranking} </p>
      </div>
    `;

    window.ukMapState.hoverCard = L.popup({
      offset: [20, -30],
      autoClose: false,
      closeButton: false,
      className: 'hover-popup'
    })
      .setLatLng([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
      .setContent(html)
      .openOn(map);
  };

  // 隐藏悬停卡片函数
  const hideHoverCard = () => {
    if (window.ukMapState.hoverCard && !window.ukMapState.sidebarLocked) {
      map.closePopup(window.ukMapState.hoverCard);
    }
  };

  // 带重试机制的数据加载函数
  const fetchWithRetry = (url, retries = 3, delay = 1000) => {
    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP错误! 状态: ${res.status}`);
        return res.json();
      })
      .catch(error => {
        if (retries > 0) {
          return new Promise(resolve => setTimeout(resolve, delay))
            .then(() => fetchWithRetry(url, retries - 1, delay * 1.5));
        }
        throw error;
      });
  };

  // 显示数据加载错误信息
  const showDataError = (error) => {
    console.error('地图数据加载失败:', error);
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'map-error-message';
    errorDiv.innerHTML = `
      <h3>数据加载失败</h3>
      <p>无法加载大学地图数据，请尝试刷新页面或稍后再试。</p>
      <button onclick="window.location.reload()">刷新页面</button>
    `;
    mapElement.appendChild(errorDiv);
  };

  // 关闭按钮点击事件
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  // 地图点击事件
  map.on('click', () => {
    if (!window.ukMapState.sidebarLocked) {
      closeSidebar();
    }
  });

  // 空白区域点击事件 - 自动关闭侧边栏
  document.addEventListener('click', (e) => {
    const isSidebarActive = sidebar.classList.contains('active') || sidebar.classList.contains('preview');
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnMarker = e.target.closest('.leaflet-marker-icon') !== null;
    const isClickOnPopup = e.target.closest('.hover-popup') !== null;

    // 关闭学校信息侧边栏的逻辑
    if (isSidebarActive && !isClickInsideSidebar && !isClickOnMarker && !isClickOnPopup) {
      closeSidebar();
    }
  });

  // 存储所有标记
  let allMarkers = [];

  // 加载并处理地理数据
  fetchWithRetry("stats/uk-universities.geojson")
    .then(data => {
      console.log('地图数据加载成功，包含', data.features.length, '所大学');
      
      // 创建图层组管理所有标记
      const markersLayer = L.layerGroup().addTo(map);
      
      L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          const marker = L.marker(latlng).addTo(markersLayer);
          marker.feature = feature;
          allMarkers.push(marker);
          return marker;
        },
        onEachFeature: (feature, layer) => {
          layer.on("mouseover", () => showHoverCard(feature));
          layer.on("mouseout", hideHoverCard);
          layer.on("click", () => {
            window.ukMapState.sidebarLocked = true;
            showFull(feature.properties);
          });
        }
      });
      
      // 存储到全局变量以便搜索使用
      window.ukUniversityMarkers = allMarkers;
    })
    .catch(showDataError);
}

function focusOnUniversity(searchName) {
  if (!searchName || typeof window.ukMapState === 'undefined') return;
  
  const { map } = window.ukMapState;
  const searchLower = searchName.toLowerCase();
  
  if (window.ukUniversityMarkers && window.ukUniversityMarkers.length > 0) {
    for (const marker of window.ukUniversityMarkers) {
      const feature = marker.feature;
      const name = (feature.properties.name || '').toLowerCase();
      
      if (name.includes(searchLower)) {
        const latlng = marker.getLatLng();
        
        map.setView(latlng, 12);
        
        setTimeout(() => {
          if (typeof showFull === 'function') {
            showFull(feature.properties);
          }
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
      if (window.ukUniversityMarkers && window.ukUniversityMarkers.length > 0) {
        clearInterval(checkInterval);
        focusOnUniversity(decodeURIComponent(searchName));
      }
    }, 200);
    
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);
  }
}
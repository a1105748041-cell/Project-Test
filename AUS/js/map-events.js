// 澳大利亚地图应用 - 事件处理模块
function setupMapEvents() {
  // 确保地图状态对象已经初始化
  if (typeof window.ausMapState === 'undefined') {
    console.error('地图状态对象尚未初始化，setupMapEvents函数无法执行');
    return;
  }

  const { map } = window.ausMapState;
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.getElementById('close-btn');

  // 关闭侧边栏函数
  const closeSidebar = () => {
    sidebar.classList.remove('active', 'preview');
    window.ausMapState.sidebarLocked = false;
  };

  // 显示悬停卡片函数
  const showHoverCard = (feature) => {
    if (window.ausMapState.sidebarLocked) return;
    
    // 关闭现有悬停卡片
    if (window.ausMapState.hoverCard) {
      map.closePopup(window.ausMapState.hoverCard);
    }

    const html = `
      <div class="hover-card">
        <img src="${feature.properties.img}" alt="${feature.properties.name}">
        <h4>${feature.properties.name}</h4>
        <p>排名：${feature.properties.ranking} </p>
      </div>
    `;

    window.ausMapState.hoverCard = L.popup({
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
    if (window.ausMapState.hoverCard && !window.ausMapState.sidebarLocked) {
      map.closePopup(window.ausMapState.hoverCard);
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
    if (!window.ausMapState.sidebarLocked) {
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

  // 加载并处理地理数据
  fetchWithRetry("stats/aus-universities.geojson")
    .then(data => {
      console.log('地图数据加载成功，包含', data.features.length, '所大学');
      
      // 创建图层组管理所有标记
      const markersLayer = L.layerGroup().addTo(map);
      
      L.geoJSON(data, {
        pointToLayer: (feature, latlng) => L.marker(latlng).addTo(markersLayer),
        onEachFeature: (feature, layer) => {
          layer.on("mouseover", () => showHoverCard(feature));
          layer.on("mouseout", hideHoverCard);
          layer.on("click", () => {
            window.ausMapState.sidebarLocked = true;
            showFull(feature.properties);
          });
        }
      });
    })
    .catch(showDataError);
}
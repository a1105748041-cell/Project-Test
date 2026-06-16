// 澳大利亚地图应用 - 侧边栏功能模块

// 侧边栏预览功能
function showPreview(props) {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.add('active', 'preview');
  document.getElementById('info').innerHTML = `
<div class="school-card preview">
  <img src="${props.img}" alt="${props.name}">
  <div class="school-details preview">
    <h2>${props.name}</h2>
    <div class="school-grid preview">
      <div class="grid-label">Ranking:</div><div>${props.ranking}</div>
    </div>
  </div>
</div>
`;
}

// 侧边栏完整信息显示功能
function showFull(props) {
  try {
    console.log('显示学校详情:', props?.name || '未知学校');
    
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) {
      console.error('未找到侧边栏元素');
      return;
    }
    
    sidebar.classList.add('active');
    sidebar.classList.remove('preview');
    
    // 防御性编程：确保所有属性都有默认值
    const safeProps = {
      name: props?.name || '未知学校',
      img: props?.img || '/imgs/default_logo.png',
      ranking: props?.ranking || '暂无数据',
      website: props?.website || '#',
      popularMajors: props?.popularMajors || '暂无数据',
      tuition: props?.tuition || '暂无数据'
    };
    
    // 查找当前学校的完整数据，包括HTML模板
    let schoolData = null;
    // 遍历所有排名段
    if (window.ausUniversitiesData) {
      for (const [rankRange, schools] of Object.entries(window.ausUniversitiesData)) {
        const foundSchool = schools.find(school => school['学校名称'] && school['学校名称'].includes(safeProps.name));
        if (foundSchool) {
          schoolData = foundSchool;
          break;
        }
      }
    }
    
    // 替换模板中的占位符
    function replacePlaceholders(template, values) {
      if (!template) return '';
      return template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        return values[key.trim()] || '';
      });
    }
    
    // 为所有学校显示基本信息
    let htmlContent = `
<div class="school-container">
  <!-- 保持图片和原有内容的水平布局 -->
  <div class="school-card">
    <img src="${safeProps.img}" alt="${safeProps.name}">
    <div class="school-details">
        <h2>${safeProps.name}</h2>
        <div class="school-grid">
        <div class="school-row">
        <div class="grid-label">排名</div>
        <div class="grid-value">${safeProps.ranking}</div>
      </div>
    </div>

      <p class="school-link"><a href="${safeProps.website}" target="_blank">${safeProps.website}</a></p>
    </div>
  </div>
  
  <!-- 图片和原有内容下方新增的学校信息 -->
  <div class="school-additional-info">
    <h3>学校信息</h3>
    <div class="school-row">
      <div class="grid-label">英文名称</div>
      <div class="grid-value">${schoolData?.['英文名称'] || '暂无数据'}</div>
    </div>
    <div class="school-row">
      <div class="grid-label">地理位置</div>
      <div class="grid-value">${schoolData?.['地理位置'] || '暂无数据'}</div>
    </div>
    <div class="school-row">
      <div class="grid-label">收录专业数</div>
      <div class="grid-value">${schoolData?.['收录专业数'] || '暂无数据'}</div>
    </div>
    <div class="school-row">
      <div class="grid-label">热门专业</div>
      <div class="grid-value">${safeProps.popularMajors}</div>
    </div>`;
  
    // 从JSON加载HTML模板
    let specialContent = '';
    if (schoolData && schoolData.html_template) {
      specialContent = replacePlaceholders(schoolData.html_template, safeProps);
    } else {
      // 默认只显示学费
      specialContent = `
        <div class="school-row">
          <div class="grid-label">学费</div>
          <div class="grid-value">${safeProps.tuition}</div>
        </div>`;
    }
    
    htmlContent += specialContent + `
  </div>`;
  
    // 从JSON加载可视化模板
    let visualizationHtml = '';
    if (schoolData && schoolData.visualization_template) {
      visualizationHtml = schoolData.visualization_template;
    }
    
    htmlContent += visualizationHtml + `
</div>`;
    
    const infoElement = document.getElementById('info');
    if (infoElement) {
      infoElement.innerHTML = htmlContent;
    } else {
      console.error('未找到信息容器元素');
    }
    
    console.log('学校详情显示完成:', safeProps.name);
  } catch (error) {
    console.error('显示学校详情时出错:', error);
    
    // 显示错误信息给用户
    const sidebar = document.getElementById('sidebar');
    const infoElement = document.getElementById('info');
    
    if (sidebar && infoElement) {
      sidebar.classList.add('active');
      infoElement.innerHTML = `
        <div class="error-container" style="
          padding: 20px;
          text-align: center;
          color: #c62828;
          background: #ffebee;
          border-radius: 5px;
        ">
          <h3>加载信息失败</h3>
          <p>无法显示学校详情，请稍后重试</p>
          <button onclick="window.location.reload()" style="
            margin-top: 10px;
            padding: 8px 16px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          ">刷新页面</button>
        </div>
      `;
    }
  }
}
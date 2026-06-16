// 侧边栏工具函数

// 关闭侧边栏 - 全局暴露
window.closeSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  const preview = document.getElementById('preview');
  const info = document.getElementById('info');
  
  if (!sidebar) {
    console.error('找不到侧边栏元素');
    return;
  }
  
  sidebar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  sidebar.classList.remove('active', 'preview');
  
  // 重置标记状态
  if (window.universityMarkers) {
    window.universityMarkers.forEach(marker => {
      if (marker.feature) {
        marker.setIcon(window.createSchoolIcon(marker.feature, false));
      }
    });
  }
  
  // 延迟重置状态，确保过渡效果完成
  setTimeout(() => {
    window.mapState.sidebarVisible = false;
    window.mapState.sidebarLocked = false;
    
    // 隐藏预览和信息内容
    if (preview) {
      preview.style.display = 'none';
    }
    if (info) {
      info.style.display = 'none';
    }
  }, 300);
}

// 显示侧边栏预览 - 全局暴露
window.showPreview = function(properties) {
  if (!properties || typeof properties !== 'object') {
    console.error('showPreview 收到无效的 properties 参数');
    return;
  }
  
  const sidebar = document.getElementById('sidebar');
  const preview = document.getElementById('preview');
  const info = document.getElementById('info');
  
  if (!sidebar || !preview) {
    console.error('找不到侧边栏或预览元素');
    return;
  }
  
  // 使用全局函数获取学校logo
  const logoFileName = window.getSchoolLogo(properties.englishName, properties.name);
  
  // 构建预览HTML
  const previewHtml = `
    <div class="preview-container">
      ${logoFileName ? `<img src="imgs/${logoFileName}" alt="${properties.name || ''} logo">` : ''}
      <div class="preview-content">
        <h3>${properties.name || ''}</h3>
        <p>${properties.englishName || ''}</p>
      </div>
    </div>
  `;
  
  preview.innerHTML = previewHtml;
  
  // 隐藏详细信息，显示预览
  if (info) info.style.display = 'none';
  preview.style.display = 'block';
  
  sidebar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  sidebar.classList.remove('active');
  sidebar.classList.add('preview');
  
  window.mapState.sidebarVisible = true;
}

// 显示侧边栏完整信息 - 全局暴露
window.showFull = function(properties) {
  if (!properties || typeof properties !== 'object') {
    console.error('showFull 收到无效的 properties 参数');
    return;
  }
  
  const sidebar = document.getElementById('sidebar');
  const preview = document.getElementById('preview');
  const info = document.getElementById('info');
  
  if (!sidebar || !info) {
    console.error('找不到侧边栏或信息元素');
    return;
  }
  
  sidebar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
  sidebar.classList.remove('preview');
  sidebar.classList.add('active');
  
  if (preview) preview.style.display = 'none';
  info.style.display = 'block';
  
  // 获取学校专业数据
  const programs = window.universityPrograms && window.universityPrograms[properties.name] ? 
    window.universityPrograms[properties.name] : null;
  
  // 使用全局函数获取学校logo
  const logoFileName = window.getSchoolLogo(properties.englishName, properties.name);
  
  // 构建学校卡片
  let html = `
    <div class="school-container">
      <div class="school-card">
        ${logoFileName ? `<img src="imgs/${logoFileName}" alt="${properties.name || ''} logo">` : ''}
        <div class="school-details">
          <h2>${properties.name || ''}</h2>
          <div class="school-grid">
            <div class="school-row">
              <div class="grid-label">英文名：</div>
              <div class="grid-value">${properties.englishName || ''}</div>
            </div>
            <div class="school-row">
              <div class="grid-label">排名：</div>
              <div class="grid-value">${properties.ranking || ''}</div>
            </div>
          </div>
          ${properties.website ? `<div class="school-link"><a href="${properties.website}" target="_blank">访问官方网站</a></div>` : ''}
        </div>
      </div>
  `;
  
  // 获取申请截止日期数据
  let schoolData = null;
  // 1. 尝试从合并数据中获取
  if (window.combinedSchoolData) {
    schoolData = window.combinedSchoolData[properties.name];
  }
  // 2. 如果合并数据中没有，尝试从universityDeadlines中匹配
  if (!schoolData && window.universityDeadlines) {
    const schoolNameLower = properties.name.toLowerCase();
    const englishNameLower = properties.englishName ? properties.englishName.toLowerCase() : '';
    
    for (const deadlineSchool in window.universityDeadlines) {
      if (window.universityDeadlines.hasOwnProperty(deadlineSchool)) {
        const deadlineSchoolLower = deadlineSchool.toLowerCase();
        // 双向匹配学校名称
        const match = deadlineSchoolLower.includes(schoolNameLower) || 
                     schoolNameLower.includes(deadlineSchoolLower) ||
                     (englishNameLower && deadlineSchoolLower.includes(englishNameLower)) ||
                     (englishNameLower && englishNameLower.includes(deadlineSchoolLower));
        
        if (match) {
          schoolData = { deadlines: window.universityDeadlines[deadlineSchool] };
          break;
        }
      }
    }
  }
  
  // 生成申请时间HTML
  const deadlines = schoolData && schoolData.deadlines ? schoolData.deadlines : {};
  const applicationDeadlines = `
      <div class="school-row">
        <div class="grid-label">ED截止日期：</div>
        <div class="grid-value">${deadlines.ED || '无'}</div>
      </div>
      <div class="school-row">
        <div class="grid-label">EDII截止日期：</div>
        <div class="grid-value">${deadlines.EDII || '无'}</div>
      </div>
      <div class="school-row">
        <div class="grid-label">EA截止日期：</div>
        <div class="grid-value">${deadlines.EA || '无'}</div>
      </div>
      <div class="school-row">
        <div class="grid-label">EAII截止日期：</div>
        <div class="grid-value">${deadlines.EAII || '无'}</div>
      </div>
      <div class="school-row">
        <div class="grid-label">RD截止日期：</div>
        <div class="grid-value">${deadlines.RD || '无'}</div>
      </div>
    `;
  
  // 添加学校简介
  html += `
      <div class="school-additional-info">
        <h3>学校简介</h3>
        <div class="school-row">
          <div class="grid-label">简介：</div>
          <div class="grid-value">${properties.description || ''}</div>
        </div>
      </div>
  `;
  
  // 添加强势专业信息
  const strengths = properties.strengths || [];
  if (strengths.length > 0) {
    html += `
      <div class="school-additional-info">
        <h3>🎯 强势专业</h3>
        <div class="strengths-list">
    `;
    
    strengths.forEach(strength => {
      html += `
        <div class="strength-item">
          <div class="strength-field">${strength.field || ''}</div>
          <div class="strength-details">${strength.details || ''}</div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  }
  
  // 添加申请时间信息
  html += `
      <div class="school-additional-info">
        <h3>申请时间</h3>
        ${applicationDeadlines}
      </div>
    `;
  
  // 添加费用比较信息
  html += `
    <div class="school-additional-info">
      <h3>费用比较</h3>
      <div class="cost-comparison">
        <div class="cost-region">
          <h4>纽约地区（如NYU）</h4>
          <div class="cost-item">
            <span class="cost-label">学费（每年）：</span>
            <span class="cost-value">约$55,000-$65,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">生活费（每年）：</span>
            <span class="cost-value">约$25,000-$35,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">总费用（每年）：</span>
            <span class="cost-value">约$80,000-$100,000</span>
          </div>
        </div>
        <div class="cost-region">
          <h4>波士顿地区（如波士顿大学）</h4>
          <div class="cost-item">
            <span class="cost-label">学费（每年）：</span>
            <span class="cost-value">约$50,000-$60,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">生活费（每年）：</span>
            <span class="cost-value">约$20,000-$30,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">总费用（每年）：</span>
            <span class="cost-value">约$70,000-$90,000</span>
          </div>
        </div>
        <div class="cost-region">
          <h4>俄亥俄州（如俄亥俄州立大学）</h4>
          <div class="cost-item">
            <span class="cost-label">学费（每年）：</span>
            <span class="cost-value">约$40,000-$55,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">生活费（每年）：</span>
            <span class="cost-value">约$20,000-$30,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">总费用（每年）：</span>
            <span class="cost-value">约$60,000-$85,000</span>
          </div>
        </div>
        <div class="cost-region">
          <h4>麦迪逊地区（如威斯康星大学麦迪逊分校）</h4>
          <div class="cost-item">
            <span class="cost-label">学费（每年）：</span>
            <span class="cost-value">约$40,000-$50,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">生活费（每年）：</span>
            <span class="cost-value">约$15,000-$20,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">总费用（每年）：</span>
            <span class="cost-value">约$55,000-$70,000</span>
          </div>
        </div>
        <div class="cost-region">
          <h4>加州地区（如南加州大学）</h4>
          <div class="cost-item">
            <span class="cost-label">学费（每年）：</span>
            <span class="cost-value">约$65,000-$75,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">生活费（每年）：</span>
            <span class="cost-value">约$25,000-$35,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">总费用（每年）：</span>
            <span class="cost-value">约$90,000-$110,000</span>
          </div>
        </div>
        <div class="cost-region">
          <h4>圣路易斯地区（如圣路易斯华盛顿大学）</h4>
          <div class="cost-item">
            <span class="cost-label">学费（每年）：</span>
            <span class="cost-value">约$50,000-$60,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">生活费（每年）：</span>
            <span class="cost-value">约$18,000-$25,000</span>
          </div>
          <div class="cost-item">
            <span class="cost-label">总费用（每年）：</span>
            <span class="cost-value">约$68,000-$85,000</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  `;

  // 添加学院信息（如果有）
  const colleges = properties.colleges || (programs && programs.programs) || [];
  if (colleges.length > 0) {
    html += `
      <div class="colleges-section">
        <h3>🏫 学院信息</h3>
        <div class="colleges-list">
    `;
    
    colleges.forEach(college => {
      html += `
        <div class="college-item">
          <div class="college-header">
            <h4 class="college-name">${college.chineseName || college.name || ''}</h4>
            <span class="college-english-name">${college.englishName || (college.name && college.chineseName ? college.name : '')}</span>
            ${college.rank ? `<span class="college-rank">${college.rank}</span>` : ''}
          </div>
          <p class="college-description">${college.description || ''}</p>
          ${college.notes ? `<p class="college-notes">${college.notes}</p>` : ''}
          ${college.popularMajors && college.popularMajors.length > 0 ? `
            <div class="college-majors">
              <span class="majors-label">热门专业：</span>
              <span class="majors-list">${college.popularMajors.join('、')}</span>
            </div>
          ` : ''}
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  }

  // 添加录取信息（如果有）
  if (programs && programs.admissions) {
    html += `
      <div class="admissions-section">
        <h3>录取信息</h3>
        <div class="admissions-grid">
          <div class="admission-item">
            <span class="admission-label">录取率</span>
            <span class="admission-value">${programs.admissions.acceptanceRate || ''}</span>
          </div>
          <div class="admission-item">
            <span class="admission-label">SAT范围</span>
            <span class="admission-value">${programs.admissions.avgSAT || ''}</span>
          </div>
          <div class="admission-item">
            <span class="admission-label">ACT范围</span>
            <span class="admission-value">${programs.admissions.avgACT || ''}</span>
          </div>
          <div class="admission-item">
            <span class="admission-label">平均GPA</span>
            <span class="admission-value">${programs.admissions.avgGPA || ''}</span>
          </div>
          <div class="admission-item">
            <span class="admission-label">托福最低分</span>
            <span class="admission-value">${programs.admissions.toefl ? programs.admissions.toefl + '（IBT）' : ''}</span>
          </div>
          <div class="admission-item">
            <span class="admission-label">国际学生比例</span>
            <span class="admission-value">${programs.admissions.internationalStudents || ''}</span>
          </div>
        </div>
      </div>
    `;
  }
  
  // 结束容器
  html += `
    </div>
  `;
  
  // 更新DOM
  info.innerHTML = html;
}

// 页面加载完成后初始化侧边栏功能
document.addEventListener('DOMContentLoaded', function() {
  // 确保侧边栏初始状态正确
  const sidebar = document.getElementById('sidebar');
  const preview = document.getElementById('preview');
  const info = document.getElementById('info');
  
  if (sidebar) {
    sidebar.classList.remove('active', 'preview');
  }
  
  if (preview) {
    preview.style.display = 'none';
  }
  
  if (info) {
    info.style.display = 'none';
  }
  
  // 初始化或重置全局状态
  window.mapState = window.mapState || {};
  window.mapState.sidebarVisible = false;
  window.mapState.sidebarLocked = false;
});
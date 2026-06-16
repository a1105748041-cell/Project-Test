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
      applications: props?.applications || '暂无数据',
      admissions: props?.admissions || '暂无数据',
      ranking: props?.ranking || '暂无数据',
      website: props?.website || '#',
      popularMajors: props?.popularMajors || '暂无数据',
      tuition: props?.tuition || '暂无数据',
      location: props?.location || '英国',
      livingCost: props?.livingCost || '£10,000-£15,000/年',
      totalBudget: props?.totalBudget || '约 £35,000-£50,000/年',
      majorDetails: props?.majorDetails || '<tr><td colspan="4">请查看各学院详情了解热门专业信息</td></tr>'
    };
    
    // 查找当前学校的完整数据，包括HTML模板
    let schoolData = null;
    // 遍历所有排名段
    if (window.ukUniversitiesData) {
      for (const [rankRange, schools] of Object.entries(window.ukUniversitiesData)) {
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
        <div class="grid-label">2024申请人数:</div>
        <div class="grid-value">${safeProps.applications}</div>
      </div>
      <div class="school-row">
        <div class="grid-label">2024入学人数:</div>
        <div class="grid-value">${safeProps.admissions}</div>
      </div>
      <div class="school-row">
        <div class="grid-label">排名</div>
        <div class="grid-value">${safeProps.ranking}</div>
      </div>
    </div>

      <p class="school-link"><a href="${safeProps.website}" target="_blank">${safeProps.website}</a></p>
    </div>
  </div>`;
  
    // 从JSON加载HTML模板
    let specialContent = '';
    if (schoolData && schoolData.html_template) {
      specialContent = replacePlaceholders(schoolData.html_template, safeProps);
    } else {
      // 保留旧的逻辑作为后备方案
      if (safeProps.name.includes('曼彻斯特')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>曼彻斯特大学成立于1824年，是英国著名的"红砖大学"之一，也是罗素集团成员。学校以其卓越的研究实力和创新精神而闻名，拥有众多诺贝尔奖获得者。</p>
            
            <h4>🏛️ 历史与地位</h4>
            <ul>
              <li><strong>红砖大学：</strong>英国著名的"红砖大学"之一，代表英国工业革命时期的高等教育</li>
              <li><strong>罗素集团：</strong>英国顶尖研究型大学联盟成员</li>
              <li><strong>研究实力：</strong>研究收入在英国大学中名列前茅</li>
              <li><strong>国际声誉：</strong>在全球大学排名中稳居前50</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 科学与工程</h5>
                <p>在材料科学、计算机科学和工程领域处于世界领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 商业管理</h5>
                <p>Alliance Manchester Business School是欧洲顶尖商学院之一。</p>
              </div>
              <div class="college-type">
                <h5>🔹 医学研究</h5>
                <p>医学与生命科学研究实力居英国前列。</p>
              </div>
            </div>
            
            <h4>🌟 著名校友</h4>
            <ul>
              <li><strong>艾伦·图灵：</strong>计算机科学之父，人工智能先驱</li>
              <li><strong>多位诺贝尔奖获得者</strong></li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 人文学院（Faculty of Humanities）</h4>
            <p>涵盖商学、社会科学、艺术与教育领域。</p>
            <p><strong>主要学部：</strong></p>
            <ul>
              <li>Alliance Manchester Business School (AMBS) — 英国顶尖商学院之一</li>
              <li>School of Arts, Languages and Cultures</li>
              <li>School of Social Sciences</li>
            </ul>
            <p>📍 国际学生最多、学科最丰富的学院。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 科学与工程学院（Faculty of Science and Engineering）</h4>
            <p>聚焦理工与技术创新。</p>
            <p><strong>主要学部：</strong></p>
            <ul>
              <li>School of Natural Sciences（化学、物理、地球科学等）</li>
              <li>School of Engineering（计算机、电子电气、机械、航空航天、化学工程等）</li>
            </ul>
            <p>📍 在材料、计算机与工程领域世界领先。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 生物、医学与健康学院（Faculty of Biology, Medicine and Health）</h4>
            <p><strong>主要学部：</strong></p>
            <ul>
              <li>School of Biological Sciences</li>
              <li>School of Medical Sciences</li>
              <li>School of Health Sciences</li>
            </ul>
            <p>📍 医学与生命科学研究实力居英国前列。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 环境、教育与发展学院（School of Environment, Education and Development）</h4>
            <p>专注于可持续发展、教育创新和城市规划领域。</p>
            <p><strong>主要学部：</strong></p>
            <ul>
              <li>Global Development Institute</li>
              <li>School of Education</li>
              <li>School of Environment, Education and Development</li>
            </ul>
            <p>📍 在环境科学和教育研究领域具有国际影响力。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 曼彻斯特大学法学院（School of Law）</h4>
            <p>英国顶尖的法学院之一，以其卓越的教学和研究而闻名。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>商法与公司法</li>
              <li>人权法</li>
              <li>国际商法</li>
              <li>知识产权法</li>
            </ul>
            <p>📍 与全球法律界保持紧密联系，毕业生就业前景广阔。</p>
          </div>
          
          </div>`;
      } else if (safeProps.name.includes('圣安德鲁斯')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>圣安德鲁斯大学成立于1413年，是苏格兰最古老的大学，也是英语世界第三古老的大学。学校以其卓越的学术声誉、美丽的校园环境和独特的教学传统而闻名。</p>
            
            <h4>🏰 历史与地位</h4>
            <ul>
              <li><strong>悠久历史：</strong>成立于1413年，拥有超过600年的学术历史</li>
              <li><strong>苏格兰名校：</strong>苏格兰最古老的大学，与牛津、剑桥并称为"三圣"</li>
              <li><strong>学术声誉：</strong>在英国大学排名中名列前茅</li>
              <li><strong>校园环境：</strong>位于风景如画的圣安德鲁斯镇，拥有美丽的海滩和历史建筑</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 人文学科</h5>
                <p>在经济学、国际关系和哲学等领域具有卓越的学术实力。</p>
              </div>
              <div class="college-type">
                <h5>🔹 自然科学</h5>
                <p>理学院以小班教学和高质量科研著称。</p>
              </div>
              <div class="college-type">
                <h5>🔹 精英教育</h5>
                <p>提供个性化的教学体验，师生比例高。</p>
              </div>
            </div>
            
            <h4>🌟 著名校友</h4>
            <ul>
              <li><strong>威廉王子：</strong>英国王位继承人，曾在此就读</li>
              <li><strong>多位苏格兰历史名人</strong></li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ Faculty of Arts（艺术学院）</h4>
            <p>涵盖人文学科、社会科学与国际研究。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>Economics and Finance</li>
              <li>International Relations</li>
              <li>Philosophy</li>
              <li>History</li>
              <li>English Literature</li>
            </ul>
            <p>📍 经济、国际关系与哲学是全英顶尖项目，全球录取竞争极为激烈。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ Faculty of Science（理学院）</h4>
            <p>包括数学、物理、化学、生物与计算机科学等专业。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>Computer Science</li>
              <li>Mathematics and Statistics</li>
              <li>Physics and Astronomy</li>
              <li>Chemistry</li>
              <li>Biology</li>
            </ul>
            <p>📍 理学院以小班教学、科研质量高著称，计算机与物理学科全球排名靠前。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ Faculty of Medicine（医学院）</h4>
            <p>提供医学本科学位（MBChB）及生物医学相关研究。</p>
            <p>📍 医学录取极具竞争力，课程结合临床与科研训练，毕业生深受NHS医院青睐。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ Faculty of Divinity（神学院）</h4>
            <p>研究神学、宗教与伦理学。</p>
            <p>📍 是英国历史最悠久的神学院之一，注重人文与思想史研究。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ Faculty of Arts and Sciences（交叉学科学院）</h4>
            <p>提供跨学科研究和学习机会，鼓励学生探索不同领域的知识融合。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>Data Science</li>
              <li>Environmental Studies</li>
              <li>Digital Humanities</li>
              <li>Neuroscience</li>
            </ul>
            <p>📍 学院注重创新思维和跨学科合作，培养学生解决复杂问题的能力。</p>
          </div>
          
          </div>`;
      } else if (safeProps.name.includes('杜伦')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>杜伦大学是英国少数几所实行传统学院制的大学之一，与牛津、剑桥并称为"Doxbridge"。学院制是杜伦大学的核心特色，为学生提供独特的学术与生活体验。</p>
            
            <h4>📚 学院制特点</h4>
            <ul>
              <li><strong>双重身份：</strong>学生同时属于学术学院（Faculty）和住宿学院（College），前者负责学术教育，后者负责生活、社交和个人发展</li>
              <li><strong>17所学院：</strong>杜伦大学共有17所独立学院，其中包括9所历史悠久的"黑袍学院"</li>
              <li><strong>学院自治：</strong>每所学院都有自己的历史、传统、设施和管理团队</li>
              <li><strong>跨学科社区：</strong>学院内汇聚不同专业的学生，促进跨学科交流与合作</li>
              <li><strong>独特传统：</strong>各学院保持着独特的礼仪、庆典和体育赛事</li>
            </ul>
            
            <h4>🏫 学院类型</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 传统学院（Traditional Colleges）</h5>
                <p>历史悠久，多建于19世纪和20世纪初，如University College（1832年）、Hatfield College（1846年）</p>
              </div>
              <div class="college-type">
                <h5>🔹 现代学院（Modern Colleges）</h5>
                <p>建于20世纪后半叶，设施现代化，如Collingwood College（1972年）、John Snow College（2001年）</p>
              </div>
              <div class="college-type">
                <h5>🔹 研究生专属学院（Postgraduate-only Colleges）</h5>
                <p>仅面向研究生，如Ustinov College（1965年），提供学术支持和专业发展机会</p>
              </div>
            </div>
            
            <h4>🌟 主要学院介绍</h4>
            <div class="main-colleges">
              <div class="college-type">
                <h5>🏰 University College（1832年）</h5>
                <p><strong>昵称：</strong>Castle College<br>
                <strong>特点：</strong>杜伦大学最古老的学院，位于杜伦城堡内，是联合国世界文化遗产的一部分。学院保持着许多传统仪式，如正式晚宴和黑袍典礼。</p>
              </div>
              <div class="college-type">
                <h5>🎓 Hatfield College（1846年）</h5>
                <p><strong>昵称：</strong>The Baileys<br>
                <strong>特点：</strong>以其活跃的社交氛围和体育传统而闻名，拥有强大的划船和橄榄球队伍。学院建筑风格统一，环境优美。</p>
              </div>
              <div class="college-type">
                <h5>📖 St John's College（1909年）</h5>
                <p><strong>特点：</strong>位于杜伦市中心，学术氛围浓厚，拥有出色的图书馆设施。学院注重学生的全面发展，提供丰富的社团活动。</p>
              </div>
              <div class="college-type">
                <h5>🌳 St Mary's College（1899年）</h5>
                <p><strong>特点：</strong>杜伦大学唯一的女子学院，直到2005年才开始招收男生。学院环境优雅，注重培养学生的领导力和社区意识。</p>
              </div>
              <div class="college-type">
                <h5>🏃 Collingwood College（1972年）</h5>
                <p><strong>特点：</strong>现代学院的代表，设施齐全，包括大型体育中心和表演艺术空间。学院以其多元化的学生群体和活跃的社团生活而闻名。</p>
              </div>
              <div class="college-type">
                <h5>🎯 Ustinov College（1965年）</h5>
                <p><strong>特点：</strong>研究生专属学院，拥有来自120多个国家的学生。学院注重学术交流和跨文化理解，提供专门的研究生支持服务。</p>
              </div>
              <div class="college-type">
                <h5>👩‍🎓 Josephine Butler College（2006年）</h5>
                <p><strong>特点：</strong>以英国女权主义者Josephine Butler命名，是杜伦大学最年轻的学院之一。学院注重可持续发展和社会公正，设施现代化，环境友好。</p>
              </div>
              <div class="college-type">
                <h5>🔬 John Snow College（2001年）</h5>
                <p><strong>特点：</strong>以著名医生和公共卫生改革家John Snow命名，位于女王校区。学院拥有强大的科学和医学学科传统，设施先进。</p>
              </div>
              <div class="college-type">
                <h5>🤝 St Cuthbert's Society（1888年）</h5>
                <p><strong>昵称：</strong>Cuth's<br>
                <strong>特点：</strong>历史悠久的学院，以其友好的社区氛围和强大的学术支持而闻名。学院位于杜伦市中心，交通便利，设施完善。</p>
              </div>
              <div class="college-type">
                <h5>📚 Trevelyan College（1966年）</h5>
                <p><strong>特点：</strong>以历史学家George Macaulay Trevelyan命名，最初是女子学院，1992年开始招收男生。学院注重学术卓越和个人发展，拥有出色的图书馆。</p>
              </div>
              <div class="college-type">
                <h5>🏛️ Van Mildert College（1965年）</h5>
                <p><strong>特点：</strong>以杜伦的第一任主教William Van Mildert命名，是杜伦大学规模最大的学院之一。学院拥有多元化的学生群体和活跃的体育文化。</p>
              </div>
              <div class="college-type">
                <h5>⚖️ Grey College（1959年）</h5>
                <p><strong>特点：</strong>以英国首相Charles Grey命名，是杜伦大学第一所男女同校的学院。学院拥有强大的学术声誉和丰富的社团活动，体育设施完善。</p>
              </div>
            </div>
            
            <h4>🎯 学院作用</h4>
            <ul>
              <li><strong>住宿服务：</strong>提供学生宿舍，创造安全舒适的生活环境</li>
              <li><strong>学术支持：</strong>组织辅导课、研讨会和学术活动，提供学习资源</li>
              <li><strong>个人发展：</strong>提供职业指导、领导力培训和志愿服务机会</li>
              <li><strong>社交网络：</strong>组织各种社交活动，建立终身友谊和人脉</li>
              <li><strong>归属感：</strong>培养学生的集体荣誉感和归属感</li>
            </ul>
            
            <h4>🎓 学院申请与分配</h4>
            <p>申请杜伦大学时，学生可以选择1-5所心仪的学院。学校会根据学生的偏好、学院容量和多样性原则进行分配。无论分配到哪所学院，学生都能获得优质的教育资源和支持服务。</p>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 艺术与人文学院（Faculty of Arts and Humanities）</h4>
            <p>提供丰富的人文与艺术学科选择，注重批判性思维与创造性表达。</p>
            <p><strong>主要学部：</strong></p>
            <ul>
              <li>Department of English Studies</li>
              <li>Department of History</li>
              <li>Department of Modern Languages and Cultures</li>
              <li>Department of Philosophy</li>
            </ul>
            <p>📍 历史悠久，学术氛围浓厚，培养学生的跨文化理解与分析能力。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 理学院（Faculty of Science）</h4>
            <p>专注于自然科学基础研究与应用。</p>
            <p><strong>主要学部：</strong></p>
            <ul>
              <li>Department of Physics</li>
              <li>Department of Chemistry</li>
              <li>Department of Mathematical Sciences</li>
              <li>Department of Biology</li>
            </ul>
            <p>📍 在数学、物理领域享有盛誉，拥有先进的实验室设施。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 商学院（Durham University Business School）</h4>
            <p>英国顶尖商学院之一，拥有三重认证（AACSB、EQUIS、AMBA）。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>Finance</li>
              <li>Business and Management</li>
              <li>Marketing</li>
              <li>Economics</li>
            </ul>
            <p>📍 注重实践导向的教学，与行业联系紧密，就业前景优秀。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 社会科学与健康学院（Faculty of Social Sciences and Health）</h4>
            <p>涵盖广泛的社会科学与健康相关学科。</p>
            <p><strong>主要学部：</strong></p>
            <ul>
              <li>School of Education</li>
              <li>Department of Psychology</li>
              <li>Department of Sociology</li>
              <li>School of Government and International Affairs</li>
            </ul>
            <p>📍 在教育、心理学等领域具有较强的研究实力与影响力。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 工程与计算机科学学院（Faculty of Engineering and Computer Science）</h4>
            <p>专注于工程与计算机科学领域的教学和研究，培养学生的创新能力和实践技能。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>Computer Science</li>
              <li>Engineering</li>
              <li>Electronic Engineering</li>
              <li>Mechanical Engineering</li>
            </ul>
            <p>📍 学院拥有先进的实验室设施，与工业界保持紧密合作，提供丰富的实习和就业机会。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('KCL') || safeProps.name.includes('国王学院')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>伦敦国王学院成立于1829年，是伦敦大学联盟的创始成员之一，也是罗素集团成员。学校以其卓越的学术声誉、位于伦敦市中心的优越地理位置和丰富的历史传统而闻名。</p>
            
            <h4>🏛️ 历史与地位</h4>
            <ul>
              <li><strong>历史悠久：</strong>成立于1829年，是伦敦大学联盟的创始成员之一</li>
              <li><strong>罗素集团：</strong>英国顶尖研究型大学联盟成员</li>
              <li><strong>伦敦中心：</strong>位于伦敦市中心，拥有多个校区</li>
              <li><strong>国际声誉：</strong>在全球大学排名中稳居前50</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 法学教育</h5>
                <p>法学院是英国顶尖法学院之一，在国际商法和人权法领域享有盛誉。</p>
              </div>
              <div class="college-type">
                <h5>🔹 医学研究</h5>
                <p>医学院是英国历史最悠久的医学院之一，在医学研究和临床实践方面处于领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 国际关系</h5>
                <p>在国际关系和公共政策领域具有强大的研究实力。</p>
              </div>
            </div>
            
            <h4>🌟 著名校友</h4>
            <ul>
              <li><strong>弗拉基米尔·列宁：</strong>俄国革命家，曾在此就读</li>
              <li><strong>约翰·济慈：</strong>著名诗人</li>
              <li><strong>多位诺贝尔奖获得者</strong></li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 法学院（Dickson Poon School of Law）</h4>
            <p>伦敦国王学院法学院是英国顶尖的法学院之一，在国际上享有盛誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>法学本科（LLB）</li>
              <li>国际商法</li>
              <li>知识产权法</li>
              <li>人权法</li>
            </ul>
            <p>📍 法学院位于伦敦市中心，与英国最高法院和众多知名律所相邻。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 医学院（Faculty of Life Sciences & Medicine）</h4>
            <p>伦敦国王学院医学院是英国历史最悠久的医学院之一，在医学研究和临床实践方面处于领先地位。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>医学（MBBS/BSc）</li>
              <li>生物医学科学</li>
              <li>护理</li>
              <li>牙科</li>
            </ul>
            <p>📍 医学院与伦敦多家著名医院合作，提供优质的临床培训。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 社会科学与公共政策学院（Department of Social Science & Public Policy）</h4>
            <p>伦敦国王学院社会科学与公共政策学院在国际事务、政治科学和公共政策领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>国际关系</li>
              <li>政治学</li>
              <li>公共政策</li>
              <li>战争研究</li>
            </ul>
            <p>📍 学院拥有众多知名学者和研究中心，在国际事务领域享有盛誉。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 文学院（Faculty of Arts & Humanities）</h4>
            <p>伦敦国王学院文学院在人文艺术领域具有悠久的历史和卓越的声誉，涵盖广泛的学科领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>哲学</li>
              <li>现代语言</li>
            </ul>
            <p>📍 文学院位于伦敦市中心，拥有丰富的图书馆资源和研究中心。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 自然科学与工程学院（Faculty of Natural & Mathematical Sciences）</h4>
            <p>伦敦国王学院自然科学与工程学院在数学、物理、化学和工程领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>数学</li>
              <li>物理学</li>
              <li>化学</li>
              <li>计算机科学</li>
            </ul>
            <p>📍 学院拥有先进的实验室设施和研究中心，与工业界保持紧密合作。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('华威')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>华威大学成立于1965年，是英国顶尖的研究型大学之一，以其卓越的商学院和强大的学术实力而闻名。学校位于英格兰中部考文垂市附近，校园环境优美。</p>
            
            <h4>🏛️ 历史与地位</h4>
            <ul>
              <li><strong>年轻而卓越：</strong>虽然成立时间较短，但已成为英国顶尖大学之一</li>
              <li><strong>罗素集团：</strong>英国顶尖研究型大学联盟成员</li>
              <li><strong>学术声誉：</strong>在英国大学排名中名列前茅</li>
              <li><strong>校园环境：</strong>拥有美丽的乡村校园，设施现代化</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 商业管理</h5>
                <p>华威商学院是英国顶尖商学院之一，拥有三重认证，在全球享有盛誉。</p>
              </div>
              <div class="college-type">
                <h5>🔹 社会科学</h5>
                <p>在政治学、社会学和经济学领域具有强大的研究实力。</p>
              </div>
              <div class="college-type">
                <h5>🔹 工程技术</h5>
                <p>工程学院在机械工程、电子工程和计算机工程领域处于领先地位。</p>
              </div>
            </div>
            
            <h4>🌟 著名校友</h4>
            <ul>
              <li><strong>多位英国政治领袖和商业精英</strong></li>
              <li><strong>在全球各大企业担任高管职位的毕业生</strong></li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 商学院（Warwick Business School）</h4>
            <p>华威商学院是英国顶尖的商学院之一，拥有三重认证（AACSB、EQUIS、AMBA）。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>经济学</li>
              <li>管理学</li>
              <li>金融学</li>
              <li>会计与金融</li>
            </ul>
            <p>📍 商学院在全球商学院排名中名列前茅，毕业生就业率极高。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 理学院（Faculty of Science）</h4>
            <p>华威大学理学院在数学、物理、计算机科学等领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>数学</li>
              <li>物理</li>
              <li>计算机科学</li>
              <li>生物学</li>
            </ul>
            <p>📍 理学院与众多高科技公司有紧密合作，提供丰富的实习和就业机会。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 工程学院（Faculty of Engineering）</h4>
            <p>华威大学工程学院在机械工程、电子工程、计算机工程等领域处于领先地位。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>机械工程</li>
              <li>电子工程</li>
              <li>计算机工程</li>
              <li>汽车工程</li>
            </ul>
            <p>📍 工程学院与英国汽车产业和高科技行业有密切合作，毕业生深受雇主欢迎。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 文学院（Faculty of Arts）</h4>
            <p>华威大学文学院在人文艺术领域具有卓越的教学和研究实力，涵盖广泛的学科领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史学</li>
              <li>哲学</li>
              <li>现代语言学</li>
            </ul>
            <p>📍 文学院注重跨学科研究，与多个国际机构建立了合作关系。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 社会科学学院（Faculty of Social Sciences）</h4>
            <p>华威大学社会科学学院在社会科学领域具有强大的研究实力，涵盖多个重要学科。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>政治学</li>
              <li>社会学</li>
              <li>教育学</li>
              <li>心理学</li>
            </ul>
            <p>📍 学院拥有多个研究中心，与政府和非政府组织保持紧密合作。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('利兹')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>利兹大学成立于1904年，是英国著名的"红砖大学"之一，也是罗素集团成员。学校以其卓越的教学质量、优秀的毕业生就业前景和多元化的校园文化而闻名。</p>
            
            <h4>🏛️ 历史与地位</h4>
            <ul>
              <li><strong>红砖大学：</strong>英国著名的"红砖大学"之一，代表英国工业革命时期的高等教育</li>
              <li><strong>罗素集团：</strong>英国顶尖研究型大学联盟成员</li>
              <li><strong>学生规模：</strong>英国最大的大学之一，拥有超过35,000名学生</li>
              <li><strong>就业前景：</strong>毕业生就业率在英国名列前茅</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 商业管理</h5>
                <p>利兹大学商学院是英国顶尖商学院之一，拥有三重认证，与全球众多企业建立了紧密合作关系。</p>
              </div>
              <div class="college-type">
                <h5>🔹 工程技术</h5>
                <p>工程学院在机械工程、电子工程和土木工程领域处于领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 艺术与设计</h5>
                <p>在艺术、设计和时尚领域具有卓越的声誉。</p>
              </div>
            </div>
            
            <h4>🌟 校园生活</h4>
            <ul>
              <li><strong>学生社团：</strong>拥有超过300个学生社团和体育俱乐部</li>
              <li><strong>校园设施：</strong>拥有现代化的图书馆、实验室和体育设施</li>
              <li><strong>城市生活：</strong>利兹市是英国第三大城市，提供丰富的文化和娱乐选择</li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 商学院（Leeds University Business School）</h4>
            <p>利兹大学商学院是英国顶尖的商学院之一，拥有三重认证（AACSB、EQUIS、AMBA）。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>商业管理</li>
              <li>市场营销</li>
              <li>会计与金融</li>
              <li>国际商务</li>
            </ul>
            <p>📍 商学院与全球众多企业建立了紧密合作关系，毕业生就业率极高。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 工程学院（Faculty of Engineering）</h4>
            <p>利兹大学工程学院在机械工程、电子工程、土木工程等领域处于领先地位。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>机械工程</li>
              <li>电子工程</li>
              <li>土木工程</li>
              <li>化学工程</li>
            </ul>
            <p>📍 工程学院拥有先进的实验室设施，与工业界保持紧密合作。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 生物科学学院（Faculty of Biological Sciences）</h4>
            <p>利兹大学生物科学学院在生物学、生物化学和生物技术领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>生物学</li>
              <li>生物化学</li>
              <li>生物技术</li>
              <li>生态学</li>
            </ul>
            <p>📍 学院与众多研究机构和企业合作，提供丰富的实习和研究机会。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 人文学院（Faculty of Arts, Humanities and Cultures）</h4>
            <p>利兹大学人文学院涵盖广泛的人文与艺术学科，注重批判性思维和创造性表达。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>现代语言</li>
              <li>艺术史</li>
            </ul>
            <p>📍 学院拥有丰富的图书馆资源和研究中心，与众多文化机构合作。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 社会科学学院（Faculty of Social Sciences）</h4>
            <p>利兹大学社会科学学院专注于社会科学研究，培养学生的分析能力和全球视野。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>政治学</li>
              <li>社会学</li>
              <li>教育学</li>
              <li>心理学</li>
            </ul>
            <p>📍 学院与政府和非政府组织保持紧密合作，提供丰富的实习和研究机会。</p>
          </div>
        </div>`;
      } else if (safeProps.name.includes('伯明翰')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>伯明翰大学成立于1900年，是英国著名的"红砖大学"之一，也是罗素集团成员。学校以其卓越的学术声誉、多元化的校园文化和优秀的毕业生就业前景而闻名。</p>
            
            <h4>🏛️ 历史与地位</h4>
            <ul>
              <li><strong>红砖大学：</strong>英国著名的"红砖大学"之一，代表英国工业革命时期的高等教育</li>
              <li><strong>罗素集团：</strong>英国顶尖研究型大学联盟成员</li>
              <li><strong>国际声誉：</strong>在全球大学排名中表现出色</li>
              <li><strong>城市大学：</strong>位于英国第二大城市伯明翰，交通便利</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 商业管理</h5>
                <p>伯明翰商学院是英国最古老的商学院之一，拥有三重认证，在全球享有盛誉。</p>
              </div>
              <div class="college-type">
                <h5>🔹 医学研究</h5>
                <p>医学院与多家著名医院合作，医学研究和临床培训质量优秀。</p>
              </div>
              <div class="college-type">
                <h5>🔹 工程技术</h5>
                <p>工程学院在机械工程、电子工程和物理科学领域具有强大的研究实力。</p>
              </div>
            </div>
            
            <h4>🌟 校园生活</h4>
            <ul>
              <li><strong>学生社团：</strong>拥有超过200个学生社团和体育俱乐部</li>
              <li><strong>校园设施：</strong>拥有现代化的图书馆、实验室和体育设施</li>
              <li><strong>城市生活：</strong>伯明翰市提供丰富的文化、娱乐和购物选择</li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 商学院（Birmingham Business School）</h4>
            <p>伯明翰商学院是英国最古老的商学院之一，拥有三重认证（AACSB、EQUIS、AMBA）。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>经济学</li>
              <li>商业管理</li>
              <li>金融学</li>
              <li>国际商务</li>
            </ul>
            <p>📍 商学院在全球范围内享有盛誉，与众多国际企业建立了合作关系。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 工程与物理科学学院（College of Engineering and Physical Sciences）</h4>
            <p>伯明翰大学工程与物理科学学院在机械工程、电子工程、物理学等领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>机械工程</li>
              <li>电子工程</li>
              <li>物理学</li>
              <li>计算机科学</li>
            </ul>
            <p>📍 学院拥有先进的实验室和研究设施，与工业界保持紧密合作。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 医学与牙科科学学院（College of Medical and Dental Sciences）</h4>
            <p>伯明翰大学医学与牙科科学学院是英国顶尖的医学院之一，在医学研究和临床实践方面处于领先地位。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>医学</li>
              <li>牙科</li>
              <li>生物医学科学</li>
              <li>护理</li>
            </ul>
            <p>📍 学院与伯明翰多家著名医院合作，提供优质的临床培训。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 艺术与法律学院（College of Arts and Law）</h4>
            <p>伯明翰大学艺术与法律学院涵盖广泛的人文艺术和法律学科，注重批判性思维和创造性表达。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>法学</li>
              <li>音乐</li>
            </ul>
            <p>📍 学院拥有丰富的图书馆资源和研究中心，与众多文化机构合作。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 社会科学学院（College of Social Sciences）</h4>
            <p>伯明翰大学社会科学学院专注于社会科学研究，培养学生的分析能力和全球视野。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>政治学</li>
              <li>社会学</li>
              <li>教育学</li>
              <li>心理学</li>
            </ul>
            <p>📍 学院与政府和非政府组织保持紧密合作，提供丰富的实习和研究机会。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('爱丁堡大学')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>爱丁堡大学成立于1582年，是苏格兰最著名的大学之一，也是英国顶尖的研究型大学。学校以其卓越的学术声誉、美丽的校园环境和丰富的文化生活而闻名。</p>
            
            <h4>🏰 历史与地位</h4>
            <ul>
              <li><strong>悠久历史：</strong>成立于1582年，拥有超过440年的学术历史</li>
              <li><strong>罗素集团：</strong>英国顶尖研究型大学联盟成员</li>
              <li><strong>国际声誉：</strong>在全球大学排名中稳居前50</li>
              <li><strong>文化之都：</strong>位于爱丁堡市，2004年欧洲文化之都</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 医学研究</h5>
                <p>医学院是英国最古老的医学院之一，在医学研究和临床实践方面处于世界领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 人工智能</h5>
                <p>在人工智能和数据科学领域具有强大的研究实力。</p>
              </div>
              <div class="college-type">
                <h5>🔹 艺术与人文学科</h5>
                <p>在艺术、人文和社会科学领域具有深厚的学术传统。</p>
              </div>
            </div>
            
            <h4>🌟 著名校友</h4>
            <ul>
              <li><strong>大卫·休谟：</strong>著名哲学家、经济学家</li>
              <li><strong>亚当·弗格森：</strong>社会学创始人之一</li>
              <li><strong>多位诺贝尔奖获得者</strong></li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 医学院（College of Medicine and Veterinary Medicine）</h4>
            <p>爱丁堡大学医学院是英国最古老、最负盛名的医学院之一，在国际上享有盛誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>医学</li>
              <li>兽医学</li>
              <li>生物医学科学</li>
              <li>公共卫生</li>
            </ul>
            <p>📍 学院与爱丁堡多家著名医院合作，提供优质的临床培训和研究机会。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 科学与工程学院（College of Science and Engineering）</h4>
            <p>涵盖广泛的科学与工程学科，注重创新和实践能力培养。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>计算机科学</li>
              <li>物理学</li>
              <li>化学</li>
              <li>工程学</li>
            </ul>
            <p>📍 学院在人工智能、量子计算和可持续能源领域处于世界领先地位。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 艺术学院（College of Arts, Humanities and Social Sciences）</h4>
            <p>提供丰富的人文与艺术学科选择，培养学生的批判性思维和创造性表达。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>哲学</li>
              <li>艺术史</li>
            </ul>
            <p>📍 学院拥有丰富的图书馆资源和研究中心，与爱丁堡众多文化机构合作。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 社会科学学院（School of Social and Political Science）</h4>
            <p>专注于社会科学研究，培养学生的分析能力和全球视野。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>经济学</li>
              <li>政治学</li>
              <li>社会学</li>
              <li>国际关系</li>
            </ul>
            <p>📍 学院在国际政治和发展研究领域具有强大的研究实力。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 教育学院（Moray House School of Education and Sport）</h4>
            <p>爱丁堡大学教育学院是英国顶尖的教育学院之一，在国际上享有盛誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>教育学</li>
              <li>体育科学</li>
              <li>心理学</li>
              <li>教育领导力</li>
            </ul>
            <p>📍 学院与全球众多教育机构合作，提供优质的教育研究和培训。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('UCL') || safeProps.name.includes('伦敦大学学院')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>伦敦大学学院成立于1826年，是伦敦大学联盟的创始成员之一，也是罗素集团成员。学校以其卓越的学术声誉、位于伦敦市中心的优越地理位置和多元化的学术环境而闻名。</p>
            
            <h4>🏛️ 历史与地位</h4>
            <ul>
              <li><strong>历史悠久：</strong>成立于1826年，是伦敦大学联盟的创始成员之一</li>
              <li><strong>罗素集团：</strong>英国顶尖研究型大学联盟成员</li>
              <li><strong>伦敦中心：</strong>位于伦敦市中心，拥有多个校区</li>
              <li><strong>国际声誉：</strong>在全球大学排名中稳居前10</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 工程技术</h5>
                <p>工程科学学院是英国顶尖的工程学院之一，在人工智能、机器人技术和可持续能源领域处于世界领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 医学研究</h5>
                <p>医学院与伦敦多家医院紧密合作，医学研究和临床培训质量优秀。</p>
              </div>
              <div class="college-type">
                <h5>🔹 社会科学</h5>
                <p>在经济学、心理学和政治学领域具有强大的研究实力。</p>
              </div>
            </div>
            
            <h4>🌟 著名校友</h4>
            <ul>
              <li><strong>甘地：</strong>印度独立运动领袖</li>
              <li><strong>亚历山大·贝尔：</strong>电话发明者</li>
              <li><strong>多位诺贝尔奖获得者</strong></li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 工程科学学院（Faculty of Engineering Sciences）</h4>
            <p>伦敦大学学院工程科学学院是英国顶尖的工程学院之一，在国际上享有盛誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>计算机科学</li>
              <li>电子电气工程</li>
              <li>机械工程</li>
              <li>化学工程</li>
            </ul>
            <p>📍 学院在人工智能、机器人技术和可持续能源领域处于世界领先地位。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 人文与艺术学院（Faculty of Arts & Humanities）</h4>
            <p>涵盖广泛的人文学科和艺术领域，注重批判性思维和创造性表达。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>哲学</li>
              <li>艺术史</li>
            </ul>
            <p>📍 学院拥有丰富的图书馆资源和研究中心，与伦敦众多文化机构合作。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 社会与历史科学学院（Faculty of Social & Historical Sciences）</h4>
            <p>专注于社会科学和历史研究，培养学生的分析能力和全球视野。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>经济学</li>
              <li>政治学</li>
              <li>社会学</li>
              <li>人类学</li>
            </ul>
            <p>📍 学院在国际政治和发展研究领域具有强大的研究实力。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 法学院（UCL Faculty of Laws）</h4>
            <p>伦敦大学学院法学院是英国最古老、最负盛名的法学院之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>国际商法</li>
              <li>人权法</li>
              <li>知识产权法</li>
              <li>环境法</li>
            </ul>
            <p>📍 法学院位于伦敦法律中心，与众多国际律所和机构保持紧密联系。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 生命科学学院（Faculty of Life Sciences）</h4>
            <p>专注于生物学、医学和健康科学领域的教学和研究。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>生物医学科学</li>
              <li>神经科学</li>
              <li>遗传学</li>
              <li>药理学</li>
            </ul>
            <p>📍 学院与伦敦多家医院合作，提供优质的临床培训和研究机会。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('牛津大学') || safeProps.name.includes('Oxford')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学院制度</h3>
          <div class="college-system-section">
            <p>牛津大学是世界上最古老的大学之一，始建于1096年，拥有独特的学院制体系。与剑桥大学并称为"牛剑"（Oxbridge），是英国传统精英教育的代表。</p>
            
            <h4>📚 学院制特点</h4>
            <ul>
              <li><strong>独立学院：</strong>牛津大学共有39所独立学院，每所学院都是自治的学术社区</li>
              <li><strong>导师制：</strong>牛津的导师制是其核心特色，学生每周与导师进行一对一或小组辅导</li>
              <li><strong>住宿学院：</strong>大多数本科生在学院内住宿，形成紧密的社区生活</li>
              <li><strong>跨学科交流：</strong>学院内汇聚不同学科的学生，促进跨领域交流</li>
            </ul>
            
            <h4>🏫 著名学院</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 Balliol College（1263年）</h5>
                <p><strong>特点：</strong>政治家摇篮，培养多位英国首相；学术氛围自由开放，以辩论传统闻名。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Christ Church（1546年）</h5>
                <p><strong>特点：</strong>牛津最大最壮观的学院；《哈利波特》大礼堂取景地；拥有自己的大教堂。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Magdalen College（1458年）</h5>
                <p><strong>特点：</strong>牛津最美校园，鹿苑闻名；音乐传统卓越；每年五一晨歌仪式吸引数千游客。</p>
              </div>
              <div class="college-type">
                <h5>🔹 New College（1379年）</h5>
                <p><strong>特点：</strong>中世纪建筑保存完好；拥有牛津最美丽的花园城墙；财力雄厚，奖学金丰厚。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Merton College（1264年）</h5>
                <p><strong>特点：</strong>牛津最古老的学院之一；学术标准最严格；培养最多诺贝尔奖得主。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Worcester College（1714年）</h5>
                <p><strong>特点：</strong>拥有26英亩湖泊花园；体育设施一流；氛围友好包容。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Exeter College（1314年）</h5>
                <p><strong>特点：</strong>托尔金（《指环王》作者）曾在此任教；文学艺术氛围浓厚；位置优越。</p>
              </div>
              <div class="college-type">
                <h5>🔹 St John's College（1555年）</h5>
                <p><strong>特点：</strong>牛津最富有的学院之一；奖学金慷慨；学术成绩优异。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Queen's College（1341年）</h5>
                <p><strong>特点：</strong>巴洛克风格建筑精美；合唱团享誉世界；社区氛围温馨。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Lincoln College（1427年）</h5>
                <p><strong>特点：</strong>小巧精致，社区感最强；位于市中心；师生关系密切。</p>
              </div>
            </div>
            
            <h4>🌟 学术特色</h4>
            <ul>
              <li><strong>PPE专业：</strong>哲学、政治学与经济学是牛津最著名的本科课程，培养了众多政治领袖</li>
              <li><strong>科研实力：</strong>拥有30多个学院和学部，在几乎所有学科领域都处于世界领先地位</li>
              <li><strong>图书馆资源：</strong>博德利图书馆是英国第二大图书馆，藏书超过1300万册</li>
            </ul>
          </div>
          
          <h3>学部概览</h3>
          <div class="faculty">
            <h4>1️⃣ 人文学部（Humanities Division）</h4>
            <p>牛津大学人文学部是世界顶尖的人文学科研究中心之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>哲学</li>
              <li>古典学</li>
              <li>现代语言</li>
            </ul>
            <p><strong>热门专业：</strong>古典学、英语文学、历史学</p>
            <p>📍 拥有众多诺贝尔奖获得者和著名学者，在人文学科领域享有无与伦比的声誉。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 数学、物理与生命科学学院（Mathematical, Physical and Life Sciences Division）</h4>
            <p>涵盖数学、物理、化学和生命科学等基础学科。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>数学</li>
              <li>物理学</li>
              <li>化学</li>
              <li>生物学</li>
              <li>计算机科学</li>
            </ul>
            <p><strong>热门专业：</strong>数学、物理学、计算机科学</p>
            <p>📍 在量子计算、生物医学和人工智能领域处于世界领先地位。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 医学科学分部（Medical Sciences Division）</h4>
            <p>牛津大学医学科学分部是英国最顶尖的医学院之一，在医学研究方面处于世界前沿。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>临床医学</li>
              <li>基础医学</li>
              <li>公共卫生</li>
              <li>神经科学</li>
            </ul>
            <p><strong>热门专业：</strong>临床医学、生物医学科学</p>
            <p>📍 与牛津大学附属医院紧密合作，医学研究成果丰硕。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 社会科学分部（Social Sciences Division）</h4>
            <p>涵盖经济学、政治学、社会学和管理学等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>经济学</li>
              <li>政治学</li>
              <li>社会学</li>
              <li>管理学</li>
              <li>法学</li>
            </ul>
            <p><strong>热门专业：</strong>PPE（哲学、政治学与经济学）、法学、管理学</p>
            <p>📍 赛德商学院（Saïd Business School）是欧洲顶尖商学院之一。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 工程学部（Engineering Science）</h4>
            <p>牛津大学工程学部在工程研究和创新方面具有卓越的声誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>航空航天工程</li>
              <li>电气工程</li>
              <li>机械工程</li>
              <li>生物医学工程</li>
            </ul>
            <p><strong>热门专业：</strong>工程科学、生物医学工程</p>
            <p>📍 在可持续能源和先进制造领域处于领先地位。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('剑桥大学') || safeProps.name.includes('Cambridge')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学院制度</h3>
          <div class="college-system-section">
            <p>剑桥大学始建于1209年，是世界上最古老的大学之一。与牛津大学并称为"牛剑"（Oxbridge），以其卓越的学术声誉和独特的学院制而闻名于世。</p>
            
            <h4>📚 学院制特点</h4>
            <ul>
              <li><strong>31所学院：</strong>剑桥大学共有31所独立学院，每所学院都有自己的章程和管理机构</li>
              <li><strong>导师制：</strong>剑桥的导师制是其核心特色，学生每周与导师进行深度学术交流</li>
              <li><strong>学院生活：</strong>学院不仅提供住宿，还组织各种学术和社交活动</li>
              <li><strong>跨学科环境：</strong>学院内学生来自不同学科，促进跨领域交流与合作</li>
            </ul>
            
            <h4>🏫 著名学院</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 Trinity College（1546年）</h5>
                <p><strong>特点：</strong>剑桥最大最富有；培养34位诺贝尔奖得主；牛顿、拜伦母校；苹果树传说发源地。</p>
              </div>
              <div class="college-type">
                <h5>🔹 St John's College（1511年）</h5>
                <p><strong>特点：</strong>著名的"叹息桥"所在地；财力雄厚，奖学金慷慨；学术成绩顶尖。</p>
              </div>
              <div class="college-type">
                <h5>🔹 King's College（1441年）</h5>
                <p><strong>特点：</strong>标志性哥特式教堂，剑桥地标；唱诗班享誉世界；徐志摩曾在此就读。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Clare College（1326年）</h5>
                <p><strong>特点：</strong>剑桥第二古老；后花园最美，临河而建；学术氛围浓厚。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Pembroke College（1347年）</h5>
                <p><strong>特点：</strong>剑桥第三古老；花园精致；社区氛围友好温馨。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Gonville & Caius College（1348年）</h5>
                <p><strong>特点：</strong>医学和自然科学最强；霍金母校；培养众多医学界领袖。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Jesus College（1496年）</h5>
                <p><strong>特点：</strong>体育传统最强；位于市中心；氛围活跃友好。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Queens' College（1448年）</h5>
                <p><strong>特点：</strong>数学桥传说所在地；数学学科卓越；位置便利。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Downing College（1800年）</h5>
                <p><strong>特点：</strong>法律和医学最强；建筑风格古典优雅；草坪广阔。</p>
              </div>
              <div class="college-type">
                <h5>🔹 Peterhouse（1284年）</h5>
                <p><strong>特点：</strong>剑桥最古老的学院；小巧精致；学术传统深厚。</p>
              </div>
            </div>
            
            <h4>🌟 学术特色</h4>
            <ul>
              <li><strong>自然科学：</strong>剑桥在数学、物理、化学等领域具有无与伦比的实力</li>
              <li><strong>剑桥科技园：</strong>欧洲最大的科技园区，众多科技巨头在此设立研究中心</li>
              <li><strong>图书馆系统：</strong>拥有超过150个图书馆，藏书超过1500万册</li>
            </ul>
          </div>
          
          <h3>学部概览</h3>
          <div class="faculty">
            <h4>1️⃣ 艺术人文学部（School of Arts and Humanities）</h4>
            <p>剑桥大学艺术人文学部在人文学科领域具有深厚的学术传统。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>哲学</li>
              <li>艺术史</li>
            </ul>
            <p><strong>热门专业：</strong>英语文学、历史学、哲学</p>
            <p>📍 培养了众多著名作家、历史学家和哲学家。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 人文社会科学学部（School of Humanities and Social Sciences）</h4>
            <p>涵盖经济学、政治学、社会学等社会科学领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>经济学</li>
              <li>政治学</li>
              <li>社会学</li>
              <li>法学</li>
            </ul>
            <p><strong>热门专业：</strong>经济学、法学、管理学</p>
            <p>📍 剑桥大学Judge商学院是世界顶尖商学院之一。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 技术学部（School of Technology）</h4>
            <p>剑桥大学技术学部在工程和计算机科学领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>计算机科学</li>
              <li>电气工程</li>
              <li>机械工程</li>
              <li>化学工程</li>
            </ul>
            <p><strong>热门专业：</strong>计算机科学、工程学</p>
            <p>📍 与剑桥科技园紧密合作，在科技创新方面处于世界领先地位。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 物理科学学部（School of Physical Sciences）</h4>
            <p>涵盖数学、物理、化学等基础科学领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>数学</li>
              <li>物理学</li>
              <li>化学</li>
              <li>天文学</li>
            </ul>
            <p><strong>热门专业：</strong>数学、物理学</p>
            <p>📍 拥有众多诺贝尔奖获得者，在基础科学研究方面世界领先。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 生物科学学部（School of Biological Sciences）</h4>
            <p>剑桥大学生物科学学院在生命科学和医学研究方面处于前沿地位。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>生物学</li>
              <li>遗传学</li>
              <li>神经科学</li>
              <li>医学</li>
            </ul>
            <p><strong>热门专业：</strong>医学、生物学、神经科学</p>
            <p>📍 剑桥大学医学院是英国顶尖医学院之一，在生物医学研究方面成果丰硕。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('巴斯大学') || safeProps.name.includes('Bath')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>巴斯大学成立于1966年，是一所位于英格兰西南部巴斯市的顶尖公立研究型大学。学校以其卓越的教学质量、优秀的毕业生就业前景和美丽的校园环境而闻名。</p>
            
            <h4>🏛️ 校园特色</h4>
            <ul>
              <li><strong>世界遗产城市：</strong>巴斯是联合国教科文组织世界遗产城市，拥有古罗马浴场等历史古迹</li>
              <li><strong>现代化校园：</strong>校园设施先进，包括现代化的图书馆、实验室和体育设施</li>
              <li><strong>美丽环境：</strong>校园坐落在科茨沃尔德丘陵地带，风景优美</li>
              <li><strong>学生生活：</strong>拥有活跃的学生社团和丰富的课外活动</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 就业前景</h5>
                <p>毕业生就业率在英国名列前茅，多数毕业生在毕业后6个月内找到理想工作。</p>
              </div>
              <div class="college-type">
                <h5>🔹 行业合作</h5>
                <p>与众多国际企业建立了紧密合作关系，提供丰富的实习和就业机会。</p>
              </div>
              <div class="college-type">
                <h5>🔹 研究实力</h5>
                <p>在工程、管理和设计等领域具有强大的研究实力和创新能力。</p>
              </div>
            </div>
            
            <h4>🌟 著名校友</h4>
            <ul>
              <li><strong>商业领袖：</strong>众多校友在全球知名企业担任高管职位</li>
              <li><strong>设计大师：</strong>在设计和创意领域培养了许多杰出人才</li>
              <li><strong>体育精英：</strong>培养了多位奥林匹克运动会奖牌获得者</li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 管理学院（School of Management）</h4>
            <p>巴斯大学管理学院是英国顶尖商学院之一，拥有三重认证（AACSB、EQUIS、AMBA）。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>管理学</li>
              <li>金融学</li>
              <li>市场营销</li>
              <li>人力资源管理</li>
            </ul>
            <p>📍 在商学院排名中名列前茅，毕业生就业前景优秀。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 工程与设计学院（Faculty of Engineering & Design）</h4>
            <p>巴斯大学工程与设计学院在工程和设计领域具有卓越的声誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>机械工程</li>
              <li>土木工程</li>
              <li>电气工程</li>
              <li>产品设计</li>
            </ul>
            <p>📍 在可持续工程和创新设计方面处于领先地位。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 建筑与土木工程学院（Department of Architecture & Civil Engineering）</h4>
            <p>巴斯大学建筑学院在建筑设计和城市规划方面享有盛誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>建筑设计</li>
              <li>城市规划</li>
              <li>土木工程</li>
              <li>环境设计</li>
            </ul>
            <p>📍 建筑学院排名全英前5，拥有优秀的设计工作室和研究中心。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 理学院（Faculty of Science）</h4>
            <p>涵盖数学、计算机科学和自然科学等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>数学</li>
              <li>计算机科学</li>
              <li>生物学</li>
              <li>化学</li>
            </ul>
            <p>📍 在数据科学和人工智能领域研究活跃。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 人文与社会科学学院（Faculty of Humanities & Social Sciences）</h4>
            <p>涵盖人文、社会科学和教育等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>心理学</li>
              <li>教育</li>
              <li>社会学</li>
              <li>现代语言</li>
            </ul>
            <p>📍 在应用心理学和教育研究方面具有较强实力。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('拉夫堡大学') || safeProps.name.includes('Loughborough')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>拉夫堡大学成立于1909年，是一所位于英格兰中部拉夫堡镇的顶尖公立研究型大学。学校以其卓越的体育科学、工程和设计专业而闻名，拥有世界一流的体育设施。</p>
            
            <h4>🏆 体育优势</h4>
            <ul>
              <li><strong>体育科学排名：</strong>体育科学专业在英国排名第一，世界排名前列</li>
              <li><strong>体育设施：</strong>拥有英国最完善的大学体育设施，包括多个体育馆和运动场地</li>
              <li><strong>体育成就：</strong>培养了众多奥林匹克运动会奖牌获得者和体育界精英</li>
              <li><strong>体育产业：</strong>与众多体育品牌和组织建立了紧密合作关系</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 毕业生就业</h5>
                <p>毕业生就业率在英国名列前茅，就业前景优秀。</p>
              </div>
              <div class="college-type">
                <h5>🔹 创新设计</h5>
                <p>设计专业排名全英前10，注重实践和创新能力培养。</p>
              </div>
              <div class="college-type">
                <h5>🔹 工程研究</h5>
                <p>工程学院在先进制造和可持续工程方面处于领先地位。</p>
              </div>
            </div>
            
            <h4>🌟 校园生活</h4>
            <ul>
              <li><strong>校园设施：</strong>拥有现代化的图书馆、实验室和学生宿舍</li>
              <li><strong>学生社团：</strong>拥有超过150个学生社团和体育俱乐部</li>
              <li><strong>校园活动：</strong>全年举办丰富多彩的学术和社交活动</li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 体育、运动与健康科学学院（School of Sport, Exercise and Health Sciences）</h4>
            <p>拉夫堡大学体育学院是世界顶尖的体育科学研究中心。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>体育科学</li>
              <li>运动心理学</li>
              <li>运动生理学</li>
              <li>体育管理</li>
            </ul>
            <p>📍 体育科学排名全英第一，拥有世界一流的体育设施。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 工程学院（School of Engineering）</h4>
            <p>拉夫堡大学工程学院在工程领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>机械工程</li>
              <li>电气工程</li>
              <li>土木工程</li>
              <li>材料工程</li>
            </ul>
            <p>📍 在先进制造和可持续工程方面处于领先地位。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 商学院（Loughborough University Business School）</h4>
            <p>拉夫堡大学商学院是英国顶尖商学院之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>管理学</li>
              <li>金融学</li>
              <li>市场营销</li>
              <li>供应链管理</li>
            </ul>
            <p>📍 在商业管理和创业教育方面享有盛誉。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 设计与创意艺术学院（School of Design and Creative Arts）</h4>
            <p>拉夫堡大学设计学院在设计和创意艺术领域具有卓越声誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>工业设计</li>
              <li>图形设计</li>
              <li>交互设计</li>
              <li>时尚设计</li>
            </ul>
            <p>📍 设计专业排名全英前10，拥有优秀的设计工作室。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 传媒与社会科学学院（School of Media and Social Sciences）</h4>
            <p>涵盖传媒、社会学和政治学等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>传媒研究</li>
              <li>社会学</li>
              <li>政治学</li>
              <li>国际关系</li>
            </ul>
            <p>📍 在传媒研究和社会政策方面具有较强实力。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('谢菲尔德大学') || safeProps.name.includes('Sheffield')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>谢菲尔德大学成立于1828年，是一所位于英格兰北部谢菲尔德市的顶尖公立研究型大学。学校以其卓越的工程学院和医学院而闻名，拥有丰富的学术传统和创新精神。</p>
            
            <h4>🏛️ 历史与环境</h4>
            <ul>
              <li><strong>工业革命遗产：</strong>谢菲尔德是工业革命的中心之一，拥有丰富的制造业历史</li>
              <li><strong>绿色城市：</strong>谢菲尔德拥有超过200个公园和绿地，是英国绿化最好的城市之一</li>
              <li><strong>校园环境：</strong>校园位于城市中心，交通便利，设施齐全</li>
              <li><strong>文化氛围：</strong>拥有活跃的艺术和音乐文化，全年举办众多文化活动</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 工程卓越</h5>
                <p>工程学院是英国顶尖工程学院之一，在先进制造和材料科学领域处于世界领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 医学研究</h5>
                <p>医学院与多家医院紧密合作，医学研究和临床培训质量优秀。</p>
              </div>
              <div class="college-type">
                <h5>🔹 研究实力</h5>
                <p>在多个学科领域具有强大的研究实力，科研成果丰硕。</p>
              </div>
            </div>
            
            <h4>🌟 学生生活</h4>
            <ul>
              <li><strong>学生社团：</strong>拥有超过300个学生社团和体育俱乐部</li>
              <li><strong>学生会：</strong>英国最大的学生会之一，提供丰富的学生服务</li>
              <li><strong>校园活动：</strong>全年举办丰富多彩的学术和社交活动</li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 工程学院（Faculty of Engineering）</h4>
            <p>谢菲尔德大学工程学院是英国顶尖工程学院之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>机械工程</li>
              <li>电气工程</li>
              <li>土木工程</li>
              <li>航空航天工程</li>
            </ul>
            <p>📍 在先进制造和材料科学领域处于世界领先地位。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 医学院（Faculty of Medicine, Dentistry and Health）</h4>
            <p>谢菲尔德大学医学院在医学教育和研究方面享有盛誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>医学</li>
              <li>牙科学</li>
              <li>护理学</li>
              <li>生物医学科学</li>
            </ul>
            <p>📍 与谢菲尔德多家医院紧密合作，临床培训质量优秀。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 商学院（Sheffield University Management School）</h4>
            <p>谢菲尔德大学商学院是英国顶尖商学院之一，拥有三重认证。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>管理学</li>
              <li>金融学</li>
              <li>市场营销</li>
              <li>国际商务</li>
            </ul>
            <p>📍 在管理教育和商业研究方面具有较强实力。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 理学院（Faculty of Science）</h4>
            <p>涵盖数学、计算机科学和自然科学等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>数学</li>
              <li>计算机科学</li>
              <li>物理学</li>
              <li>化学</li>
            </ul>
            <p>📍 在计算机科学和数据分析方面研究活跃。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 艺术与人文学院（Faculty of Arts and Humanities）</h4>
            <p>涵盖人文、语言和艺术等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>现代语言</li>
              <li>音乐</li>
            </ul>
            <p>📍 在人文学科研究方面具有深厚的学术传统。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('格拉斯哥大学') || safeProps.name.includes('Glasgow')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>格拉斯哥大学成立于1451年，是苏格兰最古老的大学之一，也是英国第四古老的大学。学校以其卓越的医学和法学教育而闻名，拥有丰富的历史和学术传统。</p>
            
            <h4>🏰 历史与文化</h4>
            <ul>
              <li><strong>悠久历史：</strong>成立于1451年，拥有超过570年的学术历史</li>
              <li><strong>哥特式建筑：</strong>主校区拥有壮观的哥特式建筑，被誉为英国最美丽的校园之一</li>
              <li><strong>苏格兰文化：</strong>位于苏格兰最大城市，拥有浓厚的苏格兰文化氛围</li>
              <li><strong>国际视野：</strong>拥有来自130多个国家的学生，国际化程度高</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 医学卓越</h5>
                <p>医学院是英国最古老的医学院之一，在医学研究和临床实践方面处于世界领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 法学教育</h5>
                <p>法学院在法律教育和研究方面享有盛誉，培养了众多法律界精英。</p>
              </div>
              <div class="college-type">
                <h5>🔹 经济学传统</h5>
                <p>亚当·斯密商学院以著名经济学家命名，在经济学和商业研究方面具有深厚的学术传统。</p>
              </div>
            </div>
            
            <h4>🌟 著名校友</h4>
            <ul>
              <li><strong>亚当·斯密：</strong>经济学之父，《国富论》作者</li>
              <li><strong>詹姆斯·瓦特：</strong>蒸汽机发明者，工业革命的关键人物</li>
              <li><strong>多位英国首相和最高法院法官</strong></li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 医学院（College of Medical, Veterinary and Life Sciences）</h4>
            <p>格拉斯哥大学医学院是英国最古老、最负盛名的医学院之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>医学</li>
              <li>兽医学</li>
              <li>生物医学科学</li>
              <li>公共卫生</li>
            </ul>
            <p>📍 在医学研究和临床实践方面处于世界领先地位。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 法学院（School of Law）</h4>
            <p>格拉斯哥大学法学院是英国顶尖法学院之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>商法</li>
              <li>国际法</li>
              <li>人权法</li>
              <li>知识产权法</li>
            </ul>
            <p>📍 在法律教育和研究方面享有盛誉。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 工程学院（College of Engineering）</h4>
            <p>格拉斯哥大学工程学院在工程领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>机械工程</li>
              <li>电气工程</li>
              <li>土木工程</li>
              <li>化学工程</li>
            </ul>
            <p>📍 在可再生能源和先进制造方面处于领先地位。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 商学院（Adam Smith Business School）</h4>
            <p>格拉斯哥大学亚当·斯密商学院以著名经济学家命名，是英国顶尖商学院之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>经济学</li>
              <li>管理学</li>
              <li>金融学</li>
              <li>市场营销</li>
            </ul>
            <p>📍 在经济学和商业研究方面具有深厚的学术传统。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 理学院（College of Science and Engineering）</h4>
            <p>涵盖数学、物理和生命科学等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>数学</li>
              <li>物理学</li>
              <li>生物学</li>
              <li>计算机科学</li>
            </ul>
            <p>📍 在数据科学和人工智能领域研究活跃。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('南安普顿大学') || safeProps.name.includes('Southampton')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>南安普顿大学成立于1862年，是一所位于英格兰南部南安普顿市的顶尖公立研究型大学。学校以其卓越的工程学院和海洋科学研究而闻名，拥有世界一流的研究设施。</p>
            
            <h4>🌊 地理位置</h4>
            <ul>
              <li><strong>沿海城市：</strong>位于英格兰南部海岸，靠近南安普顿港</li>
              <li><strong>交通便利：</strong>距离伦敦仅一小时火车车程，交通便捷</li>
              <li><strong>海洋研究：</strong>拥有世界顶尖的海洋与地球科学研究中心</li>
              <li><strong>航空航天：</strong>与航空航天产业紧密合作，研究实力雄厚</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 海洋科学</h5>
                <p>国家海洋学中心是世界顶尖的海洋研究机构，拥有世界一流的研究设施和船队。</p>
              </div>
              <div class="college-type">
                <h5>🔹 航空航天工程</h5>
                <p>工程学院在航空航天和海洋工程领域处于世界领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 创业文化</h5>
                <p>注重创业教育，支持学生创业，拥有活跃的创业社区。</p>
              </div>
            </div>
            
            <h4>🌟 校园设施</h4>
            <ul>
              <li><strong>图书馆：</strong>拥有现代化的图书馆设施，藏书丰富</li>
              <li><strong>体育设施：</strong>拥有完善的体育设施和运动场地</li>
              <li><strong>学生宿舍：</strong>提供多种类型的学生住宿选择</li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 工程与物理科学学院（Faculty of Engineering and Physical Sciences）</h4>
            <p>南安普顿大学工程学院在工程领域具有卓越的声誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>航空航天工程</li>
              <li>电子工程</li>
              <li>机械工程</li>
              <li>计算机科学</li>
            </ul>
            <p>📍 在航空航天和海洋工程领域处于世界领先地位。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 海洋与地球科学学院（National Oceanography Centre）</h4>
            <p>南安普顿大学海洋科学中心是世界顶尖的海洋研究机构。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>海洋学</li>
              <li>地球科学</li>
              <li>环境科学</li>
              <li>气候研究</li>
            </ul>
            <p>📍 拥有世界一流的海洋研究设施和船队。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 医学院（Faculty of Medicine）</h4>
            <p>南安普顿大学医学院在医学教育和研究方面享有盛誉。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>临床医学</li>
              <li>生物医学科学</li>
              <li>护理学</li>
              <li>公共卫生</li>
            </ul>
            <p>📍 与南安普顿总医院紧密合作，临床培训质量优秀。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 商学院（Southampton Business School）</h4>
            <p>南安普顿大学商学院是英国顶尖商学院之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>管理学</li>
              <li>金融学</li>
              <li>市场营销</li>
              <li>创业学</li>
            </ul>
            <p>📍 在商业管理和创新研究方面具有较强实力。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 人文与社会科学学院（Faculty of Arts and Humanities）</h4>
            <p>涵盖人文、社会科学和教育等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>英语文学</li>
              <li>历史</li>
              <li>心理学</li>
              <li>教育</li>
            </ul>
            <p>📍 在人文和社会科学研究方面具有深厚的学术传统。</p>
          </div>
          
        </div>`;
      } else if (safeProps.name.includes('利物浦大学') || safeProps.name.includes('Liverpool')) {
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>利物浦大学成立于1881年，是一所位于英格兰西北部利物浦市的顶尖公立研究型大学。学校以其卓越的医学院和兽医学院而闻名，拥有丰富的学术传统和创新精神。</p>
            
            <h4>⚓ 城市与历史</h4>
            <ul>
              <li><strong>港口城市：</strong>利物浦是英国重要的港口城市，拥有丰富的海洋历史</li>
              <li><strong>文化之都：</strong>2008年欧洲文化之都，拥有丰富的艺术和音乐文化</li>
              <li><strong>披头士故乡：</strong>世界著名乐队披头士的故乡，音乐文化浓厚</li>
              <li><strong>红砖大学：</strong>英国著名的"红砖大学"之一，历史悠久</li>
            </ul>
            
            <h4>🎓 学术优势</h4>
            <div class="college-types">
              <div class="college-type">
                <h5>🔹 医学卓越</h5>
                <p>医学院是英国最古老的医学院之一，在医学研究和临床实践方面处于世界领先地位。</p>
              </div>
              <div class="college-type">
                <h5>🔹 兽医教育</h5>
                <p>兽医学院是英国顶尖兽医学院之一，在兽医教育和动物健康研究方面享有盛誉。</p>
              </div>
              <div class="college-type">
                <h5>🔹 创新研究</h5>
                <p>在多个学科领域具有强大的研究实力，注重创新和跨学科合作。</p>
              </div>
            </div>
            
            <h4>🌟 校园生活</h4>
            <ul>
              <li><strong>学生社区：</strong>拥有活跃的学生社区和丰富的社团活动</li>
              <li><strong>体育文化：</strong>拥有强大的体育传统，尤其在足球和橄榄球方面</li>
              <li><strong>城市生活：</strong>利物浦市提供丰富的文化、娱乐和购物选择</li>
            </ul>
          </div>
          
          <h3>学院概览</h3>
          <div class="faculty">
            <h4>1️⃣ 医学院（Faculty of Health and Life Sciences）</h4>
            <p>利物浦大学医学院是英国最古老的医学院之一，在医学研究方面处于前沿地位。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>医学</li>
              <li>牙科学</li>
              <li>护理学</li>
              <li>生物医学科学</li>
            </ul>
            <p>📍 与利物浦多家医院紧密合作，临床培训质量优秀。</p>
          </div>
          <div class="faculty">
            <h4>2️⃣ 兽医学院（School of Veterinary Science）</h4>
            <p>利物浦大学兽医学院是英国顶尖兽医学院之一。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>兽医学</li>
              <li>动物科学</li>
              <li>兽医公共卫生</li>
              <li>动物行为学</li>
            </ul>
            <p>📍 在兽医教育和动物健康研究方面享有盛誉。</p>
          </div>
          <div class="faculty">
            <h4>3️⃣ 工程学院（Faculty of Engineering and Technology）</h4>
            <p>利物浦大学工程学院在工程领域具有强大的研究实力。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>机械工程</li>
              <li>电气工程</li>
              <li>土木工程</li>
              <li>材料工程</li>
            </ul>
            <p>📍 在先进制造和可持续能源方面处于领先地位。</p>
          </div>
          <div class="faculty">
            <h4>4️⃣ 管理学院（University of Liverpool Management School）</h4>
            <p>利物浦大学管理学院是英国顶尖商学院之一，拥有三重认证。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>管理学</li>
              <li>金融学</li>
              <li>市场营销</li>
              <li>供应链管理</li>
            </ul>
            <p>📍 在商业管理和国际商务方面具有较强实力。</p>
          </div>
          <div class="faculty">
            <h4>5️⃣ 理学院（Faculty of Science）</h4>
            <p>涵盖数学、物理和计算机科学等领域。</p>
            <p><strong>主要学科：</strong></p>
            <ul>
              <li>数学</li>
              <li>物理学</li>
              <li>计算机科学</li>
              <li>化学</li>
            </ul>
            <p>📍 在计算机科学和数据分析方面研究活跃。</p>
          </div>
          
        </div>`;
      } else {
        // 其他学校显示完整结构
        specialContent = `
        <div class="faculties-section">
          <h3>学校特色</h3>
          <div class="college-system-section">
            <p>${safeProps.name}是一所优秀的英国大学，在多个学科领域具有卓越的学术实力。</p>
          </div>
          
          <h3>费用参考</h3>
          <table class="programs-table">
            <thead>
              <tr>
                <th>大学</th>
                <th>地点/特色</th>
                <th>国际学生本科学费（近似）</th>
                <th>推荐生活费估算</th>
                <th>年度总预算大致</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>University College London（UCL）</td>
                <td>伦敦市区</td>
                <td>≈ £37,500/年 起（2024-25入学国际生）</td>
                <td>建议 £15,000-£20,000/年（伦敦高生活成本）</td>
                <td>约 £52,000-£57,000/年</td>
              </tr>
              <tr>
                <td>The University of Manchester</td>
                <td>曼彻斯特（非伦敦大城市）</td>
                <td>≈ £33,100/年（2026/27入学部分课程）</td>
                <td>建议 £10,000-£13,000/年</td>
                <td>约 £43,000-£46,000/年</td>
              </tr>
              <tr>
                <td>University of St Andrews</td>
                <td>苏格兰，非伦敦</td>
                <td>≈ £35,260/年（2025-26学年国际生）</td>
                <td>学校估算约 £15,000-£16,000/年</td>
                <td>约 £50,000-£52,000/年</td>
              </tr>
              <tr>
                <td>University of Edinburgh</td>
                <td>爱丁堡（苏格兰）</td>
                <td>文科/非实验科目约 £24,000-£36,000/年 起；实验/理工科目约 £32,200/年 起</td>
                <td>学校估算约 £12,000-£18,000/年</td>
                <td>约 £36,000-£50,000/年（视专业及住宿）</td>
              </tr>
            </tbody>
          </table>
          
        </div>`;
      }
    }
    
    htmlContent += specialContent + `
  </div>`;
  
    // 从JSON加载可视化模板
    let visualizationHtml = '';
    if (schoolData && schoolData.visualization_template) {
      visualizationHtml = schoolData.visualization_template;
    } else {
      // 保留旧的逻辑作为后备方案
      if (safeProps.name.includes("UCL") || safeProps.name.includes("伦敦大学学院")) {
        visualizationHtml = `
  <!-- UCL申请数据可视化部分 -->
  <div class="ucl-data-visualization">
    <h3>UCL申请数据分析</h3>
    <div class="charts-container">
      <div class="chart-wrapper">
        <h4>各学院申请与录取人数对比</h4>
        <canvas id="facultyChart" width="700" height="400"></canvas>
      </div>
      <div class="chart-wrapper">
        <h4>专业竞争激烈程度</h4>
        <canvas id="competitivenessChart" width="700" height="400"></canvas>
      </div>
    </div>
  </div>`;
      }
      
      if (safeProps.name.includes("爱丁堡大学") || safeProps.name.includes("University of Edinburgh")) {
        visualizationHtml = `
  <!-- 爱丁堡大学申请数据可视化部分 -->
  <div class="edinburgh-data-visualization">
    <h3>爱丁堡大学申请数据分析</h3>
    <div class="charts-container">
      <div class="chart-wrapper">
        <h4>2024Cycle海外申请排名前5的学院申请数据</h4>
        <div id="topSchoolsTable" class="school-admissions-table-container"></div>
      </div>
      <div class="chart-wrapper">
        <h4>专业竞争激烈程度</h4>
        <canvas id="edinburghCompetitivenessChart" width="700" height="400"></canvas>
      </div>
    </div>
  </div>`;
      }
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
  
  // 如果是UCL，加载数据并创建图表
  if (props.name.includes("UCL") || props.name.includes("伦敦大学学院")) {
    loadAndCreateCharts('stats/ucl_apps_data.json', 'facultyChart', 'competitivenessChart', {
      appColor: 'rgba(54, 162, 235, 0.7)',
      appBorderColor: 'rgba(54, 162, 235, 1)',
      offerColor: 'rgba(75, 192, 192, 0.7)',
      offerBorderColor: 'rgba(75, 192, 192, 1)'
    });
  }
  
  // 如果是爱丁堡大学，加载数据并创建图表和表格
  if (props.name.includes("爱丁堡大学") || props.name.includes("University of Edinburgh")) {
    // 加载并显示排名前5的学院申请数据表格
    loadTopSchoolsTable('stats/top_schools_data.json');
    
    // 只创建专业竞争激烈程度图表
    createCompetitivenessChartFromJSON('stats/edinburgh_apps_data.json', 'edinburghCompetitivenessChart');
  }
}
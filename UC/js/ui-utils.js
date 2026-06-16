// UC地图应用 - UI工具模块
;(function() {
  // 获取图片说明文字
  function getImageCaption(filename) {
    if (filename.includes('录取.png')) return '录取情况';
    if (filename.includes('录取率.png')) return '录取率分析';
    if (filename.includes('GPA.png')) return 'GPA要求';
    return '';
  }

  // 生成录取图片HTML
  function generateAdmissionImages(schoolName) {
    const schoolData = window.ucMapData.getSchoolImageData(schoolName);
    if (!schoolData || !schoolData.admissionImages || schoolData.admissionImages.length === 0) {
      return '';
    }
    
    return `
      <div class="admission-images-section">
        <h3 class="section-title">📊 录取数据分析</h3>
        <div class="image-gallery">
          ${schoolData.admissionImages.map(img => `
            <div class="gallery-item">
              <img 
                src="imgs/${img}" 
                alt="${schoolName} ${img}" 
                class="admission-image" 
                loading="lazy"
                onerror="this.style.display='none'"
                onload="this.classList.add('loaded')"
              >
              <div class="image-caption">${getImageCaption(img)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 生成HTML部分的辅助函数
  function generateSectionTitle(icon, text) {
    return `<h3 class="section-title">${icon} ${text}</h3>`;
  }

  // 生成各学校申请录取对比图表
  function generateComparisonChart() {
    return `
      <div class="comparison-chart-section">
        ${generateSectionTitle('📊', '各学校申请录取数据对比')}
        <div class="chart-container">
          <canvas id="comparisonChart" aria-label="各UC学校申请录取数据对比图" role="img">
      </div>
    `;
  }

  // 生成费用参考表格HTML
  function generateFeesTable() {
    return `
      <div class="fees-section">
        ${generateSectionTitle('💰', '费用参考（2025-2027学年）')}
        <table class="fees-table">
          <thead>
            <tr>
              <th>校区</th>
              <th>国际学生本科学费（近似）</th>
              <th>建议生活费估算</th>
              <th>年度总预算大致</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UC Berkeley</td>
              <td>国际生约$55,323/年</td>
              <td>食宿平均$24,000/年</td>
              <td>约$79,323/年</td>
            </tr>
            <tr>
              <td>UCLA</td>
              <td>国际生约$55,323/年</td>
              <td>食宿平均$23,000/年</td>
              <td>约$78,323/年</td>
            </tr>
            <tr>
              <td>UC San Diego</td>
              <td>国际生约$55,323/年</td>
              <td>食宿平均$22,000/年</td>
              <td>约$77,323/年</td>
            </tr>
            <tr>
              <td>UC Davis</td>
              <td>国际生学费$50,324/年</td>
              <td>食宿平均$20,000/年</td>
              <td>约$70,324/年</td>
            </tr>
            <tr>
              <td>UC Irvine</td>
              <td>国际生约$61,000/年</td>
              <td>食宿平均$21,000/年</td>
              <td>约$82,000/年</td>
            </tr>
            <tr>
              <td>UC Santa Barbara</td>
              <td>国际生约$62,000/年</td>
              <td>食宿平均$21,500/年</td>
              <td>约$83,500/年</td>
            </tr>
            <tr>
              <td>UC Santa Cruz</td>
              <td>国际生约$55,323/年</td>
              <td>食宿平均$20,500/年</td>
              <td>约$75,823/年</td>
            </tr>
            <tr>
              <td>UC Riverside</td>
              <td>国际生约$55,323/年</td>
              <td>食宿平均$19,000/年</td>
              <td>约$74,323/年</td>
            </tr>
            <tr>
              <td>UC Merced</td>
              <td>国际生约$55,323/年</td>
              <td>食宿平均$18,500/年</td>
              <td>约$73,823/年</td>
            </tr>
            <tr style="background-color: #f0f8ff; font-weight: bold;">
              <td>南加州大学 (USC) <br><small>(私立大学对比)</small></td>
              <td>国际生约$65,000-$75,000/年</td>
              <td>食宿平均$25,000-$35,000/年</td>
              <td>约$90,000-$110,000/年</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // 显示预览信息
  function showPreview(props) {
    try {
      const sidebar = document.getElementById('sidebar');
      const infoContainer = document.getElementById('info');
      sidebar.classList.add('active', 'preview');
      const safeProps = window.ucMapData.getSafeProps(props, true);
      
      infoContainer.innerHTML = `
        <div class="school-card preview">
          ${safeProps.img ? `<img src="${safeProps.img}" alt="${safeProps.name}" loading="lazy" onerror="this.style.display='none'">` : ''}
          <div class="school-details preview">
            <h2>${safeProps.name}</h2>
            <div class="school-grid preview">
              <div class="grid-label">Ranking:</div><div>${safeProps.ranking}${safeProps.ratio ? ` (${safeProps.ratio})` : ''}</div>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('显示预览信息时出错:', error);
      const infoContainer = document.getElementById('info');
      infoContainer.innerHTML = '<p class="error-message">加载学校预览信息时发生错误</p>';
    }
  }

  // 显示完整信息
  function showFull(props) {
    try {
      const sidebar = document.getElementById('sidebar');
      const infoContainer = document.getElementById('info');
      sidebar.classList.add('active');
      sidebar.classList.remove('preview');
      const safeProps = window.ucMapData.getSafeProps(props);
      
      // 生成学院信息HTML
      let collegesHtml = '';
      if (safeProps.colleges && safeProps.colleges.length > 0) {
        collegesHtml = `
          <div class="colleges-section">
            ${generateSectionTitle('🏫', '学院信息')}
            <div class="colleges-grid">
              ${safeProps.colleges.map(college => `
                  <div class="college-card">
                    <div class="college-header">
                      <h4 class="college-name">${college.name}</h4>
                      <span class="college-chinese-name">${college.chineseName}</span>
                      ${college.founded ? `<span class="college-founded">${college.founded}</span>` : ''}
                    </div>
                    ${college.coreIdea ? `<p class="college-core-idea">💡 ${college.coreIdea}</p>` : ''}
                    ${college.description ? `<p class="college-description">${college.description}</p>` : ''}
                    ${college.popularMajors && college.popularMajors.length > 0 ? `
                      <div class="college-majors">
                        <span class="majors-label">🔥 热门专业：</span>
                        <span class="majors-list">${college.popularMajors.join('、')}</span>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
            </div>
          </div>
        `;
      }
      
      // 生成热门专业详情HTML
      let popularMajorsHtml = '';
      if (safeProps.overallPopularMajors && safeProps.overallPopularMajors.length > 0) {
        popularMajorsHtml = `
          <div class="popular-majors-section">
            ${generateSectionTitle('📚', '热门/强势专业')}
            <div class="popular-majors-grid">
              ${safeProps.overallPopularMajors.map(major => `
                <div class="major-badge">
                  <span class="major-name">${major.name}</span>
                  ${major.note ? `<div class="major-tooltip" title="${major.note}">ℹ️</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
      
      // 生成招生数据HTML
      const admissionStatsData = window.ucMapData.getAdmissionStats(safeProps.name);
      
      infoContainer.innerHTML = `
        <div class="school-container">
          <!-- 保持图片和原有内容的水平布局 -->
          <div class="school-card">
            ${safeProps.img ? `<img src="${safeProps.img}" alt="${safeProps.name}" loading="lazy" onerror="this.style.display='none'"></img>` : ''}
            <div class="school-details">
                <h2>${safeProps.name}</h2>
                
                <!-- 学校介绍和特色 -->
                <div class="school-intro">
                  ${safeProps.name === 'UC Berkeley' ? `
                    <p class="school-description">UC Berkeley是加州大学系统的旗舰校区，以卓越的学术实力和创新精神闻名于世。作为全美顶尖的公立研究型大学，Berkeley在计算机科学、工程学、经济学等领域处于世界领先地位，拥有众多诺贝尔奖得主和学术大师。</p>
                    <p class="school-feature">🌟 学校特色：与硅谷紧密合作，创业氛围浓厚，学术自由传统，多元化的学生社区。</p>
                  ` : ''}
                  ${safeProps.name === 'UCLA' ? `
                    <p class="school-description">UCLA是加州大学系统中规模最大的校区之一，位于洛杉矶市中心附近，拥有优美的校园环境和丰富的学术资源。UCLA在电影、医学、工程等领域实力强劲，同时也是体育强国，拥有众多NCAA冠军。</p>
                    <p class="school-feature">🌟 学校特色：好莱坞地理位置优势，艺术与科技结合，多元文化氛围，强大的校友网络。</p>
                  ` : ''}
                  ${safeProps.name === 'UC San Diego' ? `
                    <p class="school-description">UC San Diego是加州大学系统中最年轻的校区之一，以其强大的科研实力和创新精神迅速崛起。学校位于美丽的拉霍亚海滩附近，拥有世界一流的生物医学、工程和物理科学研究中心。</p>
                    <p class="school-feature">🌟 学校特色：独特的学院制度，与Salk研究所和Scripps海洋研究所合作，创新创业生态系统，美丽的校园环境。</p>
                  ` : ''}
                  ${safeProps.name === 'UC Santa Barbara' ? `
                    <p class="school-description">UC Santa Barbara位于美丽的圣巴巴拉海岸，拥有令人惊叹的校园环境和卓越的学术声誉。学校在环境科学、海洋生物学、物理学等领域表现突出，同时也是社交活动丰富的校园。</p>
                    <p class="school-feature">🌟 学校特色：海景校园，强大的研究实力，活跃的社交氛围，优秀的工程和科学项目。</p>
                  ` : ''}
                  ${safeProps.name === 'UC Irvine' ? `
                    <p class="school-description">UC Irvine是加州大学系统中发展最快的校区之一，以其创新的教学方法和研究成果而闻名。学校位于橙县，环境安全宜居，在计算机科学、生物医学、商科等领域实力强劲。</p>
                    <p class="school-feature">🌟 学校特色：安全的校园环境，多元化的学生群体，强大的研究项目，靠近科技和商业中心。</p>
                  ` : ''}
                  ${safeProps.name === 'UC Davis' ? `
                    <p class="school-description">UC Davis以其卓越的农业、兽医和环境科学项目而闻名，同时也是一所综合性研究型大学。学校位于加州中央谷地，拥有广阔的校园和丰富的自然资源。</p>
                    <p class="school-feature">🌟 学校特色：农业和兽医专业全美顶尖，可持续发展研究，友好的校园氛围，丰富的户外休闲活动。</p>
                  ` : ''}
                  ${safeProps.name === 'UC Santa Cruz' ? `
                    <p class="school-description">UC Santa Cruz位于旧金山湾区附近，拥有独特的学院制度和美丽的红杉林校园。学校以其创新的教学方法和跨学科研究而闻名，在计算机科学、环境科学等领域表现突出。</p>
                    <p class="school-feature">🌟 学校特色：红杉林校园，学院制度，强调批判性思维，靠近硅谷的地理位置优势。</p>
                  ` : ''}
                  ${safeProps.name === 'UC Riverside' ? `
                    <p class="school-description">UC Riverside是加州大学系统中多元化程度最高的校区之一，以其包容性和创新精神而闻名。学校在农业、工程、社会科学等领域有较强实力，同时也是一所注重社区 engagement的大学。</p>
                    <p class="school-feature">🌟 学校特色：多元化的学生群体，强大的农业和环境科学项目，个性化的学习体验，不断发展的研究实力。</p>
                  ` : ''}
                  ${safeProps.name === 'UC Merced' ? `
                    <p class="school-description">UC Merced是加州大学系统中最新的校区，成立于2005年，以其创新的教学方法和研究成果而迅速发展。学校位于加州中央谷地，致力于为学生提供高质量的教育和研究机会。</p>
                    <p class="school-feature">🌟 学校特色：现代化的校园设施，小班教学，跨学科研究，注重本科教育质量。</p>
                  ` : ''}
                </div>
                
                <div class="school-grid">
                <div class="school-row">
                <div class="grid-label">2025新生申请:</div>
                <div class="grid-value">${admissionStatsData.applicants}</div>
              </div>
              <div class="school-row">
                <div class="grid-label">2025国际生申请:</div>
                <div class="grid-value">${safeProps.intl}</div>
              </div>
              <div class="school-row">
                <div class="grid-label">录取人数:</div>
                <div class="grid-value">${admissionStatsData.admits}</div>
              </div>
              <div class="school-row">
                <div class="grid-label">录取率:</div>
                <div class="grid-value">${admissionStatsData.admitRate}</div>
              </div>
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
              <!-- 费用参考表格放在最上方 -->
              ${generateFeesTable()}
              
              <!-- 学院信息 -->
              ${safeProps.name === 'UC San Diego' || safeProps.name === 'UCSD' ? `
              <div class="colleges-intro">
                <h3>📋 UCSD 学院制度说明</h3>
                <ul>
                  <li><strong>🎓 通识教育要求（GE）</strong>：各学院课程要求不同，有的更重（Revelle），有的更轻（Muir）。GE 是 UCSD 各学院区别的最大来源。</li>
                  <li><strong>🏠 住宿区域</strong>：每个学院都有自己独立的宿舍区、餐厅、学习空间，社群氛围不同。</li>
                  <li><strong>🧑‍🤝‍🧑 社群与文化</strong>：学院会举办自己的活动、传统节日，社交氛围差异明显。</li>
                  <li><strong>🧭 专业选择</strong>：专业归属在学术部门（如工程学院、社会科学学院），<strong>与学院无关</strong>。学院影响的是<strong>GE课和住宿生活</strong>，不是专业。</li>
                </ul>
              </div>
              ` : ''}
              ${collegesHtml}
              
              <!-- 添加学院对比信息 - 仅UCSD显示 -->
              ${(safeProps.name === 'UC San Diego' || safeProps.name === 'UCSD') && safeProps.collegeComparison ? `
                <div class="college-comparison-section">
                  ${generateSectionTitle('📋', '学院对比')}
                  <div class="comparison-table" style="white-space: pre-line;">${safeProps.collegeComparison}</div>
                </div>
              ` : ''}
              
              <!-- 添加学术部门说明 - 仅UCSD显示 -->
              ${(safeProps.name === 'UC San Diego' || safeProps.name === 'UCSD') && safeProps.academicDivisions ? `
                <div class="academic-divisions-section">
                  ${generateSectionTitle('🎓', '学术部门说明')}
                  <p class="academic-divisions-text">${safeProps.academicDivisions}</p>
                </div>
              ` : ''}
              
              <!-- 热门专业详情 -->
              ${popularMajorsHtml}
              
              <!-- 专业录取数据分析Tableau表格 -->
              <div class="tableau-section">
                ${generateSectionTitle('📊', '专业录取数据分析')}
                <div class="tableau-container">
                  <tableau-viz id="tableau-viz" src="https://visualizedata.ucop.edu/t/Public/views/Freshmanadmissionbydiscipline/Bybroaddiscipline" width="1050" height="850" toolbar="bottom" device="default" ></tableau-viz>
                </div>
                <p class="stats-note">数据来源：加州大学官方专业录取统计</p>
              </div>
              
              <!-- 添加各学校申请录取对比图表 -->
              ${generateComparisonChart()}

            </div>
          </div>
      `;
      
      // 在添加HTML内容后创建图表
      setTimeout(() => {
        createComparisonChart();
      }, 100);
    } catch (error) {
      console.error('显示完整信息时出错:', error);
      const infoContainer = document.getElementById('info');
      infoContainer.innerHTML = '<p class="error-message">加载学校详细信息时发生错误</p>';
    }
  }

  // 创建对比图表
  function createComparisonChart() {
    const chartCanvas = document.getElementById('comparisonChart');
    if (!chartCanvas) {
      return null;
    }
    
    const ctx = chartCanvas.getContext('2d');
    
    // 检查Chart库是否已加载
    if (typeof Chart === 'undefined') {
      console.log('Chart.js库未加载');
      return null;
    }
    
    // 准备图表数据
    const schools = Object.keys(window.ucMapData.admissionStats);
    const chartData = {
      labels: schools,
      datasets: [{
        label: '申请人数',
        data: schools.map(school => {
          return parseFloat(window.ucMapData.admissionStats[school].applicants.replace(/,/g, ''));
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }, {
        label: '录取人数',
        data: schools.map(school => parseFloat(window.ucMapData.admissionStats[school].admits.replace(/,/g, ''))),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };
    
    // 创建图表
    new window.Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                return label + context.parsed.y.toLocaleString();
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: '人数'
            }
          }
        }
      }
    });
  }

  // 创建2025年秋季本科申请统计图表
  function createApplicationsChart() {
    const chartCanvas = document.getElementById('applicationsChart');
    
    // 检查图表容器是否存在
    if (!chartCanvas) {
      console.log('未找到图表容器元素');
      return null;
    }
    
    const ctx = chartCanvas.getContext('2d');
    
    // 检查Chart库是否已加载
    if (typeof Chart === 'undefined') {
      console.log('Chart.js库未加载');
      return null;
    }
    
    // 创建图表
    const chart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Berkeley', 'Davis', 'Irvine', 'Los Angeles', 'Merced', 'Riverside', 'San Diego', 'Santa Barbara', 'Santa Cruz'],
        datasets: [{
          label: '国际学生申请量',
          data: [24020, 20900, 21646, 24200, 4856, 6363, 24288, 18691, 6694],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }, {
          label: '非国际学生申请量',
          data: [126089, 99231, 128004, 149097, 46889, 76541, 135862, 110292, 71079],
          backgroundColor: 'rgba(74, 111, 165, 0.7)',
          borderColor: 'rgba(74, 111, 165, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: '加州大学校区'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: '申请数量'
            },
            ticks: {
              callback: function(value) {
                return value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed.y.toLocaleString();
                
                // 计算占比
                const total = context.chart.data.datasets.reduce((sum, dataset) => sum + dataset.data[context.dataIndex], 0);
                const percentage = Math.round((context.parsed.y / total) * 100);
                
                return label + ' (' + percentage + '%)';
              }
            }
          }
        }
      }
    });
    
    // 添加窗口大小变化处理
    window.addEventListener('resize', function() {
      chart.resize();
    });
    
    return chart;
  }

  // 暴露UI工具函数
  window.ucMapUI = {
    showPreview,
    showFull,
    generateAdmissionImages,
    generateSectionTitle,
    generateComparisonChart,
    generateFeesTable,
    createComparisonChart,
    createApplicationsChart
  };
})();

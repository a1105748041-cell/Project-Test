# 英国名校互动地图项目

这个项目是一个基于Leaflet地图库的互动地图，展示英国四所顶尖大学的信息：圣安德鲁斯大学、杜伦大学、伦敦大学学院(UCL)和布里斯托大学。

## 项目结构

```
├── README.md              # 项目说明文档
├── .gitignore             # Git忽略文件配置
├── index.html             # 主页面
├── css/                   # CSS样式目录
│   ├── application-timeline.css  # 申请时间线样式
│   └── uk-map.css         # 主样式文件
├── js/                    # JavaScript目录
│   ├── map-initialize.js  # 地图初始化脚本
│   ├── sidebar-utils.js   # 侧边栏功能脚本
│   ├── chart-utils.js     # 图表绘制脚本
│   ├── map-events.js      # 地图事件处理脚本
│   └── application-timeline-new.js  # 申请流程时间线功能
├── stats/                 # 数据目录
│   ├── uk-universities.geojson       # 大学地理数据
│   ├── school_programs_data.js       # 学校专业数据
│   ├── ucl_apps_data.json            # UCL申请数据
│   ├── edinburgh_apps_data.json      # 爱丁堡大学申请数据
│   ├── excel_to_json.py              # Excel转JSON脚本
│   ├── uk_universities_data.json     # 英国大学数据
│   ├── top_schools_data.json         # 顶尖学校数据
│   ├── read_pdf.py                   # PDF读取脚本
│   ├── update_ucl_data.py            # UCL数据更新脚本
│   ├── 英国热门院校.xlsx            # 英国热门院校Excel数据
│   └── 相关PDF文件                   # 申请统计数据PDF
└── imgs/                  # 图片目录
    ├── EU_logo.jpeg       # 爱丁堡大学logo
    ├── SA_logo.jpeg       # 圣安德鲁斯大学logo
    ├── UCL_logo.jpeg      # UCL大学logo
    └── UoM_logo.jpeg      # 曼彻斯特大学logo
```

## 功能特点

1. **互动地图**: 点击地图上的标记查看学校详细信息
2. **悬停预览**: 鼠标悬停在标记上显示简要信息
3. **侧边栏详情**: 点击标记后在侧边栏显示学校完整信息
4. **数据可视化**: 支持UCL和爱丁堡大学的申请数据可视化
5. **专业信息表格**: 展示学校热门专业的详细信息
6. **学院概览**: 显示曼彻斯特大学和圣安德鲁斯大学的学院信息与学科分布
7. **申请流程时间线**: 提供详细的英国本科申请时间线与任务清单
8. **系统概述**: 包含英国大学系统的基本信息和数据
9. **响应式设计**: 适应不同屏幕大小
10. **页面水印**: 支持自定义水印显示

## 使用方法

1. 确保您的系统已安装Python或任何支持HTTP服务的工具
2. 在项目根目录下启动HTTP服务器：
   ```bash
   python3 -m http.server
   ```
3. 打开浏览器，访问 http://localhost:8000

## 数据说明

项目包含多所英国顶尖大学的信息，包括：
- 圣安德鲁斯大学
- 伦敦大学学院(UCL)
- 爱丁堡大学
- 曼彻斯特大学
- 杜伦大学
- 布里斯托大学等

每个学校的信息包括：名称、学生数量、国际生数量、排名、官方网站、图片路径、学费、热门专业和申请数据等。

UCL特别包含：
- 申请人数最多的3个学院统计
- 录取人数最多的2个学院统计

## 开发说明

- JavaScript代码已按功能模块化分离到js/目录下
- 主页面为index.html，负责页面结构和外部资源引入
- CSS样式文件统一存放在css/目录下，便于管理
- 数据文件集中存放在stats/目录
- 图片资源位于imgs/目录
- 样式使用CSS变量实现统一的设计风格

## 技术依赖

- [Leaflet](https://leafletjs.com/) - 开源的交互式地图库
- [Chart.js](https://www.chartjs.org/) - 数据可视化库
- [OpenStreetMap](https://www.openstreetmap.org/) - 地图瓦片服务

## 更新日志

- 重构代码：将内嵌JavaScript分离到外部文件，提高可维护性
- 添加.gitignore文件，符合Git版本控制最佳实践
- 优化UCL数据展示，增加学院申请与录取统计
- 修复了圣安德鲁斯大学表格显示问题
- 改进了DOM加载和元素查找逻辑
- 美化学院概览板块，添加现代化设计元素
- 为圣安德鲁斯大学添加四大学院详细信息
- 将CSS文件统一组织到css/目录
- 添加页面水印功能
- 优化整体UI设计，使用CSS变量实现一致的设计风格

## 自定义指南

- 如果需要添加更多大学或修改现有信息，请编辑`stats/uk-universities.geojson`文件
- 如果需要更改界面样式，请修改`css/uk-map.css`文件
- 要添加新学校的学院信息，请在`js/sidebar-utils.js`的`showFull`函数中添加相应的条件渲染逻辑
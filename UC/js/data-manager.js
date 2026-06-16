// UC地图应用 - 数据管理模块
;(function() {
  // 招生数据映射表
  const admissionStats = {
    'UC Berkeley': {
      applicants: '126,836',
      admits: '14,451',
      admitRate: '11.4%'
    },
    'UCLA': {
      applicants: '145,070',
      admits: '13,660',
      admitRate: '9.4%'
    },
    'UC San Diego': {
      applicants: '136,740',
      admits: '38,846',
      admitRate: '28.4%'
    },
    'UC Davis': {
      applicants: '102,980',
      admits: '45,963',
      admitRate: '44.6%'
    },
    'UC Merced': {
      applicants: '49,358',
      admits: '46,932',
      admitRate: '95.1%'
    },
    'UC Riverside': {
      applicants: '70,862',
      admits: '61,718',
      admitRate: '87.1%'
    },
    'UC Santa Barbara': {
      applicants: '110,178',
      admits: '42,170',
      admitRate: '38.3%'
    },
    'UC Santa Cruz': {
      applicants: '66,373',
      admits: '48,244',
      admitRate: '72.7%'
    },
    'UC Irvine': {
      applicants: '124,230',
      admits: '35,661',
      admitRate: '28.7%'
    }
  };

  // 学校图片映射表
  const schoolImageMap = {
    'UC Berkeley': {
      imageKey: 'UCB',
      admissionImages: ['UCB录取.png', 'UCBGPA.png']
    },
    'UCLA': {
      imageKey: 'UCLA',
      admissionImages: ['UCLA录取.png']
    },
    'UC San Diego': {
      imageKey: 'UCSD',
      admissionImages: ['UCSD录取.png']
    },
    'UC Davis': {
      imageKey: 'UCD',
      admissionImages: ['UCD录取.png']
    },
    'UC Merced': {
      imageKey: 'UCM',
      admissionImages: ['UCM录取.png']
    },
    'UC Irvine': {
      imageKey: 'UCI',
      admissionImages: ['UCI录取.png']
    },
    'UC Riverside': {
      imageKey: 'UCR',
      admissionImages: ['UCR录取.png']
    },
    'UC Santa Barbara': {
      imageKey: 'UCSB',
      admissionImages: ['UCSB录取.png']
    },
    'UC Santa Cruz': {
      imageKey: 'UCSC',
      admissionImages: ['UCSC录取.png']
    }
  };

  // 辅助函数：安全获取属性值
  function getSafeProps(props, isPreview = false) {
    const baseProps = {
      name: props.name || '未知学校',
      img: props.img || '',
      ranking: props.ranking || '未提供',
      ratio: props.ratio || ''
    };
    
    if (!isPreview) {
      Object.assign(baseProps, {
        applicants: props.applicants || '未提供',
        intl: props.intl || '未提供',
        website: props.website || '#',
        popularMajors: props.popularMajors || '未提供',
        tuition: props.tuition || '未提供',
        colleges: props.colleges || [],
        overallPopularMajors: props.overallPopularMajors || []
      });
    }
    
    return baseProps;
  }

  // 加载GeoJSON数据
  function loadGeoJsonData(url) {
    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP错误: ${res.status}`);
        return res.json();
      });
  }

  // 获取招生数据
  function getAdmissionStats(schoolName) {
    return admissionStats[schoolName] || { applicants: '未提供', admits: '未提供', admitRate: '未提供' };
  }

  // 获取学校图片数据
  function getSchoolImageData(schoolName) {
    return schoolImageMap[schoolName] || { imageKey: '', admissionImages: [] };
  }

  // 暴露数据和函数
  window.ucMapData = {
    admissionStats,
    schoolImageMap,
    getSafeProps,
    loadGeoJsonData,
    getAdmissionStats,
    getSchoolImageData
  };
})();

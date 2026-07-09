class UniversitySearch {
    constructor() {
        this.allUniversities = [];
        this.searchResults = [];
    }

    async loadAllUniversities() {
        const regions = [
            { code: 'UC', file: 'uc-campuses-updated.geojson', path: 'UC' },
            { code: 'USA', file: 'usa-universities.geojson', path: 'USA/stats' },
            { code: 'UK', file: 'uk-universities.geojson', path: 'UK/stats' }
        ];
        
        for (const region of regions) {
            try {
                const response = await fetch(`${region.path}/${region.file}`);
                if (response.ok) {
                    const data = await response.json();
                    data.features.forEach(feature => {
                        this.allUniversities.push({
                            name: feature.properties.name || feature.properties.Name || 'Unknown',
                            englishName: feature.properties.englishName || feature.properties.EnglishName || feature.properties.name || 'Unknown',
                            ranking: feature.properties.ranking || feature.properties.Ranking || '',
                            region: region.code,
                            coordinates: feature.geometry.coordinates
                        });
                    });
                }
            } catch (error) {
                console.warn(`Failed to load ${region.code} universities:`, error);
            }
        }
        console.log('Total universities loaded:', this.allUniversities.length);
    }

    search(query) {
        if (!query.trim()) return [];
        
        const lowerQuery = query.toLowerCase();
        return this.allUniversities.filter(university => {
            return (
                university.name.toLowerCase().includes(lowerQuery) ||
                university.englishName.toLowerCase().includes(lowerQuery)
            );
        });
    }

    getSuggestions(query, limit = 5) {
        const results = this.search(query);
        return results.slice(0, limit);
    }
}

let searchInstance = null;

export async function getSearchInstance() {
    if (!searchInstance) {
        searchInstance = new UniversitySearch();
        await searchInstance.loadAllUniversities();
    }
    return searchInstance;
}

export function createSearchBox(containerId, onSelect) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const searchHTML = `
        <div class="search-container">
            <div class="search-box-wrapper">
                <span class="search-icon">🔍</span>
                <input type="text" id="universities-search-input" placeholder="搜索大学名称..." class="search-input">
                <button id="search-button" class="search-button">搜索</button>
            </div>
            <div id="search-results" class="search-results"></div>
        </div>
    `;

    container.innerHTML = searchHTML;

    const input = document.getElementById('universities-search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('search-results');

    const performSearch = async function() {
        const query = input.value.trim();
        if (!query) {
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
            return;
        }

        try {
            const search = await getSearchInstance();
            const suggestions = search.getSuggestions(query, 6);

            if (suggestions.length > 0) {
                resultsContainer.innerHTML = suggestions.map((uni, index) => {
                    const regionIcon = uni.region === 'UC' ? '🌴' : uni.region === 'USA' ? '🇺🇸' : '🇬🇧';
                    const regionName = uni.region === 'AUS' ? '澳大利亚' : uni.region === 'USA' ? '美国' : uni.region === 'UC' ? '加州' : '英国';
                    return `
                    <div class="search-result-item" data-index="${index}">
                        <div class="result-icon">${regionIcon}</div>
                        <div class="result-info">
                            <div class="result-name">${uni.name}</div>
                            <div class="result-english">${uni.englishName}</div>
                            <div class="result-region">${regionName}</div>
                        </div>
                    </div>
                `}).join('');
                resultsContainer.style.display = 'block';

                document.querySelectorAll('.search-result-item').forEach((item, index) => {
                    item.addEventListener('click', () => {
                        const university = suggestions[index];
                        if (onSelect) {
                            onSelect(university);
                        } else {
                            navigateToUniversity(university);
                        }
                        resultsContainer.innerHTML = '';
                        resultsContainer.style.display = 'none';
                        input.value = '';
                    });
                });
            } else {
                resultsContainer.innerHTML = '<div class="no-results"><div class="no-results-icon">🔍</div><div>未找到匹配的大学</div></div>';
                resultsContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Search error:', error);
            resultsContainer.innerHTML = '<div class="no-results">搜索出错，请稍后重试</div>';
            resultsContainer.style.display = 'block';
        }
    };

    input.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
        }
    });
}

function navigateToUniversity(university) {
    const regionPath = university.region;
    const encodedName = encodeURIComponent(university.name);
    const mapFrame = document.getElementById('map-frame');
    if (mapFrame) {
        mapFrame.src = `${regionPath}/index.html?search=${encodedName}`;
        
        const activeBtn = document.querySelector('.buttons-right button.active');
        if (activeBtn) {
            activeBtn.classList.remove('active');
        }
        
        const btnId = `${regionPath.toLowerCase()}-map-btn`;
        const targetBtn = document.getElementById(btnId);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
    } else {
        window.location.href = `${regionPath}/index.html?search=${encodedName}`;
    }
}

export function parseSearchParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search');
}
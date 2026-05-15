// ============================================================
// 2026年热门歌手演唱会曲目参考网站 - 公共JavaScript组件
// ============================================================

// 从全局获取数据（由 data.js 设置）
// 注意：data.js 中已用 const 声明了 singers/tours/shows/setlists，此处直接使用即可
// 不再重复声明，避免 "already been declared" 错误

// ======================== 常量 ========================

const FAVORITES_KEY = 'concert_favorites';
const NAV_ITEMS = [
  { label: '首页', url: 'index.html' },
  { label: '歌手列表', url: 'singers.html' },
  { label: '巡演曲目', url: 'setlists.html' },
  { label: '后续场次', url: 'upcoming.html' },
  { label: '我的收藏', url: 'favorites.html' }
];

const MOBILE_TABS = [
  { label: '首页', url: 'index.html', icon: 'home' },
  { label: '搜索', url: 'search.html', icon: 'search' },
  { label: '收藏', url: 'favorites.html', icon: 'favorite' },
  { label: '我的', url: 'profile.html', icon: 'profile' }
];

// ======================== 1. 初始化应用 ========================

/**
 * 初始化应用
 * - 渲染导航栏、页脚、移动端导航
 * - 从localStorage读取收藏列表
 * - 绑定全局事件
 */
function initApp() {
  renderNavbar();
  renderFooter();
  renderMobileNav();
  loadFavorites();
  bindGlobalEvents();
}

// ======================== 2. 渲染电脑端顶部导航栏 ========================

/**
 * 渲染电脑端顶部导航栏
 * - Logo + 菜单项
 * - 当前页面高亮
 * - 插入到 #navbar 容器
 */
function renderNavbar() {
  const container = document.getElementById('navbar');
  if (!container) return;

  const pathname = window.location.pathname;
  const navLinks = NAV_ITEMS.map(item => {
    const isActive = pathname.endsWith(item.url) || (item.url === 'index.html' && (pathname === '/' || pathname.endsWith('/')));
    const activeClass = isActive ? ' active' : '';
    return `<a href="${item.url}" class="nav-link${activeClass}">${item.label}</a>`;
  }).join('');

  container.innerHTML = `
    <nav class="navbar">
      <div class="navbar-container">
        <a href="index.html" class="navbar-logo">🎵 演唱会曲目参考</a>
        <ul class="navbar-menu">
          ${navLinks}
        </ul>
      </div>
    </nav>
  `;
}

// ======================== 3. 渲染手机端底部导航栏 ========================

/**
 * 渲染手机端底部导航栏
 * - 4个tab：首页、搜索、收藏、我的
 * - SVG图标
 * - 当前页面高亮
 * - 插入到 #mobile-nav 容器
 */
function renderMobileNav() {
  const container = document.getElementById('mobile-nav');
  if (!container) return;

  const pathname = window.location.pathname;

  const svgIcons = {
    home: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`,
    search: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>`,
    favorite: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>`,
    profile: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`
  };

  const tabs = MOBILE_TABS.map(tab => {
    const isActive = pathname.endsWith(tab.url) || (tab.url === 'index.html' && (pathname === '/' || pathname.endsWith('/')));
    const activeClass = isActive ? ' active' : '';
    return `
      <a href="${tab.url}" class="mobile-tab${activeClass}">
        <span class="mobile-tab-icon">${svgIcons[tab.icon]}</span>
        <span class="mobile-tab-label">${tab.label}</span>
      </a>
    `;
  }).join('');

  container.innerHTML = `
    <nav class="mobile-nav">
      ${tabs}
    </nav>
  `;
}

// ======================== 4. 渲染页脚 ========================

/**
 * 渲染页脚
 * - 三栏：关于我们、快速链接、联系方式
 * - 底部版权信息
 * - 插入到 #footer 容器
 */
function renderFooter() {
  const container = document.getElementById('footer');
  if (!container) return;

  container.innerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-column">
          <h3 class="footer-title">关于我们</h3>
          <p class="footer-text">
            2026年热门歌手演唱会曲目参考网站，致力于为乐迷提供最全面、最准确的演唱会曲目信息。
            汇集华语乐坛顶级歌手的巡演动态，助您提前了解演出曲目，不错过每一场精彩演出。
          </p>
        </div>
        <div class="footer-column">
          <h3 class="footer-title">快速链接</h3>
          <ul class="footer-links">
            <li><a href="index.html">首页</a></li>
            <li><a href="singers.html">歌手列表</a></li>
            <li><a href="setlists.html">巡演曲目</a></li>
            <li><a href="upcoming.html">后续场次</a></li>
            <li><a href="favorites.html">我的收藏</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3 class="footer-title">联系方式</h3>
          <ul class="footer-contact">
            <li>邮箱：contact@concert-setlist.com</li>
            <li>微信公众号：演唱会曲目参考</li>
            <li>微博：@演唱会曲目参考</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 演唱会曲目参考 All Rights Reserved. 本站数据仅供参考，请以官方信息为准。</p>
      </div>
    </footer>
  `;
}

// ======================== 5. 面包屑导航 ========================

/**
 * 渲染面包屑导航
 * @param {Array<{label: string, url: string}>} items - 面包屑项数组
 * @returns {string} HTML字符串
 */
function renderBreadcrumb(items) {
  if (!items || items.length === 0) return '';

  const crumbs = items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast) {
      return `<span class="breadcrumb-item active">${item.label}</span>`;
    }
    return `<a href="${item.url}" class="breadcrumb-item">${item.label}</a>`;
  });

  return `
    <nav class="breadcrumb" aria-label="面包屑导航">
      ${crumbs.join('<span class="breadcrumb-separator">/</span>')}
    </nav>
  `;
}

// ======================== 6. 广告位渲染 ========================

/**
 * 渲染广告位
 * @param {'banner'|'sidebar'|'inline'|'mobile-sticky'} type - 广告类型
 * @param {string} slotId - 百度联盟广告位ID
 * @returns {string} HTML字符串
 */
function renderAd(type, slotId = '') {
  const adId = slotId || `ad-slot-${type}-${Math.random().toString(36).substr(2, 8)}`;

  const typeConfig = {
    'banner': {
      className: 'ad-banner',
      label: '广告'
    },
    'sidebar': {
      className: 'ad-sidebar',
      label: '广告'
    },
    'inline': {
      className: 'ad-inline',
      label: '广告'
    },
    'mobile-sticky': {
      className: 'ad-mobile-sticky',
      label: '广告'
    }
  };

  const config = typeConfig[type] || typeConfig['banner'];

  return `
    <div class="${config.className}" id="${adId}">
      <span class="ad-label">${config.label}</span>
      <!-- 请将此处替换为百度联盟广告代码 -->
      <!-- 示例: <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXX" data-ad-slot="${adId}" data-ad-format="auto"></ins> -->
      <div class="ad-placeholder">广告位</div>
    </div>
  `;
}

// ======================== 7. 收藏功能 ========================

/** @type {string[]} 收藏的场次ID列表 */
let favorites = [];

/**
 * 从localStorage加载收藏列表
 */
function loadFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    favorites = stored ? JSON.parse(stored) : [];
  } catch (e) {
    favorites = [];
  }
}

/**
 * 保存收藏列表到localStorage
 */
function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.warn('无法保存收藏数据到localStorage:', e);
  }
}

/**
 * 从localStorage获取收藏的场次ID列表
 * @returns {string[]} 收藏的场次ID数组
 */
function getFavorites() {
  return [...favorites];
}

/**
 * 切换收藏状态
 * @param {string} showId - 场次ID
 * @returns {boolean} 切换后的收藏状态（true=已收藏）
 */
function toggleFavorite(showId) {
  const index = favorites.indexOf(showId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(showId);
  }
  saveFavorites();

  // 更新页面上所有对应的收藏按钮状态
  document.querySelectorAll(`.favorite-btn[data-show-id="${showId}"]`).forEach(btn => {
    const isFav = favorites.includes(showId);
    btn.classList.toggle('favorited', isFav);
    const icon = btn.querySelector('.favorite-icon');
    if (icon) {
      icon.innerHTML = isFav
        ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    }
    const text = btn.querySelector('.favorite-text');
    if (text) {
      text.textContent = isFav ? '已收藏' : '收藏';
    }
  });

  return favorites.includes(showId);
}

/**
 * 检查是否已收藏
 * @param {string} showId - 场次ID
 * @returns {boolean}
 */
function isFavorited(showId) {
  return favorites.includes(showId);
}

/**
 * 渲染收藏按钮HTML
 * @param {string} showId - 场次ID
 * @returns {string} HTML字符串
 */
function renderFavoriteButton(showId) {
  const fav = isFavorited(showId);
  const filledIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  const outlineIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

  return `
    <button class="favorite-btn${fav ? ' favorited' : ''}" data-show-id="${showId}" onclick="window.__toggleFavorite && window.__toggleFavorite('${showId}')">
      <span class="favorite-icon">${fav ? filledIcon : outlineIcon}</span>
      <span class="favorite-text">${fav ? '已收藏' : '收藏'}</span>
    </button>
  `;
}

// ======================== 8. 搜索功能 ========================

/**
 * 搜索歌手、巡演、城市
 * @param {string} keyword - 搜索关键词
 * @returns {{singers: Array, tours: Array, cities: Array}} 匹配结果
 */
function search(keyword) {
  if (!keyword || !keyword.trim()) {
    return { singers: [], tours: [], cities: [] };
  }

  const kw = keyword.trim().toLowerCase();

  // 搜索歌手（按名称、风格匹配）
  const matchedSingers = singers.filter(s =>
    s.name.toLowerCase().includes(kw) ||
    s.style.toLowerCase().includes(kw) ||
    s.hitSongs.some(song => song.toLowerCase().includes(kw))
  );

  // 搜索巡演（按名称匹配）
  const matchedTours = tours.filter(t =>
    t.name.toLowerCase().includes(kw)
  );

  // 搜索城市（从场次数据中提取匹配的城市）
  const matchedCities = [...new Set(
    shows
      .filter(s => s.city.toLowerCase().includes(kw))
      .map(s => s.city)
  )];

  return {
    singers: matchedSingers,
    tours: matchedTours,
    cities: matchedCities
  };
}

/**
 * 渲染搜索联想结果
 * @param {string} keyword - 搜索关键词
 * @returns {string} HTML字符串
 */
function renderSearchSuggestions(keyword) {
  const results = search(keyword);

  if (results.singers.length === 0 && results.tours.length === 0 && results.cities.length === 0) {
    return `<div class="search-suggestions"><div class="search-empty">未找到相关结果</div></div>`;
  }

  let html = '<div class="search-suggestions">';

  if (results.singers.length > 0) {
    html += '<div class="suggestion-group"><div class="suggestion-group-title">歌手</div>';
    results.singers.slice(0, 5).forEach(s => {
      html += `<a href="singer.html?id=${s.id}" class="suggestion-item">
        <img src="${s.avatar}" alt="${s.name}" class="suggestion-avatar" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 font-size=%2240%22>🎵</text></svg>'">
        <div class="suggestion-info">
          <div class="suggestion-name">${highlightKeyword(s.name, keyword)}</div>
          <div class="suggestion-meta">${s.style}</div>
        </div>
      </a>`;
    });
    html += '</div>';
  }

  if (results.tours.length > 0) {
    html += '<div class="suggestion-group"><div class="suggestion-group-title">巡演</div>';
    results.tours.slice(0, 5).forEach(t => {
      const singer = getSingerById(t.singerId);
      html += `<a href="tour.html?id=${t.id}" class="suggestion-item">
        <div class="suggestion-icon">🎤</div>
        <div class="suggestion-info">
          <div class="suggestion-name">${highlightKeyword(t.name, keyword)}</div>
          <div class="suggestion-meta">${singer ? singer.name : ''} · ${t.startDate} ~ ${t.endDate}</div>
        </div>
      </a>`;
    });
    html += '</div>';
  }

  if (results.cities.length > 0) {
    html += '<div class="suggestion-group"><div class="suggestion-group-title">城市</div>';
    results.cities.slice(0, 5).forEach(city => {
      const cityShows = shows.filter(s => s.city === city);
      html += `<a href="upcoming.html?city=${encodeURIComponent(city)}" class="suggestion-item">
        <div class="suggestion-icon">📍</div>
        <div class="suggestion-info">
          <div class="suggestion-name">${highlightKeyword(city, keyword)}</div>
          <div class="suggestion-meta">${cityShows.length} 场演出</div>
        </div>
      </a>`;
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

/**
 * 高亮关键词
 * @param {string} text - 原文本
 * @param {string} keyword - 关键词
 * @returns {string} 带高亮标记的HTML
 */
function highlightKeyword(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// ======================== 9. 工具函数 ========================

/**
 * 根据ID获取歌手
 * @param {string} id - 歌手ID
 * @returns {object|undefined}
 */
function getSingerById(id) {
  return singers.find(s => s.id === id);
}

/**
 * 根据ID获取巡演
 * @param {string} id - 巡演ID
 * @returns {object|undefined}
 */
function getTourById(id) {
  return tours.find(t => t.id === id);
}

/**
 * 根据ID获取场次
 * @param {string} id - 场次ID
 * @returns {object|undefined}
 */
function getShowById(id) {
  return shows.find(s => s.id === id);
}

/**
 * 根据场次ID获取曲目列表
 * @param {string} showId - 场次ID
 * @returns {Array} 按order排序的曲目数组
 */
function getSetlistByShowId(showId) {
  return setlists
    .filter(s => s.showId === showId)
    .sort((a, b) => a.order - b.order);
}

/**
 * 根据巡演ID获取所有场次
 * @param {string} tourId - 巡演ID
 * @returns {Array} 按日期排序的场次数组
 */
function getShowsByTourId(tourId) {
  return shows
    .filter(s => s.tourId === tourId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * 根据歌手ID获取巡演
 * @param {string} singerId - 歌手ID
 * @returns {Array} 巡演数组
 */
function getToursBySingerId(singerId) {
  return tours.filter(t => t.singerId === singerId);
}

/**
 * 格式化日期为 "YYYY年MM月DD日"
 * @param {string} dateStr - 日期字符串，如 "2026-02-15"
 * @returns {string} 格式化后的日期
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${year}年${parseInt(month, 10)}月${parseInt(day, 10)}日`;
}

/**
 * 获取标签HTML（安可/翻唱/经典等）
 * @param {object} song - 曲目对象
 * @returns {string} 标签HTML字符串
 */
function getTagHtml(song) {
  if (!song) return '';

  const tags = [];

  if (song.isEncore) {
    tags.push('<span class="tag tag-encore">安可</span>');
  }
  if (song.isCover) {
    tags.push('<span class="tag tag-cover">翻唱</span>');
  }
  if (song.highlight) {
    tags.push('<span class="tag tag-highlight">经典</span>');
  }

  return tags.join('');
}

// ======================== 全局事件绑定 ========================

/**
 * 绑定全局事件
 */
function bindGlobalEvents() {
  // 将toggleFavorite暴露到window，供onclick调用
  window.__toggleFavorite = function(showId) {
    toggleFavorite(showId);
  };

  // 收藏按钮事件委托
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.favorite-btn');
    if (btn && btn.dataset.showId) {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(btn.dataset.showId);
    }
  });

  // 搜索框实时搜索（防抖）
  let searchTimer = null;
  document.addEventListener('input', function(e) {
    if (e.target.matches('.search-input')) {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        const keyword = e.target.value.trim();
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (suggestionsContainer) {
          if (keyword.length > 0) {
            suggestionsContainer.innerHTML = renderSearchSuggestions(keyword);
            suggestionsContainer.style.display = 'block';
          } else {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
          }
        }
      }, 300);
    }
  });

  // 点击页面其他区域关闭搜索建议
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-wrapper')) {
      const suggestionsContainer = document.getElementById('search-suggestions');
      if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
      }
    }
  });

  // 回到顶部按钮（如果存在）
  document.addEventListener('scroll', function() {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    }
  });
}

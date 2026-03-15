// ===== Theme Dropdown (Light / Dark / Automatic) =====
const root = document.documentElement;
const themeOptions = document.querySelectorAll('.theme-opt');
const themeDropdown = document.querySelector('.theme-dropdown');
const themeIconBtn = document.querySelector('.theme-icon-btn');

const savedTheme = localStorage.getItem('theme') || 'automatic';
applyTheme(savedTheme);

// Toggle dropdown open/closed on button click
if (themeIconBtn) {
  themeIconBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle('open');
  });
}

// Select theme and close dropdown
themeOptions.forEach(option => {
  option.addEventListener('click', () => {
    const theme = option.getAttribute('data-value');
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    themeDropdown.classList.remove('open');
  });
});

// Close dropdown when clicking anywhere else
document.addEventListener('click', () => {
  if (themeDropdown) themeDropdown.classList.remove('open');
});

function applyTheme(theme) {
  if (theme === 'automatic') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

// Keep theme in sync if the user changes OS preference while on 'automatic'
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if ((localStorage.getItem('theme') || 'automatic') === 'automatic') {
    applyTheme('automatic');
  }
});

// ===== Publication Filtering (publication page) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const pubCards = document.querySelectorAll('.pub-card[data-type]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    pubCards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
    });
  });
});

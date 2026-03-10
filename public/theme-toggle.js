// Theme toggle functionality
// Runs immediately to prevent flash of unstyled content
(function() {
  const getTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  };

  // Set theme immediately
  setTheme(getTheme());

  // Listen for toggle clicks
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const current = getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  });
})();

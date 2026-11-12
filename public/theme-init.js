(function () {
  try {
    var storedTheme = window.localStorage.getItem('portfolio-theme');
    var initialTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    document.documentElement.style.colorScheme = initialTheme === 'dark' ? 'dark' : 'light';
  } catch (error) {
    console.error('Unable to initialize theme', error);
  }
})();

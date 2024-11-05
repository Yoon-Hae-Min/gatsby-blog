const getThemeMode = () => {
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const systemTheme = isDarkMode ? 'dark' : 'light';
  const blogTheme = localStorage.getItem('chakra-ui-color-mode') ?? systemTheme;

  return { systemTheme, blogTheme };
};

export default getThemeMode;

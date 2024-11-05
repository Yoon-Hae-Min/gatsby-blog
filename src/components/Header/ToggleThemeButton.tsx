import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import MoonIcon from '@/assets/svg/moon.svg';
import SunIcon from '@/assets/svg/sun.svg';

const ToggleThemeButton = () => {
  const ToggleThemeIcon = useColorModeValue(MoonIcon, SunIcon);
  const { toggleColorMode, colorMode } = useColorMode();

  const handleToggleTheme = () => {
    toggleColorMode();

    // 로깅
    const systemTheme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    const toggledTheme = colorMode === 'light' ? 'dark' : 'light';
    window.gtag?.('event', 'change_theme', {
      system_theme: systemTheme,
      blog_theme: toggledTheme
    });
  };

  return (
    <IconButton
      aria-label="toggle-theme-button"
      onClick={handleToggleTheme}
      backgroundColor="inherit"
      color="inherit"
      padding="0.3rem"
    >
      <ToggleThemeIcon />
    </IconButton>
  );
};

export default ToggleThemeButton;

import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import MoonIcon from '@/assets/svg/moon.svg';
import SunIcon from '@/assets/svg/sun.svg';

const ToggleThemeButton = () => {
  const ToggleThemeIcon = useColorModeValue(MoonIcon, SunIcon);
  const { toggleColorMode, colorMode } = useColorMode();

  useEffect(() => {
    const themePreference =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    window.gtag?.('event', 'theme', {
      system_theme: themePreference,
      blog_theme: colorMode
    });
  }, [colorMode]);

  return (
    <IconButton
      aria-label="toggle-theme-button"
      onClick={toggleColorMode}
      backgroundColor="inherit"
      color="inherit"
      padding="0.3rem"
    >
      <ToggleThemeIcon />
    </IconButton>
  );
};

export default ToggleThemeButton;

import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import MoonIcon from '@/assets/svg/moon.svg';
import SunIcon from '@/assets/svg/sun.svg';

const ToggleThemeButton = () => {
  const ToggleThemeIcon = useColorModeValue(MoonIcon, SunIcon);
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="toggle-theme-button"
      onClick={toggleColorMode}
      backgroundColor="inherit"
      color="inherit"
    >
      <ToggleThemeIcon />
    </IconButton>
  );
};

export default ToggleThemeButton;

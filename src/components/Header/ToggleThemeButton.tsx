import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import MoonIcon from '@/assets/svg/moon.svg';
import SunIcon from '@/assets/svg/sun.svg';

import HeaderButton from './HeaderButton';

const ToggleThemeButton = () => {
  const ToggleThemeIcon = useColorModeValue(MoonIcon, SunIcon);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HeaderButton onClick={toggleColorMode}>
      <ToggleThemeIcon />
    </HeaderButton>
  );
};

export default ToggleThemeButton;

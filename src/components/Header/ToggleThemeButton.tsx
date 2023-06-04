import React from 'react';
import HeaderButton from './HeaderButton';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import SunIcon from '@/assets/svg/sun.svg';
import MoonIcon from '@/assets/svg/moon.svg';

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

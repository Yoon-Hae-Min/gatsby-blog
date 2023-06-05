import { Box, Spacer } from '@chakra-ui/react';
import React from 'react';

import Logo from './Logo';
import ToggleThemeButton from './ToggleThemeButton';

const Header = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      display="flex"
      width="100%"
      alignItems="center"
      p={2}
    >
      <Logo />
      <Spacer />
      <ToggleThemeButton />
    </Box>
  );
};

export default Header;

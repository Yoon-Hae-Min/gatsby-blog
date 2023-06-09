import { Box, Progress, Spacer, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Logo from './Logo';
import ToggleThemeButton from './ToggleThemeButton';

const Header = ({ pathname }: { pathname: string }) => {
  const [progressValue, setProgressValue] = useState(0);
  const { colorMode } = useColorMode();
  const handleScroll = (): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop === 0) {
      setProgressValue(0);
      return;
    }
    const windowHeight: number = scrollHeight - clientHeight;
    const currentPercent: number = scrollTop / windowHeight;
    setProgressValue(currentPercent * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Box
        as="header"
        position="sticky"
        top="0"
        width="100%"
        backgroundColor={colorMode === 'light' ? 'white.900' : 'gray.400'}
        zIndex={100}
      >
        <Box p={2} display="flex" alignItems="center">
          <Logo />
          <Spacer />
          <ToggleThemeButton />
        </Box>
        <Progress
          value={progressValue}
          size="xs"
          width="100%"
          position="sticky"
          display={/blog/.test(pathname) ? 'block' : 'none'}
        />
      </Box>
    </>
  );
};

export default Header;

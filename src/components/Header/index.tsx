import { Box, Progress, Spacer, useTheme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { HEADER_HEIGHT } from '@/constants/css';

import TitleLink from './TitleLink';
import ToggleThemeButton from './ToggleThemeButton';

const Header = ({ pathname }: { pathname: string }) => {
  const [progressValue, setProgressValue] = useState(0);
  const theme = useTheme();

  const isScrolled = progressValue > 1 || pathname !== '/';

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
        position="fixed"
        top="0"
        width="100%"
        height={HEADER_HEIGHT}
        display="block"
        zIndex={100}
        {...(isScrolled
          ? {
              backdropFilter: 'blur(10px)',
              _dark: {
                backgroundColor: `${theme.colors.gray[800]}CC`,
                transition: 'background-color 0.3s ease'
              },
              _light: {
                color: theme.colors.gray[800],
                backgroundColor: `${theme.colors.white[900]}AA`,
                transition: 'background-color 0.3s ease'
              }
            }
          : {
              backdropFilter: 'blur(0px)',
              _light: {
                color: theme.colors.white[900]
              }
            })}
      >
        <Box p={2} display="flex" alignItems="center" fill="inherit">
          <TitleLink to="/">yoonhaemin.com</TitleLink>
          <Spacer />
          <TitleLink to="/tag/all">Posts</TitleLink>
          <ToggleThemeButton />
        </Box>
        <Progress
          value={progressValue}
          size="xs"
          width="100%"
          position="sticky"
          display={/\/blog\//.test(pathname) ? 'block' : 'none'}
        />
      </Box>
    </>
  );
};

export default Header;

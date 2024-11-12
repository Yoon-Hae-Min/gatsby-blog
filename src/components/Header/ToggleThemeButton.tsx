import { IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';
import Lottie from 'react-lottie';

import moonAnimationData from '@/assets/lottie/moon.json';
import sunAnimationData from '@/assets/lottie/sun.json';

const ToggleThemeButton = () => {
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
    >
      {colorMode === 'light' ? (
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: moonAnimationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={36}
          width={36}
        />
      ) : (
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: sunAnimationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={36}
          width={36}
        />
      )}
    </IconButton>
  );
};

export default ToggleThemeButton;

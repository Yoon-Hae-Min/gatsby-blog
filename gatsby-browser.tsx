import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';

require('prismjs/themes/prism-tomorrow.css');
import theme from '@/@chakra-ui/gatsby-plugin/theme';
import getThemeMode from '@/utils/getThemeMode';

export const wrapRootElement = ({ element }: WrapPageElementBrowserArgs) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      {element}
    </ChakraProvider>
  );
};

export const onInitialClientRender = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // 페이지 진입시 로깅
    const { systemTheme, blogTheme } = getThemeMode();
    window.gtag('set', { user_properties: { theme_mode: systemTheme } });
    window.gtag('event', 'page_view', {
      system_theme: systemTheme,
      blog_theme: blogTheme
    });

    // 페이지 이탈시 로깅
    window.addEventListener('beforeunload', () => {
      const { systemTheme, blogTheme } = getThemeMode();

      window.gtag?.('event', 'page_unload', {
        system_theme: systemTheme,
        blog_theme: blogTheme
      });
    });
  }
};

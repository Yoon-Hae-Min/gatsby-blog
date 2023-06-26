import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import { RenderBodyArgs, WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';

require('prismjs/themes/prism-tomorrow.css');
import theme from '@/@chakra-ui/gatsby-plugin/theme';

export const wrapRootElement = ({ element }: WrapPageElementBrowserArgs) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      {element}
    </ChakraProvider>
  );
};

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }: RenderBodyArgs) => {
  setHtmlAttributes({ lang: `kr` });
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Pretendard-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="PretendardBold"
    />,
    <link
      rel="preload"
      href="/fonts/Pretendard-SemiBold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="PretendardSemiBold"
    />,
    <link
      rel="preload"
      href="/fonts/Pretendard-Medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="PretendardMedium"
    />,
    <link
      rel="preload"
      href="/fonts/Pretendard-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="PretendardRegular"
    />
  ]);
};

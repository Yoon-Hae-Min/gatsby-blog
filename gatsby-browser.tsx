import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';

require('prismjs/themes/prism-tomorrow.css');
import '@/styles/font.css';

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

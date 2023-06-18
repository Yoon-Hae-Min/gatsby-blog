import { ChakraProvider } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';

require('prismjs/themes/prism-tomorrow.css');
import theme from '@/@chakra-ui/gatsby-plugin/theme';

export const wrapRootElement = ({ element }: WrapPageElementBrowserArgs) => {
  return <ChakraProvider theme={theme}>{element}</ChakraProvider>;
};

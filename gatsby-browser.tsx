import { ChakraProvider } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';

import theme from '@/styles/theme';

export const wrapRootElement = ({ element }: WrapPageElementBrowserArgs) => {
  console.dir(element);
  return <ChakraProvider theme={theme}>{element}</ChakraProvider>;
};

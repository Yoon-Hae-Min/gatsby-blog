import React from 'react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalFont from '@/styles/global';
import theme from './src/styles/theme';

export const wrapRootElement = ({ element }: WrapPageElementBrowserArgs) => (
  <ChakraProvider theme={theme}>
    <GlobalFont />
    {element}
  </ChakraProvider>
);

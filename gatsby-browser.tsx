import React from 'react';
import { HeadFC, WrapPageElementBrowserArgs } from 'gatsby';
import { Box, ChakraProvider, useColorMode } from '@chakra-ui/react';
import GlobalFont from '@/styles/global';
import theme from '@/styles/theme';
import RootLayout from '@/components/Layout/RootLayout';
import Header from './src/components/Header/Header';

export const wrapRootElement = ({ element }: WrapPageElementBrowserArgs) => (
  <ChakraProvider theme={theme}>
    <GlobalFont />
    <Header />
    <RootLayout>{element}</RootLayout>
  </ChakraProvider>
);

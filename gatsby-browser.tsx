import { ChakraProvider } from '@chakra-ui/react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import React from 'react';

import RootLayout from '@/components/Layout/RootLayout';
import theme from '@/styles/theme';

import Footer from './src/components/Footer';
import Header from './src/components/Header';

export const wrapRootElement = ({ element }: WrapPageElementBrowserArgs) => (
  <ChakraProvider theme={theme}>
    <Header />
    <RootLayout>{element}</RootLayout>
    <Footer />
  </ChakraProvider>
);

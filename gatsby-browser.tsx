import React from 'react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import RootLayout from '@/components/Layout/RootLayout';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

export const wrapRootElement = ({ element }: WrapPageElementBrowserArgs) => (
  <ChakraProvider theme={theme}>
    <Header />
    <RootLayout>{element}</RootLayout>
    <Footer />
  </ChakraProvider>
);

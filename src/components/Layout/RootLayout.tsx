import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';

const RootLayout = ({ pathname, children }: { pathname: string; children: ReactNode }) => {
  return (
    <>
      <Header pathname={pathname} />
      <Box as="main" margin="auto" maxWidth="1160px" minHeight="100vh" p="0.8rem">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default RootLayout;

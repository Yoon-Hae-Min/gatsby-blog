import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';

const MainPageLayout = ({ pathname, children }: { pathname: string; children: ReactNode }) => {
  return (
    <>
      <Header pathname={pathname} />
      <Box as="main" overflowX="hidden">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MainPageLayout;

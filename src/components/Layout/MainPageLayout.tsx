import { Box } from '@chakra-ui/react';
import { StaticImage } from 'gatsby-plugin-image';
import React, { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';

const MainPageLayout = ({ pathname, children }: { pathname: string; children: ReactNode }) => {
  return (
    <>
      <StaticImage
        src="../../images/bg.jpg"
        alt="bg"
        style={{ width: '100%', filter: 'brightness(55%)', height: '65vh' }}
      />
      <Header pathname={pathname} />
      <Box as="main" margin="auto" maxWidth="980px" minHeight="100vh" p="2rem">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MainPageLayout;

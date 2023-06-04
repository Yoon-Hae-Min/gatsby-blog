import { Box, useColorMode } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box as="main" margin="auto" maxWidth="1260px" height="100%">
      {children}
    </Box>
  );
};

export default RootLayout;

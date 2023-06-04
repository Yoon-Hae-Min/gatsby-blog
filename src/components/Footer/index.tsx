import { Box, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      as="footer"
      bg={colorMode === 'light' ? 'white.800' : 'gray.700'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="0.8rem"
    >
      <Text fontSize="0.8rem" lineHeight="1.2rem" fontWeight={400}>
        © 2023 yoonhaemin. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;

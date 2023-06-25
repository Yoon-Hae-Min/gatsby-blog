import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box
      as="footer"
      _dark={{
        backgroundColor: 'gray.700'
      }}
      _light={{
        backgroundColor: 'white.800'
      }}
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

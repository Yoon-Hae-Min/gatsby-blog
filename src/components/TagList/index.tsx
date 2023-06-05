import { Box, Text } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';

const TagList = () => {
  return (
    <Box as="nav" display="flex" flexDirection="row" gap="0.5rem">
      <Link to="/">
        <Text fontSize="2xl" fontWeight={700}>
          #전체
        </Text>
      </Link>
      <Link to="/tag/회고록">
        <Text fontSize="2xl" fontWeight={700} color="gray.200">
          #회고록
        </Text>
      </Link>
      <Link to="/tag/썰">
        <Text fontSize="2xl" fontWeight={700} color="gray.200">
          #썰
        </Text>
      </Link>
      <Link to="/tag/생각들">
        <Text fontSize="2xl" fontWeight={700} color="gray.200">
          #생각들
        </Text>
      </Link>
    </Box>
  );
};

export default TagList;

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import thumbnail from '@/images/sample.png';

const PostCard = () => {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <Box
      as="article"
      margin="auto"
      width="100%"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box height="100%" width="100%" overflow="hidden" borderRadius="0.3rem">
        <Image
          src={thumbnail}
          alt="thumbnail"
          cursor="pointer"
          transition="transform 0.2s ease"
          transform={isHover ? 'scale(1.1)' : 'scale(1)'}
        />
      </Box>
      <Text fontSize="md" fontWeight={600} marginTop="0.5rem">
        회고록
      </Text>
      <Heading
        as="h4"
        fontSize="2xl"
        fontWeight={700}
        transition="textDecoration 0.2s ease"
        textDecoration={isHover ? 'underline' : 'none'}
      >
        리액트 노드버드 NextJs 13 공모전 후기
      </Heading>
      <Text fontSize="sm">2023.03.28</Text>
    </Box>
  );
};

export default PostCard;

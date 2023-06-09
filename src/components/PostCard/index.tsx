import { Box, Heading, Text } from '@chakra-ui/react';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React, { useState } from 'react';

type Props = {
  title: string;
  tag: string;
  date: string;
  thumbnail: ImageDataLike;
};

const PostCard = ({ title, tag, date, thumbnail }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const image = getImage(thumbnail);
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
        {image && (
          <GatsbyImage
            image={image}
            alt="thumbnail"
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              transform: isHover ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        )}
      </Box>
      <Text fontSize="md" fontWeight={600} marginTop="0.5rem">
        {tag}
      </Text>
      <Heading
        as="h4"
        fontSize="2xl"
        fontWeight={700}
        transition="textDecoration 0.2s ease"
        textDecoration={isHover ? 'underline' : 'none'}
      >
        {title}
      </Heading>
      <Text fontSize="sm">{date}</Text>
    </Box>
  );
};

export default PostCard;

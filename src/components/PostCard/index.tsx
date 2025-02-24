import { Box, Heading, Tag, Text } from '@chakra-ui/react';
import { navigate } from 'gatsby';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React, { useState } from 'react';

import { TAG_MAP } from '@/constants/md';

type Props = {
  slug: string | null;
  title: string | null;
  tag: keyof typeof TAG_MAP | null;
  createAt: string | null;
  thumbnail: ImageDataLike | null;
};

const PostCard = ({ slug, title, tag, createAt, thumbnail }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const image = getImage(thumbnail);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const handleEnterBlog = () => {
    navigate(`/tag/${tag}/${slug}`, {
      state: {
        isRecommend: true
      }
    });
  };
  const handleEnterTag = () => {
    navigate(`/tag/${tag}`);
  };
  return (
    <Box as="article" width="100%">
      <Box
        width="100%"
        overflow="hidden"
        borderRadius="0.3rem"
        onClick={handleEnterBlog}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box>
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
      </Box>
      <Tag
        _dark={{ color: 'white.900', bg: 'gray.500' }}
        _light={{ color: 'gray.700' }}
        fontSize="sm"
        my="0.4rem"
        fontWeight={600}
        marginTop="0.5rem"
        onClick={handleEnterTag}
        cursor="pointer"
      >
        {tag ? TAG_MAP[tag] : '미분류'}
      </Tag>
      <Heading
        as="h3"
        fontSize="2xl"
        fontWeight={700}
        cursor="pointer"
        transition="textDecoration 0.2s ease"
        textDecoration={isHover ? 'underline' : 'none'}
        onClick={handleEnterBlog}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
      </Heading>
      <Text fontSize="sm">{createAt}</Text>
    </Box>
  );
};

export default PostCard;

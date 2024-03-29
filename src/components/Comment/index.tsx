import { Box, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const Comment = () => {
  const { colorMode } = useColorMode();
  useEffect(() => {
    const utterances = document.createElement('script');
    const attributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'Yoon-Hae-Min/gatsby-blog',
      'data-repo-id': 'R_kgDOJrk_pw',
      'data-category': 'Announcements',
      'data-category-id': 'DIC_kwDOJrk_p84CXFLq',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': colorMode === 'light' ? 'light_tritanopia' : 'dark_dimmed',
      'data-lang': 'ko',
      crossOrigin: 'anonymous',
      async: 'true'
    };
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    const commentElement = document.getElementById('comment');
    commentElement?.appendChild(utterances);
  }, [colorMode]);
  return <Box id="comment" mt="3rem" mb="6rem" />;
};

export default Comment;

import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const Comment = () => {
  useEffect(() => {
    const utterances = document.createElement('script');
    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: 'Yoon-Hae-Min/Yoon-Hae-Min.github.io',
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'github-light',
      crossOrigin: 'anonymous',
      async: 'true'
    };
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    const commentElement = document.getElementById('comment');
    commentElement?.appendChild(utterances);
  }, []);
  return <Box id="comment" mt="4rem" mb="3rem" />;
};

export default Comment;

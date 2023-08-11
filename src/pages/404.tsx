import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { HeadFC, navigate, PageProps } from 'gatsby';
import * as React from 'react';

import RootLayout from '@/components/Layout/RootLayout';

const NotFoundPage: React.FC<PageProps> = ({ location }) => {
  return (
    <RootLayout pathname={location.pathname}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading size="4xl">404 Not Found</Heading>
        <Text mb="3rem">요청하신 페이지를 찾을 수 없습니다.</Text>
        <Button
          color="green.300"
          onClick={() => {
            navigate('/');
          }}
        >
          홈으로 이동
        </Button>
      </Box>
    </RootLayout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;

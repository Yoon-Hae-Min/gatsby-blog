import { Box, Heading, Tag, Text, useColorMode } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React from 'react';

import Comment from '../../components/Comment';
import RootLayout from '../../components/Layout/RootLayout';
import MarkDownProvider from '../../components/MarkDownProvider';
import { TAG_MAP } from '../../constants/md';

const PostDetailPage = ({ data, children, location }) => {
  const { colorMode } = useColorMode();
  const metaTags = data.mdx.frontmatter;

  return (
    <RootLayout pathname={location.pathname}>
      <Box as="section" width="60rem" margin="auto">
        <Box as="header" margin="auto" textAlign="center" mb="6rem" mt="2rem">
          <Tag color={colorMode === 'light' ? 'gray.700' : 'white.900'} size="lg">
            {TAG_MAP[metaTags.tag]}
          </Tag>
          <Heading size="2xl" fontWeight={700} pt={2}>
            {metaTags.title}
          </Heading>
          <Text as="time">{metaTags.createAt}</Text>
        </Box>
        <Box as="article">
          <MarkDownProvider>{children}</MarkDownProvider>
        </Box>
        <Box as="footer">
          <Comment />
        </Box>
      </Box>
    </RootLayout>
  );
};

export default PostDetailPage;

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        createAt(formatString: "YYYY.MM.DD")
        tag
      }
      tableOfContents
    }
  }
`;

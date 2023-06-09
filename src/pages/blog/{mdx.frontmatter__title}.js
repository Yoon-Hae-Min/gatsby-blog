import { Box, Heading, Tag, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React from 'react';

import Comment from '../../components/Comment';
import MarkDownProvider from '../../components/MarkDownProvider';

const PostDetailPage = ({ data, children }) => {
  const content = data.mdx.body;
  const metaTags = data.mdx.frontmatter;
  console.log(data, children);
  return (
    <Box width="60rem" margin="auto">
      <Box as="article">
        <Box as="header" margin="auto" textAlign="center" mb="6rem" mt="2rem">
          <Tag color="white.900" size="lg">
            {metaTags.tag}
          </Tag>
          <Heading size="2xl" fontWeight={700}>
            {metaTags.title}
          </Heading>
          <Text as="time">{metaTags.date}</Text>
        </Box>
      </Box>
      <MarkDownProvider>{children}</MarkDownProvider>
      <Comment />
    </Box>
  );
};

export default PostDetailPage;

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
        tag
      }
      body
      tableOfContents
    }
  }
`;

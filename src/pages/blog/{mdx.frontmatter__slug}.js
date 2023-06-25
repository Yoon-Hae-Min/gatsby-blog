import { Box, Heading, Tag, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import React from 'react';

import Comment from '../../components/Comment';
import RootLayout from '../../components/Layout/RootLayout';
import MarkDownProvider from '../../components/MarkDownProvider';
import { DOMAIN } from '../../constants';
import { TAG_MAP } from '../../constants/md';

const PostDetailPage = ({ data, children, location }) => {
  const metaTags = data.mdx.frontmatter;

  return (
    <RootLayout pathname={location.pathname}>
      <Box as="section" maxWidth="60rem" margin="auto">
        <Box as="header" margin="auto" textAlign="center" mb="6rem" mt="2rem">
          <Tag
            _light={{
              color: 'gray.700'
            }}
            _dark={{
              color: 'white.900',
              backgroundColor: 'gray.500'
            }}
            size="lg"
          >
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
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
    }
  }
`;

export const Head = ({ data }) => {
  const metaTags = data.mdx.frontmatter;
  return (
    <>
      <title>{metaTags.title}</title>
      <meta name="author" content="yoonhaemin" />
      <meta name="description" content={metaTags.description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blog/${metaTags.slug}`} />
      <meta property="og:title" content={metaTags.title} />
      <meta property="og:description" content={metaTags.description} />
      <meta
        property="og:image"
        content={getSrc(metaTags.thumbnail.childImageSharp.gatsbyImageData)}
      />
      <meta property="og:site_name" content={metaTags.title} />
      <meta property="og:locale" content="ko_KR" />

      {/** 트위터 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTags.title} />
      <meta name="twitter:description" content={metaTags.description} />
      <meta
        name="twitter:image"
        content={getSrc(metaTags.thumbnail.childImageSharp.gatsbyImageData)}
      />
    </>
  );
};

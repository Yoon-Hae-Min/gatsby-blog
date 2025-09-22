import { Box, Heading, Tag, Text } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import React, { useEffect } from 'react';

import Comment from '../../../components/Comment';
import RootLayout from '../../../components/Layout/RootLayout';
import MarkDownProvider from '../../../components/MarkDownProvider';
import RecommendPosts from '../../../components/RecommendPosts';
import TableOfContents from '../../../components/TableOfContents';
import { TAG_MAP } from '../../../constants/md';

const PostDetailPage = ({ data, children, location }) => {
  const metaTags = data.mdx.frontmatter;
  const tableOfContents = data.mdx.tableOfContents;
  const recommendPosts = data.allMdx.nodes;

  useEffect(() => {
    if (!location?.isRecommend) return;
    window.gtag?.('event', 'recommend_post_view', {
      tag: metaTags.tag,
      url: location.pathname
    });
  }, [location]);

  return (
    <RootLayout pathname={location.pathname}>
      <Box position="relative" mt="4rem">
        <TableOfContents tableOfContents={tableOfContents} />
        <Box as="section" margin="auto" px="1rem">
          <Box as="header" margin="auto" textAlign="center" mb="3rem" mt="2rem">
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
            <Heading size="2xl" fontWeight={700} pt={2} wordBreak="keep-all">
              {metaTags.title}
            </Heading>
            <Text as="time">{metaTags.createAt}</Text>
          </Box>
          <Box as="article" p={2}>
            <MarkDownProvider>{children}</MarkDownProvider>
          </Box>
          <RecommendPosts posts={recommendPosts} />
          <Box as="footer">
            <Comment />
          </Box>
        </Box>
      </Box>
    </RootLayout>
  );
};

export default PostDetailPage;

export const query = graphql`
  query post($id: String, $frontmatter__tag: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        createAt(formatString: "YYYY.MM.DD")
        tag
        slug
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
    }
    allMdx(
      filter: { frontmatter: { tag: { eq: $frontmatter__tag } } }
      limit: 4
      sort: { frontmatter: { createAt: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          tag
          slug
          description
          createAt
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
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
      <meta property="og:url" content={`${process.env.GATSBY_DOMAIN_URL}/blog/${metaTags.slug}`} />
      <meta property="og:title" content={metaTags.title} />
      <meta property="og:description" content={metaTags.description} />
      <meta
        property="og:image"
        content={`${process.env.GATSBY_DOMAIN_URL}${getSrc(
          metaTags.thumbnail.childImageSharp.gatsbyImageData
        )}`}
      />
      <meta property="og:site_name" content={metaTags.title} />
      <meta property="og:locale" content="ko_KR" />

      {/** 트위터 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTags.title} />
      <meta name="twitter:description" content={metaTags.description} />
      <meta
        name="twitter:image"
        content={`${process.env.GATSBY_DOMAIN_URL}${getSrc(
          metaTags.thumbnail.childImageSharp.gatsbyImageData
        )}`}
      />
    </>
  );
};

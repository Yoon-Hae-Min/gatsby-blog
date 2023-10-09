import { Box, Heading } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';

import RootLayout from '@/components/Layout/RootLayout';
import PostCard from '@/components/PostCard';
import TagList from '@/components/TagList';
import { TAG_MAP } from '@/constants/md';

const TagPage = ({ data, location, params }) => {
  const cardData = data.allMdx.edges;
  const totalPost = data.allMdx.totalCount;
  return (
    <RootLayout pathname={location.pathname}>
      <Heading
        as="h2"
        fontWeight={700}
        textAlign="center"
        size="2xl"
        marginTop={['8rem', '4rem', '4rem', '6rem']}
        marginBottom="4rem"
      >
        {TAG_MAP[params.frontmatter__tag]}({totalPost})
      </Heading>
      <TagList pathname={location.pathname} />
      <Box
        as="section"
        display="grid"
        gridTemplateColumns={['1fr', '1fr ', '1fr 1fr', '1fr 1fr']}
        gap="3rem"
        marginBottom="4rem"
        marginTop="1rem"
      >
        {cardData.map((card) => {
          return <PostCard {...card.node.frontmatter} key={card.node.id} />;
        })}
      </Box>
    </RootLayout>
  );
};

export default TagPage;

export const query = graphql`
  query MyQuery($frontmatter__tag: String) {
    allMdx(
      filter: { frontmatter: { tag: { eq: $frontmatter__tag } } }
      sort: { frontmatter: { createAt: DESC } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            tag
            createAt(formatString: "YYYY.MM.DD")
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
            slug
          }
        }
      }
      totalCount
    }
  }
`;

export const Head = ({ data }) => {
  return (
    <>
      <title>FE haemin</title>
      <meta name="author" content="yoonhaemin" />
      <meta name="description" content="프론트엔드 개발자 만두피의 공간입니다." />
      <link rel="canonical" href={process.env.GATSBY_DOMAIN_URL} />
    </>
  );
};

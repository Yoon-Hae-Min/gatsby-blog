import { Box, Heading } from '@chakra-ui/react';
import { graphql, PageProps } from 'gatsby';
import * as React from 'react';

import RootLayout from '@/components/Layout/RootLayout';
import PostCard from '@/components/PostCard';
import TagList from '@/components/TagList';
import { TAG_MAP } from '@/constants/md';

const AllTagPage = ({ data, location }: PageProps<Queries.BlogInfoListQuery>) => {
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
        전체({totalPost})
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
          return (
            <PostCard
              key={card.node.id}
              title={card.node.frontmatter?.title!}
              slug={card.node.frontmatter?.slug!}
              tag={card.node.frontmatter?.tag as keyof typeof TAG_MAP}
              createAt={card.node.frontmatter?.createAt!}
              thumbnail={card.node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
            />
          );
        })}
      </Box>
    </RootLayout>
  );
};

export default AllTagPage;

export const query = graphql`
  query BlogInfoList {
    allMdx(sort: { frontmatter: { createAt: DESC } }) {
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

export const Head = ({ data }: PageProps<Queries.BlogInfoListQuery>) => {
  return (
    <>
      <title>FE haemin</title>
      <meta name="author" content="yoonhaemin" />
      <meta name="description" content="프론트엔드 개발자 만두피의 공간입니다." />
      <link rel="canonical" href={process.env.GATSBY_DOMAIN_URL} />
    </>
  );
};

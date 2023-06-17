import { Box, Flex, Heading } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';

import RootLayout from '@/components/Layout/RootLayout';
import PostCard from '@/components/PostCard';
import ProfileCard from '@/components/ProfileCard';
import SummaryCard from '@/components/SummaryCard';
import TagList from '@/components/TagList';

import { BLOG_START_DATE, DOMAIN } from '../../constants';
import { diffCurrentDate } from '../../utils/diffCurrentDate';

const TagPage = ({ data, location }) => {
  const cardData = data.allMdx.edges;
  const totalPost = data.allMdx.totalCount;
  return (
    <RootLayout pathname={location.pathname}>
      <Flex
        width="100%"
        gap={['6rem', '5rem', '4rem', '5rem']}
        flexDirection={['column', 'column', 'row', 'row']}
      >
        <Box
          display="grid"
          width="100%"
          gridTemplateColumns={['1fr 1fr ', '1fr 1fr', '1fr 1fr ', '1fr 1fr']}
          gridRowGap={['4rem', '5rem', '6rem', '6rem']}
        >
          <SummaryCard title="총 포스트">{totalPost}개</SummaryCard>
          <SummaryCard title="방문자수">0명</SummaryCard>
          <SummaryCard title="미정">0번</SummaryCard>
          <SummaryCard title="블로그 시작">{diffCurrentDate(BLOG_START_DATE)}일</SummaryCard>
        </Box>
        <Box display="inline-block" padding={'1rem'}>
          <ProfileCard />
        </Box>
      </Flex>
      <Heading
        as="h2"
        fontWeight={700}
        textAlign="center"
        size="2xl"
        marginTop={['8rem', '8rem', '9rem', '10rem']}
        marginBottom="2rem"
      >
        ALL POSTS
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
          return <PostCard {...card.node.frontmatter} />;
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
      <link rel="canonical" href={DOMAIN} />
    </>
  );
};

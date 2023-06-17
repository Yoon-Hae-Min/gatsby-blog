import { Box, Flex, Heading } from '@chakra-ui/react';
import { graphql, PageProps } from 'gatsby';
import * as React from 'react';

import RootLayout from '@/components/Layout/RootLayout';
import PostCard from '@/components/PostCard';
import ProfileCard from '@/components/ProfileCard';
import SummaryCard from '@/components/SummaryCard';
import TagList from '@/components/TagList';
import { BLOG_START_DATE, DOMAIN } from '@/constants';
import { TAG_MAP } from '@/constants/md';
import { diffCurrentDate } from '@/utils/diffCurrentDate';

const IndexPage = ({ data, location }: PageProps<Queries.BlogInfoListQuery>) => {
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
      <Box>
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
            return (
              <PostCard
                title={card.node.frontmatter?.title!}
                slug={card.node.frontmatter?.slug!}
                tag={card.node.frontmatter?.tag as keyof typeof TAG_MAP}
                createAt={card.node.frontmatter?.createAt!}
                thumbnail={card.node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
              />
            );
          })}
        </Box>
      </Box>
    </RootLayout>
  );
};

export default IndexPage;

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
      <link rel="canonical" href={DOMAIN} />
      <meta name="google-site-verification" content="PCOijUst0H4z0pBSyq_WfWqj_NRMTY6jbfNWqtMr-co" />
      <meta name="naver-site-verification" content="fbd9f28ae30c9388ab765267caaefc5108122c4f" />
    </>
  );
};

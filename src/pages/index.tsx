import { Box, Heading } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import * as React from 'react';

import RootLayout from '@/components/Layout/RootLayout';
import PostCard from '@/components/PostCard';
import ProfileCard from '@/components/ProfileCard';
import SummaryCard from '@/components/SummaryCard';
import TagList from '@/components/TagList';

type Props = {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            title: string;
            tag: string;
            createAt: string;
            thumbnail: {
              childImageSharp: {
                gatsbyImageData: any;
              };
            };
            slug: string;
          };
        };
      }[];
      totalCount: number;
    };
  };
  location: {
    pathname: string;
  };
};

const IndexPage = ({ data, location }: Props) => {
  const cardData = data.allMdx.edges;
  const totalPost = data.allMdx.totalCount;
  return (
    <RootLayout pathname={location.pathname}>
      <main>
        <Box as="div" display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap="6rem">
          <SummaryCard title="총 포스트">{totalPost}개</SummaryCard>
          <SummaryCard title="방문자수">0명</SummaryCard>
          <ProfileCard gridRow="span 2" />
          <SummaryCard title="테마가 바뀐 횟수">0번</SummaryCard>
          <SummaryCard title="블로그를 시작한지">0일</SummaryCard>
        </Box>
        <Heading
          as="h2"
          fontWeight={700}
          textAlign="center"
          size="2xl"
          marginTop="8rem"
          marginBottom="2rem"
        >
          ALL POSTS
        </Heading>
        <TagList pathname={location.pathname} />
        <Box
          as="section"
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap="3rem"
          marginBottom="4rem"
          marginTop="1rem"
        >
          {cardData.map((card) => {
            return <PostCard {...card.node.frontmatter} />;
          })}
        </Box>
      </main>
    </RootLayout>
  );
};

export default IndexPage;

export const query = graphql`
  query MyQuery {
    allMdx {
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

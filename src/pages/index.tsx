import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { graphql, PageProps } from 'gatsby';
import * as React from 'react';

import MainPageLayout from '@/components/Layout/MainPageLayout';
import MyInfoSlider from '@/components/MyInfoSlider';
import ProfileCard from '@/components/ProfileCard';
import SummaryCard from '@/components/SummaryCard';
import { BLOG_START_DATE, DOMAIN } from '@/constants';
import { HEADER_HEIGHT } from '@/constants/css';
import { diffCurrentDate } from '@/utils/diffCurrentDate';

const IndexPage = ({ data, location }: PageProps<Queries.BlogInfoListQuery>) => {
  const cardData = data.allMdx.edges;
  const totalPost = data.allMdx.totalCount;
  return (
    <>
      <MainPageLayout pathname={location.pathname}>
        <Flex
          alignItems="center"
          justifyContent="center"
          height={`calc(100vh - ${HEADER_HEIGHT})`}
          pb="1.5rem"
          px="1.5rem"
        >
          <motion.div
            key={1}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Heading fontSize="8xl" lineHeight="140%">
              여러 기술들을
              <br /> 실험해보고 <br />
              저만의 생각을 녹여내는 <br />
              공간입니다.
            </Heading>
          </motion.div>
        </Flex>
        <MyInfoSlider direction="bottom-left">
          <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'} gap="6rem">
            <Heading
              marginX="auto"
              marginY={'3rem'}
              textAlign="center"
              position="relative"
              size="2xl"
            >
              블로그
            </Heading>
            <Flex gap="10rem" justifyContent="center">
              <SummaryCard title="총 포스트">{totalPost}개</SummaryCard>
              <SummaryCard title="블로그 시작">{diffCurrentDate(BLOG_START_DATE)}일</SummaryCard>
            </Flex>
          </Flex>
        </MyInfoSlider>
        <MyInfoSlider direction="bottom-right">
          <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'row'} gap="6rem">
            <ProfileCard />
            <Flex flexDirection={'column'}>
              <Heading position={'relative'} margin={'auto'} size={'2xl'}>
                FE개발자{' '}
                <Box
                  display="inline"
                  textAlign="center"
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    bottom: -1,
                    left: 0,
                    borderBottom: 'solid 10px',
                    borderColor: 'green.300'
                  }}
                >
                  만두피
                </Box>{' '}
                입니다.
              </Heading>
              <Text position={'relative'} fontSize={'xl'}>
                <br /> 개발자로서의 전문성과 경험을 축적하기 위해서
                <br /> 블로그를 운영하고 있습니다. <br />
                제 블로그에서 지식보다는 <br /> '아 이사람은 이런 경험을 해봤구나'라고 <br /> 가벼운
                마음으로 읽어주셨으면 좋겠습니다.
              </Text>
            </Flex>
          </Flex>
        </MyInfoSlider>
      </MainPageLayout>
    </>
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

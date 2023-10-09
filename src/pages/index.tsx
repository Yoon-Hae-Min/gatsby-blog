import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { graphql, navigate, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';

import DirectoryLink from '@/components/DirectoryIink';
import MainPageLayout from '@/components/Layout/MainPageLayout';
import ProfileIconGroup from '@/components/ProfileCard/ProfileIconGroup';
import { TAG_MAP } from '@/constants/md';

const IndexPage = ({ data, location }: PageProps<Queries.BlogInfoListQuery>) => {
  const cardData = data.allMdx.edges;
  const totalPost = data.allMdx.totalCount;

  return (
    <>
      <MainPageLayout pathname={location.pathname}>
        <Flex
          position={'absolute'}
          top="45%"
          left="45%"
          transform="translate(-50%, -30%)"
          flexDirection="column"
          color="white"
        >
          <Heading size="xl">yoonhaemin 개발 블로그</Heading>
          <Text position={'relative'} size="lg" mt="1rem">
            '아 이사람은 이런 경험을 해봤구나'하며 가벼운 마음으로 둘러봐 주시면 감사하겠습니다.
          </Text>
        </Flex>
        <Heading mb="1rem" mt={['3rem', '6rem', '9rem', '10rem']} textShadow="lg">
          INTRODUCE
        </Heading>
        <Flex
          shadow="lg"
          _dark={{
            backgroundColor: 'gray.900'
          }}
          p="1rem"
          borderRadius="0.8rem"
          alignItems={'center'}
          justifyContent={'center'}
          mb={['3rem', '6rem', '9rem', '10rem']}
          flexDirection={['column', 'column', 'row', 'row']}
          gap={['2rem', '3rem', '4rem', '3rem']}
        >
          <Image
            borderRadius="full"
            boxSize={['120px', '140px', '160px', '180px']}
            src="https://avatars.githubusercontent.com/u/49224104?v=4"
            alt="yoonhaemin profile image"
          />
          <Flex flexDirection={'column'}>
            <Heading position={'relative'} width="100%" size={'lg'}>
              윤해민
            </Heading>
            <Text position={'relative'} fontSize="md" my="1rem">
              안녕하세요 FE 개발자 만두피 입니다. 개발자로서의 전문성과 경험을 축적하기 위해서
              블로그를 운영하고 있습니다.
            </Text>
            <ProfileIconGroup />
          </Flex>
        </Flex>
        <Heading mb="1rem" textShadow="lg">
          STRUCTURE
        </Heading>
        <Box
          shadow="lg"
          _dark={{
            backgroundColor: 'gray.900'
          }}
          borderRadius="0.8rem"
          p="2rem"
          gap="0.3rem"
          mb="4rem"
        >
          <Box display="flex" alignItems="center">
            <StaticImage src="../images/icon.png" alt="icon" width={36} />
            <Heading size="md" fontWeight={600} display="inline-block" pl="1rem">
              yoonhaemin.com
            </Heading>
          </Box>
          <DirectoryLink
            depth={1}
            onClick={() =>
              navigate(
                'https://yoonhaemin.notion.site/FE-haemin-91307a32aaa744bb8dae579bebc4b13b?pvs=4'
              )
            }
          >
            Notion (기술을 설명하는 글)
          </DirectoryLink>
          <DirectoryLink depth={1} onClick={() => navigate('/tag/all')}>
            Posts (경험을 담은 글)
          </DirectoryLink>
          {Object.entries(TAG_MAP).map(([key, value]) => (
            <DirectoryLink depth={2} onClick={() => navigate(`/tag/${key}`)} key={key}>
              {value}
            </DirectoryLink>
          ))}
        </Box>
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
      <link rel="canonical" href={process.env.GATSBY_DOMAIN_URL} />
      <meta name="google-site-verification" content="PCOijUst0H4z0pBSyq_WfWqj_NRMTY6jbfNWqtMr-co" />
      <meta name="naver-site-verification" content="fbd9f28ae30c9388ab765267caaefc5108122c4f" />
    </>
  );
};

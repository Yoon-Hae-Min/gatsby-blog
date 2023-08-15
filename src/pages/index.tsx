import { Box, Divider, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import { graphql, navigate, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';

import FolderIcon from '@/assets/svg/folder.svg';
import RootLayout from '@/components/Layout/RootLayout';
import ProfileCard from '@/components/ProfileCard';
import { DOMAIN } from '@/constants';
import { TAG_MAP } from '@/constants/md';

const IndexPage = ({ data, location }: PageProps<Queries.BlogInfoListQuery>) => {
  const cardData = data.allMdx.edges;
  const totalPost = data.allMdx.totalCount;
  const [isLarge768px] = useMediaQuery('(min-width: 768px)');
  return (
    <>
      <RootLayout pathname={location.pathname}>
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={['column', 'column', 'row', 'row']}
          gap="4rem"
          mb="4rem"
        >
          <ProfileCard />
          <Flex flexDirection={'column'}>
            <Heading position={'relative'} width="100%" size={'2xl'}>
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
            <Text position={'relative'} fontSize="xl">
              <br /> 개발자로서의 전문성과 경험을 축적하기 위해서
              <br /> 블로그를 운영하고 있습니다. <br />
              '아 이사람은 이런 경험을 해봤구나'라고 <br /> 가벼운 마음으로 읽어주셨으면 좋겠습니다.
            </Text>
          </Flex>
        </Flex>
        <Flex
          backgroundColor="gray.900"
          borderRadius="0.8rem"
          p="2rem"
          flexDirection="column"
          gap="0.3rem"
        >
          <Box display="flex" alignItems="center">
            <StaticImage src="../images/icon.png" alt="icon" width={36} />
            <Heading size="md" fontWeight={600} display="inline-block" pl="1rem" color="white">
              yoonhaemin.com
            </Heading>
          </Box>
          <Box display="flex" alignItems="center">
            <Divider
              orientation="vertical"
              height="2.8rem"
              ml="1rem"
              mr="1.7rem"
              variant="dashed"
              borderLeftWidth="0.25rem"
            />
            <FolderIcon width="2.25rem" height="2rem" />
            <Heading
              size="sm"
              fontWeight={400}
              display="inline-block"
              pl="1rem"
              py="0.6rem"
              color="white"
              cursor="pointer"
              _hover={{ color: 'green.300' }}
              onClick={() => navigate('/tag/all')}
            >
              Posts
            </Heading>
          </Box>
          {Object.entries(TAG_MAP).map(([key, value]) => (
            <Box display="flex" alignItems="center">
              <Divider
                orientation="vertical"
                height="2.8rem"
                ml="1rem"
                mr="1.7rem"
                variant="dashed"
                borderLeftWidth="0.25rem"
              />
              <Divider
                orientation="vertical"
                height="2.8rem"
                ml="1rem"
                mr="1.7rem"
                variant="dashed"
                borderLeftWidth="0.25rem"
              />
              <FolderIcon width="2.25rem" height="2rem" />
              <Heading
                size="sm"
                fontWeight={400}
                display="inline-block"
                pl="1rem"
                py="0.6rem"
                color="white"
                cursor="pointer"
                _hover={{ color: 'green.300' }}
                onClick={() => navigate(`/tag/${key}`)}
              >
                {value}
              </Heading>
            </Box>
          ))}
        </Flex>
      </RootLayout>
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

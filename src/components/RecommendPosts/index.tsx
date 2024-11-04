import { Box, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';
import { PageProps } from 'gatsby';
import React from 'react';

import { TAG_MAP } from '@/constants/md';

import PostCard from '../PostCard';

type RecommendPostsProps = {
  posts: PageProps<Queries.postQuery>['data']['allMdx']['nodes'];
};

const RecommendPosts = ({ posts }: RecommendPostsProps) => {
  return (
    <Card mt="10rem" variant="unstyled">
      <CardHeader>
        <Heading as="h3" size="md" fontWeight={700} mb="0.5rem" p="0.8rem">
          다른 포스트도 구경해 보실래요?
        </Heading>
      </CardHeader>
      <CardBody
        display="grid"
        gridTemplateColumns={['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr', '1fr 1fr 1fr 1fr']}
      >
        {posts.map((post) => {
          const thumbnail = post.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData || null;
          const slug = post.frontmatter?.slug || null;
          const title = post.frontmatter?.title || null;
          const createAt = post.frontmatter?.createAt || null;
          const tag = (post.frontmatter?.tag as keyof typeof TAG_MAP) || null;

          return (
            <Box
              p="0.8rem"
              sx={{
                '> article > h3': {
                  fontSize: '1rem'
                }
              }}
              key={slug}
              onClick={() => {
                window.gtag?.('event', 'recommend', {
                  name: title,
                  url: slug
                });
              }}
            >
              <PostCard
                thumbnail={thumbnail}
                slug={slug}
                title={title}
                createAt={createAt}
                tag={tag}
              />
            </Box>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default RecommendPosts;

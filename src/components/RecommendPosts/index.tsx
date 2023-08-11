import { Box, Card, CardBody, CardHeader, Divider, Heading, Text } from '@chakra-ui/react';
import { navigate, PageProps } from 'gatsby';
import React from 'react';

type RecommendPostsProps = {
  posts: PageProps<Queries.postQuery>['data']['allMdx']['nodes'];
};

const RecommendPosts = ({ posts }: RecommendPostsProps) => {
  const handleEnterLink = (tag: string | null | undefined, slug: string | null | undefined) => {
    if (tag && slug) navigate(`/tag/${tag}/${slug}`);
  };
  return (
    <Card mt="8rem" variant="outline">
      <CardHeader>
        <Heading as="h3" size="md" fontWeight={700}>
          다른 포스트도 구경해 보실래요?
        </Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        {posts.map((post) => (
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              p="2"
              cursor="pointer"
              _hover={{
                color: 'blue.500'
              }}
              onClick={() => handleEnterLink(post.frontmatter?.tag, post.frontmatter?.slug)}
            >
              <Text>{post.frontmatter?.title}</Text>
              <Text>{post.frontmatter?.createAt}</Text>
            </Box>
          </>
        ))}
      </CardBody>
    </Card>
  );
};

export default RecommendPosts;

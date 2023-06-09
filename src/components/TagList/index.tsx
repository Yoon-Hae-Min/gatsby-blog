import { Box, Text, useColorMode } from '@chakra-ui/react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

type TagList = {
  allMdx: {
    distinct: string[];
  };
};

const TagList = ({ pathname }: { pathname: string }) => {
  const { colorMode } = useColorMode();
  const { allMdx } = useStaticQuery<TagList>(graphql`
    query getTagList {
      allMdx {
        distinct(field: { frontmatter: { tag: SELECT } })
      }
    }
  `);
  const tagList = allMdx.distinct;
  const colorMap = {
    dark: (currentTag: boolean) => (currentTag ? 'white.900' : 'gray.200'),
    light: (currentTag: boolean) => (currentTag ? 'gray.700' : 'gray.200')
  };
  return (
    <Box as="nav" display="flex" flexDirection="row" gap="0.5rem">
      <Link to="/">
        <Text fontSize="2xl" fontWeight={700} color={colorMap[colorMode](pathname === '/')}>
          #전체
        </Text>
      </Link>
      {tagList.map((tag) => {
        return (
          <Link to={`/tag/${tag}`}>
            <Text
              fontSize="2xl"
              fontWeight={700}
              color={colorMap[colorMode](pathname === `/tag/${tag}/`)}
            >
              #{tag}
            </Text>
          </Link>
        );
      })}
    </Box>
  );
};

export default TagList;

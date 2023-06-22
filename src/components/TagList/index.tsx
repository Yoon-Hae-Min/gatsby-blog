import { Box, Text, useColorMode } from '@chakra-ui/react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

import { TAG_MAP } from '@/constants/md';

type TagList = {
  allMdx: {
    distinct: (keyof typeof TAG_MAP)[];
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
    dark: (isSelected: boolean) => (isSelected ? 'white.900' : 'gray.200'),
    light: (isSelected: boolean) => (isSelected ? 'gray.700' : 'gray.200')
  };
  return (
    <Box as="nav">
      <Link to="/tag/all">
        <Text
          display="inline-block"
          marginRight="1rem"
          fontSize={['lg', 'xl', '2xl', '2xl']}
          fontWeight={700}
          color={colorMap[colorMode](pathname === '/tag/all/')}
          _hover={{
            textDecoration: 'underline'
          }}
          whiteSpace="nowrap"
        >
          #전체
        </Text>
      </Link>
      {tagList.map((tag) => {
        return (
          <Link to={`/tag/${tag}`}>
            <Text
              display="inline-block"
              marginRight="1rem"
              fontSize={['lg', 'xl', '2xl', '2xl']}
              fontWeight={700}
              color={colorMap[colorMode](pathname === `/tag/${tag}/`)}
              _hover={{
                textDecoration: 'underline'
              }}
              whiteSpace="nowrap"
            >
              #{TAG_MAP[tag]}
            </Text>
          </Link>
        );
      })}
    </Box>
  );
};

export default TagList;

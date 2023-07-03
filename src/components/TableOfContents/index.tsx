import { Box, Heading, Link } from '@chakra-ui/react';
import React from 'react';

interface TableOfContentsProps {
  tableOfContents: {
    items: {
      url: string;
      title: string;
    }[];
  };
}

const TableOfContents = ({ tableOfContents }: TableOfContentsProps) => {
  return (
    <Box as="aside" position="absolute" right={0}>
      <Box as="nav" position="fixed" borderLeft="1px dashed " p="1rem" paddingLeft="3rem">
        <Heading size="md" mb="1rem">
          Contents
        </Heading>
        <Box as="ol">
          {tableOfContents.items.map((i) => (
            <Box as="li" key={i.url} lineHeight="2.1rem">
              <Link href={i.url} key={i.url}>
                {i.title}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TableOfContents;

import { Box, Heading, Link } from '@chakra-ui/react';
import React from 'react';

type TableOfContentsItemType = {
  url: string;
  title: string;
  items?: TableOfContentsItemType[];
};

type TableOfContentsType = {
  items: TableOfContentsItemType[];
};

const TableOfContents = ({ tableOfContents }: { tableOfContents: TableOfContentsType }) => {
  console.log(tableOfContents);
  return (
    <Box as="aside" position="absolute" right={0}>
      <Box as="nav" position="fixed" borderLeft="1px dashed " p="1rem" paddingLeft="1.8rem">
        <Heading size="md" mb="1rem">
          Contents
        </Heading>
        <TableOfContent items={tableOfContents.items} />
      </Box>
    </Box>
  );
};

const TableOfContent = ({ items }: { items: TableOfContentsItemType[] }) => {
  console.log(items);
  return (
    <Box as="ol" listStyleType="none" paddingLeft={`${1.2}rem`}>
      {items.map((i, index) => (
        <Box as="li" key={i.url} lineHeight="2.1rem">
          <Link href={i.url}>{i.title}</Link>
          {i.items && <TableOfContent items={i.items} key={`nested-${index}`} />}
        </Box>
      ))}
    </Box>
  );
};

export default TableOfContents;

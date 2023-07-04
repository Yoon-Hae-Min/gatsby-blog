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
  return (
    <Box as="ol" listStyleType="none" paddingLeft={`${1.2}rem`}>
      {items.map((i) => (
        <>
          <Box as="li" key={i.url} lineHeight="2.1rem">
            <Link href={i.url}>{i.title}</Link>
          </Box>
          {i.items && <TableOfContent items={i.items} key={i.url} />}
        </>
      ))}
    </Box>
  );
};

export default TableOfContents;

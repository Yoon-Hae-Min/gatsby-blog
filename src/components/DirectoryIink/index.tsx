import { Divider, Flex, Heading, useColorMode, useTheme } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import FolderIcon from '@/assets/svg/folder.svg';

type DirectoryLinkProps = {
  onClick?: () => void;
  depth: number;
  children: ReactNode;
};

const DirectoryLink = ({ onClick, depth, children }: DirectoryLinkProps) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Flex alignItems="center">
      {Array.from({ length: depth }).map((_, index) => (
        <Divider
          key={index}
          orientation="vertical"
          height="2.8rem"
          ml="1rem"
          mr="1.7rem"
          variant="dashed"
          borderLeftWidth="0.25rem"
        />
      ))}
      <Flex alignItems="center" _hover={{ color: 'green.300' }} cursor="pointer">
        <FolderIcon
          width="2.25rem"
          height="2rem"
          fill="white"
          onClick={onClick}
          style={{
            fill: colorMode === 'light' ? theme.colors.gray[500] : theme.colors.white[900]
          }}
        />
        <Heading
          size="sm"
          fontWeight={400}
          display="inline-block"
          pl="1rem"
          py="0.6rem"
          _hover={{ color: 'green.300' }}
          onClick={onClick}
        >
          {children}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default DirectoryLink;

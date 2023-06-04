import { IconButton, useColorMode } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement;
  onClick: () => void;
  [key: string]: any;
};

const HeaderButton = ({ children, onClick, ...props }: Props) => {
  const { colorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Search database"
      icon={children}
      backgroundColor={colorMode === 'light' ? 'white.900' : 'gray.400'}
      _hover={{
        backgroundColor: colorMode === 'light' ? 'white.800' : 'gray.500'
      }}
      onClick={onClick}
      {...props}
    />
  );
};

export default HeaderButton;

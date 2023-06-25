import { IconButton } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement;
  onClick: () => void;
  [key: string]: any;
};

const HeaderButton = ({ children, onClick, ...props }: Props) => {
  return (
    <IconButton
      aria-label="Search database"
      icon={children}
      _dark={{
        backgroundColor: 'gray.400'
      }}
      _light={{
        backgroundColor: 'white.900'
      }}
      _hover={{
        _dark: {
          backgroundColor: 'gray.500'
        },
        _light: {
          backgroundColor: 'white.800'
        }
      }}
      onClick={onClick}
      {...props}
    />
  );
};

export default HeaderButton;

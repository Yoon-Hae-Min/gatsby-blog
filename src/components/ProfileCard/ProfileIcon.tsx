import { IconButton, Tooltip, useColorMode, useTheme } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type ProfileIconProps = {
  name: string;
  path: string;
  children: ReactNode;
};

const ProfileIcon = ({ name, path, children }: ProfileIconProps) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Tooltip
      label={name}
      backgroundColor={colorMode === 'dark' ? theme.colors.gray[700] : theme.colors.white[900]}
      color={colorMode === 'dark' ? theme.colors.white[900] : theme.colors.gray[200]}
    >
      <IconButton
        aria-label={name}
        backgroundColor={colorMode === 'dark' ? theme.colors.gray[500] : theme.colors.white[900]}
        as="a"
        href={path}
        target="_blank"
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default ProfileIcon;

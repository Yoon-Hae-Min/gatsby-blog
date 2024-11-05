import { IconButton, Tooltip } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type ProfileIconProps = {
  name: string;
  path: string;
  children: ReactNode;
};

const ProfileIcon = ({ name, path, children }: ProfileIconProps) => {
  const handleProfileIconClick = () => {
    window.gtag?.('event', 'profile_click', {
      event_category: 'profile',
      description: name,
      url: path
    });
  };
  return (
    <Tooltip
      label={name}
      _dark={{
        backgroundColor: 'gray.700',
        color: 'white.900'
      }}
      _light={{
        backgroundColor: 'white.900',
        color: 'gray.600'
      }}
    >
      <IconButton
        aria-label={name}
        backgroundColor="inherit"
        as="a"
        href={path}
        target="_blank"
        size="sm"
        onClick={handleProfileIconClick}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default ProfileIcon;

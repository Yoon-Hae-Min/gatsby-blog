import { Box, useColorMode, useTheme } from '@chakra-ui/react';
import React from 'react';

import GithubIcon from '@/assets/svg/github.svg';
import GmailIcon from '@/assets/svg/gmail.svg';
import LinkedInIcon from '@/assets/svg/linkedin.svg';
import ResumeIcon from '@/assets/svg/resume.svg';

import ProfileIcon from './ProfileIcon';

const ProfileIconGroup = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Box display="flex" columnGap="1rem" marginTop="0.4rem">
      <ProfileIcon name={'Github'} path="https://github.com/Yoon-Hae-Min">
        <GithubIcon
          style={{
            fill: colorMode === 'light' ? theme.colors.gray[700] : theme.colors.white[900]
          }}
        />
      </ProfileIcon>
      <ProfileIcon name={'Gmail'} path="mailto:yunhatmi@naver.com">
        <GmailIcon
          style={{
            fill: colorMode === 'light' ? theme.colors.gray[700] : theme.colors.white[900]
          }}
        />
      </ProfileIcon>
      <ProfileIcon
        name="LinkedIn"
        path="https://www.linkedin.com/in/%ED%95%B4%EB%AF%BC-%EC%9C%A4-b7b7b025b/"
      >
        <LinkedInIcon
          style={{
            fill: colorMode === 'light' ? theme.colors.gray[700] : theme.colors.white[900]
          }}
        />
      </ProfileIcon>
      <ProfileIcon name="준비중" path="/">
        <ResumeIcon
          style={{
            fill: colorMode === 'light' ? theme.colors.gray[200] : theme.colors.gray[200]
          }}
        />
      </ProfileIcon>
    </Box>
  );
};

export default ProfileIconGroup;

import { Box, Divider, Heading, Image, Text, useColorMode, useTheme } from '@chakra-ui/react';
import React from 'react';

import GithubIcon from '@/assets/svg/github.svg';
import GmailIcon from '@/assets/svg/gmail.svg';
import LinkedInIcon from '@/assets/svg/linkedin.svg';
import ResumeIcon from '@/assets/svg/resume.svg';

import ProfileIcon from './ProfileIcon';

const ProfileCard = ({ ...props }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="15rem"
      margin="auto"
      {...props}
    >
      <Image
        borderRadius="full"
        boxSize={['120px', '140px', '160px', '180px']}
        src="https://avatars.githubusercontent.com/u/49224104?v=4"
        alt="yoonhaemin profile image"
      />
      <Heading size="lg" marginTop="1rem" fontWeight={700} fontSize={['xl', '3xl', '2xl', '3xl']}>
        윤해민
      </Heading>
      <Divider marginTop="0.5rem" borderWidth="0.1rem" backgroundColor="white.900" />
      <Text
        size="md"
        fontSize={['sm', 'md', 'sm', 'md']}
        fontWeight={700}
        padding="1rem"
        _light={{ color: 'gray.500' }}
        _dark={{ color: 'white.800' }}
      >
        #FE 개발, #React #NextJs #HTML #CSS #Javascript #typescript
      </Text>
      <Divider borderWidth="0.1rem" backgroundColor="white.900" />
      <Box display="flex" columnGap="1rem" marginTop="0.9rem">
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
    </Box>
  );
};

export default ProfileCard;

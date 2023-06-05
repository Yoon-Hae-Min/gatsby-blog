import { Box, Divider, Heading, Image, Text, useColorMode, useTheme } from '@chakra-ui/react';
import React from 'react';

import GithubIcon from '@/assets/svg/github.svg';
import GmailIcon from '@/assets/svg/gmail.svg';
import LinkedInIcon from '@/assets/svg/linkedin.svg';
import ResumeIcon from '@/assets/svg/resume.svg';

const ProfileCard = ({ ...props }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="15rem"
      margin="auto"
      {...props}
    >
      <Image
        borderRadius="full"
        boxSize="160px"
        src="https://avatars.githubusercontent.com/u/49224104?v=4"
        alt="yoonhaemin profile image"
      />
      <Heading size="lg" marginTop="1rem" fontWeight={700}>
        윤해민
      </Heading>
      <Divider marginTop="0.5rem" borderWidth="0.1rem" backgroundColor="white.900" />
      <Text
        fontWeight={700}
        padding="1rem"
        color={colorMode === 'light' ? 'gray.500' : 'white.800'}
      >
        #FE 개발, #React #NextJs #HTML #CSS #Javascript #typescript
      </Text>
      <Divider borderWidth="0.1rem" backgroundColor="white.900" />
      <Box display="flex" columnGap="1.6rem" marginTop="0.9rem">
        <GithubIcon
          style={{ fill: colorMode === 'light' ? theme.colors.gray[700] : theme.colors.white[900] }}
        />
        <GmailIcon
          style={{ fill: colorMode === 'light' ? theme.colors.gray[700] : theme.colors.white[900] }}
        />
        <LinkedInIcon
          style={{ fill: colorMode === 'light' ? theme.colors.gray[700] : theme.colors.white[900] }}
        />
        <ResumeIcon
          style={{ fill: colorMode === 'light' ? theme.colors.gray[700] : theme.colors.white[900] }}
        />
      </Box>
    </Box>
  );
};

export default ProfileCard;

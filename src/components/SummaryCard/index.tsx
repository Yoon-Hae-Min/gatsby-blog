import { Box, Heading, keyframes } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

const SummaryCard = ({ title, children }: Props) => {
  return (
    <Box
      padding={5}
      display="flex"
      alignItems="center"
      flexDirection="column"
      marginBottom={'3rem'}
    >
      <Heading
        size="lg"
        textAlign="center"
        width="100%"
        fontWeight="600"
        fontSize={['md', 'xl', 'xl', '2xl']}
      >
        {title}
      </Heading>
      <Heading
        size="3xl"
        fontSize={['4xl', '5xl', '5xl', '6xl']}
        marginTop="1rem"
        textAlign="center"
        position="relative"
        animation={`${fadeIn} 0.8s ease`}
        _after={{
          content: '""',
          position: 'absolute',
          width: '100%',
          bottom: -1,
          left: 0,
          borderBottom: 'solid 10px',
          borderColor: 'green.300',
          animation: `${underLine} 0.8s ease`
        }}
      >
        {children}
      </Heading>
    </Box>
  );
};

const underLine = keyframes`
  from {transform: scaleX(0)}
  to {transform: scaleX(1)}
`;

const fadeIn = keyframes`
  from {opacity: 0}
  to {opacity: 1}
`;

export default SummaryCard;

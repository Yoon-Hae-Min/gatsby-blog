import { Box, keyframes, useColorMode } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import React, { ReactNode, useRef } from 'react';

const MyInfoSlider = ({
  direction,
  children
}: {
  direction: 'bottom-left' | 'bottom-right';
  children: ReactNode;
}) => {
  const directionMap = {
    'bottom-left': {
      transform: 'skewY(-13deg)',
      animation: keyframes`
      0%{
        clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
      }
      100%{
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      }
    `
    },
    'bottom-right': {
      transform: 'skewY(13deg)',
      animation: keyframes`
      0%{
        clip-path: polygon(0% 0%, 0% 0, 0% 100%, 0% 100%);
        
      }
      100%{
        clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%);
        
      }
    `
    }
  };
  const { colorMode } = useColorMode();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: true });
  return (
    <Box position="relative" my="40vh">
      <Box
        ref={ref}
        p={5}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'row'}
        height={'122vh'}
        _before={{
          transform: directionMap[direction].transform,
          bg: colorMode === 'light' ? 'gray.100' : 'gray.500',
          content: isInView && '""',
          width: '100vw',
          height: '58rem',
          position: 'absolute',
          border: '15px solid',
          animation: isInView && `${directionMap[direction].animation} 0.4s linear`
        }}
      >
        <motion.div
          key={1}
          initial={{ y: 10, opacity: 0 }}
          animate={isInView && { y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default MyInfoSlider;

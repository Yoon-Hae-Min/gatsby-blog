import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: `Pretendard, sans-serif`,
    body: `Pretendard, sans-serif`
  },
  colors: {
    gray: {
      200: '#B1B1B1',
      400: '#404040',
      500: '#5E5E5E',
      700: '#323232',
      800: '#282828'
    },
    white: {
      800: '#E6E6E6',
      900: '#FFFFFF'
    }
  },
  initialColorMode: 'system',
  useSystemColorMode: true,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontWeight: 400,
        color: mode('gray.700', 'white.900')(props),
        bg: mode('white.900', 'gray.400')(props),
        height: '100%',
        '.gatsby-resp-image-figcaption': {
          'text-align': 'center',
          padding: '0.3rem'
        }
      }
    })
  },
  breakpoints: {
    sm: '30rem', // 480px
    md: '48rem', // 768px
    lg: '62rem', // 992px
    xl: '80rem' // 1280px
  }
});
// 크기가 커질수록 원색과 가까워짐

export default theme;

import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';

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
      800: '#404040',
      900: '#282828'
    },
    white: {
      800: '#E6E6E6',
      900: '#FFFFFF'
    }
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
  breakpoints: {
    sm: '30rem', // 480px
    md: '48rem', // 768px
    lg: '62rem', // 992px
    xl: '80rem' // 1280px
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      'body, html': {
        fontWeight: 400,
        height: '100%'
      },
      '.gatsby-resp-image-figcaption': {
        textAlign: 'center',
        padding: '0.3rem'
      }
    })
  }
});
// 크기가 커질수록 원색과 가까워짐

export default theme;

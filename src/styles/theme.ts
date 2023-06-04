import { StyleFunctionProps, defineStyle, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  colors: {
    gray: {
      200: '#B1B1B1',
      400: '#404040',
      500: '#5E5E5E',
      700: '#323232'
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
      'html, body': {
        fontFamily: 'Pretendard',
        color: mode('gray.700', 'white.900')(props),
        bg: mode('white.900', 'gray.400')(props),
        height: '100%'
      }
    })
  }
});
// 크기가 커질수록 원색과 가까워짐

export default theme;

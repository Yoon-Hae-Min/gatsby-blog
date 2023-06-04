import React from 'react';
import { Global } from '@emotion/react';

const GlobalFont = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Pretendard';
        font-weight: 700;
        src: url('./assets/fonts/Pretendard-Bold.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Pretendard';
        font-weight: 600;
        src: url('./assets/fonts/Pretendard-SemiBold.woff2');
      }
      @font-face {
        font-family: 'Pretendard';
        font-weight: 400;
        src: url('./assets/fonts/Pretendard-Regular.woff2');
      }
      `}
  />
);

export default GlobalFont;

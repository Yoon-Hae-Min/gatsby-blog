import { Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React, { ReactNode } from 'react';

import { DEFAULT_FONT_SIZE } from '@/constants/md';

type TitleProps = {
  children: ReactNode;
  to: string;
};

const TitleLink = ({ children, to }: TitleProps) => {
  return (
    <Link to={to}>
      <LogoHeading
        as="h4"
        size="md"
        fontSize={DEFAULT_FONT_SIZE}
        letterSpacing="-0.2px"
        fontWeight={700}
        p={2}
      >
        {children}
      </LogoHeading>
    </Link>
  );
};

const LogoHeading = styled(Heading)`
  position: relative;
  display: inline-block;
  margin: 0.4rem 0.8rem 0.4rem 0.8rem;
  ::after {
    content: ' ';
    position: absolute;
    width: 100%;
    margin-top: 28px;
    left: 0;
    transform: scaleX(0);
    transform-origin: top left;
    border-bottom: solid;
    transition: transform 0.25s ease-out;
  }
  :hover {
    ::after {
      transform: scaleX(1);
    }
  }
`;

export default TitleLink;

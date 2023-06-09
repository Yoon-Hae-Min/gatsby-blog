import { Heading, HeadingProps, Link, LinkProps, Text, TextProps } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import React, { ReactNode } from 'react';

const components = {
  h1: (props: HeadingProps) => <Heading size="4xl" mt={'2rem'} mb={'1rem'} {...props} />,
  h2: (props: HeadingProps) => <Heading size="3xl" mt={'2rem'} mb={'1rem'} {...props} />,
  h3: (props: HeadingProps) => <Heading size="2xl" mt={'2rem'} mb={'1rem'} {...props} />,
  h4: (props: HeadingProps) => <Heading size="xl" mt={'2rem'} mb={'1rem'} {...props} />,
  h5: (props: HeadingProps) => <Heading size="lg" mt={'2rem'} mb={'1rem'} {...props} />,
  h6: (props: HeadingProps) => <Heading {...props} />,
  a: (props: LinkProps) => <Link color="blue.300" fontWeight={500} {...props} />,
  p: (props: TextProps) => <Text as="p" lineHeight="1.9" fontSize="1.2rem" {...props} />
};

const MarkDownProvider = ({ children }: { children: ReactNode }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MarkDownProvider;

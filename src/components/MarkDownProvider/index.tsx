import {
  Box,
  Heading,
  HeadingProps,
  Image,
  Link,
  LinkProps,
  Text,
  TextProps
} from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import React, { HTMLAttributes, ReactNode } from 'react';

const HnComponent = ({
  componentsProps,
  ...headingProps
}: {
  componentsProps: HTMLAttributes<HTMLHeadingElement>;
} & HeadingProps) => (
  <Heading {...headingProps} position="relative">
    <Box position="absolute" top="-5rem" id={componentsProps.id}></Box>
    {componentsProps.children}
  </Heading>
);

const components = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <HnComponent componentsProps={props} size="2xl" mt={'3rem'} mb={'1.5rem'} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <HnComponent componentsProps={props} size="xl" mt={'3rem'} mb={'1.5rem'} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <HnComponent componentsProps={props} size="lg" mt={'3rem'} mb={'1.5rem'} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <HnComponent componentsProps={props} size="md" mt={'3rem'} mb={'1.5rem'} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <HnComponent componentsProps={props} size="sm" mt={'3rem'} mb={'1.5rem'} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => <HnComponent componentsProps={props} />,
  a: (props: LinkProps) => (
    <Link
      color="blue.300"
      fontWeight={500}
      _dark={{ fill: 'white.900' }}
      _light={{ fill: 'gray.400' }}
      {...props}
    />
  ),
  p: (props: TextProps) => <Text as="p" lineHeight="1.9" fontSize="1.2rem" {...props} />,
  ul: (props: Object) => (
    <Box
      as="ul"
      sx={{
        '* > ul': {
          margin: 0,
          marginLeft: '1.6rem'
        }
      }}
      fontSize="1.2rem"
      lineHeight="1.6"
      {...props}
    />
  ),
  ol: (props: Object) => (
    <Box as="ol" fontSize="1.2rem" lineHeight="1.6" listStylePosition="inside" {...props} />
  ),
  li: (props: Object) => (
    <Box
      as="li"
      sx={{
        '* > ul': {
          margin: 0,
          marginLeft: '1.6rem'
        },
        '> p': {
          display: 'inline'
        }
      }}
      my={'1.2rem'}
      fontSize="1.2rem"
      listStylePosition="inside"
      {...props}
    />
  ),
  blockquote: ({ ...props }) => {
    const { children } = props;
    return (
      <Box
        as="blockquote"
        textAlign="start"
        borderRadius="0.4rem"
        my="1.2rem"
        _light={{
          bg: 'gray.100',
          borderLeft: '0.4rem solid',
          borderColor: 'gray.500'
        }}
        _dark={{
          bg: 'gray.900',
          borderLeft: '0.4rem solid white'
        }}
        {...props}
      >
        <Box p="0.5rem 1rem">{children}</Box>
      </Box>
    );
  },
  img: (props: Object) => <Image {...props} margin="1.8rem auto" />
};

const MarkDownProvider = ({ children }: { children: ReactNode }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MarkDownProvider;

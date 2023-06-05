import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorMode
} from '@chakra-ui/react';
import Header from '../components/Header';
import SummaryCard from '@/components/SummaryCard';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <main>
        <Box as="div" display="grid" gridTemplateColumns="1fr 1fr 1fr">
          <SummaryCard title="총 포스트">8일</SummaryCard>
          <SummaryCard title="방문자수">0명</SummaryCard>
          <SummaryCard title="테마가 바뀐 횟수">0번</SummaryCard>
          <SummaryCard title="블로그를 시작한지">0일</SummaryCard>
        </Box>
      </main>
    </>
  );
};

export default IndexPage;

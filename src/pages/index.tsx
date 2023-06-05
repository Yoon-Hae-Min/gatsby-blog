import { Box } from '@chakra-ui/react';
import type { PageProps } from 'gatsby';
import * as React from 'react';

import ProfileCard from '@/components/ProfileCard';
import SummaryCard from '@/components/SummaryCard';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <main>
        <Box as="div" display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap="6rem">
          <SummaryCard title="총 포스트">8일</SummaryCard>
          <SummaryCard title="방문자수">0명</SummaryCard>
          <ProfileCard gridRow="span 2" />
          <SummaryCard title="테마가 바뀐 횟수">0번</SummaryCard>
          <SummaryCard title="블로그를 시작한지">0일</SummaryCard>
        </Box>
      </main>
    </>
  );
};

export default IndexPage;

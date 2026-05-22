import Head from 'next/head';
import { Box, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PageHeader } from '@/components/PageHeader';
import { StatsBar } from '@/components/StatsBar';
import { QuestGrid } from '@/components/QuestGrid';
import { QuestDrawer } from '@/components/QuestDrawer';
import { Footer } from '@/components/Footer';
import { quests, stats, Quest } from '@/data/quests';

export default function Home() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  return (
    <>
      <Head>
        <title>Freecash Quests — Case Study</title>
        <meta name="description" content="A product design case study redesigning the Freecash Quests page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box minH="100vh" bg="bg.page" display="flex" flexDirection="column">
        <Navbar />

        <Box flex={1} as="main">
          <Box maxW="1400px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 6, md: 10 }}>
            <VStack align="stretch" spacing={{ base: 6, md: 8 }}>
              <PageHeader />
              <StatsBar tickets={stats.tickets} questsCompleted={stats.questsCompleted} />
              <QuestGrid quests={quests} onQuestClick={setSelectedQuest} />
            </VStack>
          </Box>
        </Box>

        <Footer />

        <QuestDrawer quest={selectedQuest} onClose={() => setSelectedQuest(null)} />
      </Box>
    </>
  );
}

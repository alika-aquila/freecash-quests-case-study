import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { Quest } from '@/data/quests';
import { QuestCard } from './QuestCard';
import { MobileQuestCarousel } from './MobileQuestCarousel';

interface QuestGridProps {
  quests: Quest[];
  onQuestClick: (quest: Quest) => void;
}

export function QuestGrid({ quests, onQuestClick }: QuestGridProps) {
  const engagement = quests.filter((q) => q.category === 'engagement');
  const milestone = quests.filter((q) => q.category === 'milestone');
  const social = quests.filter((q) => q.category === 'social');

  let runningIndex = 0;
  const renderSection = (
    sectionQuests: Quest[],
    title?: string,
    subtitle?: string
  ) => {
    const startIndex = runningIndex;
    runningIndex += sectionQuests.length;
    return (
      <Box>
        {title && (
          <Box mb={4} display="flex" alignItems="center" gap={3}>
            <Text color="text.white" textStyle="textLg" fontWeight={600}>
              {title}
            </Text>
            {subtitle && (
              <Text color="text.muted" textStyle="textSm">
                {subtitle}
              </Text>
            )}
            <Box flex={1} h="1px" bg="bg.border" />
          </Box>
        )}

        {/* Mobile: carousel */}
        <Box display={{ base: 'block', md: 'none' }} mx={-4}>
          <MobileQuestCarousel
            quests={sectionQuests}
            startIndex={startIndex}
            onQuestClick={onQuestClick}
          />
        </Box>

        {/* Tablet/desktop: grid */}
        <SimpleGrid
          display={{ base: 'none', md: 'grid' }}
          columns={{ base: 2, md: 3, lg: 5 }}
          spacing={{ base: '10px', md: '12px', lg: '16px' }}
        >
          {sectionQuests.map((quest, i) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              index={startIndex + i}
              onClick={onQuestClick}
            />
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      {renderSection(engagement, 'Engagement', 'Earn tickets by being active')}
      {renderSection(milestone, 'Milestones', 'Bigger rewards for bigger steps')}
      {renderSection(social, 'Social', 'Stay in the loop')}
    </Box>
  );
}

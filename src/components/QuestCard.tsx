import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Quest } from '@/data/quests';
import { CircularProgress } from './CircularProgress';
import { TicketChip } from './TicketChip';
import { ParticleBurst } from './ParticleBurst';

const MotionBox = motion.create(Box);

interface QuestCardProps {
  quest: Quest;
  index: number;
  onClick?: (quest: Quest) => void;
}

export function QuestCard({ quest, index, onClick }: QuestCardProps) {
  const [hovered, setHovered] = useState(false);
  const isCompleted = !!quest.completed;
  const hasProgress = typeof quest.progress === 'number';
  const isLocked = hasProgress && quest.progress === 0 && !isCompleted;
  const ringDelayMs = 200 + index * 50;

  const handleClick = () => {
    if (!isCompleted && onClick) onClick(quest);
  };

  return (
    <MotionBox
      position="relative"
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -4 }}
      cursor={isCompleted ? 'default' : 'pointer'}
      style={{ transformOrigin: 'center' }}
    >
      <Box
        bg="bg.container"
        borderRadius="12px"
        border="1px solid"
        borderColor={hovered ? 'rgba(1,214,118,0.35)' : 'bg.border'}
        p={4}
        transition="border-color 0.2s ease, box-shadow 0.2s ease"
        boxShadow={hovered ? '0 8px 32px rgba(1, 214, 118, 0.15)' : 'none'}
        opacity={isLocked ? 0.6 : 1}
        position="relative"
        overflow="hidden"
      >
        <ParticleBurst active={isCompleted && hovered} />

        <VStack spacing={3} align="center" textAlign="center">
          {/* Icon */}
          <Box position="relative" w="72px" h="72px" display="flex" alignItems="center" justifyContent="center">
            {hasProgress && !isCompleted && (
              <Box position="absolute" inset={0}>
                <CircularProgress
                  value={quest.progress ?? 0}
                  size={72}
                  strokeWidth={4}
                  showLabel={false}
                  delayMs={ringDelayMs}
                />
              </Box>
            )}
            <MotionBox
              w="52px"
              h="52px"
              borderRadius="full"
              bgGradient="linear(to-br, bg.elevated, #3A3A55)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="28px"
              lineHeight="1"
              animate={{ scale: hovered && !isCompleted ? 1.08 : 1 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {quest.iconEmoji}
            </MotionBox>
          </Box>

          {/* Name */}
          <Text color="text.white" fontWeight={700} textStyle="textMd" noOfLines={1}>
            {quest.name}
          </Text>

          {/* Description */}
          <Text color="text.muted" textStyle="textSm" minH="18px" noOfLines={2}>
            {quest.description}
          </Text>

          {/* Reward or Completed */}
          {isCompleted ? (
            <Button
              size="sm"
              w="100%"
              bg="brand.green"
              color="bg.page"
              fontWeight={700}
              borderRadius="8px"
              isDisabled
              _disabled={{
                opacity: 1,
                cursor: 'default',
                bg: 'brand.green',
                color: 'bg.page',
              }}
              position="relative"
              overflow="hidden"
              sx={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(110deg, transparent 0%, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s linear infinite',
                  pointerEvents: 'none',
                },
              }}
            >
              Completed
            </Button>
          ) : (
            <TicketChip amount={quest.reward} bright={hovered} />
          )}
        </VStack>
      </Box>
    </MotionBox>
  );
}

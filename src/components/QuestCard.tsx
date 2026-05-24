import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Quest } from '@/data/quests';
import { CircularProgress } from './CircularProgress';
import { TicketChip } from './TicketChip';
import { ParticleBurst } from './ParticleBurst';
import { assetPath } from '@/utils/assetPath';

const MotionBox = motion.create(Box);

interface QuestCardProps {
  quest: Quest;
  index: number;
  onClick?: (quest: Quest) => void;
  /** When true, forces the hover state on (loops hover video, scales icon). Used by mobile carousel for the centered card. */
  autoplay?: boolean;
}

export function QuestCard({ quest, index, onClick, autoplay = false }: QuestCardProps) {
  const [pointerHovered, setPointerHovered] = useState(false);
  const hovered = pointerHovered || autoplay;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isCompleted = !!quest.completed;
  const hasProgress = typeof quest.progress === 'number';
  const isLocked = hasProgress && quest.progress === 0 && !isCompleted;
  const ringDelayMs = 200 + index * 50;
  const hasImage = !!quest.iconImage;
  const hasHoverVideo = !!quest.hoverVideo;
  const hasDrawerVideo = !!quest.drawerVideo;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hovered) {
      video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [hovered]);

  useEffect(() => {
    if (!hovered || !hasDrawerVideo) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = assetPath(quest.drawerVideo!);
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [hovered, hasDrawerVideo, quest.drawerVideo]);

  const handleClick = () => {
    if (!isCompleted && onClick) onClick(quest);
  };

  return (
    <MotionBox
      position="relative"
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      onMouseEnter={() => setPointerHovered(true)}
      onMouseLeave={() => setPointerHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut', delay: 0 } }}
      cursor={isCompleted ? 'default' : 'pointer'}
      style={{ transformOrigin: 'center' }}
    >
      <Box
        bg="bg.container"
        borderRadius="12px"
        border="1px solid"
        borderColor={hovered ? 'rgba(1,214,118,0.35)' : 'bg.border'}
        p={5}
        pt={6}
        transition="border-color 0.2s ease, box-shadow 0.2s ease"
        boxShadow={
          hovered
            ? {
                base: '0 4px 16px rgba(1, 214, 118, 0.22)',
                md: '0 8px 32px rgba(1, 214, 118, 0.15)',
              }
            : 'none'
        }
        opacity={isLocked ? 0.6 : 1}
        position="relative"
        overflow="hidden"
      >
        <ParticleBurst active={isCompleted && hovered} />

        <VStack spacing={4} align="center" textAlign="center">
          {/* Icon */}
          <Box position="relative" w="148px" h="148px" display="flex" alignItems="center" justifyContent="center">
            {hasProgress && !isCompleted && (
              <Box position="absolute" inset={0}>
                <CircularProgress
                  value={quest.progress ?? 0}
                  size={148}
                  strokeWidth={6}
                  showLabel={false}
                  delayMs={ringDelayMs}
                />
              </Box>
            )}
            <MotionBox
              position="relative"
              w={hasProgress ? '116px' : '140px'}
              h={hasProgress ? '116px' : '140px'}
              borderRadius="full"
              bgGradient={hasImage ? undefined : 'linear(to-br, bg.elevated, #3A3A55)'}
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="64px"
              lineHeight="1"
              animate={{ scale: hovered && !isCompleted ? 1.08 : 1 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {hasImage ? (
                <>
                  <Box
                    as="img"
                    src={assetPath(quest.iconImage!)}
                    alt=""
                    position="absolute"
                    inset={0}
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    opacity={hovered && hasHoverVideo ? 0 : 1}
                    transition="opacity 0.18s ease"
                  />
                  {hasHoverVideo && (
                    <Box
                      as="video"
                      ref={videoRef as React.RefObject<HTMLVideoElement>}
                      src={assetPath(quest.hoverVideo!)}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      position="absolute"
                      inset={0}
                      w="100%"
                      h="100%"
                      sx={{ objectFit: 'contain' }}
                      opacity={hovered ? 1 : 0}
                      transition="opacity 0.18s ease"
                    />
                  )}
                </>
              ) : (
                quest.iconEmoji
              )}
            </MotionBox>
          </Box>

          {/* Name */}
          <Text color="text.white" fontWeight={700} fontSize="17px" lineHeight="22px" letterSpacing="0.01em" noOfLines={1}>
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

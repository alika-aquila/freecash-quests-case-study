import React from 'react';
import { Box, Button, HStack, IconButton, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quest } from '@/data/quests';
import { TicketChip } from './TicketChip';

const MotionBox = motion.create(Box);

interface QuestDrawerProps {
  quest: Quest | null;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <Box as="svg" w="20px" h="20px" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Box>
  );
}

export function QuestDrawer({ quest, onClose }: QuestDrawerProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const progress = quest?.progress ?? 0;
  const hasProgress = quest && typeof quest.progress === 'number';
  const inProgress = hasProgress && progress > 0;
  const cta = inProgress ? 'Continue Quest' : 'Start Quest';

  return (
    <AnimatePresence>
      {quest && (
        <MotionBox
          key="drawer-overlay"
          position="fixed"
          inset={0}
          zIndex={1500}
          bg="overlay"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <MotionBox
            key="drawer-panel"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            bg="bg.container"
            w="100%"
            maxW={isMobile ? '100%' : '520px'}
            h={isMobile ? '85vh' : 'auto'}
            mb={isMobile ? 0 : 12}
            borderTopRadius="20px"
            borderBottomRadius={isMobile ? 0 : '20px'}
            border="1px solid"
            borderColor="bg.border"
            boxShadow="0 -20px 60px rgba(0,0,0,0.5)"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            {/* Drag handle (mobile) */}
            {isMobile && (
              <Box pt={3} pb={1} display="flex" justifyContent="center">
                <Box w="40px" h="4px" borderRadius="full" bg="bg.elevated" />
              </Box>
            )}

            {/* Close button */}
            <Box position="absolute" top={3} right={3} zIndex={2}>
              <IconButton
                aria-label="Close"
                onClick={onClose}
                size="sm"
                variant="ghost"
                color="text.muted"
                _hover={{ color: 'text.white', bg: 'bg.border' }}
                icon={<CloseIcon />}
              />
            </Box>

            <Box p={{ base: 6, md: 8 }} overflowY="auto">
              <VStack spacing={5} align="stretch">
                {/* Icon */}
                <Box display="flex" justifyContent="center">
                  <MotionBox
                    w="96px"
                    h="96px"
                    borderRadius="full"
                    bgGradient="linear(to-br, bg.elevated, #3A3A55)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="48px"
                    lineHeight="1"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 14, delay: 0.1 }}
                  >
                    {quest.iconEmoji}
                  </MotionBox>
                </Box>

                {/* Name + description */}
                <VStack spacing={2} textAlign="center">
                  <Text color="text.white" textStyle="headingXs">
                    {quest.name}
                  </Text>
                  <Text color="text.muted" textStyle="textMd">
                    {quest.description}
                  </Text>
                </VStack>

                {/* Progress bar */}
                {hasProgress && (
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text color="text.muted" textStyle="textSm">Progress</Text>
                      <Text color="brand.green" textStyle="textSm" fontWeight={700}>
                        {Math.round(progress)}%
                      </Text>
                    </HStack>
                    <Box
                      w="100%"
                      h="10px"
                      bg="rgba(255,255,255,0.06)"
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <MotionBox
                        h="100%"
                        bgGradient="linear(to-r, brand.green, brand.greenLight)"
                        borderRadius="full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      />
                    </Box>
                  </Box>
                )}

                {/* Reward */}
                <Box
                  bg="rgba(255,199,0,0.06)"
                  border="1px solid"
                  borderColor="rgba(255,199,0,0.18)"
                  borderRadius="12px"
                  p={4}
                >
                  <HStack justify="space-between">
                    <VStack align="start" spacing={0}>
                      <Text color="text.muted" textStyle="textSm">Reward</Text>
                      <Text color="text.white" fontWeight={600} textStyle="textMd">
                        Lottery Tickets
                      </Text>
                    </VStack>
                    <TicketChip amount={quest.reward} bright />
                  </HStack>
                  <Text color="text.muted" textStyle="textSm" mt={3}>
                    Tickets unlock entries in weekly lottery draws — win cash, gift cards, and rare prizes.
                  </Text>
                </Box>

                {/* CTA */}
                <Button
                  size="lg"
                  bg="brand.green"
                  color="bg.page"
                  fontWeight={700}
                  borderRadius="12px"
                  _hover={{ bg: 'brand.greenHover' }}
                  _active={{ bg: 'brand.greenHover' }}
                >
                  {cta}
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}

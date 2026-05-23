import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, IconButton, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quest } from '@/data/quests';
import { TicketChip } from './TicketChip';
import { assetPath } from '@/utils/assetPath';

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
  const [drawerVideoEnded, setDrawerVideoEnded] = useState(false);

  useEffect(() => {
    if (quest) setDrawerVideoEnded(false);
  }, [quest?.id]);

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
          alignItems={isMobile ? 'flex-end' : 'center'}
          justifyContent="center"
          px={isMobile ? 0 : 4}
          py={isMobile ? 0 : 6}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <MotionBox
            key="drawer-panel"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            position="relative"
            bg="bg.container"
            w="100%"
            maxW={isMobile ? '100%' : '560px'}
            minH={isMobile ? 'auto' : hasProgress ? '680px' : '610px'}
            maxH={isMobile ? '92vh' : '92vh'}
            borderTopRadius="20px"
            borderBottomRadius={isMobile ? 0 : '20px'}
            border="1px solid"
            borderColor="bg.border"
            boxShadow={isMobile ? '0 -20px 60px rgba(0,0,0,0.5)' : '0 24px 60px rgba(0,0,0,0.5)'}
            initial={isMobile ? { y: '100%' } : { opacity: 0, y: 40, scale: 0.96 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={
              isMobile
                ? { y: '100%', transition: { duration: 0.18, ease: 'easeIn' } }
                : { opacity: 0, scale: 0.88, transition: { duration: 0.16, ease: 'easeIn' } }
            }
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
                bg="bg.container"
                _hover={{ color: 'text.white', bg: 'bg.border' }}
                icon={<CloseIcon />}
              />
            </Box>

            <Box
              px={{ base: 6, md: 8 }}
              pt={{ base: 10, md: 12 }}
              pb={{ base: 7, md: 9 }}
              overflowY="auto"
              flex={1}
              display="flex"
              flexDirection="column"
            >
              <VStack spacing={6} align="stretch" flex={1}>
                {/* Icon */}
                <Box display="flex" justifyContent="center">
                  <MotionBox
                    position="relative"
                    w="220px"
                    h="220px"
                    borderRadius="full"
                    bgGradient={quest.drawerVideo || quest.iconImage ? undefined : 'linear(to-br, bg.elevated, #3A3A55)'}
                    overflow="hidden"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="108px"
                    lineHeight="1"
                    initial={{ scale: 0.88, rotate: -4, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.08 }}
                  >
                    {quest.drawerVideo && !drawerVideoEnded ? (
                      <Box
                        as="video"
                        src={assetPath(quest.drawerVideo)}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        onEnded={() => setDrawerVideoEnded(true)}
                        position="absolute"
                        inset={0}
                        w="100%"
                        h="100%"
                        sx={{ objectFit: 'contain' }}
                      />
                    ) : quest.iconImage ? (
                      <Box
                        as="img"
                        src={assetPath(quest.iconImage)}
                        alt=""
                        position="absolute"
                        inset={0}
                        w="100%"
                        h="100%"
                        objectFit="contain"
                      />
                    ) : (
                      quest.iconEmoji
                    )}
                  </MotionBox>
                </Box>

                {/* Name + description */}
                <VStack spacing={2} textAlign="center">
                  <Text color="text.white" textStyle="headingSm">
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
                <Box display="flex" justifyContent="center" pt={1} mt="auto">
                  <Button
                    onClick={onClose}
                    size="md"
                    px={10}
                    bg="brand.green"
                    color="bg.page"
                    fontWeight={700}
                    borderRadius="10px"
                    _hover={{ bg: 'brand.greenHover' }}
                    _active={{ bg: 'brand.greenHover' }}
                  >
                    {cta}
                  </Button>
                </Box>
              </VStack>
            </Box>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}

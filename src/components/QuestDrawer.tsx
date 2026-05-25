import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, HStack, IconButton, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import {
  AnimatePresence,
  animate,
  AnimationPlaybackControls,
  motion,
  PanInfo,
  useMotionValue,
} from 'framer-motion';
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

type DrawerMode = 'rest' | 'expanded';
const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };
// Dismiss when the drawer's TOP has been dragged past this fraction of the
// viewport — i.e., the drawer must be sitting in the bottom 15% of the screen.
const DISMISS_TOP_FRACTION = 0.85;

export function QuestDrawer({ quest, onClose }: QuestDrawerProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const progress = quest?.progress ?? 0;
  const hasProgress = quest && typeof quest.progress === 'number';
  const inProgress = hasProgress && progress > 0;
  const cta = inProgress ? 'Continue Quest' : 'Start Quest';
  const [drawerVideoEnded, setDrawerVideoEnded] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('rest');
  const [viewportH, setViewportH] = useState(0);

  // Motion values driving the mobile drawer panel.
  // - heightMV is bound to *minHeight*, NOT height: 0 means "no min" so the
  //   drawer collapses to its natural content height in rest.
  // - yMV is the translateY offset, used during drag-down and for slide-in/out.
  const heightMV = useMotionValue(0);
  const yMV = useMotionValue(0);

  // Track natural content height (drawer height with heightMV=0). Used to
  // compute how much heightMV needs to grow during drag-up to visually expand,
  // and to compute the dismiss threshold based on the drawer's resting top.
  const panelRef = useRef<HTMLDivElement | null>(null);
  const naturalHeightRef = useRef(0);

  // In-flight animation controls. Stopped at onPanStart so a new drag wins.
  const yAnimRef = useRef<AnimationPlaybackControls | null>(null);
  const hAnimRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (quest) {
      setDrawerVideoEnded(false);
      setDrawerMode('rest');
    }
  }, [quest?.id]);

  // Track viewport height.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // framer-motion only propagates *transform* motion values (like `y`) to the
  // DOM automatically — for raw CSS properties on a wrapped component (Chakra
  // Box) the style binding is silently dropped. Subscribe to heightMV manually
  // and apply minHeight via ref so it actually updates.
  useEffect(() => {
    const unsubscribe = heightMV.on('change', (latest) => {
      const el = panelRef.current;
      if (!el) return;
      el.style.minHeight = latest > 0 ? `${latest}px` : '';
    });
    return unsubscribe;
  }, [heightMV]);

  // Entry: reset motion values and slide the drawer up from below.
  useEffect(() => {
    if (!isMobile || !quest || !viewportH) return;
    heightMV.set(0); // natural content height
    yMV.set(viewportH); // start fully off-screen below
    yAnimRef.current?.stop();
    yAnimRef.current = animate(yMV, 0, SPRING);
    return () => {
      yAnimRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest?.id, isMobile, viewportH]);

  // Measure natural content height after the drawer renders.
  useEffect(() => {
    if (!isMobile || !quest) return;
    const id = requestAnimationFrame(() => {
      if (panelRef.current) {
        naturalHeightRef.current = panelRef.current.offsetHeight;
      }
    });
    return () => cancelAnimationFrame(id);
  }, [quest?.id, isMobile, viewportH, hasProgress]);

  // Mode transitions: animate minHeight between 0 (content-sized) and viewportH.
  useEffect(() => {
    if (!isMobile || !quest || !viewportH) return;
    const target = drawerMode === 'expanded' ? viewportH : 0;
    hAnimRef.current?.stop();
    hAnimRef.current = animate(heightMV, target, SPRING);
    return () => {
      hAnimRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerMode, viewportH, isMobile]);

  const handlePanStart = useCallback(() => {
    // Cancel any spring-back / mode-change animations so a fresh drag wins.
    yAnimRef.current?.stop();
    hAnimRef.current?.stop();
  }, []);

  const handlePan = useCallback(
    (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      if (!isMobile || !viewportH) return;
      const offset = info.offset.y;
      if (offset < 0) {
        // Drag up: grow minHeight above natural so the drawer bottom stays
        // anchored and the top extends upward.
        if (drawerMode === 'expanded') {
          // Already fullscreen — nothing to grow.
          heightMV.set(viewportH);
        } else {
          const natural = naturalHeightRef.current || viewportH * 0.7;
          heightMV.set(Math.min(natural + -offset, viewportH));
        }
        yMV.set(0);
      } else {
        // Drag down: translate the whole drawer downward.
        heightMV.set(drawerMode === 'expanded' ? viewportH : 0);
        yMV.set(offset);
      }
    },
    [isMobile, viewportH, drawerMode, heightMV, yMV]
  );

  const handlePanEnd = useCallback(
    (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      if (!isMobile || !viewportH) return;
      const offsetY = info.offset.y;
      const velocityY = info.velocity.y;

      // Dismiss when the drawer's top has been dragged past DISMISS_TOP_FRACTION
      // of the viewport. Compute the threshold in terms of drag offset:
      //   drawerTop = (viewportH - naturalHeight) + offsetY      (in rest)
      //   drawerTop = 0 + offsetY                                (in expanded)
      const natural = naturalHeightRef.current || viewportH * 0.7;
      const startTop = drawerMode === 'expanded' ? 0 : viewportH - natural;
      const dismissOffset = DISMISS_TOP_FRACTION * viewportH - startTop;
      if (offsetY > dismissOffset || velocityY > 1500) {
        yAnimRef.current?.stop();
        yAnimRef.current = animate(yMV, viewportH, { duration: 0.22, ease: 'easeIn' });
        yAnimRef.current.then(() => onClose());
        return;
      }

      if (drawerMode === 'rest') {
        if (offsetY < -50 || velocityY < -500) {
          setDrawerMode('expanded'); // height effect animates to fullscreen
          yAnimRef.current?.stop();
          yAnimRef.current = animate(yMV, 0, SPRING);
          return;
        }
      } else {
        if (offsetY > 80 || velocityY > 500) {
          setDrawerMode('rest');
          yAnimRef.current?.stop();
          yAnimRef.current = animate(yMV, 0, SPRING);
          return;
        }
      }

      // Snap back to current mode.
      hAnimRef.current?.stop();
      hAnimRef.current = animate(heightMV, drawerMode === 'expanded' ? viewportH : 0, SPRING);
      yAnimRef.current?.stop();
      yAnimRef.current = animate(yMV, 0, SPRING);
    },
    [isMobile, viewportH, drawerMode, heightMV, yMV, onClose]
  );

  // Unified dismiss path so close button, CTA, and overlay-tap all slide off.
  const animatedClose = useCallback(() => {
    if (!isMobile || !viewportH) {
      onClose();
      return;
    }
    yAnimRef.current?.stop();
    yAnimRef.current = animate(yMV, viewportH, { duration: 0.22, ease: 'easeIn' });
    yAnimRef.current.then(() => onClose());
  }, [isMobile, viewportH, yMV, onClose]);

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
          onClick={animatedClose}
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <MotionBox
            key="drawer-panel"
            ref={panelRef}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            position="relative"
            bg="bg.container"
            w="100%"
            maxW={isMobile ? '100%' : '560px'}
            minH={isMobile ? undefined : hasProgress ? '680px' : '610px'}
            maxH={isMobile ? '100vh' : '92vh'}
            borderTopRadius={isMobile && drawerMode === 'expanded' ? '0' : '20px'}
            borderBottomRadius={isMobile ? 0 : '20px'}
            border="1px solid"
            borderColor="bg.border"
            boxShadow={
              isMobile
                ? '0 -20px 60px rgba(0,0,0,0.5)'
                : '0 24px 60px rgba(0,0,0,0.5)'
            }
            {...(isMobile
              ? {
                  // Mobile: yMV drives translateY here. heightMV → minHeight is
                  // applied imperatively via the heightMV.on('change') effect
                  // above (framer-motion's style binding is unreliable for
                  // non-transform CSS props on wrapped components).
                  style: { y: yMV },
                }
              : {
                  initial: { opacity: 0, y: 40, scale: 0.96 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  exit: {
                    opacity: 0,
                    scale: 0.88,
                    transition: { duration: 0.16, ease: 'easeIn' },
                  },
                  transition: SPRING,
                })}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            pt={isMobile && drawerMode === 'expanded' ? '40px' : 0}
            sx={
              isMobile
                ? {
                    transition:
                      'padding-top 0.3s ease, border-top-left-radius 0.3s ease, border-top-right-radius 0.3s ease',
                  }
                : undefined
            }
          >
            {/* Drag handle — only this area starts a pan, so internal scrolling stays intact */}
            {isMobile && (
              <MotionBox
                pt={3}
                pb={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
                minH="28px"
                onPanStart={handlePanStart}
                onPan={handlePan}
                onPanEnd={handlePanEnd}
                style={{ touchAction: 'none', cursor: 'grab' }}
              >
                <Box
                  w="40px"
                  h="4px"
                  borderRadius="full"
                  bg="bg.elevated"
                  opacity={drawerMode === 'expanded' ? 0 : 1}
                  transition="opacity 0.2s ease"
                />
              </MotionBox>
            )}

            <Box
              position="absolute"
              top={isMobile && drawerMode === 'expanded' ? '52px' : 3}
              right={3}
              zIndex={2}
              sx={{ transition: 'top 0.3s ease' }}
            >
              <IconButton
                aria-label="Close"
                onClick={animatedClose}
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
              pt={{ base: 6, md: 12 }}
              pb={{ base: 6, md: 9 }}
              overflowY="auto"
              flex={1}
              display="flex"
              flexDirection="column"
            >
              <VStack spacing={{ base: 4, md: 6 }} align="stretch" flex={1}>
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
                        poster={quest.iconImage ? assetPath(quest.iconImage) : undefined}
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

                {/* CTA — on mobile sits naturally below the reward (no auto-gap);
                    on desktop pushes to the bottom of the panel via mt:auto. */}
                <Box
                  display="flex"
                  justifyContent="center"
                  pt={1}
                  mt={isMobile ? 0 : 'auto'}
                >
                  <Button
                    onClick={animatedClose}
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

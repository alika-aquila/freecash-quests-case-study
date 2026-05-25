import { Box, HStack } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Quest } from '@/data/quests';
import { QuestCard } from './QuestCard';

interface MobileQuestCarouselProps {
  quests: Quest[];
  startIndex: number;
  onQuestClick: (quest: Quest) => void;
}

// Sizing in `vw` so the first card snaps to true viewport center at scrollLeft=0
// (% widths on flex items resolve against the container's content box, which
// the side padding had already shrunk — that pulled the first card off-center.)
const CARD_WIDTH_VW = 64;
const SIDE_PADDING_VW = (100 - CARD_WIDTH_VW) / 2;
const GAP_PX = 20;
const PADDING_BLOCK_PX = 24;
const INACTIVE_SCALE = 0.88;
const INACTIVE_OPACITY = 0.55;

export function MobileQuestCarousel({ quests, startIndex, onQuestClick }: MobileQuestCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Pointer-drag state (mouse/pen only — touch uses native momentum scroll)
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const isCapturingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    const cards = Array.from(el.children) as HTMLElement[];
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    setActiveIndex(bestIdx);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateActiveFromScroll();
    });
  }, [updateActiveFromScroll]);

  useEffect(() => {
    // Ensure we start on the first card. Some mobile browsers restore an
    // inner-scroll position on reload, which would render the carousel
    // mid-scroll on mount.
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    const target = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    didDragRef.current = false;
    isCapturingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;
    // NOTE: don't setPointerCapture here. Capturing the pointer redirects
    // the trailing `click` event to the scroll container, which would
    // swallow taps on the cards. We only capture once a real drag starts.
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4 && !didDragRef.current) {
      didDragRef.current = true;
      // Now that the user is genuinely dragging, capture so we keep
      // receiving move events even if the pointer leaves the container.
      try {
        el.setPointerCapture(e.pointerId);
        isCapturingRef.current = true;
      } catch {}
    }
    if (didDragRef.current) {
      el.scrollLeft = dragStartScrollLeftRef.current - dx;
    }
  };

  const endPointerDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (isCapturingRef.current) {
      const el = scrollRef.current;
      try {
        el?.releasePointerCapture(e.pointerId);
      } catch {}
      isCapturingRef.current = false;
    }
  };

  // Suppress the synthetic click that fires after a drag
  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
      didDragRef.current = false;
    }
  };

  return (
    <Box>
      <Box
        ref={scrollRef}
        display="flex"
        overflowX="auto"
        gap={`${GAP_PX}px`}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
        onClickCapture={handleClickCapture}
        sx={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          WebkitOverflowScrolling: 'touch',
          paddingInline: `${SIDE_PADDING_VW}vw`,
          paddingBlock: `${PADDING_BLOCK_PX}px`,
          cursor: 'grab',
          '&:active': { cursor: 'grabbing' },
        }}
      >
        {quests.map((quest, i) => {
          const isActive = i === activeIndex;
          return (
            <Box
              key={quest.id}
              flexShrink={0}
              w={`${CARD_WIDTH_VW}vw`}
              sx={{ scrollSnapAlign: 'center' }}
              transform={isActive ? 'scale(1)' : `scale(${INACTIVE_SCALE})`}
              opacity={isActive ? 1 : INACTIVE_OPACITY}
              transition="transform 0.3s ease, opacity 0.3s ease"
              transformOrigin="center"
              onClick={() => {
                if (!isActive) scrollToIndex(i);
              }}
            >
              <QuestCard
                quest={quest}
                index={startIndex + i}
                autoplay={isActive}
                onClick={isActive ? onQuestClick : undefined}
                disableEnterAnimation
              />
            </Box>
          );
        })}
      </Box>

      <HStack justify="center" spacing="6px" mt={2}>
        {quests.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <Box
              key={i}
              w={isActive ? '8px' : '6px'}
              h={isActive ? '8px' : '6px'}
              borderRadius="full"
              bg="brand.green"
              opacity={isActive ? 1 : 0.18}
              transform={isActive ? 'translateY(-2px)' : 'translateY(0)'}
              transition="opacity 0.2s ease, width 0.2s ease, height 0.2s ease, transform 0.2s ease"
            />
          );
        })}
      </HStack>
    </Box>
  );
}

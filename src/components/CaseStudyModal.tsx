import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

interface CaseStudyModalContextValue {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const CaseStudyModalContext = createContext<CaseStudyModalContextValue | null>(null);

export function useCaseStudyModal() {
  const ctx = useContext(CaseStudyModalContext);
  if (!ctx) {
    throw new Error('useCaseStudyModal must be used within CaseStudyModalProvider');
  }
  return ctx;
}

const MotionBox = motion.create(Box);

export function CaseStudyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <CaseStudyModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            key="cs-overlay"
            position="fixed"
            inset={0}
            zIndex={2000}
            bg="overlay"
            backdropFilter="blur(6px)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <MotionBox
              key="cs-modal"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              bg="bg.container"
              borderRadius="16px"
              maxW="400px"
              w="100%"
              p={8}
              boxShadow="0 24px 60px rgba(0,0,0,0.5)"
              border="1px solid"
              borderColor="bg.border"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              <VStack spacing={5} align="center" textAlign="center">
                <Box fontSize="48px" lineHeight="1">🎨</Box>
                <Text textStyle="headingXs" color="text.white">
                  This is a Case Study
                </Text>
                <Text color="text.muted" textStyle="textMd">
                  This interactive prototype was created as part of a product design challenge for Freecash.
                </Text>
                <Text color="text.muted" textStyle="textMd">
                  Only the Quests page is in scope for this concept. The rest of the site navigation is not part of this prototype.
                </Text>
                <Button
                  onClick={closeModal}
                  bg="brand.green"
                  color="bg.page"
                  fontWeight={600}
                  _hover={{ bg: 'brand.greenHover' }}
                  _active={{ bg: 'brand.greenHover' }}
                  size="lg"
                  w="100%"
                  borderRadius="10px"
                >
                  Got it
                </Button>
              </VStack>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </CaseStudyModalContext.Provider>
  );
}

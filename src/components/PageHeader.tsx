import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export function PageHeader() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <VStack align="start" spacing={3}>
        <HStack spacing={3} align="center">
          <Box
            w="40px"
            h="40px"
            borderRadius="10px"
            bgGradient="linear(to-br, brand.green, brand.greenLight)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="20px"
            boxShadow="0 6px 20px rgba(1,214,118,0.35)"
          >
            🧩
          </Box>
          <Text textStyle="headingSm" color="text.white">
            Quests
          </Text>
          <Box
            bg="brand.green"
            color="bg.page"
            fontWeight={700}
            textStyle="textXs"
            px={2}
            py={0.5}
            borderRadius="full"
            letterSpacing="0.05em"
          >
            NEW
          </Box>
        </HStack>
        <Text color="text.muted" textStyle="textMd" maxW="640px">
          Complete quests to earn <Text as="span" color="gold.base" fontWeight={600}>Lottery Tickets</Text> — each ticket gives you an entry into weekly draws for cash, gift cards, and rare rewards.
        </Text>
      </VStack>
    </MotionBox>
  );
}

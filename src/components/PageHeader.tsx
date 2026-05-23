import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
          <Box display="flex" alignItems="center" justifyContent="center" w="40px" h="40px">
            <Image
              src="/icon_quests.png"
              alt=""
              width={32}
              height={32}
              style={{ width: '36px', height: '36px' }}
            />
          </Box>
          <Text textStyle="headingSm" color="text.white">
            Quests
          </Text>
          <Box
            bg="gold.base"
            color="bg.page"
            fontWeight={700}
            textStyle="textXs"
            px={2}
            py={0.5}
            borderRadius="6px"
            letterSpacing="0.05em"
          >
            NEW
          </Box>
        </HStack>
        <VStack align="start" spacing={1} maxW="640px">
          <Text color="text.muted" textStyle="textMd">
            Complete the Quests to gain{' '}
            <Text as="span" color="gold.base" fontWeight={600}>Lottery Tickets</Text>
          </Text>
          <Text color="text.muted" textStyle="textMd">
            Weekly Lottery opens every Sunday. Use your tickets to compete for big prizes!
          </Text>
        </VStack>
      </VStack>
    </MotionBox>
  );
}

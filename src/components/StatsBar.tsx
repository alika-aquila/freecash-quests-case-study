import { Box, HStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CountUp } from './CountUp';
import { assetPath } from '@/utils/assetPath';

const MotionHStack = motion.create(HStack);

interface StatsBarProps {
  tickets: number;
  questsCompleted: number;
}

function Chip({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <HStack
      bg="bg.container"
      border="1px solid"
      borderColor="bg.border"
      borderRadius="full"
      px={4}
      py={2}
      spacing={2}
    >
      <Box as="img" src={assetPath(icon)} alt="" w="20px" h="20px" objectFit="contain" />
      <Text color={color} fontWeight={700} textStyle="textLg">
        <CountUp to={value} />
      </Text>
      <Text color="text.muted" textStyle="textMd">
        {label}
      </Text>
    </HStack>
  );
}

export function StatsBar({ tickets, questsCompleted }: StatsBarProps) {
  return (
    <MotionHStack
      spacing={3}
      flexWrap="wrap"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
    >
      <Chip icon="/icon_ticket.png" value={tickets} label="Tickets" color="gold.base" />
      <Chip icon="/icon_check.png" value={questsCompleted} label="Quests completed" color="brand.green" />
    </MotionHStack>
  );
}

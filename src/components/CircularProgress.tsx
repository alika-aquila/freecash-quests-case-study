import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number;          // 0-100
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  delayMs?: number;
  color?: string;
}

const MotionCircle = motion.circle;

export function CircularProgress({
  value,
  size = 64,
  strokeWidth = 5,
  showLabel = true,
  delayMs = 0,
  color = '#01D676',
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = Math.max(0, Math.min(100, value));
  const dashOffsetTarget = circumference * (1 - target / 100);

  return (
    <Box position="relative" w={`${size}px`} h={`${size}px`}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <MotionCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffsetTarget }}
          transition={{ duration: 0.8, delay: delayMs / 1000, ease: 'easeOut' }}
        />
      </svg>
      {showLabel && (
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="text.white" textStyle="textSm" fontWeight={600}>
            {Math.round(target)}%
          </Text>
        </Box>
      )}
    </Box>
  );
}

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

interface ParticleBurstProps {
  active: boolean;
}

const PARTICLES = Array.from({ length: 6 }).map((_, i) => {
  const angle = (i / 6) * Math.PI * 2;
  return {
    id: i,
    x: Math.cos(angle) * 60,
    y: Math.sin(angle) * 60,
    color: i % 2 === 0 ? '#01D676' : '#FFC700',
  };
});

export function ParticleBurst({ active }: ParticleBurstProps) {
  if (!active) return null;
  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="visible"
    >
      {PARTICLES.map((p) => (
        <MotionBox
          key={p.id}
          position="absolute"
          w="6px"
          h="6px"
          borderRadius="full"
          bg={p.color}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], x: p.x, y: p.y, scale: [0, 1, 0.5] }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </Box>
  );
}

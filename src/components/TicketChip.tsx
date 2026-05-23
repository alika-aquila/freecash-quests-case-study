import { Box, HStack, Text } from '@chakra-ui/react';
import { assetPath } from '@/utils/assetPath';

interface TicketChipProps {
  amount: number;
  bright?: boolean;
}

export function TicketChip({ amount, bright = false }: TicketChipProps) {
  return (
    <HStack
      spacing={1}
      bg={bright ? 'rgba(255,199,0,0.18)' : 'rgba(255,199,0,0.10)'}
      border="1px solid"
      borderColor={bright ? 'rgba(255,199,0,0.55)' : 'rgba(255,199,0,0.30)'}
      px={2.5}
      py={1}
      borderRadius="full"
      transition="all 0.2s ease"
    >
      <Box as="img" src={assetPath('/icon_ticket.png')} alt="" w="16px" h="16px" objectFit="contain" />
      <Text color="gold.base" fontWeight={700} textStyle="textSm">
        +{amount}
      </Text>
    </HStack>
  );
}

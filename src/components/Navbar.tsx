import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useCaseStudyModal } from './CaseStudyModal';

const NAV_LINKS = ['Earn', 'My Offers', 'Cashout', 'Rewards'] as const;

function Logo() {
  return (
    <Text
      fontWeight={800}
      fontSize="22px"
      letterSpacing="0.02em"
      userSelect="none"
    >
      <Text as="span" color="brand.green">FREE</Text>
      <Text as="span" color="text.white">CASH</Text>
    </Text>
  );
}

function CoinBalance() {
  return (
    <HStack
      bg="bg.container"
      borderRadius="full"
      px={3}
      py={1.5}
      spacing={2}
      border="1px solid"
      borderColor="bg.border"
    >
      <Box w="18px" h="18px" borderRadius="full" bgGradient="linear(to-br, gold.light, gold.base)" />
      <Text color="text.white" fontWeight={600} textStyle="textMd">
        $0
      </Text>
    </HStack>
  );
}

function Avatar() {
  return (
    <Box
      w="32px"
      h="32px"
      borderRadius="full"
      bgGradient="linear(to-br, brand.green, brand.greenLight)"
      border="2px solid"
      borderColor="bg.container"
    />
  );
}

function BellIcon() {
  return (
    <Box as="svg" w="20px" h="20px" viewBox="0 0 24 24" fill="none" color="text.muted">
      <path
        d="M12 2a6 6 0 00-6 6v3.586L4.293 13.293A1 1 0 005 15h14a1 1 0 00.707-1.707L18 11.586V8a6 6 0 00-6-6zm0 20a3 3 0 003-3H9a3 3 0 003 3z"
        fill="currentColor"
      />
    </Box>
  );
}

export function Navbar() {
  const { openModal } = useCaseStudyModal();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleNavClick = (label: string) => {
    if (label !== 'Rewards') openModal();
  };

  return (
    <Box
      as="header"
      bg="#1D1E30"
      borderBottom="1px solid"
      borderColor="bg.border"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex
        maxW="1400px"
        mx="auto"
        align="center"
        justify="space-between"
        px={{ base: 4, md: 6 }}
        py={3}
      >
        <Logo />

        {!isMobile && (
          <HStack spacing={2}>
            {NAV_LINKS.map((label) => {
              const isActive = label === 'Rewards';
              return (
                <Box
                  key={label}
                  as="button"
                  onClick={() => handleNavClick(label)}
                  position="relative"
                  px={4}
                  py={2}
                  cursor="pointer"
                  transition="color 0.15s ease"
                  color={isActive ? 'brand.green' : 'text.muted'}
                  fontWeight={isActive ? 600 : 500}
                  fontSize="14px"
                  _hover={{ color: 'text.white' }}
                >
                  {label}
                  {isActive && (
                    <Box
                      position="absolute"
                      bottom="-12px"
                      left="50%"
                      transform="translateX(-50%)"
                      w="40%"
                      h="2px"
                      bg="brand.green"
                      borderRadius="full"
                    />
                  )}
                </Box>
              );
            })}
          </HStack>
        )}

        {!isMobile ? (
          <HStack spacing={3}>
            <CoinBalance />
            <Avatar />
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              size="sm"
              _hover={{ bg: 'bg.container' }}
            />
          </HStack>
        ) : (
          <IconButton
            aria-label="Open menu"
            onClick={openModal}
            variant="ghost"
            size="md"
            _hover={{ bg: 'bg.container' }}
            icon={
              <Box as="svg" w="22px" h="22px" viewBox="0 0 24 24" fill="none" color="text.white">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </Box>
            }
          />
        )}
      </Flex>
    </Box>
  );
}

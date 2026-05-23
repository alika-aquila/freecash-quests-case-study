import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useCaseStudyModal } from './CaseStudyModal';

interface NavLink {
  label: string;
  icon: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Earn', icon: '/icon_earn.png' },
  { label: 'My Offers', icon: '/icon_offers.png' },
  { label: 'Surveys', icon: '/icon_offers.png' },
  { label: 'Cashout', icon: '/icon_cashout.png' },
  { label: 'Rewards', icon: '/icon_rewards.png' },
];

function Logo() {
  return (
    <Box display="flex" alignItems="center" userSelect="none">
      <Image
        src="/logo.png"
        alt="Freecash"
        width={167}
        height={20}
        style={{ height: '24px', width: 'auto' }}
        priority
      />
    </Box>
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

function ChevronDownIcon() {
  return (
    <Box as="svg" w="14px" h="14px" viewBox="0 0 24 24" fill="none" color="currentColor">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      position="fixed"
      top={0}
      left={0}
      right={0}
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
        <HStack spacing={4} flex={1}>
          <Logo />
          {!isMobile && (
            <>
              <Box w="1px" h="24px" bg="bg.border" />
              <HStack spacing={1}>
            {NAV_LINKS.map(({ label, icon }) => {
              const isActive = label === 'Rewards';
              return (
                <Box
                  key={label}
                  as="button"
                  onClick={() => handleNavClick(label)}
                  position="relative"
                  px={3}
                  py={2}
                  cursor="pointer"
                  transition="color 0.15s ease"
                  color={isActive ? 'text.white' : 'text.muted'}
                  fontWeight={isActive ? 600 : 500}
                  fontSize="14px"
                  _hover={{ color: 'text.white' }}
                  display="flex"
                  alignItems="center"
                  gap="6px"
                >
                  <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    style={{ width: '20px', height: '20px', opacity: isActive ? 1 : 0.85 }}
                  />
                  <Text as="span">{label}</Text>
                  {isActive && <ChevronDownIcon />}
                  {isActive && (
                    <Box
                      position="absolute"
                      bottom="-12px"
                      left="10%"
                      right="10%"
                      h="2px"
                      bg="brand.green"
                      borderRadius="full"
                    />
                  )}
                </Box>
              );
            })}
              </HStack>
            </>
          )}
        </HStack>

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

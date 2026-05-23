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
        style={{ height: '20px', width: 'auto' }}
        priority
      />
    </Box>
  );
}

function CoinBalance({ onClick }: { onClick: () => void }) {
  return (
    <HStack
      as="button"
      onClick={onClick}
      bg="rgba(1, 214, 118, 0.18)"
      borderRadius="8px"
      px="14px"
      h="38px"
      spacing="6px"
      border="none"
      cursor="pointer"
      transition="background 0.15s ease"
      _hover={{ bg: 'rgba(1, 214, 118, 0.26)' }}
    >
      <Text color="brand.green" fontWeight={700} fontSize="14px" lineHeight="1">
        $
      </Text>
      <Text color="text.white" fontWeight={700} fontSize="14px" lineHeight="1">
        0
      </Text>
    </HStack>
  );
}

function ProfileChip({ onClick }: { onClick: () => void }) {
  return (
    <HStack
      as="button"
      onClick={onClick}
      bg="#2F3043"
      borderRadius="8px"
      pl="4px"
      pr="12px"
      h="38px"
      spacing="8px"
      border="1px solid"
      borderColor="transparent"
      cursor="pointer"
      transition="border-color 0.15s ease, background 0.15s ease"
      _hover={{ borderColor: 'rgba(255,255,255,0.08)', bg: '#363751' }}
    >
      <Box
        w="28px"
        h="28px"
        borderRadius="full"
        bgGradient="linear(to-br, brand.green, brand.greenLight)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="bg.page"
        fontWeight={800}
        fontSize="12px"
        lineHeight="1"
      >
        L
      </Box>
      <Text color="#A9A9CA" fontWeight={500} fontSize="14px" lineHeight="1" fontFamily="Poppins, sans-serif">
        Likka
      </Text>
    </HStack>
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
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      <Flex
        align="center"
        justify="space-between"
        px={{ base: 4, md: 6 }}
        py="14px"
      >
        <HStack spacing={4}>
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
                    width={28}
                    height={28}
                    style={{ width: '24px', height: '24px', opacity: isActive ? 1 : 0.85 }}
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
          <HStack spacing="10px">
            <CoinBalance onClick={openModal} />
            <ProfileChip onClick={openModal} />
            <IconButton
              aria-label="Notifications"
              onClick={openModal}
              icon={
                <Image
                  src="/icon_notifications.png"
                  alt=""
                  width={20}
                  height={20}
                  style={{ width: '20px', height: '20px' }}
                />
              }
              variant="ghost"
              size="sm"
              borderRadius="8px"
              w="36px"
              h="36px"
              minW="36px"
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

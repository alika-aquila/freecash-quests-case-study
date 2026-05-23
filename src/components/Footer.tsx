import { Box, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useCaseStudyModal } from './CaseStudyModal';

const COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Freecash', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Resources', links: ['Help Center', 'Blog', 'Status', 'Terms'] },
  { title: 'Business', links: ['Advertisers', 'Partners', 'API', 'Press Kit'] },
];

export function Footer() {
  const { openModal } = useCaseStudyModal();

  return (
    <Box
      as="footer"
      bg="#1A1B2D"
      borderTop="1px solid"
      borderColor="bg.border"
      mt={20}
      py={10}
    >
      <Box maxW="1400px" mx="auto" px={{ base: 4, md: 6 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 8, md: 12 }}
          justify="space-between"
        >
          <VStack align="start" spacing={3}>
            <Image
              src="/logo.png"
              alt="Freecash"
              width={167}
              height={20}
              style={{ height: '24px', width: 'auto' }}
            />
            <Text color="text.muted" textStyle="textSm" maxW="280px">
              Earn lottery tickets for completing quests, get rewarded weekly.
            </Text>
          </VStack>

          <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 6, sm: 12 }}>
            {COLUMNS.map((col) => (
              <VStack key={col.title} align="start" spacing={3}>
                <Text color="text.white" fontWeight={600} textStyle="textMd">
                  {col.title}
                </Text>
                <VStack align="start" spacing={2}>
                  {col.links.map((link) => (
                    <Box
                      key={link}
                      as="button"
                      onClick={openModal}
                      color="text.muted"
                      fontSize="13px"
                      _hover={{ color: 'text.white' }}
                      transition="color 0.15s ease"
                      textAlign="left"
                    >
                      {link}
                    </Box>
                  ))}
                </VStack>
              </VStack>
            ))}
          </Stack>
        </Flex>

        <HStack
          mt={10}
          pt={6}
          borderTop="1px solid"
          borderColor="bg.border"
          justify="center"
        >
          <Text color="text.muted" textStyle="textXs">
            Case Study — Not a real product
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}

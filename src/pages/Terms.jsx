import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  UnorderedList,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';

const Terms = () => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box py={12}>
      <Container maxW="container.lg">
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Heading size="2xl">Terms and Conditions</Heading>
            <Text fontSize="lg" color={textColor}>
              Last updated: December 31, 2023
            </Text>
          </Stack>

          <Stack
            spacing={8}
            p={8}
            borderRadius="lg"
            bg={sectionBg}
            border="1px"
            borderColor={borderColor}
          >
            <Stack spacing={4}>
              <Heading size="md">1. Account Terms</Heading>
              <Text color={textColor}>
                By creating an account on Job Found, you agree to provide accurate and complete information.
                You are responsible for maintaining the security of your account and password.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">2. Job Posting Guidelines</Heading>
              <UnorderedList spacing={2} pl={4} color={textColor}>
                <ListItem>All job postings must be legitimate and accurate</ListItem>
                <ListItem>Job descriptions must comply with employment laws</ListItem>
                <ListItem>No discriminatory content or requirements</ListItem>
                <ListItem>Clear disclosure of job requirements and responsibilities</ListItem>
              </UnorderedList>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">3. User Conduct</Heading>
              <Text color={textColor}>
                Users must not engage in any activity that:
              </Text>
              <UnorderedList spacing={2} pl={4} color={textColor}>
                <ListItem>Violates any laws or regulations</ListItem>
                <ListItem>Infringes on intellectual property rights</ListItem>
                <ListItem>Harasses or discriminates against others</ListItem>
                <ListItem>Spreads false or misleading information</ListItem>
              </UnorderedList>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">4. Service Modifications</Heading>
              <Text color={textColor}>
                We reserve the right to modify or discontinue any part of our service at any time.
                We will provide notice of significant changes when possible.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">5. Limitation of Liability</Heading>
              <Text color={textColor}>
                Job Found is not responsible for any indirect, incidental, or consequential damages
                arising from your use of the service or any content posted on the platform.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Terms;

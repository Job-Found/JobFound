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

const Privacy = () => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box py={12}>
      <Container maxW="container.lg">
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Heading size="2xl">Privacy Policy</Heading>
            <Text fontSize="lg" color={textColor}>
              Last updated: December 31, 2023
            </Text>
          </Stack>

          <Stack
            spacing={6}
            p={8}
            borderRadius="lg"
            bg={sectionBg}
            border="1px"
            borderColor={borderColor}
          >
            <Stack spacing={4}>
              <Heading size="md">Information We Collect</Heading>
              <UnorderedList spacing={2} pl={4} color={textColor}>
                <ListItem>Personal information provided during account creation</ListItem>
                <ListItem>Professional information in resumes and job applications</ListItem>
                <ListItem>Usage data and interaction with our platform</ListItem>
                <ListItem>Device and browser information</ListItem>
              </UnorderedList>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">How We Use Your Information</Heading>
              <UnorderedList spacing={2} pl={4} color={textColor}>
                <ListItem>To provide and improve our job search services</ListItem>
                <ListItem>To match you with relevant job opportunities</ListItem>
                <ListItem>To communicate with you about your account and updates</ListItem>
                <ListItem>To ensure platform security and prevent fraud</ListItem>
              </UnorderedList>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">Information Security</Heading>
              <Text color={textColor}>
                We implement appropriate security measures to protect your personal information. 
                This includes encryption, secure servers, and regular security assessments.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">Your Rights</Heading>
              <UnorderedList spacing={2} pl={4} color={textColor}>
                <ListItem>Access your personal data</ListItem>
                <ListItem>Request corrections to your data</ListItem>
                <ListItem>Delete your account and associated data</ListItem>
                <ListItem>Opt-out of marketing communications</ListItem>
              </UnorderedList>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Privacy;

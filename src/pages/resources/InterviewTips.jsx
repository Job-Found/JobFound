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
  Divider,
} from '@chakra-ui/react';

const InterviewTips = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box py={12}>
      <Container maxW="container.lg">
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Heading size="2xl">Interview Tips</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Master your next job interview with these proven strategies
            </Text>
          </Stack>

          <Stack
            spacing={8}
            p={8}
            borderRadius="lg"
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
          >
            <Stack spacing={6}>
              <Stack spacing={4}>
                <Heading size="lg">Before the Interview</Heading>
                <UnorderedList spacing={2} pl={4}>
                  <ListItem>Research the company thoroughly</ListItem>
                  <ListItem>Review the job description and requirements</ListItem>
                  <ListItem>Prepare relevant examples of your experience</ListItem>
                  <ListItem>Practice common interview questions</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              <Stack spacing={4}>
                <Heading size="lg">During the Interview</Heading>
                <UnorderedList spacing={2} pl={4}>
                  <ListItem>Arrive 10-15 minutes early</ListItem>
                  <ListItem>Maintain good eye contact and body language</ListItem>
                  <ListItem>Use the STAR method for behavioral questions</ListItem>
                  <ListItem>Ask thoughtful questions about the role and company</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              <Stack spacing={4}>
                <Heading size="lg">After the Interview</Heading>
                <UnorderedList spacing={2} pl={4}>
                  <ListItem>Send a thank-you email within 24 hours</ListItem>
                  <ListItem>Follow up if you haven't heard back in a week</ListItem>
                  <ListItem>Reflect on the experience and areas for improvement</ListItem>
                </UnorderedList>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default InterviewTips;

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

const ResumeGuide = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box py={12}>
      <Container maxW="container.lg">
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Heading size="2xl">Resume Writing Guide</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Create a compelling resume that gets you noticed
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
                <Heading size="lg">Resume Structure</Heading>
                <UnorderedList spacing={2} pl={4}>
                  <ListItem>Clear, professional contact information</ListItem>
                  <ListItem>Compelling professional summary</ListItem>
                  <ListItem>Relevant work experience with achievements</ListItem>
                  <ListItem>Education and certifications</ListItem>
                  <ListItem>Skills and technical competencies</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              <Stack spacing={4}>
                <Heading size="lg">Writing Tips</Heading>
                <UnorderedList spacing={2} pl={4}>
                  <ListItem>Use action verbs to describe achievements</ListItem>
                  <ListItem>Quantify results when possible</ListItem>
                  <ListItem>Tailor your resume for each job application</ListItem>
                  <ListItem>Keep formatting consistent and clean</ListItem>
                  <ListItem>Proofread carefully for errors</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              <Stack spacing={4}>
                <Heading size="lg">Common Mistakes to Avoid</Heading>
                <UnorderedList spacing={2} pl={4}>
                  <ListItem>Including irrelevant information</ListItem>
                  <ListItem>Using generic descriptions</ListItem>
                  <ListItem>Making it too long or too short</ListItem>
                  <ListItem>Neglecting keywords from the job posting</ListItem>
                </UnorderedList>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ResumeGuide;

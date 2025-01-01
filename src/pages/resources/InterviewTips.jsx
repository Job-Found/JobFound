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
  const textColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Box py={12} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.lg">
        <Stack spacing={10}>
          <Stack spacing={4} textAlign="center">
            <Heading size="2xl" color="teal.500">Interview Tips: Strategies for Excelling in Your Next Interview</Heading>
            <Text fontSize="xl" color={textColor}>
              A successful interview requires thorough preparation, effective execution, and post-interview reflection. This guide divides the process into three key sections to help you master every step.
            </Text>
          </Stack>

          <Stack
            spacing={10}
            p={8}
            borderRadius="lg"
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
            boxShadow="lg"
          >
            {/* Before the Interview */}
            <Stack spacing={6}>
              <Heading size="lg" color="teal.200">Before the Interview</Heading>
              <UnorderedList spacing={3} pl={6} fontSize="lg" color={textColor}>
                <ListItem>
                  <Text fontWeight="bold">Research the Company</Text>
                  <Text>Learn about the company's recent developments, mission, values, and major achievements.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Plan Your Introduction</Text>
                  <Text>Craft a compelling introduction that highlights your background and strengths.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Know the Role</Text>
                  <Text>Review the job description and understand the key responsibilities and skills required.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Seek Guidance from Seniors</Text>
                  <Text>Connect with mentors or professionals in your network for insights and advice.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Prepare Your Resume</Text>
                  <Text>Ensure your resume is up-to-date and tailored to the job position.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Practice Common Questions</Text>
                  <Text>Prepare answers to frequently asked questions and behavioral scenarios.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Mock Interviews and Practice</Text>
                  <Text>Simulate interviews and analyze your performance to identify areas for improvement.</Text>
                </ListItem>
              </UnorderedList>
            </Stack>

            <Divider />

            {/* During the Interview */}
            <Stack spacing={6}>
              <Heading size="lg" color="teal.200">During the Interview</Heading>
              <UnorderedList spacing={3} pl={6} fontSize="lg" color={textColor}>
                <ListItem>
                  <Text fontWeight="bold">Use the Right Equipment</Text>
                  <Text>Ensure you have a reliable device with a good camera and microphone for online interviews.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Be Punctual</Text>
                  <Text>Join the meeting 10-15 minutes early to show your professionalism.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Dress Professionally</Text>
                  <Text>Wear formal attire to convey respect and seriousness.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Greet with Confidence</Text>
                  <Text>Start with a smile and polite greeting to make a positive impression.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Stay Calm and Composed</Text>
                  <Text>Maintain a steady demeanor and avoid panicking, even during challenging questions.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Take Your Time</Text>
                  <Text>Think before responding to questions; avoid filler sounds like "umm" or "ahh."</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Persevere</Text>
                  <Text>Stay positive and focused even if some questions seem difficult.</Text>
                </ListItem>
              </UnorderedList>
            </Stack>

            <Divider />

            {/* After the Interview */}
            <Stack spacing={6}>
              <Heading size="lg" color="teal.200">After the Interview</Heading>
              <UnorderedList spacing={3} pl={6} fontSize="lg" color={textColor}>
                <ListItem>
                  <Text fontWeight="bold">Evaluate Your Performance</Text>
                  <Text>Reflect on your performance and identify areas for improvement.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Send a Thank-You Note</Text>
                  <Text>Send a thoughtful thank-you email within 24 hours to express your gratitude.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Keep Preparing</Text>
                  <Text>Continue improving your skills and preparing for future opportunities.</Text>
                </ListItem>
                <ListItem>
                  <Text fontWeight="bold">Stay Positive</Text>
                  <Text>Don’t dwell on the results. Focus on your next steps and keep moving forward.</Text>
                </ListItem>
              </UnorderedList>
            </Stack>
          </Stack>

          <Stack spacing={4} textAlign="center">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Good Luck! Stay confident and trust in your preparation. With dedication and the right mindset, success is just around the corner.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default InterviewTips;
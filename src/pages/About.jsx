import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBriefcase, FaUsers, FaHandshake, FaChartLine } from 'react-icons/fa';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      align={'center'}
      textAlign={'center'}
      p={8}
      borderRadius="lg"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="lg"
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      _hover={{
        transform: 'translateY(-5px)',
        shadow: 'xl',
      }}
      transition="all 0.3s"
    >
      <Icon as={icon} w={10} h={10} color="blue.400" mb={4} />
      <Text fontWeight={600} fontSize="lg" mb={2}>{title}</Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </Stack>
  );
};

const About = () => {
  const features = [
    {
      icon: FaBriefcase,
      title: 'Job Opportunities',
      text: 'Access thousands of job listings from top companies across various industries.',
    },
    {
      icon: FaUsers,
      title: 'Community',
      text: 'Join a growing community of job seekers and employers building meaningful connections.',
    },
    {
      icon: FaHandshake,
      title: 'Direct Hiring',
      text: 'Connect directly with employers and streamline your hiring process.',
    },
    {
      icon: FaChartLine,
      title: 'Career Growth',
      text: 'Find opportunities that align with your career goals and growth aspirations.',
    },
  ];

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <Stack spacing={12} align="center">
          <Stack spacing={4} textAlign="center" maxW="2xl">
            <Heading size="2xl" mb={4}>About Job Found</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              We're dedicated to connecting talented professionals with their dream jobs. Our platform makes job searching and hiring simpler, faster, and more effective.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} width="full">
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </SimpleGrid>

          <Stack spacing={6} textAlign="center" maxW="3xl">
            <Heading size="lg">Our Mission</Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              To revolutionize the job search experience by creating a platform that puts people first. We believe in making job hunting more accessible, transparent, and efficient for everyone.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default About;

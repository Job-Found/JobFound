import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaLightbulb, FaChartLine, FaHandshake, FaGraduationCap } from 'react-icons/fa';

const AdviceCard = ({ title, description, icon }) => {
  return (
    <Stack
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius="lg"
      align="center"
      spacing={4}
      _hover={{
        transform: 'scale(1.05) translateY(-5px)',
        shadow: 'lg',
        borderColor: 'blue.400', // Adds blue border on hover
      }}
      transition="all 0.3s"
    >
      <Icon as={icon} w={8} h={8} color="blue.400" />
      <Heading size="md" textAlign="center">{title}</Heading>
      <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.400')}>
        {description}
      </Text>
    </Stack>
  );
};

const CareerAdvice = () => {
  const adviceItems = [
    {
      icon: FaLightbulb,
      title: 'Know Your Goals',
      description: 'Define clear career objectives and create an action plan to achieve them.',
    },
    {
      icon: FaChartLine,
      title: 'Continuous Learning',
      description: 'Stay updated with industry trends and continuously develop your skills.',
    },
    {
      icon: FaHandshake,
      title: 'Network Effectively',
      description: 'Build and maintain professional relationships in your industry.',
    },
    {
      icon: FaGraduationCap,
      title: 'Skill Development',
      description: 'Identify and focus on skills that are in high demand in your field.',
    },
  ];

  return (
    <Box py={12}>
      <Container maxW="container.xl">
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading size="2xl">Career Advice</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="3xl" mx="auto">
              Expert guidance to help you make informed decisions and advance in your career
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {adviceItems.map((item, index) => (
              <AdviceCard key={index} {...item} />
            ))}
          </SimpleGrid>

          <Stack spacing={6} bg={useColorModeValue('blue.50', 'gray.700')} p={8} borderRadius="lg">
            <Heading size="lg">Pro Tips for Career Growth</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.300')}>
              Success in your career journey requires a combination of strategic planning, continuous learning, 
              and building meaningful professional relationships. Stay focused on your goals while remaining 
              flexible enough to adapt to changing industry trends and opportunities.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CareerAdvice;
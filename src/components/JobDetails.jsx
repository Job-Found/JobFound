import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Badge,
  Flex,
  Icon,
  Divider,
  useColorModeValue,
  SimpleGrid,
  Container,
  HStack,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
  FaExternalLinkAlt,
  FaRupeeSign,
  FaArrowLeft,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

const JobDetails = ({ job, onClose }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)');

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatSalary = (min, max) => {
    if (!min && !max) return 'Not Disclosed';
    if (min && !max) return `${min}+ LPA`;
    if (!min && max) return `Up to ${max} LPA`;
    return `${min} - ${max} LPA`;
  };

  const getExperienceBadgeColor = (level) => {
    const colors = {
      'Fresher': 'green',
      'Junior': 'blue',
      'Mid-Level': 'purple',
      'Senior': 'orange',
      'Lead': 'red'
    };
    return colors[level] || 'gray';
  };

  return (
    <Container maxW="4xl" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        bg={bgColor}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow={`0 8px 32px ${shadowColor}`}
        overflow="hidden"
        position="relative"
      >
        {/* Gradient Header Bar */}
        <Box
          h="6px"
          bgGradient="linear(to-r, blue.400, purple.500)"
          position="absolute"
          top={0}
          left={0}
          right={0}
        />

        <Stack spacing={8} p={8} pt={10}>
          {/* Header Section */}
          <Stack spacing={6}>
            <Flex justify="space-between" align="flex-start">
              <IconButton
                icon={<FaArrowLeft />}
                onClick={onClose}
                variant="ghost"
                colorScheme="blue"
                size="lg"
                borderRadius="full"
                aria-label="Back to jobs"
              />
            </Flex>

            <MotionFlex
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              direction="column"
              align="flex-start"
              gap={4}
            >
              <HStack spacing={4}>
                <Box
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  p={4}
                  borderRadius="xl"
                  width="64px"
                  height="64px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    {job.company.charAt(0)}
                  </Text>
                </Box>
                <Stack spacing={2}>
                  <Heading size="lg" color={useColorModeValue('gray.800', 'white')}>
                    {job.title}
                  </Heading>
                  <Flex align="center">
                    <Icon as={FaBuilding} mr={2} color={useColorModeValue('blue.500', 'blue.300')} />
                    <Text fontSize="lg" fontWeight="medium">
                      {job.company}
                    </Text>
                  </Flex>
                </Stack>
              </HStack>

              <HStack spacing={4} wrap="wrap">
                <MotionBadge
                  colorScheme={job.type === 'Full-time' ? 'green' : 'purple'}
                  px={3}
                  py={1.5}
                  borderRadius="full"
                  fontSize="md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {job.type}
                </MotionBadge>
                {job.experience_level && (
                  <MotionBadge
                    colorScheme={getExperienceBadgeColor(job.experience_level)}
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    fontSize="md"
                    variant="subtle"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {job.experience_level}
                  </MotionBadge>
                )}
              </HStack>
            </MotionFlex>
          </Stack>

          <Divider />

          {/* Key Details Section */}
          <Stack spacing={6}>
            <Heading size="md">Key Details</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <VStack align="start" spacing={4}>
                <Flex align="center" color={textColor}>
                  <Icon as={FaMapMarkerAlt} mr={3} color="blue.400" boxSize={5} />
                  <Text fontSize="md">{job.location}</Text>
                </Flex>
                <Flex align="center" color={textColor}>
                  <Icon as={FaBriefcase} mr={3} color="purple.400" boxSize={5} />
                  <Text fontSize="md">{job.type}</Text>
                </Flex>
              </VStack>
              <VStack align="start" spacing={4}>
                <Flex align="center" color={textColor}>
                  <Icon as={FaRupeeSign} mr={3} color="green.400" boxSize={5} />
                  <Text fontSize="md">{formatSalary(job.salary_min, job.salary_max)}</Text>
                </Flex>
                <Flex align="center" color={textColor}>
                  <Icon as={FaClock} mr={3} color="orange.400" boxSize={5} />
                  <Text fontSize="md">Posted {formatDate(job.posted_at)}</Text>
                </Flex>
              </VStack>
            </SimpleGrid>
          </Stack>

          <Divider />

          {/* Job Description Section */}
          <Stack spacing={4}>
            <Heading size="md">Job Description</Heading>
            <Text color={textColor} whiteSpace="pre-wrap" lineHeight="tall">
              {job.description}
            </Text>
          </Stack>

          <Divider />

          {/* Action Buttons */}
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
            <Button
              as="a"
              href={job.apply_url}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
              size="lg"
              flex={{ base: 'auto', md: 2 }}
              height="56px"
              fontSize="md"
              rightIcon={<FaExternalLinkAlt />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Apply Now
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              size="lg"
              flex={1}
              height="56px"
              fontSize="md"
              onClick={onClose}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Back to Jobs
            </Button>
          </Stack>
        </Stack>
      </MotionBox>
    </Container>
  );
};

export default JobDetails;

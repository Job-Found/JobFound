import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  Flex,
  Icon,
  Divider,
  useColorModeValue,
  SimpleGrid,
  VStack,
  HStack,
  IconButton,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
  FaExternalLinkAlt,
  FaRupeeSign,
  FaArrowLeft,
  FaShare,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Move all color mode hooks to the top
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)');
  const companyBgColor = useColorModeValue('gray.100', 'gray.700');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Job not found');

      setJob(data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load job details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

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

  const handleShare = async () => {
    try {
      await navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <Container maxW="4xl" py={8}>
        <Center h="50vh">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Center>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxW="4xl" py={8}>
        <Center h="50vh" flexDirection="column" gap={4}>
          <Text fontSize="xl">Job not found</Text>
          <Button 
            leftIcon={<FaArrowLeft />} 
            colorScheme="blue" 
            onClick={() => navigate('/')}
          >
            Back to Jobs
          </Button>
        </Center>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Back Button */}
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          mb={6}
          onClick={() => navigate('/')}
        >
          Back to Jobs
        </Button>

        {/* Main Content */}
        <Box
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
            <MotionFlex
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              justify="space-between"
              align="flex-start"
            >
              <HStack spacing={4} flex="1">
                <Box
                  bg={companyBgColor}
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
                <Stack spacing={2} flex="1">
                  <Heading size="lg">{job.title}</Heading>
                  <Flex align="center">
                    <Icon as={FaBuilding} mr={2} color={iconColor} />
                    <Text fontSize="lg" fontWeight="medium">
                      {job.company}
                    </Text>
                  </Flex>
                </Stack>
                <IconButton
                  icon={<FaShare />}
                  onClick={handleShare}
                  variant="ghost"
                  colorScheme="blue"
                  aria-label="Share job"
                />
              </HStack>
            </MotionFlex>

            {/* Tags Section */}
            <HStack spacing={4} wrap="wrap">
              <MotionBadge
                colorScheme="blue"
                px={3}
                py={1.5}
                borderRadius="full"
                fontSize="md"
                display="flex"
                alignItems="center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaMapMarkerAlt} mr={2} />
                {job.location}
              </MotionBadge>
              <MotionBadge
                colorScheme="purple"
                px={3}
                py={1.5}
                borderRadius="full"
                fontSize="md"
                display="flex"
                alignItems="center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaBriefcase} mr={2} />
                {job.type}
              </MotionBadge>
              <MotionBadge
                colorScheme={getExperienceBadgeColor(job.experience_level)}
                px={3}
                py={1.5}
                borderRadius="full"
                fontSize="md"
                display="flex"
                alignItems="center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaClock} mr={2} />
                {job.experience_level}
              </MotionBadge>
              <MotionBadge
                colorScheme="green"
                px={3}
                py={1.5}
                borderRadius="full"
                fontSize="md"
                display="flex"
                alignItems="center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaRupeeSign} mr={2} />
                {formatSalary(job.salary_min, job.salary_max)}
              </MotionBadge>
            </HStack>

            <Divider />

            {/* Job Description */}
            <Stack spacing={6}>
              <Heading size="md">Job Description</Heading>
              <Text color={textColor} whiteSpace="pre-wrap">
                {job.description}
              </Text>
            </Stack>

            <Divider />

            {/* Apply Section */}
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color={textColor}>
                Posted: {formatDate(job.posted_at)}
              </Text>
              <Button
                as="a"
                href={job.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                colorScheme="blue"
                size="lg"
                rightIcon={<FaExternalLinkAlt />}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Apply Now
              </Button>
            </VStack>
          </Stack>
        </Box>
      </MotionBox>
    </Container>
  );
};

export default JobDetailsPage;

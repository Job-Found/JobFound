import React from 'react';
import {
  Box,
  Badge,
  Text,
  Stack,
  Flex,
  Icon,
  useColorModeValue,
  Image,
  HStack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaRupeeSign, 
  FaRegClock, 
  FaTrash, 
  FaEdit 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

const JobCard = ({ job, isAdmin, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)');
  const glowColor = useColorModeValue('rgba(66, 153, 225, 0.3)', 'rgba(99, 179, 237, 0.3)');

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
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

  const handleClick = (e) => {
    // If clicking admin buttons, don't trigger the card click
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/job/${job.id}`);
  };

  return (
    <MotionBox
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      cursor="pointer"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      bg={cardBg}
      p={6}
      position="relative"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 12px ${shadowColor}, 0 0 0 3px ${glowColor}`,
        transition: 'all 0.3s'
      }}
    >
      <Flex justify="space-between" align="flex-start">
        <Box flex="1">
          <Flex align="center" mb={2}>
            <Box
              bg={useColorModeValue('gray.100', 'gray.700')}
              borderRadius="md"
              p={2}
              mr={4}
              width="48px"
              height="48px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FaBriefcase} boxSize={5} color="blue.500" />
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={1}>
                {job.title}
              </Text>
              <Text color={textColor} fontSize="md">
                {job.company}
              </Text>
            </Box>
          </Flex>

          <Stack spacing={4}>
            <HStack spacing={4}>
              <MotionBadge
                colorScheme="blue"
                display="flex"
                alignItems="center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaMapMarkerAlt} mr={1} />
                {job.location}
              </MotionBadge>
              <MotionBadge
                colorScheme="purple"
                display="flex"
                alignItems="center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaBriefcase} mr={1} />
                {job.type}
              </MotionBadge>
              <MotionBadge
                colorScheme={getExperienceBadgeColor(job.experience_level)}
                display="flex"
                alignItems="center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaRegClock} mr={1} />
                {job.experience_level}
              </MotionBadge>
            </HStack>

            <Text color={textColor} noOfLines={2}>
              {job.description}
            </Text>

            <Flex justify="space-between" align="center">
              <MotionBadge
                colorScheme="green"
                display="flex"
                alignItems="center"
                whileHover={{ scale: 1.05 }}
              >
                <Icon as={FaRupeeSign} mr={1} />
                {formatSalary(job.salary_min, job.salary_max)}
              </MotionBadge>
              <Text fontSize="sm" color={textColor}>
                Posted: {formatDate(job.posted_at)}
              </Text>
            </Flex>
          </Stack>
        </Box>

        {isAdmin && (
          <Flex direction="column" gap={2} ml={4}>
            <Tooltip label="Edit Job" placement="left">
              <IconButton
                icon={<FaEdit />}
                onClick={() => onEdit(job)}
                colorScheme="blue"
                variant="ghost"
                size="sm"
                aria-label="Edit job"
              />
            </Tooltip>
            <Tooltip label="Delete Job" placement="left">
              <IconButton
                icon={<FaTrash />}
                onClick={() => onDelete(job.id)}
                colorScheme="red"
                variant="ghost"
                size="sm"
                aria-label="Delete job"
              />
            </Tooltip>
          </Flex>
        )}
      </Flex>
    </MotionBox>
  );
};

export default JobCard;

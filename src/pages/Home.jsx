import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  Stack,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
  Flex,
  Grid,
  RadioGroup,
  Radio,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
  VStack,
  HStack,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaRupeeSign, FaFilter } from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import JobCard from '../components/JobCard';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Box mb={6}>
      <Flex 
        align="center" 
        cursor="pointer" 
        onClick={() => setIsOpen(!isOpen)} 
        mb={4}
      >
        <Heading size="sm" flex="1">{title}</Heading>
        <Icon
          as={FaFilter}
          transform={isOpen ? 'rotate(0deg)' : 'rotate(180deg)'}
          transition="transform 0.2s"
        />
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            overflow="hidden"
          >
            {children}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: [],
    experience_level: '',
    salary_range: [0, 100],
  });
  const [loading, setLoading] = useState(true);
  const [showSalaryTooltip, setShowSalaryTooltip] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const filterBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('posted_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type) => {
    const updatedTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    setFilters({ ...filters, type: updatedTypes });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: [],
      experience_level: '',
      salary_range: [0, 100],
    });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.company?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.description?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
    const matchesExperience = !filters.experience_level || job.experience_level === filters.experience_level;
    const matchesSalary = (!job.salary_min || job.salary_min >= filters.salary_range[0]) &&
                         (!job.salary_max || job.salary_max <= filters.salary_range[1]);

    return matchesSearch && matchesLocation && matchesType && matchesExperience && matchesSalary;
  });

  const activeFiltersCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : Boolean(value)
  ).length;

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header Section */}
      <Box textAlign="center" mb={12}>
        <Heading size="2xl" mb={4}>
          Find Your Dream Job
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Discover the best job opportunities that match your skills
        </Text>
      </Box>

      {/* Main Search Bar */}
      <Box mb={8}>
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search jobs by title, company, or keywords..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            bg={bgColor}
            _focus={{
              borderColor: 'blue.400',
              boxShadow: '0 0 0 1px blue.400',
            }}
          />
        </InputGroup>
      </Box>

      {/* Content Grid */}
      <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={8}>
        {/* Filters Panel */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            p={6}
            bg={filterBg}
            borderRadius="xl"
            position="sticky"
            top="20px"
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md">Filters</Heading>
              {activeFiltersCount > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              )}
            </Flex>

            <VStack spacing={6} align="stretch">
              <FilterSection title="Location">
                <RadioGroup
                  value={filters.location}
                  onChange={(value) => setFilters({ ...filters, location: value })}
                >
                  <VStack align="stretch" spacing={3}>
                    <Radio value="Remote">Remote</Radio>
                    <Radio value="On-site">On-site</Radio>
                    <Radio value="Hybrid">Hybrid</Radio>
                  </VStack>
                </RadioGroup>
              </FilterSection>

              <FilterSection title="Job Type">
                <VStack align="stretch" spacing={3}>
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                    <Checkbox
                      key={type}
                      isChecked={filters.type.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    >
                      {type}
                    </Checkbox>
                  ))}
                </VStack>
              </FilterSection>

              <FilterSection title="Experience Level">
                <RadioGroup
                  value={filters.experience_level}
                  onChange={(value) => setFilters({ ...filters, experience_level: value })}
                >
                  <VStack align="stretch" spacing={3}>
                    <Radio value="Fresher">Fresher (0-2 years)</Radio>
                    <Radio value="Junior">Junior (2-4 years)</Radio>
                    <Radio value="Mid-Level">Mid-Level (4-6 years)</Radio>
                    <Radio value="Senior">Senior (6-10 years)</Radio>
                    <Radio value="Lead">Lead (10+ years)</Radio>
                  </VStack>
                </RadioGroup>
              </FilterSection>

              <FilterSection title="Salary Range">
                <Box px={2}>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm">{filters.salary_range[0]} LPA</Text>
                    <Text fontSize="sm">{filters.salary_range[1]} LPA</Text>
                  </Flex>
                  <RangeSlider
                    aria-label={['min', 'max']}
                    value={filters.salary_range}
                    min={0}
                    max={100}
                    step={5}
                    onChange={(val) => setFilters({ ...filters, salary_range: val })}
                    onMouseEnter={() => setShowSalaryTooltip(true)}
                    onMouseLeave={() => setShowSalaryTooltip(false)}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <Tooltip
                      isOpen={showSalaryTooltip}
                      label={`${filters.salary_range[0]} LPA`}
                      placement="top"
                    >
                      <RangeSliderThumb index={0} />
                    </Tooltip>
                    <Tooltip
                      isOpen={showSalaryTooltip}
                      label={`${filters.salary_range[1]} LPA`}
                      placement="top"
                    >
                      <RangeSliderThumb index={1} />
                    </Tooltip>
                  </RangeSlider>
                </Box>
              </FilterSection>
            </VStack>
          </Box>
        </MotionBox>

        {/* Jobs List */}
        <Box>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="md">
              {filteredJobs.length} Jobs Found
            </Heading>
            {/* Active Filters */}
            <HStack spacing={2} flexWrap="wrap">
              {filters.location && (
                <Tag size="md" borderRadius="full" variant="subtle" colorScheme="blue">
                  <TagLabel>{filters.location}</TagLabel>
                  <TagCloseButton onClick={() => setFilters({ ...filters, location: '' })} />
                </Tag>
              )}
              {filters.type.map(type => (
                <Tag key={type} size="md" borderRadius="full" variant="subtle" colorScheme="green">
                  <TagLabel>{type}</TagLabel>
                  <TagCloseButton onClick={() => handleTypeChange(type)} />
                </Tag>
              ))}
              {filters.experience_level && (
                <Tag size="md" borderRadius="full" variant="subtle" colorScheme="purple">
                  <TagLabel>{filters.experience_level}</TagLabel>
                  <TagCloseButton onClick={() => setFilters({ ...filters, experience_level: '' })} />
                </Tag>
              )}
            </HStack>
          </Flex>

          <Stack spacing={4}>
            {loading ? (
              <Text textAlign="center">Loading jobs...</Text>
            ) : filteredJobs.length === 0 ? (
              <Box textAlign="center" py={8}>
                <Text fontSize="lg">No jobs found matching your criteria</Text>
                <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <AnimatePresence>
                {filteredJobs.map((job, index) => (
                  <MotionBox
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <JobCard job={job} />
                  </MotionBox>
                ))}
              </AnimatePresence>
            )}
          </Stack>
        </Box>
      </Grid>
    </Container>
  );
};

export default Home;
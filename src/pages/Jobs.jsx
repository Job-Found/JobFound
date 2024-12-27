import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Input,
  Select,
  Stack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import JobCard from '../components/JobCard';

const MotionBox = motion(Box);

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      let query = supabase.from('jobs').select('*').order('posted_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }
      if (locationFilter) {
        query = query.eq('location', locationFilter);
      }
      if (typeFilter) {
        query = query.eq('type', typeFilter);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setJobs(data);
    } catch (error) {
      toast({
        title: 'Error fetching jobs',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, locationFilter, typeFilter]);

  return (
    <Container maxW="container.xl" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack spacing={8}>
          <Box textAlign="center">
            <Heading>Available Jobs</Heading>
            <Text mt={2} color="gray.600">
              Find your dream job from our curated list of opportunities
            </Text>
          </Box>

          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              placeholder="Filter by location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </Select>
            <Select
              placeholder="Filter by type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </Select>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </SimpleGrid>
        </Stack>
      </MotionBox>
    </Container>
  );
};

export default Jobs;

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Text,
  Flex,
  useColorModeValue,
  Icon,
  Badge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import JobCard from '../components/JobCard';
import { supabase } from '../lib/supabase';
import ApplicationsManagement from '../components/ApplicationsManagement';
import BlogPostsManagement from '../components/BlogPostsManagement';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingJob, setEditingJob] = useState(null);
  const toast = useToast();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const cancelRef = React.useRef();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

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

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setJobs(jobs.filter(job => job.id !== id));
      toast({
        title: 'Success!',
        description: 'Job post deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onDeleteClick = (id) => {
    setJobToDelete(id);
    setIsDeleteAlertOpen(true);
  };

  const onDeleteConfirm = async () => {
    if (jobToDelete) {
      await handleDelete(jobToDelete);
      setIsDeleteAlertOpen(false);
      setJobToDelete(null);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setValue('title', job.title);
    setValue('company', job.company);
    setValue('location', job.location);
    setValue('type', job.type);
    setValue('experience_level', job.experience_level);
    setValue('salary_min', job.salary_min);
    setValue('salary_max', job.salary_max);
    setValue('description', job.description);
    setValue('apply_url', job.apply_url);
    onOpen();
  };

  const onSubmit = async (data) => {
    try {
      const updatedJob = {
        title: data.title.trim(),
        company: data.company.trim(),
        location: data.location,
        type: data.type,
        experience_level: data.experience_level,
        salary_min: parseFloat(data.salary_min) || null,
        salary_max: parseFloat(data.salary_max) || null,
        description: data.description.trim(),
        apply_url: data.apply_url.trim()
      };

      console.log('Updating job with data:', updatedJob);

      const { error } = await supabase
        .from('jobs')
        .update(updatedJob)
        .eq('id', editingJob.id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: 'Success!',
        description: 'Job updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onClose();
      fetchJobs();
      reset();
      setEditingJob(null);
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: 'Error updating job',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Stack
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mb={8}
        justify="space-between"
        align="center"
      >
        <Box>
          <Heading color={headingColor} size="lg" mb={2}>
            Admin Dashboard
          </Heading>
          <Text color={textColor}>
            Manage all job postings from one place
          </Text>
        </Box>
        <Badge
          colorScheme="blue"
          p={2}
          borderRadius="md"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Icon as={AddIcon} />
          {jobs.length} Active Jobs
        </Badge>
      </Stack>

      <Tabs>
        <TabList>
          <Tab>Jobs</Tab>
          <Tab>Applications</Tab>
          <Tab>Blog Posts</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing={4}>
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="sm"
                  border="1px solid"
                  borderColor={borderColor}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'md',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <JobCard
                    job={job}
                    isAdmin={true}
                    onEdit={handleEdit}
                    onDelete={onDeleteClick}
                  />
                </motion.div>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel>
            <ApplicationsManagement />
          </TabPanel>
          <TabPanel>
            <BlogPostsManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ModalHeader
            bg={useColorModeValue('blue.500', 'blue.400')}
            color="white"
            borderTopRadius="xl"
          >
            <Flex align="center" gap={2}>
              <Icon as={AddIcon} />
              Edit Job Post
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                {/* Basic Information */}
                <Stack spacing={4}>
                  <Flex align="center" gap={2}>
                    <Icon as={AddIcon} color="blue.500" />
                    <Text fontSize="lg" fontWeight="bold">Basic Information</Text>
                  </Flex>
                  <FormControl isRequired>
                    <FormLabel>Job Title</FormLabel>
                    <Input 
                      {...register('title')} 
                      placeholder="e.g., Senior Software Engineer"
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px blue.400'
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Company Name</FormLabel>
                    <Input 
                      {...register('company')} 
                      placeholder="Your company name"
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px blue.400'
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Select 
                      {...register('location')}
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px blue.400'
                      }}
                    >
                      <option value="" disabled>Select location type</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Job Type</FormLabel>
                    <Select 
                      {...register('type')}
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px blue.400'
                      }}
                    >
                      <option value="" disabled>Select job type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </Select>
                  </FormControl>
                </Stack>

                <Divider />

                {/* Experience and Salary */}
                <Stack spacing={4}>
                  <Text fontSize="lg" fontWeight="bold">Experience & Compensation</Text>
                  <FormControl isRequired>
                    <FormLabel>Experience Level</FormLabel>
                    <Select 
                      {...register('experience_level')}
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px blue.400'
                      }}
                    >
                      <option value="" disabled>Select experience level</option>
                      <option value="Fresher">Fresher (0-2 years)</option>
                      <option value="Junior">Junior (2-4 years)</option>
                      <option value="Mid-Level">Mid-Level (4-6 years)</option>
                      <option value="Senior">Senior (6-10 years)</option>
                      <option value="Lead">Lead (10+ years)</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Salary Range (LPA)</FormLabel>
                    <Flex gap={4}>
                      <Input
                        {...register('salary_min', {
                          pattern: {
                            value: /^\d*\.?\d*$/,
                            message: 'Please enter a valid number'
                          }
                        })}
                        placeholder="Min"
                        type="number"
                        step="0.1"
                        _focus={{
                          borderColor: 'blue.400',
                          boxShadow: '0 0 0 1px blue.400'
                        }}
                      />
                      <Text alignSelf="center">to</Text>
                      <Input
                        {...register('salary_max', {
                          pattern: {
                            value: /^\d*\.?\d*$/,
                            message: 'Please enter a valid number'
                          }
                        })}
                        placeholder="Max"
                        type="number"
                        step="0.1"
                        _focus={{
                          borderColor: 'blue.400',
                          boxShadow: '0 0 0 1px blue.400'
                        }}
                      />
                    </Flex>
                    {errors?.salary_min && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.salary_min.message}
                      </Text>
                    )}
                    {errors?.salary_max && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.salary_max.message}
                      </Text>
                    )}
                  </FormControl>
                </Stack>

                <Divider />

                {/* Job Description */}
                <Stack spacing={4}>
                  <Text fontSize="lg" fontWeight="bold">Job Details</Text>
                  <FormControl isRequired>
                    <FormLabel>Job Description</FormLabel>
                    <Textarea
                      {...register('description')}
                      placeholder="Include information about job responsibilities, requirements, qualifications, and any other relevant details."
                      rows={8}
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px blue.400'
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Application URL</FormLabel>
                    <Input
                      {...register('apply_url')}
                      type="url"
                      placeholder="https://..."
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px blue.400'
                      }}
                    />
                  </FormControl>
                </Stack>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Update Job Post
                </Button>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal 
        isOpen={isDeleteAlertOpen} 
        onClose={() => setIsDeleteAlertOpen(false)} 
        size="xs"
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ModalHeader fontSize="lg" fontWeight="bold">
            Delete Job Post
          </ModalHeader>

          <ModalBody>
            Are you sure you want to delete this job post? This action cannot be undone.
          </ModalBody>

          <ModalFooter>
            <Button ref={cancelRef} onClick={() => setIsDeleteAlertOpen(false)}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={onDeleteConfirm}
              ml={3}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'md',
              }}
              transition="all 0.2s"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;

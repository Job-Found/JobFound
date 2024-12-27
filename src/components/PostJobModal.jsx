import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Stack,
  useToast,
  InputGroup,
  InputRightAddon,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const PostJobModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const toast = useToast();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      const jobData = {
        title: data.title.trim(),
        company: data.company.trim(),
        location: data.location,
        type: data.type,
        experience_level: data.experience_level,
        salary_min: parseFloat(data.salary_min) || null,
        salary_max: parseFloat(data.salary_max) || null,
        description: data.description.trim(),
        apply_url: data.apply_url.trim(),
        posted_by: user.id,
        posted_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) throw error;

      toast({
        title: 'Job posted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Error posting job:', error);
      toast({
        title: 'Error posting job',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post a New Job</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              {/* Basic Information */}
              <Stack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">Basic Information</Text>
                <FormControl isRequired>
                  <FormLabel>Job Title</FormLabel>
                  <Input 
                    {...register('title')} 
                    placeholder="e.g., Senior Software Engineer"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input 
                    {...register('company')} 
                    placeholder="Your company name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Location</FormLabel>
                  <Select {...register('location')} defaultValue="">
                    <option value="" disabled>Select location type</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Job Type</FormLabel>
                  <Select {...register('type')} defaultValue="">
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
                  <Select {...register('experience_level')} defaultValue="">
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
                    <InputGroup>
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
                      />
                      <InputRightAddon children="LPA" />
                    </InputGroup>
                    <Text alignSelf="center">to</Text>
                    <InputGroup>
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
                      />
                      <InputRightAddon children="LPA" />
                    </InputGroup>
                  </Flex>
                  {errors.salary_min && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.salary_min.message}
                    </Text>
                  )}
                  {errors.salary_max && (
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
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Application Link</FormLabel>
                  <Input
                    {...register('apply_url')}
                    placeholder="Application URL or email address"
                  />
                </FormControl>
              </Stack>

              <Button type="submit" colorScheme="blue" size="lg" w="100%" mt={4}>
                Post Job
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostJobModal;

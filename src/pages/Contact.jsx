import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  useToast,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInfo = ({ icon, title, content }) => {
  return (
    <Stack
      direction="row"
      spacing={4}
      align="center"
      p={6}
      borderRadius="lg"
      bg={useColorModeValue('white', 'gray.800')}
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Icon as={icon} w={6} h={6} color="blue.400" />
      <Stack spacing={1}>
        <Text fontWeight={600}>{title}</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>{content}</Text>
      </Stack>
    </Stack>
  );
};

const Contact = () => {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box py={12}>
      <Container maxW="container.xl">
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading size="2xl">Contact Us</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Have questions? We're here to help.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <ContactInfo
              icon={FaEnvelope}
              title="Email"
              content="support@jobfound.com"
            />
            <ContactInfo
              icon={FaPhone}
              title="Phone"
              content="+1 (555) 123-4567"
            />
            <ContactInfo
              icon={FaMapMarkerAlt}
              title="Location"
              content="New York, NY 10001"
            />
          </SimpleGrid>

          <Box
            p={8}
            borderRadius="lg"
            bg={useColorModeValue('white', 'gray.800')}
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={6}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Your name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="your@email.com" />
                  </FormControl>
                </SimpleGrid>
                <FormControl isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input placeholder="How can we help?" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea placeholder="Your message" rows={6} />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w={{ base: 'full', md: 'auto' }}
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;

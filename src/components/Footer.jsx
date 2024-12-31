import React from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.400');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="footer"
      bg={bgColor}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={borderColor}
      width="100%"
      mt="auto"
    >
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <SimpleGrid
          templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }}
          spacing={8}
        >
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Company</Text>
            <Link as={RouterLink} to="/about" color={linkColor} _hover={{ color: linkHoverColor }}>About Us</Link>
            <Link as={RouterLink} to="/contact" color={linkColor} _hover={{ color: linkHoverColor }}>Contact</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Support</Text>
            <Link as={RouterLink} to="/contact" color={linkColor} _hover={{ color: linkHoverColor }}>Help Center</Link>
            <Link as={RouterLink} to="/terms" color={linkColor} _hover={{ color: linkHoverColor }}>Terms of Service</Link>
            <Link as={RouterLink} to="/privacy" color={linkColor} _hover={{ color: linkHoverColor }}>Privacy Policy</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Job Seekers</Text>
            <Link as={RouterLink} to="/" color={linkColor} _hover={{ color: linkHoverColor }}>Browse Jobs</Link>
            <Link as={RouterLink} to="/" color={linkColor} _hover={{ color: linkHoverColor }}>Companies</Link>
          </Stack>
        </SimpleGrid>

        <Divider my={6} borderColor={borderColor} />

        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          &copy; {new Date().getFullYear()} Job Found. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const Privacy = () => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box py={12}>
      <Container maxW="container.lg">
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Heading size="2xl">Privacy Policy</Heading>
            <Text fontSize="lg" color={textColor}>
              Welcome to jobfound-d2z.pages.dev, your trusted platform for exploring job opportunities. We value your trust and are committed to ensuring the privacy and security of your information when you visit our website. This Privacy Policy outlines our practices regarding any information you may interact with on our site. We strive to create a safe and secure environment for our users, where you can explore job listings and career-related content with confidence.
            </Text>
          </Stack>

          <Stack
            spacing={6}
            p={8}
            borderRadius="lg"
            bg={sectionBg}
            border="1px"
            borderColor={borderColor}
          >
            <Stack spacing={4}>
              <Heading size="md">Our Commitment to Privacy</Heading>
              <Text color={textColor}>
                At jobfound-d2z.pages.dev, we believe in transparency and respect for our users' privacy. We aim to provide a seamless experience without compromising your personal information. We do not collect or store any personal data from our users. Our focus is on delivering valuable content and services without requiring you to provide personal details.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">User Experience</Heading>
              <Text color={textColor}>
                We design our platform to be user-friendly and accessible, ensuring you can navigate through our content without any concerns about privacy. We provide a wide range of job listings, career advice, and other resources to help you on your career journey. Our goal is to make your experience on jobfound-d2z.pages.dev enjoyable and informative.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">Advertisements and Third-Party Content</Heading>
              <Text color={textColor}>
                jobfound-d2z.pages.dev may display advertisements from third-party providers. These ads are tailored to match the general content of our site and do not rely on personal information. We partner with reputable advertising networks that adhere to privacy standards. We encourage you to review the privacy policies of any third-party websites or services linked through our site, as we are not responsible for their practices.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">Changes to the Privacy Policy</Heading>
              <Text color={textColor}>
                As we continue to improve our services and comply with regulations, we may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review this policy periodically. Your continued use of our website following any changes indicates your acceptance of the updated terms.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">Contact Us</Heading>
              <Text color={textColor}>
                If you have any questions or concerns about this Privacy Policy, please do not hesitate to contact us. We are here to ensure that your experience on jobfound-d2z.pages.dev is as smooth and worry-free as possible. You can reach us at jobfound8244@gmail.com .
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Privacy;
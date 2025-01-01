import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const Terms = () => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box py={12}>
      <Container maxW="container.lg">
        <Stack spacing={10}>
          <Stack spacing={4}>
            <Heading size="2xl">Terms of Service</Heading>
            <Text fontSize="lg" color={textColor}>
              Welcome to jobfound-d2z.pages.dev. By using our website, you agree to these Terms of Service. If you do not agree, please do not use our site. These terms are simple and straightforward, reflecting our general approach to providing job-related information.
            </Text>
          </Stack>

          <Stack
            spacing={8}
            p={8}
            borderRadius="lg"
            bg={sectionBg}
            border="1px"
            borderColor={borderColor}
          >
            <Stack spacing={4}>
              <Heading size="md">Use of the Website</Heading>
              <Text color={textColor}>
                Our website provides job listings and related content. We do our best to ensure the accuracy of the information provided, but we do not guarantee that all information will be completely up-to-date or error-free. You are free to use the information at your own discretion, but please verify details independently if needed.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">No Guarantees</Heading>
              <Text color={textColor}>
                We do not guarantee that any job opportunities listed on our site will lead to employment. The job listings are provided for informational purposes, and we do not endorse any particular employer or job listing. Additionally, we cannot guarantee that all links will work or that the site will be available at all times.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">Image Use Disclaimer</Heading>
              <Text color={textColor}>
                At jobfound-d2z.pages.dev, we strive to provide accurate and comprehensive information regarding job openings. To enhance our listings, we may use images of company office buildings and other related visuals sourced from online platforms, including Google Images. These images are used purely for illustrative purposes to help users identify the companies. We do not claim ownership of any images used on this site unless otherwise stated. All images belong to their respective owners. If you are the owner of an image and believe it has been used inappropriately or without proper permission, please contact us at jobfound8244@gmail.com. We will promptly remove or properly attribute the image upon request.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">User Responsibility</Heading>
              <Text color={textColor}>
                As a user, you are responsible for your actions while using our site. Please use common sense and caution, especially when sharing personal information or engaging with third parties. We are not responsible for any issues or disputes that may arise from interactions with employers or other users of the site.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">External Links</Heading>
              <Text color={textColor}>
                Our site may contain links to other websites. We provide these links for convenience and do not take responsibility for the content, accuracy, or reliability of any external websites. Visiting these external sites is at your own risk.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">Changes to the Terms</Heading>
              <Text color={textColor}>
                We may update these Terms of Service from time to time. If we make changes, we will update this page, and the changes will be effective immediately upon posting. It's a good idea to review these terms periodically to stay informed.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <Heading size="md">Contact Information</Heading>
              <Text color={textColor}>
                If you have any questions or concerns about these Terms of Service, please feel free to contact us at jobfound8244@gmail.com. We're here to help and ensure you have a positive experience on jobfound-d2z.pages.dev.
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Terms;
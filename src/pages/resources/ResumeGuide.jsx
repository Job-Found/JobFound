import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  UnorderedList,
  ListItem,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';

const ResumeGuide = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box py={12}>
      <Container maxW="container.lg">
        <Stack spacing={10}>
          {/* Header Section */}
          <Stack spacing={4} textAlign="center">
            <Heading size="2xl" color="teal.500">Resume Guide: A Step-by-Step Approach to Landing Your Dream Job</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Creating a resume is the first step toward landing your dream job. Follow these essential steps to craft a standout resume.
            </Text>
          </Stack>

          {/* Content Section */}
          <Stack
            spacing={8}
            p={8}
            borderRadius="lg"
            bg={bgColor}
            border="1px"
            borderColor={borderColor}
            boxShadow="lg"
          >
            {/* Step 1 */}
            <Stack spacing={6}>
              <Heading size="lg" color="teal.200">Steps to Create an Effective Resume</Heading>

              <Stack spacing={4}>
                <Heading size="md">Step 1: Gather All Relevant Information</Heading>
                <UnorderedList spacing={2} pl={4} fontSize="lg">
                  <ListItem>Education: Include school and college information along with grades.</ListItem>
                  <ListItem>Experience: List all relevant work experiences, internships, and freelance projects.</ListItem>
                  <ListItem>Skills: Highlight both technical and soft skills.</ListItem>
                  <ListItem>Certifications and Courses: Mention any professional certifications or completed courses.</ListItem>
                  <ListItem>Projects: Showcase your best and most impactful projects.</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              {/* Step 2 */}
              <Stack spacing={4}>
                <Heading size="md">Step 2: Choose the Right Format</Heading>
                <UnorderedList spacing={2} pl={4} fontSize="lg">
                  <ListItem>Use a professional resume format that is widely accepted in the IT industry.</ListItem>
                  <ListItem>Ensure it is clean, easy to read, and well-organized.</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              {/* Step 3 */}
              <Stack spacing={4}>
                <Heading size="md">Step 3: Add Key Personal Details</Heading>
                <UnorderedList spacing={2} pl={4} fontSize="lg">
                  <ListItem>Include your full name and contact information (phone number, email).</ListItem>
                  <ListItem>Add links to your GitHub, LinkedIn, or personal portfolio.</ListItem>
                  <ListItem>Write a brief resume summary that highlights your key achievements and career goals.</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              {/* Step 4 */}
              <Stack spacing={4}>
                <Heading size="md">Step 4: Focus on Experience and Projects</Heading>
                <UnorderedList spacing={2} pl={4} fontSize="lg">
                  <ListItem>List your work experience in bullet points to make it easy to skim.</ListItem>
                  <ListItem>Include 2-3 impactful projects with brief descriptions and key outcomes.</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              {/* Step 5 */}
              <Stack spacing={4}>
                <Heading size="md">Step 5: Highlight Skills and Education</Heading>
                <UnorderedList spacing={2} pl={4} fontSize="lg">
                  <ListItem>Clearly mention your tech stack and other relevant technical skills.</ListItem>
                  <ListItem>Add your education details, including degrees, institutions, and graduation dates.</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              {/* Step 6 */}
              <Stack spacing={4}>
                <Heading size="md">Step 6: Showcase Certifications</Heading>
                <UnorderedList spacing={2} pl={4} fontSize="lg">
                  <ListItem>Include certifications or coursework relevant to the job you are applying for.</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              {/* Step 7 */}
              <Stack spacing={4}>
                <Heading size="md">Step 7: Save in the Right Format</Heading>
                <UnorderedList spacing={2} pl={4} fontSize="lg">
                  <ListItem>Save your resume in .docx or .pdf formats for professional use. Avoid formats like .png or .jpeg.</ListItem>
                  <ListItem>Use a professional and descriptive file name, e.g., JohnDoe_IT_Resume.pdf.</ListItem>
                </UnorderedList>
              </Stack>

              <Divider />

              {/* Tips Section */}
              <Stack spacing={4}>
                <Heading size="lg" color="teal.200">Important Tips for an Outstanding Resume</Heading>
                <UnorderedList spacing={2} pl={4} fontSize="lg">
                  <ListItem>Structure the information neatly and logically.</ListItem>
                  <ListItem>Customize your resume for each company or job role.</ListItem>
                  <ListItem>Keep it concise – aim for 1-2 pages.</ListItem>
                  <ListItem>Proofread for grammatical and formatting errors.</ListItem>
                </UnorderedList>
              </Stack>

              
            </Stack>
            
          </Stack>
          <Text fontSize="lg" fontWeight="bold" spacing={4} textAlign="center" color={useColorModeValue('gray.700', 'gray.300')}>
                By following these steps, you can create a professional, impactful, and job-ready resume. Good luck!
              </Text>
          
        </Stack>
      </Container>
    </Box>
  );
};

export default ResumeGuide;
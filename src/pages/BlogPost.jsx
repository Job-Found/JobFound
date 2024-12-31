import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { FaBookReader, FaLightbulb, FaSearch, FaBriefcase, FaUsers } from 'react-icons/fa';
import { blogPosts } from '../data/blogPosts';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Career Tips':
      return FaLightbulb;
    case 'Interview Guide':
      return FaUsers;
    case 'Job Search':
      return FaSearch;
    case 'Workplace':
      return FaBriefcase;
    default:
      return FaBookReader;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((post) => post.slug === slug);
  const CategoryIcon = post ? getCategoryIcon(post.category) : FaBookReader;

  if (!post) {
    return (
      <Container maxW="container.md" py={12}>
        <Stack spacing={6} align="center">
          <Heading>Post Not Found</Heading>
          <Button
            leftIcon={<ChevronLeftIcon />}
            onClick={() => navigate('/blog')}
            colorScheme="blue"
          >
            Back to Blog
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Box py={12} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.md">
        <Stack spacing={8}>
          <Button
            leftIcon={<ChevronLeftIcon />}
            onClick={() => navigate('/blog')}
            variant="ghost"
            alignSelf="flex-start"
          >
            Back to Blog
          </Button>

          <Stack spacing={6}>
            <Stack direction="row" align="center" spacing={3}>
              <Icon
                as={CategoryIcon}
                w={6}
                h={6}
                color={
                  post.category === 'Career Tips' ? 'blue.400' :
                  post.category === 'Interview Guide' ? 'green.400' :
                  post.category === 'Job Search' ? 'purple.400' :
                  post.category === 'Workplace' ? 'orange.400' :
                  'gray.400'
                }
              />
              <Badge
                colorScheme={
                  post.category === 'Career Tips' ? 'blue' :
                  post.category === 'Interview Guide' ? 'green' :
                  post.category === 'Job Search' ? 'purple' :
                  post.category === 'Workplace' ? 'orange' :
                  'gray'
                }
                fontSize="md"
                px={3}
                py={1}
              >
                {post.category}
              </Badge>
            </Stack>

            <Heading size="2xl">{post.title}</Heading>

            <Stack direction="row" spacing={4} color={useColorModeValue('gray.600', 'gray.400')}>
              <Text>{post.date}</Text>
              <Text>•</Text>
              <Stack direction="row" align="center" spacing={1}>
                <Icon as={FaBookReader} w={4} h={4} />
                <Text>{post.readTime} min read</Text>
              </Stack>
            </Stack>
          </Stack>

          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={8}
            borderRadius="lg"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <Stack spacing={6}>
              <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
                {post.excerpt}
              </Text>
              {/* Add full blog content here */}
              <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default BlogPost;

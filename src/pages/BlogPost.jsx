import React, { useState, useEffect } from 'react';
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
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
  Divider,
  Image,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, TimeIcon } from '@chakra-ui/icons';
import { FaBookReader, FaLightbulb, FaSearch, FaBriefcase, FaUsers, FaCalendarAlt, FaShareAlt } from 'react-icons/fa';
import { fetchBlogPost } from '../lib/supabase';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

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
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    loadBlogPost();
  }, [slug]);

  const loadBlogPost = async () => {
    try {
      const data = await fetchBlogPost(slug);
      setPost(data);
      setError(null);
    } catch (err) {
      console.error('Error loading blog post:', err);
      setError('Failed to load the blog post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxW="container.md" py={12}>
        <Stack spacing={6} align="center">
          <Spinner size="xl" />
          <Text color={mutedColor}>Loading article...</Text>
        </Stack>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container maxW="container.md" py={12}>
        <Stack spacing={6} align="center">
          {error ? (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          ) : (
            <VStack spacing={4}>
              <Heading>Post Not Found</Heading>
              <Text color={mutedColor}>The article you're looking for doesn't exist or has been removed.</Text>
            </VStack>
          )}
          <Button
            leftIcon={<ChevronLeftIcon />}
            onClick={() => navigate('/blog')}
            colorScheme="blue"
            size="lg"
          >
            Back to Blog
          </Button>
        </Stack>
      </Container>
    );
  }

  const CategoryIcon = getCategoryIcon(post.category);

  return (
    <Box py={12} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.md">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack spacing={8}>
            <Button
              leftIcon={<ChevronLeftIcon />}
              onClick={() => navigate('/blog')}
              variant="ghost"
              alignSelf="flex-start"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            >
              Back to Blog
            </Button>

            <Stack spacing={6}>
              <HStack spacing={3}>
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
                  borderRadius="full"
                >
                  {post.category}
                </Badge>
              </HStack>

              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
                lineHeight="1.2"
              >
                {post.title}
              </Heading>

              <HStack 
                spacing={4} 
                color={mutedColor}
                flexWrap={isMobile ? 'wrap' : 'nowrap'}
              >
                <HStack spacing={2}>
                  <Icon as={FaCalendarAlt} w={4} h={4} />
                  <Text>{post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : ''}</Text>
                </HStack>
                {!isMobile && <Text>•</Text>}
                <HStack spacing={2}>
                  <Icon as={TimeIcon} w={4} h={4} />
                  <Text>{post.read_time || '5'} min read</Text>
                </HStack>
                {!isMobile && <Text>•</Text>}
                <Button
                  leftIcon={<Icon as={FaShareAlt} />}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  Share
                </Button>
              </HStack>
            </Stack>

            <Box
              bg={bgColor}
              p={{ base: 4, md: 8 }}
              borderRadius="xl"
              border="1px"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <VStack spacing={8} align="stretch">
                <Text
                  fontSize="xl"
                  fontStyle="italic"
                  color={mutedColor}
                  borderLeft="4px"
                  borderColor="blue.400"
                  pl={4}
                >
                  {post.excerpt}
                </Text>

                <Divider />

                <Box
                  className="blog-content"
                  fontSize="lg"
                  color={textColor}
                  lineHeight="tall"
                  sx={{
                    'p': {
                      mb: 4,
                    },
                    'h2': {
                      fontSize: '2xl',
                      fontWeight: 'bold',
                      mt: 8,
                      mb: 4,
                    },
                    'h3': {
                      fontSize: 'xl',
                      fontWeight: 'bold',
                      mt: 6,
                      mb: 3,
                    },
                    'ul, ol': {
                      pl: 6,
                      mb: 4,
                    },
                    'li': {
                      mb: 2,
                    },
                    'blockquote': {
                      borderLeft: '4px',
                      borderColor: 'blue.400',
                      pl: 4,
                      py: 2,
                      my: 4,
                      fontStyle: 'italic',
                    }
                  }}
                >
                  {post.content}
                </Box>
              </VStack>
            </Box>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default BlogPost;

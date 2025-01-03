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

  useEffect(() => {
    if (!slug) {
      setError('Invalid URL');
      setLoading(false);
      return;
    }

    const getPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Convert slug back to title
        const title = slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const data = await fetchBlogPost(title);
        if (data) {
          setPost(data);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Ignore share errors
      }
    }
  };

  if (loading) {
    return (
      <Container maxW="container.md" py={10}>
        <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
          <Spinner size="xl" />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={() => navigate('/blog')}
          variant="ghost"
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert status="info" mb={4}>
          <AlertIcon />
          Post not found
        </Alert>
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={() => navigate('/blog')}
          variant="ghost"
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

  const CategoryIcon = getCategoryIcon(post.category);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.md" py={10}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          mb={8}
          onClick={() => navigate('/blog')}
          variant="ghost"
        >
          Back to Blog
        </Button>

        <VStack spacing={6} align="stretch">
          <Stack spacing={4}>
            <HStack>
              <Badge colorScheme="blue" display="flex" alignItems="center" px={3} py={1}>
                <Icon as={CategoryIcon} mr={2} />
                {post.category}
              </Badge>
              <HStack spacing={2} color="gray.500">
                <Icon as={FaCalendarAlt} />
                <Text fontSize="sm">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </HStack>
              <HStack spacing={2} color="gray.500">
                <TimeIcon />
                <Text fontSize="sm">{post.read_time} min read</Text>
              </HStack>
            </HStack>

            <Heading as="h1" size="2xl" bgGradient="linear(to-r, blue.400, blue.600)" bgClip="text">
              {post.title}
            </Heading>

            <Text fontSize="lg" fontStyle="italic" color="gray.500" borderLeft="4px" borderColor="blue.400" pl={4}>
              {post.excerpt}
            </Text>
          </Stack>

          <Divider />

          {post.image && (
            <Box borderRadius="lg" overflow="hidden" mb={6}>
              <Image src={post.image} alt={post.title} width="100%" />
            </Box>
          )}

          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
            boxShadow="sm"
          >
            <Text whiteSpace="pre-wrap" fontSize="lg" lineHeight="tall">
              {post.content}
            </Text>
          </Box>

          {!isMobile && navigator.share && (
            <Button
              leftIcon={<FaShareAlt />}
              onClick={handleShare}
              colorScheme="blue"
              variant="outline"
              alignSelf="flex-end"
            >
              Share
            </Button>
          )}
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default BlogPost;

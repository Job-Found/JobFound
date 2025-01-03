import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  HStack,
  Badge,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaBookReader, FaLightbulb, FaSearch, FaBriefcase, FaUsers } from 'react-icons/fa';
import { fetchBlogPosts } from '../lib/supabase';
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

// Create a URL-safe slug
const createUrlSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')    // Remove all special characters
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Replace multiple hyphens with single hyphen
    .trim()                         // Remove leading/trailing spaces
    .replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
};

const categories = ['Career Tips', 'Interview Guide', 'Job Search', 'Workplace'];

const Blog = () => {
  // All hooks must be called at the top level
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Color mode hooks
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('gray.500', 'gray.400');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
          <Spinner size="xl" />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={10}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Stack spacing={8}>
        <Box textAlign="center">
          <Heading 
            as="h1" 
            size="2xl"
            bgGradient="linear(to-r, blue.400, blue.600)"
            bgClip="text"
            mb={4}
          >
            Career Blog
          </Heading>
          <Text fontSize="xl" color={textColor}>
            Insights and tips to help you succeed in your career journey
          </Text>
        </Box>

        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Select
            placeholder="All Categories"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredPosts.map(post => {
            const urlSlug = createUrlSlug(post.title);
            return (
              <LinkBox
                key={post.id}
                as="article"
                _hover={{ transform: 'translateY(-4px)', transition: 'transform 0.2s' }}
              >
                <Box
                  p={6}
                  bg={bgColor}
                  borderRadius="lg"
                  border="1px"
                  borderColor={borderColor}
                  boxShadow="sm"
                  h="100%"
                >
                  <Stack spacing={4}>
                    <HStack>
                      <Badge colorScheme="blue" display="flex" alignItems="center">
                        <Icon as={getCategoryIcon(post.category)} mr={2} />
                        {post.category}
                      </Badge>
                      <Text fontSize="sm" color={textColor}>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </HStack>

                    <LinkOverlay as={RouterLink} to={`/blog/${urlSlug}`}>
                      <Heading as="h3" size="md" color={headingColor}>
                        {post.title}
                      </Heading>
                    </LinkOverlay>

                    <Text color={textColor} noOfLines={3}>
                      {post.excerpt}
                    </Text>

                    <Text
                      color="blue.500"
                      fontWeight="medium"
                      fontSize="sm"
                    >
                      Read More →
                    </Text>
                  </Stack>
                </Box>
              </LinkBox>
            );
          })}
        </SimpleGrid>

        {filteredPosts.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color={textColor}>
              No articles found matching your criteria
            </Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default Blog;

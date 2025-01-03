import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Heading,
  Text,
  Select,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import BlogCard from '../components/BlogCard';
import { fetchBlogPosts } from '../lib/supabase';

// Create a URL-safe slug
const createUrlSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
    .trim();                      // Remove leading/trailing spaces
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const data = await fetchBlogPosts();
      setPosts(data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(posts.map(post => post.category))];

  return (
    <Box py={12} bg={bgColor}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <Stack spacing={4}>
            <Heading size="2xl" textAlign="center">
              Career Insights & Job Search Tips
            </Heading>
            <Text fontSize="lg" textAlign="center" color={textColor}>
              Expert advice to help you navigate your career journey
            </Text>
          </Stack>

          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={useColorModeValue('white', 'gray.800')}
              />
            </InputGroup>

            <Select
              placeholder="All Categories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              bg={useColorModeValue('white', 'gray.800')}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Stack>

          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {loading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {filteredPosts.map(post => {
                const urlSlug = createUrlSlug(post.title);

                return (
                  <RouterLink to={`/blog/${urlSlug}`} key={post.id}>
                    <BlogCard post={post} />
                  </RouterLink>
                );
              })}
            </SimpleGrid>
          )}

          {!loading && filteredPosts.length === 0 && (
            <Box textAlign="center" py={8}>
              <Text fontSize="lg" color={textColor}>
                No articles found matching your criteria.
              </Text>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Blog;

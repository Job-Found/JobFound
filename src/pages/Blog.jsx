import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';
import { useState } from 'react';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box py={12} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <Stack spacing={4} align="center" textAlign="center">
            <Heading size="2xl">Career Blog</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
              Expert insights, tips, and guidance to help you succeed in your career journey
            </Text>
          </Stack>

          <InputGroup maxW="600px" mx="auto">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={useColorModeValue('white', 'gray.800')}
              border="1px"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              _hover={{
                borderColor: useColorModeValue('gray.300', 'gray.600'),
              }}
              _focus={{
                borderColor: 'blue.500',
                boxShadow: 'outline',
              }}
            />
          </InputGroup>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Blog;

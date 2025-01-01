import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Badge,
  Text,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../lib/supabase';

const BlogPostsManagement = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast({
        title: 'Error loading posts',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddClick = () => {
    setSelectedPost(null);
    onOpen();
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  const handleDeleteClick = async (post) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlogPost(post.id);
        toast({
          title: 'Post deleted',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        toast({
          title: 'Error deleting post',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const postData = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      read_time: parseInt(formData.get('read_time')),
    };

    try {
      if (selectedPost) {
        await updateBlogPost(selectedPost.id, postData);
        toast({
          title: 'Post updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createBlogPost(postData);
        toast({
          title: 'Post created',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
      loadPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error saving post',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={handleAddClick}
          alignSelf="flex-end"
        >
          Add New Post
        </Button>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Read Time</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post.id}>
                <Td>
                  <Text fontWeight="medium">{post.title}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {post.slug}
                  </Text>
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      post.category === 'Career Tips' ? 'blue' :
                      post.category === 'Interview Guide' ? 'green' :
                      post.category === 'Job Search' ? 'purple' :
                      post.category === 'Workplace' ? 'orange' :
                      'gray'
                    }
                  >
                    {post.category}
                  </Badge>
                </Td>
                <Td>{post.read_time} min</Td>
                <Td>{new Date(post.created_at).toLocaleDateString()}</Td>
                <Td>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      icon={<EditIcon />}
                      onClick={() => handleEditClick(post)}
                      aria-label="Edit post"
                      size="sm"
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(post)}
                      aria-label="Delete post"
                      size="sm"
                      colorScheme="red"
                    />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <ModalHeader>
                {selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      defaultValue={selectedPost?.title}
                      placeholder="Enter post title"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Slug</FormLabel>
                    <Input
                      name="slug"
                      defaultValue={selectedPost?.slug}
                      placeholder="enter-post-slug"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select
                      name="category"
                      defaultValue={selectedPost?.category}
                    >
                      <option value="Career Tips">Career Tips</option>
                      <option value="Interview Guide">Interview Guide</option>
                      <option value="Job Search">Job Search</option>
                      <option value="Workplace">Workplace</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Excerpt</FormLabel>
                    <Textarea
                      name="excerpt"
                      defaultValue={selectedPost?.excerpt}
                      placeholder="Enter a brief excerpt"
                      rows={3}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Content</FormLabel>
                    <Textarea
                      name="content"
                      defaultValue={selectedPost?.content}
                      placeholder="Enter the full blog post content"
                      rows={10}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Read Time (minutes)</FormLabel>
                    <Input
                      name="read_time"
                      type="number"
                      defaultValue={selectedPost?.read_time || 5}
                      min={1}
                    />
                  </FormControl>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  {selectedPost ? 'Update' : 'Create'}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};

export default BlogPostsManagement;

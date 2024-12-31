import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Icon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaBookReader, FaLightbulb, FaSearch, FaBriefcase, FaUsers } from 'react-icons/fa';

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

const BlogCard = ({ post }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const CategoryIcon = getCategoryIcon(post.category);

  return (
    <LinkBox
      as="article"
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: useColorModeValue('blue.300', 'blue.500'),
      }}
      position="relative"
    >
      <Stack p={6} spacing={4}>
        <Stack direction="row" align="center" spacing={2}>
          <Icon
            as={CategoryIcon}
            w={5}
            h={5}
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
          >
            {post.category}
          </Badge>
        </Stack>

        <LinkOverlay as={RouterLink} to={`/blog/${post.slug}`}>
          <Heading size="md" lineHeight="1.4">
            {post.title}
          </Heading>
        </LinkOverlay>

        <Text color={useColorModeValue('gray.600', 'gray.400')} noOfLines={3}>
          {post.excerpt}
        </Text>

        <Stack direction="row" align="center" fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
          <Text>{post.date}</Text>
          <Text>•</Text>
          <Stack direction="row" align="center" spacing={1}>
            <Icon as={FaBookReader} w={4} h={4} />
            <Text>{post.readTime} min read</Text>
          </Stack>
        </Stack>
      </Stack>
    </LinkBox>
  );
};

export default BlogCard;

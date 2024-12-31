import React from 'react';
import {
  Box,
  Flex,
  Button,
  Link as ChakraLink,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Icon,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  FaMoon,
  FaSun,
  FaPlus,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBriefcase,
  FaUserCircle,
} from 'react-icons/fa';
import PostJobModal from './PostJobModal';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);

const NavLink = ({ to, children, isActive }) => {
  const linkColor = useColorModeValue('gray.700', 'gray.300');
  const activeLinkColor = useColorModeValue('blue.600', 'blue.300');
  const hoverBg = useColorModeValue('blue.50', 'gray.700');

  return (
    <ChakraLink
      as={RouterLink}
      to={to}
      position="relative"
      px={4}
      py={2}
      rounded="md"
      color={isActive ? activeLinkColor : linkColor}
      fontWeight={isActive ? "600" : "500"}
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
        color: activeLinkColor,
      }}
      transition="all 0.2s"
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            right: '0',
            height: '2px',
            background: 'currentColor',
            borderRadius: '1px',
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </ChakraLink>
  );
};

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const buttonHoverBg = useColorModeValue('blue.50', 'gray.700');
  const iconColor = useColorModeValue('blue.600', 'blue.300');
  const menuBg = useColorModeValue('white', 'gray.800');
  const menuBorderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <>
      <MotionBox
        as="nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        position="sticky"
        top="0"
        zIndex="sticky"
        backdropFilter="blur(10px)"
        backgroundColor={useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.8)')}
        boxShadow={useColorModeValue('0 2px 10px rgba(0, 0, 0, 0.05)', 'none')}
      >
        <Flex
          maxW="container.xl"
          mx="auto"
          px={6}
          py={4}
          justify="space-between"
          align="center"
        >
          <MotionFlex
            align="center"
            gap={8}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChakraLink
              as={RouterLink}
              to="/"
              fontSize="xl"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={2}
              _hover={{ textDecoration: 'none' }}
              color={textColor}
            >
              <Icon as={FaBriefcase} color={iconColor} boxSize={6} />
              <Text
                bgGradient={useColorModeValue(
                  'linear(to-r, blue.600, purple.600)',
                  'linear(to-r, blue.400, purple.500)'
                )}
                bgClip="text"
                fontWeight="extrabold"
              >
                Job Found
              </Text>
            </ChakraLink>

            <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink to="/" isActive={location.pathname === '/'}>
                Jobs
              </NavLink>
              <Menu>
                <MenuButton
                  as={Text}
                  cursor="pointer"
                  position="relative"
                  px={4}
                  py={2}
                  rounded="md"
                  color={useColorModeValue('gray.700', 'gray.300')}
                  fontWeight="500"
                  _hover={{
                    bg: useColorModeValue('blue.50', 'gray.700'),
                  }}
                >
                  Resources
                </MenuButton>
                <MenuList
                  bg={useColorModeValue('white', 'gray.800')}
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  <MenuItem
                    as={RouterLink}
                    to="/resources/interview-tips"
                    _hover={{ bg: useColorModeValue('blue.50', 'gray.700') }}
                  >
                    Interview Tips
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to="/resources/resume-guide"
                    _hover={{ bg: useColorModeValue('blue.50', 'gray.700') }}
                  >
                    Resume Guide
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to="/resources/career-advice"
                    _hover={{ bg: useColorModeValue('blue.50', 'gray.700') }}
                  >
                    Career Advice
                  </MenuItem>
                </MenuList>
              </Menu>
              <NavLink to="/about" isActive={location.pathname === '/about'}>
                About
              </NavLink>
              <NavLink to="/contact" isActive={location.pathname === '/contact'}>
                Contact
              </NavLink>
              {user?.email?.endsWith('@admin.com') && (
                <NavLink
                  to="/admin/dashboard"
                  isActive={location.pathname === '/admin/dashboard'}
                >
                  Dashboard
                </NavLink>
              )}
            </Flex>
          </MotionFlex>

          <AnimatePresence>
            <MotionFlex
              align="center"
              gap={3}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton
                  icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  aria-label="Toggle color mode"
                  color={iconColor}
                  _hover={{ bg: buttonHoverBg }}
                />
              </Tooltip>
              
              {user ? (
                <>
                  <MotionButton
                    leftIcon={<FaPlus />}
                    colorScheme="blue"
                    onClick={onOpen}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    bg={useColorModeValue('blue.500', 'blue.400')}
                    _hover={{
                      bg: useColorModeValue('blue.600', 'blue.500'),
                    }}
                  >
                    Post a Job
                  </MotionButton>

                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaUserCircle />}
                      variant="ghost"
                      _hover={{ bg: buttonHoverBg }}
                      fontSize="xl"
                      color={iconColor}
                    />
                    <MenuList
                      bg={menuBg}
                      borderColor={menuBorderColor}
                      boxShadow="lg"
                    >
                      {user.email?.endsWith('@admin.com') && (
                        <MenuItem
                          as={RouterLink}
                          to="/admin/dashboard"
                          icon={<FaTachometerAlt />}
                          _hover={{ bg: buttonHoverBg, color: iconColor }}
                        >
                          Dashboard
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={signOut}
                        icon={<FaSignOutAlt />}
                        color="red.500"
                        _hover={{ bg: 'red.50', color: 'red.600' }}
                      >
                        Sign Out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <MotionButton
                  as={RouterLink}
                  to="/admin/login"
                  colorScheme="blue"
                  leftIcon={<FaUserCircle />}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  bg={useColorModeValue('blue.500', 'blue.400')}
                  _hover={{
                    bg: useColorModeValue('blue.600', 'blue.500'),
                  }}
                >
                  Admin Login
                </MotionButton>
              )}
            </MotionFlex>
          </AnimatePresence>
        </Flex>
      </MotionBox>

      <PostJobModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;

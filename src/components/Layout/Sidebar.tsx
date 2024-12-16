import React from 'react';
import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  IconButton,
  Divider,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiFileText,
  FiDatabase,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiLogOut,
  FiPlus,
  FiAward,
  FiTrendingUp,
} from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../../store/sidebarStore';
import { useAuthStore } from '../../store/authStore';

interface NavItemProps {
  icon: any;
  children: string;
  to: string;
  isCollapsed: boolean;
}

const NavItem = ({ icon, children, to, isCollapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const bg = useColorModeValue('gray.100', 'gray.700');
  
  return (
    <Tooltip label={isCollapsed ? children : ''} placement="right" hasArrow>
      <Link to={to}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? bg : 'transparent'} 
          color={useColorModeValue('gray.800', 'white')}
          _hover={{
            bg: bg,
          }}
        >
          <Icon
            mr={isCollapsed ? "0" : "4"}
            fontSize="16"
            as={icon}
          />
          {!isCollapsed && <Text>{children}</Text>}
        </Flex>
      </Link>
    </Tooltip>
  );
};

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isStudent = user?.role === 'Student';

  return (
    <Box
      position="fixed"
      left="0"
      h="100vh"
      w={isCollapsed ? "70px" : "240px"}
      borderRight="1px"
      borderRightColor={borderColor}
      bg={useColorModeValue('white', 'gray.800')}
      transition="width 0.2s"
      color={useColorModeValue('gray.800', 'white')}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" px={4}>
        {!isCollapsed && <Text fontSize="2xl" fontWeight="bold">InstaGrade</Text>}
        <IconButton
          aria-label="Toggle Sidebar"
          icon={<FiMenu />}
          onClick={toggleSidebar}
          variant="ghost"
        />
      </Flex>

      <VStack spacing={1} align="stretch">
        <NavItem to="/dashboard" icon={FiHome} isCollapsed={isCollapsed}>
          Dashboard
        </NavItem>

        {user?.role === 'Admin' && (
          <NavItem to="/create-exam" icon={FiPlus} isCollapsed={isCollapsed}>
            Create Exam
          </NavItem>
        )}

        {isStudent && (
          <NavItem to="/results" icon={FiBarChart2} isCollapsed={isCollapsed}>
            My Results
          </NavItem>
        )}
        
        <NavItem to="/performance" icon={FiTrendingUp} isCollapsed={isCollapsed}>
          {isStudent ? 'My Performance' : 'Analytics'}
        </NavItem>

        {user?.role === 'Admin' && (
          <NavItem to="/master-data" icon={FiDatabase} isCollapsed={isCollapsed}>
            Master Data
          </NavItem>
        )}

        <Box py={2}>
          <Divider />
        </Box>

        <NavItem to="/settings" icon={FiSettings} isCollapsed={isCollapsed}>
          Settings
        </NavItem>
        
        <NavItem to="/profile" icon={FiUser} isCollapsed={isCollapsed}>
          Profile
        </NavItem>
        
        <Box
          as="button"
          onClick={() => {
            useAuthStore.getState().logout();
            navigate('/login');
          }}
          w="full"
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: useColorModeValue('gray.100', 'gray.700'),
            }}
          >
            <Icon
              mr={isCollapsed ? "0" : "4"}
              fontSize="16"
              as={FiLogOut}
            />
            {!isCollapsed && <Text>Sign Out</Text>}
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};
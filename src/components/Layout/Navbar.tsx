import React from 'react';
import { Box, Flex, Spacer, IconButton, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiBell, FiMoon, FiSun, FiMonitor, FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationBell } from '../Notifications/NotificationBell';
import { useAuthStore } from '../../store/authStore';

export const Navbar = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      px={4}
      py={2}
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.600')}
    >
      <Flex alignItems="center" justifyContent="flex-end">
        <Spacer />
        <Box mr={2}>
          <NotificationBell />
        </Box>
        <IconButton
          as={Link}
          to="/profile"
          aria-label="Profile"
          icon={<FiUser />}
          variant="ghost"
          mr={2}
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Theme settings"
            icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
            variant="ghost"
          />
          <MenuList>
            <MenuItem icon={<FiSun />} onClick={() => setColorMode('light')}>
              Light Mode
            </MenuItem>
            <MenuItem icon={<FiMoon />} onClick={() => setColorMode('dark')}>
              Dark Mode
            </MenuItem>
            <MenuItem icon={<FiMonitor />} onClick={() => {
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              setColorMode(prefersDark ? 'dark' : 'light');
            }}>
              System
            </MenuItem>
          </MenuList>
        </Menu>
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          variant="ghost"
          ml={2}
          onClick={handleLogout}
        />
      </Flex>
    </Box>
  );
};
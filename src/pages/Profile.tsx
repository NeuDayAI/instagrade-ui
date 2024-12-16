import React from 'react';
import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FiMail, FiUser, FiCalendar, FiBriefcase, FiBook, FiHash } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';

const InfoItem = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <Box p={4} borderRadius="lg" bg={useColorModeValue('white', 'gray.700')} shadow="sm">
    <Flex align="center" mb={2}>
      <Icon as={icon} mr={2} color={useColorModeValue('blue.500', 'blue.300')} />
      <Text fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>
        {label}
      </Text>
    </Flex>
    <Text fontSize="lg" fontWeight="semibold">
      {value}
    </Text>
  </Box>
);

export const Profile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  const renderRoleSpecificInfo = () => {
    switch (user.role) {
      case 'Student':
        return (
          <>
            <InfoItem
              icon={FiHash}
              label="Student ID"
              value={user.student_id || 'N/A'}
            />
            <InfoItem
              icon={FiBook}
              label="Department"
              value={user.department || 'N/A'}
            />
          </>
        );
      case 'Examiner':
      case 'Admin':
        return (
          <>
            <InfoItem
              icon={FiBriefcase}
              label="Designation"
              value={user.designation || 'N/A'}
            />
            <InfoItem
              icon={FiCalendar}
              label="Joining Date"
              value={user.joining_date || 'N/A'}
            />
            <InfoItem
              icon={FiBook}
              label="Department"
              value={user.department || 'N/A'}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      <Box mb={8}>
        <Heading size="xl" mb={2}>Profile</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          Your personal information and role details
        </Text>
      </Box>

      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="md" mb={4}>Basic Information</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <InfoItem
              icon={FiUser}
              label="Full Name"
              value={user.full_name}
            />
            <InfoItem
              icon={FiMail}
              label="Email"
              value={user.email}
            />
            <InfoItem
              icon={FiBriefcase}
              label="Role"
              value={user.role}
            />
          </SimpleGrid>
        </Box>

        <Divider />

        <Box>
          <Heading size="md" mb={4}>Role-specific Information</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {renderRoleSpecificInfo()}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};
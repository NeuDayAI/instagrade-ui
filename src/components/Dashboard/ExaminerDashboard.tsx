import React from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { ExamList } from './ExamList';
import { useAuthStore } from '../../store/authStore';

export const ExaminerDashboard = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Box mb={8}>
        <Heading size="lg" mb={2}>Assigned Examinations</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          View and evaluate examinations assigned to you
        </Text>
      </Box>
      <ExamList showAll={false} examinerId={user?.id} />
    </Box>
  );
};
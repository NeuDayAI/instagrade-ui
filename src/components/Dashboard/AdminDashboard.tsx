import React from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { ExamList } from './ExamList';

export const AdminDashboard = () => {
  return (
    <Box>
      <Box mb={8}>
        <Heading size="lg" mb={2}>All Examinations</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          Manage and monitor all examinations across departments
        </Text>
      </Box>
      <ExamList showAll={true} />
    </Box>
  );
};
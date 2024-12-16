import React from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  SimpleGrid,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Progress,
} from '@chakra-ui/react';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { useAuthStore } from '../store/authStore';
import { useExamStore } from '../store/examStore';
import { AdminPerformance } from '../components/Performance/AdminPerformance';
import { ExaminerPerformance } from '../components/Performance/ExaminerPerformance';
import { StudentPerformance } from '../components/Performance/StudentPerformance';

export const Performance = () => {
  const { user } = useAuthStore();
  const studentId = Number(user?.student_id || 0);

  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      
      <Box mb={6}>
        <Box>
          <Heading size="xl" mb={2}>
            {user?.role === 'Student' ? 'Performance Analytics' :
             user?.role === 'Examiner' ? 'Evaluation Analytics' :
             'Department Analytics'}
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            {user?.role === 'Student' ? 'Detailed analysis of your academic performance' :
             user?.role === 'Examiner' ? 'Track and analyze your evaluation patterns' :
             'Monitor performance trends across departments'}
          </Text>
        </Box>
      </Box>

      {user?.role === 'Admin' && <AdminPerformance />}
      {user?.role === 'Examiner' && <ExaminerPerformance />}
      {user?.role === 'Student' && <StudentPerformance studentId={studentId} />}
    </Container>
  );
};
import React from 'react';
import { Box, Container, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { StudentDashboard } from '../components/Dashboard/StudentDashboard';
import { AdminDashboard } from '../components/Dashboard/AdminDashboard';
import { ExaminerDashboard } from '../components/Dashboard/ExaminerDashboard';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { useAuthStore } from '../store/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const isStudent = user?.role === 'Student';
  const isExaminer = user?.role === 'Examiner';

  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      {isStudent && <StudentDashboard />}
      {isExaminer && <ExaminerDashboard />}
      {user?.role === 'Admin' && <AdminDashboard />}
    </Container>
  );
};
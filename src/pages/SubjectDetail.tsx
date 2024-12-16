import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { SubjectDetail } from '../components/Subject/SubjectDetail';
import { useExamStore } from '../store/examStore';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';

export const SubjectDetailPage = () => {
  const { subjectId } = useParams();
  const selectedExam = useExamStore((state) => state.selectedExam);
  const subjects = useExamStore((state) => state.subjects);
  const subject = subjects.find((s) => s.subject_id === Number(subjectId));

  if (!subject || !selectedExam) {
    return (
      <Container maxW="container.xl">
        <BreadcrumbNav />
        <Box p={8} textAlign="center">
          <Text fontSize="xl" color="gray.600">Subject not found</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl">
      <BreadcrumbNav />
      <SubjectDetail 
        subject={subject}
        examId={selectedExam.exam_id}
      />
    </Container>
  );
};
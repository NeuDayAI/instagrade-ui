import React from 'react';
import { Button } from '@chakra-ui/react';
import { Container, Heading, Box, IconButton, HStack, Text } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { SubjectList } from '../components/Exam/SubjectList';
import { useExamStore } from '../store/examStore';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const ExamDetail = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const exam = useExamStore((state) => 
    state.exams.find((e) => e.exam_id === Number(examId))
  );
  
  const getDepartmentName = useExamStore((state) => state.getDepartmentName);
  const getSemesterName = useExamStore((state) => state.getSemesterName);
  const getExamSubjects = useExamStore((state) => state.getExamSubjects);
  const setSelectedExam = useExamStore((state) => state.setSelectedExam);

  React.useEffect(() => {
    if (exam) {
      setSelectedExam(exam);
    }
  }, [exam, setSelectedExam]);

  if (!exam) {
    return (
      <Container maxW="container.xl" py={8}>
        <BreadcrumbNav />
        <Box textAlign="center" py={10}>
          <Heading size="lg" color="gray.500">Exam not found</Heading>
          <Button mt={4} onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </Box>
      </Container>
    );
  }

  const subjects = getExamSubjects(exam.exam_id);

  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      <HStack mb={8} spacing={4}>
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        />
        <Box>
          <Heading size="xl" mb={2}>{exam.exam_name}</Heading>
          <Text color="gray.600">
            {getDepartmentName(exam.department_id)} - {getSemesterName(exam.semester_id)}
          </Text>
          <Text color="gray.600">Maximum Marks: {exam.max_marks}</Text>
        </Box>
      </HStack>
      <SubjectList examId={exam.exam_id} subjects={subjects} />
    </Container>
  );
};
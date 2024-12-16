import React from 'react';
import { SimpleGrid, Heading, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { ExamCard } from './ExamCard';
import { useExamStore } from '../../store/examStore';

interface ExamListProps {
  showAll?: boolean;
  examinerId?: string;
}

export const ExamList = ({ showAll = true, examinerId }: ExamListProps) => {
  const exams = useExamStore((state) => state.exams);
  const studentMarks = useExamStore((state) => state.studentMarks);
  const currentSemesterId = 1; // Fall 2023

  // Filter exams based on examiner assignment if not showing all
  const filteredExams = showAll 
    ? exams 
    : exams.filter(exam => {
        return studentMarks.some(mark => 
          mark.exam_id === exam.exam_id && 
          mark.examiner_id === examinerId
        );
      });

  const currentExams = filteredExams.filter((exam) => exam.semester_id === currentSemesterId);
  const pastExams = filteredExams.filter((exam) => exam.semester_id !== currentSemesterId);

  return (
    <Box py={8}>
      <Box mb={10}>
        <Heading size="lg" mb={4} color={useColorModeValue('blue.700', 'blue.300')}>Current Semester Examinations</Heading>
        {currentExams.length === 0 ? (
          <Text color={useColorModeValue('gray.600', 'gray.400')}>No examinations scheduled for current semester.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {currentExams.map((exam) => (
              <ExamCard key={exam.exam_id} exam={exam} />
            ))}
          </SimpleGrid>
        )}
      </Box>

      <Box>
        <Heading size="lg" mb={4} color={useColorModeValue('blue.700', 'blue.300')}>Past Examinations</Heading>
        {pastExams.length === 0 ? (
          <Text color={useColorModeValue('gray.600', 'gray.400')}>No past examinations available.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {pastExams.map((exam) => (
              <ExamCard key={exam.exam_id} exam={exam} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};
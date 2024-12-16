import React from 'react';
import { Box, Heading, Text, VStack, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { Exam } from '../../types/exam';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { useExamStore } from '../../store/examStore';

interface ExamCardProps {
  exam: Exam;
}

export const ExamCard = ({ exam }: ExamCardProps) => {
  const getDepartmentName = useExamStore(state => state.getDepartmentName);
  const getSemesterName = useExamStore(state => state.getSemesterName);
  const getExamSubjects = useExamStore(state => state.getExamSubjects);

  const subjects = getExamSubjects(exam.exam_id);

  return (
    <Link to={`/exam/${exam.exam_id}`}>
      <Box
        p={6}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg={useColorModeValue('white', 'gray.700')}
        _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
        transition="all 0.2s"
      >
        <VStack align="start" spacing={3}>
          <Heading size="md" color={useColorModeValue('blue.600', 'blue.200')}>{exam.exam_name}</Heading>
          
          <HStack spacing={2}>
            <Icon as={FaCalendarAlt} color={useColorModeValue('gray.500', 'gray.300')} />
            <Text color={useColorModeValue('gray.600', 'gray.300')}>
              {getSemesterName(exam.semester_id)}
            </Text>
          </HStack>
          
          <HStack spacing={2}>
            <Icon as={FaBuilding} color={useColorModeValue('gray.500', 'gray.300')} />
            <Text color={useColorModeValue('gray.600', 'gray.300')}>
              {getDepartmentName(exam.department_id)}
            </Text>
          </HStack>
          
          <HStack spacing={2}>
            <Icon as={FaGraduationCap} color={useColorModeValue('gray.500', 'gray.300')} />
            <Text color={useColorModeValue('gray.600', 'gray.300')}>Subjects: {subjects.length}</Text>
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};
import React from 'react';
import {
  Box,
  VStack,
  Heading,
  HStack,
  Text,
  Badge,
  Icon,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useExamStore } from '../../store/examStore';
import { format, parseISO } from 'date-fns';

export const UpcomingExams = ({ studentId }: { studentId: number }) => {
  const { exams, examSubjects, getSubject, getDepartmentName } = useExamStore();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const today = new Date();

  const upcomingExams = exams
    .filter(exam => {
      const examDate = parseISO(exam.start_date);
      return examDate > today || exam.status === 'upcoming';
    })
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <Heading size="md" mb={4}>Upcoming Examinations</Heading>
      <VStack spacing={4} align="stretch">
        {upcomingExams.map(exam => {
          const subjects = examSubjects
            .filter(es => es.exam_id === exam.exam_id)
            .map(es => ({
              ...es,
              subject: getSubject(es.subject_id)
            }))
            .filter(es => es.subject);

          return (
            <Box
              key={exam.exam_id}
              p={4}
              borderRadius="md"
              bg={useColorModeValue('gray.50', 'gray.600')}
              _hover={{ transform: 'translateY(-2px)', transition: 'all 0.2s' }}
            >
              <VStack align="stretch" spacing={3}>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">{exam.exam_name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {getDepartmentName(exam.department_id)}
                    </Text>
                  </VStack>
                  <Badge colorScheme="blue">
                    {format(parseISO(exam.start_date), 'MMM dd')} - {format(parseISO(exam.end_date), 'MMM dd')}
                  </Badge>
                </HStack>

                <VStack align="stretch" spacing={2}>
                  {subjects.map(({ subject, exam_date, start_time }) => (
                    <HStack key={subject?.subject_id} justify="space-between" fontSize="sm">
                      <Text>{subject?.subject_name}</Text>
                      <HStack spacing={4}>
                        <HStack spacing={1}>
                          {exam_date && (
                            <>
                              <Icon as={FiCalendar} />
                              <Text>{format(parseISO(exam_date), 'MMM dd')}</Text>
                            </>
                          )}
                        </HStack>
                        {start_time && (
                          <HStack spacing={1}>
                            <Icon as={FiClock} />
                            <Text>{start_time}</Text>
                          </HStack>
                        )}
                      </HStack>
                    </HStack>
                  ))}
                </VStack>

                <Button
                  as={Link}
                  to={`/exam/${exam.exam_id}/schedule`}
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                >
                  View Schedule
                </Button>
              </VStack>
            </Box>
          );
        })}

        {upcomingExams.length === 0 && (
          <Text color="gray.500">No upcoming examinations</Text>
        )}
      </VStack>
    </Box>
  );
};
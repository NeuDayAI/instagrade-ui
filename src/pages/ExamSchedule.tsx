import React from 'react';
import {
  Container,
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { useExamStore } from '../store/examStore';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';

export const ExamSchedule = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const {
    exams,
    examSubjects,
    getSubject,
    getDepartmentName,
    getSemesterName,
  } = useExamStore();

  const exam = exams.find(e => e.exam_id === Number(examId));
  const subjects = examSubjects
    .filter(es => es.exam_id === Number(examId))
    .map(es => ({
      ...es,
      subject: getSubject(es.subject_id)
    }))
    .filter(es => es.subject)
    .sort((a, b) => {
      if (!a.exam_date || !b.exam_date) return 0;
      return parseISO(a.exam_date).getTime() - parseISO(b.exam_date).getTime();
    });

  if (!exam) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Exam not found</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      
      <VStack spacing={6} align="stretch">
        <HStack spacing={4}>
          <Button
            leftIcon={<FiArrowLeft />}
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Box>
            <Heading size="lg">{exam.exam_name}</Heading>
            <HStack spacing={2} mt={1}>
              <Text color="gray.500">{getDepartmentName(exam.department_id)}</Text>
              <Text color="gray.500">•</Text>
              <Text color="gray.500">{getSemesterName(exam.semester_id)}</Text>
            </HStack>
          </Box>
        </HStack>

        <Box
          p={6}
          bg={useColorModeValue('white', 'gray.700')}
          borderRadius="lg"
          shadow="sm"
        >
          <VStack align="stretch" spacing={6}>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontWeight="medium">Examination Period</Text>
                <HStack>
                  <Icon as={FiCalendar} color="gray.500" />
                  <Text color="gray.500">
                    {format(parseISO(exam.start_date), 'MMMM dd, yyyy')} - {format(parseISO(exam.end_date), 'MMMM dd, yyyy')}
                  </Text>
                </HStack>
              </VStack>
              <Badge
                colorScheme={exam.status === 'upcoming' ? 'blue' : 'green'}
                fontSize="md"
                px={3}
                py={1}
                borderRadius="full"
              >
                {exam.status.toUpperCase()}
              </Badge>
            </HStack>

            <Box>
              <Heading size="md" mb={4}>Subject Schedule</Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Subject</Th>
                    <Th>Date</Th>
                    <Th>Time</Th>
                    <Th>Duration</Th>
                    <Th>Max Marks</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {subjects.map(({ subject, exam_date, start_time, duration, max_marks }) => (
                    <Tr key={subject?.subject_id}>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="medium">{subject?.subject_name}</Text>
                          <Badge size="sm" colorScheme={subject?.subject_type === 'Core' ? 'blue' : 'purple'}>
                            {subject?.subject_type}
                          </Badge>
                        </VStack>
                      </Td>
                      <Td>{exam_date ? format(parseISO(exam_date), 'MMM dd, yyyy') : '-'}</Td>
                      <Td>
                        <HStack>
                          <Icon as={FiClock} />
                          <Text>{start_time || '-'}</Text>
                        </HStack>
                      </Td>
                      <Td>{duration ? `${duration} mins` : '-'}</Td>
                      <Td>{max_marks}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
import React from 'react';
import {
  Grid,
  Box,
  Collapse,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Button,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiAward, FiTrendingUp, FiBook, FiCheckCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useExamStore } from '../../store/examStore';
import { UpcomingExams } from './UpcomingExams';
import { useAuthStore } from '../../store/authStore';

export const StudentDashboard = () => {
  const { user } = useAuthStore();
  const [isExamsExpanded, setIsExamsExpanded] = React.useState(true);
  const { exams, studentMarks, getStudentMarks, getSubject, getExam, getDepartmentName } = useExamStore();
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const studentId = Number(user?.student_id);

  // Group results by exam
  const examResults = studentMarks
    .filter(mark => mark.student_id === studentId)
    .sort((a, b) => b.exam_id - a.exam_id) // Sort by exam ID descending
    .reduce((acc, mark) => {
      const exam = getExam(mark.exam_id);
      if (!exam) return acc;
      
      const key = `${exam.exam_id}-${mark.subject_id}`;
      if (!acc[key]) {
        acc[key] = {
          exam,
          subjects: []
        };
      }
      
      const subject = getSubject(mark.subject_id);
      if (subject) {
        acc[key].subjects.push({
          subject,
          marks: mark
        });
      }
      
      return acc;
    }, {} as Record<number, { exam: any, subjects: any[] }>);

  const recentResults = studentMarks
    .filter(mark => mark.student_id === studentId)
    .sort((a, b) => b.student_marks_id - a.student_marks_id)
    .slice(0, 3);

  const calculateSubjectPerformance = () => {
    const subjectScores = studentMarks
      .filter(mark => mark.student_id === Number(user?.student_id))
      .reduce((acc, mark) => {
        const subject = getSubject(mark.subject_id);
        if (!subject) return acc;
        
        if (!acc[subject.subject_name]) {
          acc[subject.subject_name] = {
            total: mark.marks_obtained,
            count: 1,
            type: subject.subject_type
          };
        } else {
          acc[subject.subject_name].total += mark.marks_obtained;
          acc[subject.subject_name].count += 1;
        }
        return acc;
      }, {} as Record<string, { total: number; count: number; type: string }>);

    return Object.entries(subjectScores).map(([subject, data]) => ({
      subject,
      average: data.total / data.count,
      type: data.type
    }));
  };

  const calculateOverallProgress = () => {
    if (recentResults.length === 0) return 0;
    const total = recentResults.reduce((sum, mark) => sum + mark.marks_obtained, 0);
    return (total / (recentResults.length * 100)) * 100;
  };

  const subjectPerformance = calculateSubjectPerformance();
  const overallProgress = calculateOverallProgress();

  return (
    <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
      <VStack spacing={6} align="stretch">
        {/* Upcoming Examinations */}
        <UpcomingExams studentId={studentId} />
        
        {/* Recent Examinations */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <HStack justify="space-between" mb={4}>
            <Heading size="md">Recent Examination Results</Heading>
            <Text fontSize="sm" color={textColor}>
              Last 3 examinations
            </Text>
          </HStack>
          <Accordion allowMultiple defaultIndex={[0]}>
            {Object.values(examResults).slice(0, 3).map(({ exam, subjects }, index) => {
              const totalMarks = subjects.reduce((sum, s) => sum + s.marks.marks_obtained, 0);
              const averageMarks = totalMarks / subjects.length;
              return (
              <AccordionItem
                key={`exam-${exam.exam_id}-${index}`}
                border="none"
                mb={2}
              >
                <AccordionButton
                  p={4}
                  borderRadius="lg"
                  bg={useColorModeValue('gray.50', 'gray.600')}
                  _hover={{
                    bg: useColorModeValue('gray.100', 'gray.500'),
                  }}
                >
                  <Box flex="1">
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Heading size="sm">{exam.exam_name}</Heading>
                        <Text fontSize="sm" color={textColor}>
                          {getDepartmentName(exam.department_id)}
                        </Text>
                      </VStack>
                      <HStack spacing={4}>
                        <Badge
                          colorScheme={averageMarks >= 75 ? 'green' : averageMarks >= 60 ? 'blue' : 'orange'}
                          fontSize="md"
                          px={2}
                        >
                          {Math.round(averageMarks)}%
                        </Badge>
                        <AccordionIcon />
                      </HStack>
                    </HStack>
                  </Box>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {subjects.map(({ subject, marks }) => (
                      <Box
                        key={`subject-${subject.subject_id}-${exam.exam_id}`}
                        p={3}
                        borderRadius="md"
                        bg={useColorModeValue('white', 'gray.700')}
                        borderWidth="1px"
                        borderColor={borderColor}
                        transition="all 0.2s"
                        _hover={{
                          transform: 'translateY(-2px)',
                          shadow: 'sm'
                        }}
                        as={Link}
                        to={`/exam/${exam.exam_id}/subject/${subject.subject_id}/student/${studentId}`}
                      >
                        <VStack align="stretch" spacing={2}>
                          <HStack justify="space-between">
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">{subject.subject_name}</Text>
                            <Badge size="sm" colorScheme={subject.subject_type === 'Core' ? 'blue' : 'purple'}>
                              {subject.subject_type}
                            </Badge>
                          </VStack>
                          <Badge
                            colorScheme={marks.marks_obtained >= 75 ? 'green' : marks.marks_obtained >= 60 ? 'blue' : 'orange'}
                            fontSize="lg"
                            px={2}
                          >
                            {marks.marks_obtained}/100
                          </Badge>
                          </HStack>
                          <Progress
                            value={marks.marks_obtained}
                            size="sm"
                            colorScheme={marks.marks_obtained >= 75 ? 'green' : marks.marks_obtained >= 60 ? 'blue' : 'orange'}
                            borderRadius="full"
                          />
                        </VStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            )})}
            {Object.keys(examResults).length === 0 && (
              <Text color={textColor}>No examination results available</Text>
            )}
          </Accordion>
        </Box>

        {/* Recent Results */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Heading size="md" mb={4}>Recent Results</Heading>
          <VStack spacing={4} align="stretch">
          {recentResults.map(result => (
            <Box
              key={`result-${result.student_marks_id}`}
              p={4}
              borderRadius="lg"
              bg={useColorModeValue('gray.50', 'gray.600')}
              _hover={{ 
                transform: 'translateY(-2px)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                boxShadow: 'md'
              }}
              as={Link}
              to={`/exam/${result.exam_id}/subject/${result.subject_id}/student/${user?.student_id}`}
            >
              <HStack justify="space-between" mb={2}>
                <VStack align="start" spacing={1}>
                  <Heading size="sm">{getSubject(result.subject_id)?.subject_name}</Heading>
                  <Text fontSize="sm" color="gray.500">{getExam(result.exam_id)?.exam_name}</Text>
                </VStack>
                <Badge 
                  colorScheme={result.marks_obtained >= 60 ? 'green' : 'orange'}
                  fontSize="md"
                  px={2}
                >
                  {result.marks_obtained}%
                </Badge>
              </HStack>
              <Progress 
                value={result.marks_obtained} 
                colorScheme={result.marks_obtained >= 60 ? 'green' : 'orange'}
                size="sm"
                borderRadius="full"
              />
            </Box>
          ))}
            {recentResults.length === 0 && (
              <Text color="gray.500">No results available</Text>
            )}
          </VStack>
          <Button
            as={Link}
            to="/results"
            variant="ghost"
            colorScheme="blue"
            size="sm"
            mt={4}
          >
            View All Results
          </Button>
        </Box>
      </VStack>

      {/* Right Sidebar */}
      <VStack spacing={6}>
        {/* Performance Stats */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor} w="full">
          <Heading size="md" mb={4}>Overall Performance</Heading>
          <VStack spacing={6} align="stretch">
            <Box position="relative" height="150px">
              <CircularProgress
                value={overallProgress}
                size="150px"
                thickness="8px"
                color={overallProgress >= 75 ? "green.400" : overallProgress >= 60 ? "blue.400" : "orange.400"}
              >
                <CircularProgressLabel>
                  <VStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold">{Math.round(overallProgress)}%</Text>
                    <Text fontSize="xs">Overall</Text>
                  </VStack>
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            
            <Box>
              <Text fontWeight="medium" mb={2}>Subject-wise Performance</Text>
              <VStack spacing={3} align="stretch">
                {subjectPerformance.map(({ subject, average, type }) => (
                  <Box 
                    key={`subject-perf-${subject}`}
                  >
                    <HStack justify="space-between" mb={1} spacing={2}>
                      <HStack>
                        <Text fontSize="sm">{subject}</Text>
                        <Badge size="sm" colorScheme={type === 'Core' ? 'blue' : 'purple'}>
                          {type}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm" fontWeight="bold">{Math.round(average)}%</Text>
                    </HStack>
                    <Progress
                      value={average}
                      size="sm"
                      colorScheme={average >= 75 ? "green" : average >= 60 ? "blue" : "orange"}
                      borderRadius="full"
                    />
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* Quick Actions */}
        <Box p={6} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <Heading size="md" mb={4}>Quick Actions</Heading>
          <VStack spacing={3}>
            <Tooltip label="View detailed results for all examinations">
              <Button
                as={Link}
                to="/results"
                leftIcon={<FiBook />}
                colorScheme="blue"
                variant="ghost"
                w="full"
                justifyContent="flex-start"
                h="auto"
                py={3}
              >
                View All Results
              </Button>
            </Tooltip>
            <Tooltip label="Analyze your performance trends">
              <Button
                as={Link}
                to="/performance"
                leftIcon={<FiTrendingUp />}
                colorScheme="purple"
                variant="ghost"
                w="full"
                justifyContent="flex-start"
                h="auto"
                py={3}
              >
                Detailed Analytics
              </Button>
            </Tooltip>
          </VStack>
        </Box>
      </VStack>
    </Grid>
  );
};
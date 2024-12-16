import React from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Progress,
  Button,
  Icon,
  SimpleGrid, 
  Collapse,
  IconButton,
} from '@chakra-ui/react';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { useExamStore } from '../store/examStore';
import { useAuthStore } from '../store/authStore';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import { FiFileText, FiTrendingUp, FiChevronDown, FiChevronUp, FiDownload, FiAward } from 'react-icons/fi';
import { ResultsPDF } from '../components/Results/ResultsPDF';

export const Results = () => {
  const { user } = useAuthStore();
  const [expandedExams, setExpandedExams] = React.useState<number[]>([]);
  const [expandedFeedbacks, setExpandedFeedbacks] = React.useState<string[]>([]);
  const { 
    studentMarks, 
    getSubject,
    getExam,
    getDepartmentName
  } = useExamStore();

  // Get results for the student
  const results = studentMarks.filter(mark => {
    return mark.student_id === Number(user?.student_id || 0);
  });

  // Group results by exam
  const examResults = results.reduce((acc, mark) => {
    const exam = getExam(mark.exam_id);
    if (!exam) return acc;

    if (!acc[exam.exam_id]) {
      acc[exam.exam_id] = {
        exam,
        subjects: []
      };
    }
    
    const subject = getSubject(mark.subject_id);
    if (subject) {
      acc[exam.exam_id].subjects.push({
        subject,
        marks: mark
      });
    }
    
    return acc;
  }, {} as Record<number, { exam: any, subjects: any[] }>);

  const calculateStats = (subjects: any[]) => {
    const total = subjects.reduce((sum, s) => sum + s.marks.marks_obtained, 0);
    const maxTotal = subjects.length * 100; // Each subject has max marks of 100
    const percentage = (total / maxTotal) * 100;
    
    return {
      total,
      maxTotal,
      percentage: Math.round(percentage),
      highest: Math.max(...subjects.map(s => s.marks.marks_obtained)),
      lowest: Math.min(...subjects.map(s => s.marks.marks_obtained)),
    };
  };

  const toggleExam = (examId: number) => {
    setExpandedExams(prev => 
      prev.includes(examId)
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  const toggleFeedback = (feedbackId: string) => {
    setExpandedFeedbacks(prev => 
      prev.includes(feedbackId)
        ? prev.filter(id => id !== feedbackId)
        : [...prev, feedbackId]
    );
  };

  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      
      <Box mb={6}>
        <Heading size="xl" mb={2}>
          My Results
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          View your examination results and performance analysis
        </Text>
      </Box>
      
      {Object.keys(examResults).length === 0 && (
        <Box 
          p={8} 
          textAlign="center" 
          bg={useColorModeValue('white', 'gray.700')}
          borderRadius="lg"
          shadow="sm"
        >
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            No results available yet.
          </Text>
        </Box>
      )}

      {Object.values(examResults).map(({ exam, subjects }) => {
        const stats = calculateStats(subjects);
        
        const isExpanded = expandedExams.includes(exam.exam_id);
        
        return (
          <Box 
            key={exam.exam_id}
            mb={8}
            bg={useColorModeValue('white', 'gray.700')}
            borderRadius="lg"
            p={6}
            shadow="sm"
          >
            <VStack align="stretch" spacing={6}>
              <HStack justify="space-between">
                <Heading size="md" mb={2}>{exam.exam_name}</Heading>
                <HStack>
                  <PDFDownloadLink
                    document={
                      <ResultsPDF
                        examName={exam.exam_name}
                        departmentName={getDepartmentName(exam.department_id)}
                        studentName={user?.full_name || ''}
                        subjects={subjects.map(({ subject, marks }) => ({
                          subject,
                          marks: {
                            ...marks,
                            feedback_summary: marks.feedback_summary
                          }
                        }))}
                        stats={stats}
                      />
                    }
                    fileName={`${exam.exam_name.replace(/\s+/g, '_')}_results.pdf`}
                    style={{ textDecoration: 'none' }}
                  >
                    {({ loading }: { loading: boolean }) => (
                      <Button
                        leftIcon={<FiDownload />}
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        isLoading={loading}
                      >
                        Export PDF
                      </Button>
                    )}
                  </PDFDownloadLink>
                  <IconButton
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                    icon={isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                    variant="ghost"
                    onClick={() => toggleExam(exam.exam_id)}
                  />
                </HStack>
              </HStack>
              <Box>
                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  {getDepartmentName(exam.department_id)}
                </Text>
              </Box>

              <StatGroup>
                <Stat>
                  <StatLabel>Total Score</StatLabel>
                  <StatNumber>{stats.total}/{stats.maxTotal}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Percentage</StatLabel>
                  <StatNumber>{stats.percentage}%</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Highest</StatLabel>
                  <StatNumber>{stats.highest}/100</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Lowest</StatLabel>
                  <StatNumber>{stats.lowest}/100</StatNumber>
                </Stat>
              </StatGroup>

              <Progress 
                value={stats.percentage}
                colorScheme={stats.percentage >= 60 ? 'green' : 'orange'}
                size="sm"
                borderRadius="full"
              />
              
              <Collapse in={isExpanded} animateOpacity>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Subject</Th>
                    <Th>Marks</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {subjects.map(({ subject, marks }, index) => (
                    <Tr key={`${exam.exam_id}-${subject.subject_id}-${index}`}>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="medium">{subject.subject_name}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {subject.subject_type}
                          </Text>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleFeedback(`${exam.exam_id}-${subject.subject_id}`)}
                            rightIcon={expandedFeedbacks.includes(`${exam.exam_id}-${subject.subject_id}`) ? <FiChevronUp /> : <FiChevronDown />}
                            mt={1}
                            color={useColorModeValue('gray.600', 'gray.400')}
                          >
                            Overall Feedback
                          </Button>
                          <Collapse in={expandedFeedbacks.includes(`${exam.exam_id}-${subject.subject_id}`)} animateOpacity>
                            <Box
                              mt={2}
                              p={3}
                              bg={useColorModeValue('gray.50', 'gray.600')}
                              borderRadius="md"
                              w="full"
                            >
                              <Text
                                fontSize="sm"
                                color={useColorModeValue('gray.600', 'gray.300')}
                                whiteSpace="pre-wrap"
                              >
                                {marks.feedback_summary}
                              </Text>
                            </Box>
                          </Collapse>
                        </VStack>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={(marks.marks_obtained / 100) * 100 >= 60 ? 'green' : 'orange'}
                          fontSize="md"
                          px={2}
                        >
                          {marks.marks_obtained}/100
                        </Badge>
                      </Td>
                      <Td>
                        <Badge colorScheme={marks.status === 'verified' ? 'green' : 'orange'}>
                          {marks.status ? marks.status.replace('_', ' ').toUpperCase() : 'PENDING'}
                        </Badge>
                      </Td>
                      <Td>
                        <Button
                          as={Link}
                          to={`/exam/${exam.exam_id}/subject/${subject.subject_id}/student/${user?.student_id}`}
                          key={`btn-${exam.exam_id}-${subject.subject_id}`}
                          size="sm"
                          leftIcon={<FiFileText />}
                          colorScheme="blue"
                          variant="ghost"
                        >
                          View Details
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box
                  p={4}
                  borderRadius="md"
                  bg={useColorModeValue('blue.50', 'blue.900')}
                >
                  <HStack mb={2}>
                    <Icon as={FiTrendingUp} color="blue.500" />
                    <Text fontWeight="medium">Performance Analysis</Text>
                  </HStack>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                    Your performance is {stats.percentage >= 75 ? 'excellent' : 
                      stats.percentage >= 60 ? 'good' : 'needs improvement'} in this examination.
                  </Text>
                </Box>

                <Box
                  p={4}
                  borderRadius="md"
                  bg={useColorModeValue('purple.50', 'purple.900')}
                >
                  <HStack mb={2}>
                    <Icon as={FiAward} color="purple.500" />
                    <Text fontWeight="medium">Achievement</Text>
                  </HStack>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                    {stats.percentage >= 75 ? 'Outstanding performance!' : 
                      stats.percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
                  </Text>
                </Box>
              </SimpleGrid>
              </Collapse>
            </VStack>
          </Box>
        );
      })}
    </Container>
  );
};
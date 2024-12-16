import React from 'react';
import {
  Box,
  Container, 
  Grid,
  VStack,
  Text,
  Heading,
  Badge,
  useColorModeValue,
  IconButton,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  Tooltip,
  useTheme,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { FiDownload, FiZoomIn, FiZoomOut, FiArrowLeft } from 'react-icons/fi';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { useExamStore } from '../store/examStore';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const AnswerSheet = () => {
  const { examId, subjectId, studentId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [numPages, setNumPages] = React.useState<number>(0);
  const [scale, setScale] = React.useState<number>(1.0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pdfContainerRef = React.useRef<HTMLDivElement>(null);
  const feedbackContainerRef = React.useRef<HTMLDivElement>(null);
  
  const {
    getExam,
    getSubject,
    getStudent,
    getStudentMarks,
    getDepartmentName,
    getSemesterName,
  } = useExamStore();

  const exam = getExam(Number(examId));
  const subject = getSubject(Number(subjectId));
  const student = getStudent(Number(studentId));
  const studentMarks = getStudentMarks(Number(examId), Number(subjectId))
    .find(m => m.student_id === Number(studentId));

  const answerFeedbacks = studentMarks?.answer_feedbacks_json 
    ? JSON.parse(studentMarks.answer_feedbacks_json)
    : null;

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleScroll = () => {
    if (!pdfContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = pdfContainerRef.current;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    // Update feedback panel scroll position
    if (feedbackContainerRef.current) {
      const feedbackScrollHeight = feedbackContainerRef.current.scrollHeight - feedbackContainerRef.current.clientHeight;
      feedbackContainerRef.current.scrollTop = (feedbackScrollHeight * scrollPercentage) / 100;
    }
    
    // Calculate current page based on scroll position
    const pageHeight = scrollHeight / numPages;
    const currentPage = Math.floor(scrollTop / pageHeight) + 1;
    setCurrentPage(currentPage);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/src/data/22.pdf';
    link.download = `${student?.student_name}-answer-sheet.pdf`;
    link.click();
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  if (!exam || !subject || !student || !studentMarks) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Resource not found</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={4}>
      <BreadcrumbNav />
      
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" wrap="wrap" spacing={4}>
          <HStack>
            <Tooltip label="Back">
              <IconButton
                aria-label="Back"
                icon={<FiArrowLeft />}
                onClick={() => navigate(-1)}
                variant="ghost"
              />
            </Tooltip>
            <VStack align="start" spacing={1}>
              <Heading size="md">{student.student_name}</Heading>
              <Text color="gray.500" fontSize="sm">
                {getDepartmentName(student.department_id)} • {getSemesterName(student.semester_id)}
              </Text>
            </VStack>
          </HStack>

          <StatGroup>
            <Stat>
              <StatLabel>Subject</StatLabel>
              <StatNumber fontSize="md">{subject.subject_name}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Marks Obtained</StatLabel>
              <StatNumber fontSize="md">
                <Badge colorScheme="green" fontSize="md" px={2}>
                  {studentMarks.marks_obtained}
                </Badge>
              </StatNumber>
            </Stat>
          </StatGroup>
        </HStack>

        <Divider />

        <Grid 
          templateColumns={{ base: '1fr', lg: '3fr 2fr' }}
          gap={6}
          bg={useColorModeValue('gray.50', 'gray.800')}
          p={4}
          borderRadius="lg" 
          h="calc(100vh - 200px)"
        >
          {/* PDF Viewer */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={4}
            borderRadius="md"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            display="flex"
            flexDirection="column"
          >
            <VStack spacing={4}>
              <HStack spacing={2}>
                <Tooltip label="Zoom Out">
                  <IconButton
                    aria-label="Zoom out"
                    icon={<FiZoomOut />}
                    onClick={zoomOut}
                    size="sm"
                  />
                </Tooltip>
                <Tooltip label="Zoom In">
                  <IconButton
                    aria-label="Zoom in"
                    icon={<FiZoomIn />}
                    onClick={zoomIn}
                    size="sm"
                  />
                </Tooltip>
                <Tooltip label="Download PDF">
                  <IconButton
                    aria-label="Download PDF"
                    icon={<FiDownload />}
                    onClick={handleDownload}
                    size="sm"
                  />
                </Tooltip>
                <Text fontSize="sm" color="gray.500">
                  Page {currentPage} of {numPages} • {Math.round(scale * 100)}%
                </Text>
              </HStack>

              <Box 
                ref={pdfContainerRef}
                w="100%" 
                overflowY="auto"
                flex="1"
                onScroll={handleScroll}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                    background: theme.colors.gray[100],
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.colors.blue[500],
                    borderRadius: '24px',
                  },
                }}
              >
                <Document
                  file="/src/data/22.pdf"
                  onLoadSuccess={handleDocumentLoadSuccess}
                  loading={
                    <Text color="gray.500">Loading PDF...</Text>
                  }
                  error={
                    <Text color="red.500">
                      Failed to load PDF. Please try again.
                    </Text>
                  }
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      scale={scale}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                    />
                  ))}
                </Document>
              </Box>
            </VStack>
          </Box>

          {/* Feedback Panel */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={4}
            borderRadius="md"
            border="1px"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
            h="100%"
            display="flex"
            flexDirection="column"
          >
            <Box mb={4}>
              <Heading size="md" mb={4}>Evaluation Summary</Heading>
              <Text color={useColorModeValue('gray.600', 'gray.300')} mb={4}>
                {studentMarks.feedback_summary}
              </Text>
            </Box>

            <Divider mb={4} />

            {answerFeedbacks && (
              <VStack 
                ref={feedbackContainerRef}
                align="stretch" 
                spacing={4}
                flex="1"
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                    background: theme.colors.gray[100],
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.colors.blue[500],
                    borderRadius: '24px',
                  },
                }}
              >
                <Heading size="sm">Question-wise Feedback</Heading>
                {Object.entries(answerFeedbacks).map(([question, feedback]: [string, any]) => (
                  <Box
                    key={question}
                    p={4}
                    borderRadius="md"
                    bg={useColorModeValue('gray.50', 'gray.600')}
                    position="relative"
                    _hover={{
                      bg: useColorModeValue('gray.100', 'gray.500'),
                      transition: 'background 0.2s'
                    }}
                  >
                    <Box
                      position="absolute"
                      left="-20px"
                      top="50%"
                      transform="translateY(-50%)"
                      w="16px"
                      h="2px"
                      bg={useColorModeValue('blue.500', 'blue.300')}
                    />
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="bold">
                        Question {question.replace('q', '')}
                      </Text>
                      <Badge colorScheme="green">
                        {feedback.marks} marks
                      </Badge>
                    </HStack>
                    <Text color={useColorModeValue('gray.600', 'gray.200')}>
                      {feedback.feedback}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </Grid>
      </VStack>
    </Container>
  );
};
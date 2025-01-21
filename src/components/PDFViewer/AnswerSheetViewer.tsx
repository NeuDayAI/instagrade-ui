import React from 'react';
import {
  Box,
  VStack,
  Divider,
  useToast,
  Text,
  Heading,
  Badge,
  useColorModeValue,
  IconButton,
  HStack,
  Grid,
  useTheme,
  Tooltip,
} from '@chakra-ui/react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FiDownload, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { VerificationActions } from '../Subject/VerificationActions';
import { useAuthStore } from '../../store/authStore';
import { StudentMarks } from '@/types/exam';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface AnswerSheetViewerProps {
  pdfUrl: string;
  feedbackData: {
    student_marks_id: number;
    marks_obtained: number;
    answer_feedbacks_json: string;
    feedback_summary: string;
    status: string;
    examiner_id?: string;
    examiner_feedback?: string;
    verification_date?: string;
  };
}

interface AnswerFeedback {
  marks: number;
  feedback: string;
}

export const AnswerSheetViewer = ({ pdfUrl, feedbackData }: AnswerSheetViewerProps) => {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [scale, setScale] = React.useState<number>(1.0);
  const theme = useTheme();
  const { user } = useAuthStore();
  const pdfContainerRef = React.useRef<HTMLDivElement>(null);
  const feedbackContainerRef = React.useRef<HTMLDivElement>(null);
  const toast = useToast();
  
  const answerFeedbacks = feedbackData?.answer_feedbacks_json 
    ? JSON.parse(feedbackData.answer_feedbacks_json) as Record<string, AnswerFeedback>
    : null;

  const handleVerificationComplete = () => {
    toast({
      title: 'Verification completed',
      status: 'success',
      duration: 3000,
    });
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'answer-sheet.pdf';
    link.click();
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  const handleScroll = () => {
    if (!pdfContainerRef.current || !feedbackContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = pdfContainerRef.current;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    
    const feedbackScrollHeight = feedbackContainerRef.current.scrollHeight - feedbackContainerRef.current.clientHeight;
    feedbackContainerRef.current.scrollTop = (feedbackScrollHeight * scrollPercentage) / 100;
  };

  const verificationData: StudentMarks = {
    ...feedbackData,
    student_id: 0,
    exam_subject_id: 0,
    exam_id: 0,
    subject_id: 0,
    status: 'pending_verification'
  };

  return (
    <Grid 
      templateColumns={{ base: '1fr', lg: '3fr 2fr' }}
      gap={6} 
      h="calc(100vh - 200px)"
      bg={useColorModeValue('gray.50', 'gray.800')}
      p={4}
      borderRadius="lg"
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
              {Math.round(scale * 100)}% zoom
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
              file={pdfUrl}
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
        display="flex"
        flexDirection="column"
      >
        <Box mb={4}>
          <Heading size="md" mb={2}>Evaluation Summary</Heading>
          <Badge colorScheme="blue" fontSize="lg" mb={4}>
            Marks: {feedbackData.marks_obtained}
          </Badge>
          <Text color={useColorModeValue('gray.600', 'gray.300')}>
            {feedbackData.feedback_summary}
          </Text>
          
          {user?.role === 'Examiner' && (
            <>
              <Divider my={4} />
              <VerificationActions selectedMarks={[verificationData]} onVerificationComplete={handleVerificationComplete} />
            </>
          )}
        </Box>

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
          {answerFeedbacks && (
            <Box>
              <Heading size="sm" mb={2}>Question-wise Feedback</Heading>
              <VStack align="stretch" spacing={4}>
                {Object.entries(answerFeedbacks).map(([question, feedback]) => (
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
            </Box>
          )}
        </VStack>
      </Box>
    </Grid>
  );
};
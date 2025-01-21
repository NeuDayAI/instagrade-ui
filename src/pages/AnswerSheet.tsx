import React from 'react';
import {
  Container,
  VStack,
  Text,
  Heading,
  Badge,
  IconButton,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  Tooltip,
  Box,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { MarksPanel } from '../components/PDFViewer/MarksPanel';
import { PDFViewer } from '../components/PDFViewer/PDFViewer';
import { FeedbackPanel } from '../components/PDFViewer/FeedbackPanel';
import { DockablePanel } from '../components/PDFViewer/DockablePanel';
import { useExamStore } from '../store/examStore';
import { useToast } from '@chakra-ui/react';

export const AnswerSheet = () => {
  const { examId, subjectId, studentId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isMarksPanelOpen, setIsMarksPanelOpen] = React.useState(true);
  const [isFeedbackPanelOpen, setIsFeedbackPanelOpen] = React.useState(true);
  
  const {
    getExam,
    getSubject,
    getStudent,
    getStudentMarks,
    getDepartmentName,
    getSemesterName,
  } = useExamStore();

  const handleMarksUpdate = (totalMarks: number) => {
    toast({
      title: 'Marks Updated',
      description: `Total marks: ${totalMarks}`,
      status: 'info',
      duration: 2000,
    });
  };

  const exam = getExam(Number(examId));
  const subject = getSubject(Number(subjectId));
  const student = getStudent(Number(studentId));
  const studentMarks = getStudentMarks(Number(examId), Number(subjectId))
    .find(m => m.student_id === Number(studentId));

  if (!exam || !subject || !student || !studentMarks) {
    return (
      <Container maxW="container.xl" py={8}>
        <BreadcrumbNav />
        <Text color="red.500" textAlign="center">Resource not found</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={4}>
      <BreadcrumbNav />
      
      <VStack spacing={4} align="stretch">
        {/* Header Section */}
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
              <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
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

        {/* Answer Sheet Viewer with Feedback */}
        <Box
          h="calc(100vh - 200px)"
          bg={useColorModeValue('gray.50', 'gray.800')}
          borderRadius="lg"
          p={4}
        >
          <HStack spacing={0} h="full" align="stretch">
            <DockablePanel
              title="Marking Tools"
              isOpen={isMarksPanelOpen}
              onToggle={() => setIsMarksPanelOpen(!isMarksPanelOpen)}
              position="left"
              width="300px"
            >
              <MarksPanel onDragStart={() => {}} />
            </DockablePanel>

            <Box flex={1}>
              <PDFViewer
                pdfUrl="/src/data/22.pdf"
                onMarksUpdate={handleMarksUpdate}
              />
            </Box>

            <DockablePanel
              title="Feedback"
              isOpen={isFeedbackPanelOpen}
              onToggle={() => setIsFeedbackPanelOpen(!isFeedbackPanelOpen)}
              position="right"
              width="400px"
            >
              <FeedbackPanel
                feedbackData={{
                  student_marks_id: studentMarks.student_marks_id,
                  marks_obtained: studentMarks.marks_obtained,
                  answer_feedbacks_json: studentMarks.answer_feedbacks_json,
                  feedback_summary: studentMarks.feedback_summary,
                  status: studentMarks.status,
                  examiner_id: studentMarks.examiner_id,
                  examiner_feedback: studentMarks.examiner_feedback,
                  verification_date: studentMarks.verification_date,
                }}
              />
            </DockablePanel>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};
import React from 'react';
import {
  VStack,
  Box,
  Text,
  Badge,
  Heading,
  useColorModeValue,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { VerificationActions } from '../Subject/VerificationActions';
import { useAuthStore } from '../../store/authStore';

interface FeedbackPanelProps {
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

export const FeedbackPanel = ({ feedbackData }: FeedbackPanelProps) => {
  const { user } = useAuthStore();
  const answerFeedbacks = feedbackData?.answer_feedbacks_json 
    ? JSON.parse(feedbackData.answer_feedbacks_json)
    : null;

  const verificationData = {
    ...feedbackData,
    student_id: 0,
    exam_subject_id: 0,
    exam_id: 0,
    subject_id: 0,
    status: 'pending_verification'
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Heading size="md" mb={2}>Evaluation Summary</Heading>
        <Badge colorScheme="blue" fontSize="lg" mb={4}>
          Marks: {feedbackData.marks_obtained}
        </Badge>
        <Text color={useColorModeValue('gray.600', 'gray.300')}>
          {feedbackData.feedback_summary}
        </Text>
      </Box>

      {user?.role === 'Examiner' && (
        <>
          <Divider />
          <VerificationActions
            selectedMarks={[verificationData]}
            onVerificationComplete={() => {}}
          />
        </>
      )}

      {answerFeedbacks && (
        <Box>
          <Heading size="sm" mb={4}>Question-wise Feedback</Heading>
          <VStack spacing={4} align="stretch">
            {Object.entries(answerFeedbacks).map(([question, feedback]: [string, any]) => (
              <Box
                key={question}
                p={4}
                borderRadius="md"
                bg={useColorModeValue('gray.50', 'gray.600')}
                _hover={{
                  bg: useColorModeValue('gray.100', 'gray.500'),
                }}
              >
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
  );
};
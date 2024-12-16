import React from 'react';
import {
  VStack,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
  Text,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { useExamStore } from '../../store/examStore';
import { StudentMarks } from '../../types/exam';

interface VerificationActionsProps {
  marks: StudentMarks;
}

export const VerificationActions = ({ marks }: VerificationActionsProps) => {
  const toast = useToast();
  const [feedback, setFeedback] = React.useState('');
  const { updateMarksVerification } = useExamStore();

  const handleVerification = (status: StudentMarks['status']) => {
    if (status === 'rejected' && !feedback) {
      toast({
        title: 'Error',
        description: 'Please provide feedback for rejection',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    updateMarksVerification(marks.student_marks_id, {
      status,
      examiner_feedback: feedback,
      verification_date: new Date().toISOString(),
    });

    toast({
      title: 'Success',
      description: `Answer sheet ${status === 'verified' ? 'verified' : 'marked for ' + status}`,
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <HStack>
        <Text fontWeight="bold">Status:</Text>
        <Badge colorScheme={
          marks.status === 'verified' ? 'green' :
          marks.status === 'rejected' ? 'red' :
          marks.status === 'manual_evaluation' ? 'purple' : 'orange'
        }>
          {marks.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </HStack>

      {marks.status === 'pending_verification' && (
        <>
          <FormControl>
            <FormLabel>Verification Feedback (Required for rejection)</FormLabel>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback here..."
              rows={4}
            />
          </FormControl>

          <HStack spacing={4}>
            <Button
              colorScheme="green"
              onClick={() => handleVerification('verified')}
              flex={1}
            >
              Verify & Approve
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleVerification('rejected')}
              flex={1}
            >
              Reject
            </Button>
          </HStack>
          
          <Button
            colorScheme="purple"
            onClick={() => handleVerification('manual_evaluation')}
            width="100%"
          >
            Request Manual Evaluation
          </Button>
        </>
      )}

      {marks.examiner_feedback && (
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="bold">Examiner Feedback:</Text>
          <Text>{marks.examiner_feedback}</Text>
        </VStack>
      )}
    </VStack>
  );
};
import React from 'react';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
  Checkbox,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import { FiCheck, FiX, FiChevronDown, FiAlertTriangle } from 'react-icons/fi';
import { useExamStore } from '../../store/examStore';
import { StudentMarks } from '../../types/exam';

interface VerificationActionsProps {
  selectedMarks: StudentMarks[];
  onVerificationComplete?: () => void;
}

export const VerificationActions = ({ selectedMarks, onVerificationComplete }: VerificationActionsProps) => {
  const toast = useToast();
  const { updateMarksVerification } = useExamStore();

  const handleVerification = (status: StudentMarks['status'], marks: StudentMarks[]) => {
    marks.forEach(mark => {
      updateMarksVerification(mark.student_marks_id, {
        status,
        examiner_feedback: '',
        verification_date: new Date().toISOString(),
      });
    });

    toast({
      title: 'Verification Complete',
      description: `${marks.length} answer sheet(s) ${status === 'verified' ? 'approved' : 'marked for ' + status}`,
      status: 'success',
      duration: 3000,
    });

    if (onVerificationComplete) {
      onVerificationComplete();
    }
  };

  const pendingVerification = selectedMarks.filter(mark => mark.status === 'pending_verification');

  if (pendingVerification.length === 0) {
    return null;
  }

  return (
    <HStack spacing={4}>
      <ButtonGroup size="sm" isAttached variant="outline">
        {pendingVerification.length > 1 ? (
          <Button
            leftIcon={<FiCheck />}
            colorScheme="green"
            onClick={() => handleVerification('verified', pendingVerification)}
          >
            Approve Selected ({pendingVerification.length})
          </Button>
        ) : (
          <Button
            leftIcon={<FiCheck />}
            colorScheme="green"
            onClick={() => handleVerification('verified', pendingVerification)}
          >
            Approve
          </Button>
        )}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="More options"
            icon={<FiChevronDown />}
            colorScheme="green"
          />
          <MenuList>
            <MenuItem
              icon={<FiX />}
              onClick={() => handleVerification('rejected', pendingVerification)}
            >
              Reject Selected
            </MenuItem>
            <MenuItem
              icon={<FiAlertTriangle />}
              onClick={() => handleVerification('manual_evaluation', pendingVerification)}
            >
              Request Manual Evaluation
            </MenuItem>
          </MenuList>
        </Menu>
      </ButtonGroup>
    </HStack>
  );
};
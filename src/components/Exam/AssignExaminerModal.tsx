import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useExamStore } from '../../store/examStore';

import { mockUsers } from '../../data/mockData';

interface AssignExaminerModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId: number;
  examId: number;
}

export const AssignExaminerModal = ({ isOpen, onClose, subjectId, examId }: AssignExaminerModalProps) => {
  const toast = useToast();
  const { assignExaminer } = useExamStore();
  const [selectedExaminer, setSelectedExaminer] = React.useState('');

  const examiners = mockUsers.filter((u) => u.role.toLocaleLowerCase() === 'examiner' && u.is_active);

  const handleAssign = () => {
    if (!selectedExaminer) {
      toast({
        title: 'Error',
        description: 'Please select an examiner',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    assignExaminer(examId, subjectId, selectedExaminer);
    toast({
      title: 'Success',
      description: 'Examiner assigned successfully',
      status: 'success',
      duration: 3000,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Assign Examiner</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Select Examiner</FormLabel>
              <Select
                placeholder="Choose an examiner"
                value={selectedExaminer}
                onChange={(e) => setSelectedExaminer(e.target.value)}
              >
                {examiners.map((examiner) => (
                  <option key={examiner.id} value={examiner.id}>
                    {examiner.full_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleAssign}>
            Assign
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
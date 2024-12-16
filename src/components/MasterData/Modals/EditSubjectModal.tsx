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
  Input,
  Select,
  FormErrorMessage,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Subject } from '../../../types/exam';
import { useExamStore } from '../../../store/examStore';

interface EditSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
}

interface FormData {
  subjectName: string;
  departmentId: string;
  subjectType: string;
}

export const EditSubjectModal = ({ isOpen, onClose, subject }: EditSubjectModalProps) => {
  const toast = useToast();
  const { departments, updateSubject } = useExamStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      subjectName: subject.subject_name,
      departmentId: subject.department_id.toString(),
      subjectType: subject.subject_type,
    },
  });

  const onSubmit = (data: FormData) => {
    updateSubject(subject.subject_id, {
      ...subject,
      subject_name: data.subjectName,
      department_id: parseInt(data.departmentId),
      subject_type: data.subjectType,
    });
    
    toast({
      title: 'Subject updated',
      description: `${data.subjectName} has been updated successfully`,
      status: 'success',
      duration: 3000,
    });
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Subject</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.subjectName}>
                <FormLabel>Subject Name</FormLabel>
                <Input
                  {...register('subjectName', {
                    required: 'Subject name is required',
                    minLength: {
                      value: 3,
                      message: 'Minimum length should be 3 characters',
                    },
                  })}
                  placeholder="e.g., Data Structures"
                />
                <FormErrorMessage>
                  {errors.subjectName && errors.subjectName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.departmentId}>
                <FormLabel>Department</FormLabel>
                <Select
                  {...register('departmentId', {
                    required: 'Please select a department',
                  })}
                  placeholder="Select department"
                >
                  {departments.map((dept) => (
                    <option key={dept.department_id} value={dept.department_id}>
                      {dept.department_name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.departmentId && errors.departmentId.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.subjectType}>
                <FormLabel>Subject Type</FormLabel>
                <Select
                  {...register('subjectType', {
                    required: 'Please select a subject type',
                  })}
                  placeholder="Select type"
                >
                  <option value="Core">Core</option>
                  <option value="Elective">Elective</option>
                  <option value="Lab">Lab</option>
                </Select>
                <FormErrorMessage>
                  {errors.subjectType && errors.subjectType.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
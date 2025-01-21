import React, { useEffect, useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { APIError, departmentService, subjectService } from '@/services/api';
import { AxiosError } from 'axios';

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
  const queryClient = useQueryClient();

 const departmentsQuery = useQuery(['departments'], () => departmentService.getDepartments());  
 
const [departments] = useState(departmentsQuery.data?.data.data || []);
  
  const mutation = useMutation(
    (data: { id: number; name: string; type: string; departmentId: number }) =>
      subjectService.updateSubject(data.id, {
        subject_name: data.name,
        subject_type: data.type,
        department_id: data.departmentId,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['subjects']);
        toast({
          title: 'Subject updated',
          status: 'success',
          duration: 3000,
        });
      },
     onError: (error: AxiosError<APIError>) => {
             let errorMessage : string = '';
             if (error.response) {
               // Server responded with an error status
               errorMessage = error.response.data.message;
             } else if (error.request) {
               // Request made but no response received
               errorMessage = 'Network error: ' + error.request;
             } else {
               // Something else went wrong
               errorMessage = error.message;
             }
        toast({
          title: 'Error updating subject',
          description: errorMessage,
          status: 'error',
          duration: 3000,
        });
      }
    }
  );
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      subjectName: subject.subject_name,
      departmentId: subject.department_id.toString(),
      subjectType: subject.subject_type,
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      id: subject.subject_id,
      name: data.subjectName,
      type: data.subjectType,
      departmentId: Number(data.departmentId),
    });
    onClose();
  };

  useEffect(() => {
    reset({
      subjectName: subject.subject_name,
      departmentId: subject.department_id.toString(),
      subjectType: subject.subject_type,
    });
  }, [subject, reset]);

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
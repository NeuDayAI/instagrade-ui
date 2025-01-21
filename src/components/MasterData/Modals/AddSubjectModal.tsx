import React, { useState } from 'react';
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
  Tooltip,
  IconButton,
  FormErrorMessage,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  HStack,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { subjectService, departmentService, APIError } from '@/services/api';
import { useToast } from '@chakra-ui/react';
import { SubjectCreate } from '@/services/api';

import {useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  subjectName: string;
  departmentId: string;
  subjectType: string;
}

export const AddSubjectModal = ({ isOpen, onClose }: AddSubjectModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const toast = useToast();
  const queryClient = useQueryClient();

  const departmentsQuery = useQuery(['departments'], () => departmentService.getDepartments());  

  const [departments] = useState(departmentsQuery.data?.data.data || []);
  
  const addSubjectMutation = useMutation(
    (newSubject: SubjectCreate) => subjectService.createSubject(newSubject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['subjects']);
        toast({
          title: 'Subject added successfully',
          status: 'success',
          duration: 3000,
        });
        onClose();
        reset();
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
          title: 'Error adding subject',
          description: errorMessage,
          status: 'error',
          duration: 3000,
        });
      },
    }
  );

  const onSubmit = (data: FormData) => {
    addSubjectMutation.mutate({
      subject_name: data.subjectName,
      department_id: Number(data.departmentId),
      subject_type: data.subjectType,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Subject</ModalHeader>
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
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
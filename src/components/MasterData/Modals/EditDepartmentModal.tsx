import React, { useEffect } from 'react';
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
  FormErrorMessage,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { APIError, Department } from '@/services/api';
import { departmentService } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface EditDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department;
}

interface FormData {
  departmentName: string;
}

export const EditDepartmentModal = ({ isOpen, onClose, department }: EditDepartmentModalProps) => {
  const toast = useToast();

  const queryClient = useQueryClient();
  
  const mutation = useMutation(
    (data: { id: number; name: string }) => departmentService.updateDepartment(data.id, { department_name: data.name }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['departments']);
        toast({
          title: 'Department updated',
          status: 'success',
          duration: 3000,
        });
        onClose();
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
          title: 'Error updating department',
          description: errorMessage,
          status: 'error',
          duration: 3000,
        });
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      departmentName: department.department_name,
    },
  });

  const onSubmit = (data: FormData) => {
   mutation.mutate({ id: department.department_id, name: data.departmentName });
  };

  useEffect(() => {
    reset({
      departmentName: department.department_name,
    });
  }
  , [department, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Department</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.departmentName}>
                <FormLabel>Department Name</FormLabel>
                <Input
                  {...register('departmentName', {
                    required: 'Department name is required',
                    minLength: {
                      value: 3,
                      message: 'Minimum length should be 3 characters',
                    },
                  })}
                  placeholder="e.g., Computer Science"
                />
                <FormErrorMessage>
                  {errors.departmentName && errors.departmentName.message}
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
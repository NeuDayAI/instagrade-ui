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
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { DepartmentCreate } from '@/services/api';
import { departmentService } from '@/services/api';
import { useToast } from '@chakra-ui/react';


interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  departmentName: string;
}

import { useMutation, useQueryClient } from "@tanstack/react-query"

export const AddDepartmentModal = ({ isOpen, onClose }: AddDepartmentModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const queryClient = useQueryClient();
  const toast = useToast();

   const addDepartmentMutation = useMutation(
      (newDepartment: DepartmentCreate) => departmentService.createDepartment(newDepartment),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['departments']);
          toast({
            title: 'Department added successfully',
            status: 'success',
            duration: 3000,
          });
        },
        onError: () => {
          toast({
            title: 'Error adding department',
            status: 'error',
            duration: 3000,
          });
        },
      }
    );

  const onSubmit = (data: FormData) => {
    addDepartmentMutation.mutate({ department_name: data.departmentName });
    console.log(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Department</ModalHeader>
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
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
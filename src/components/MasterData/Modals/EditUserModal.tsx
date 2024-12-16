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
  Switch,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { User } from '../../../types/exam';
import { useExamStore } from '../../../store/examStore';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

interface FormData {
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  isSuperuser: boolean;
}

export const EditUserModal = ({ isOpen, onClose, user }: EditUserModalProps) => {
  const toast = useToast();
  const { updateUser } = useExamStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      isActive: user.is_active,
      isSuperuser: user.is_superuser,
    },
  });

  const onSubmit = (data: FormData) => {
    updateUser(user.id, {
      ...user,
      email: data.email,
      full_name: data.fullName,
      role: data.role,
      is_active: data.isActive,
      is_superuser: data.isSuperuser,
    });
    
    toast({
      title: 'User updated',
      description: `${data.fullName} has been updated successfully`,
      status: 'success',
      duration: 3000,
    });
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  placeholder="user@example.com"
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.fullName}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: {
                      value: 3,
                      message: 'Minimum length should be 3 characters',
                    },
                  })}
                  placeholder="John Doe"
                />
                <FormErrorMessage>
                  {errors.fullName && errors.fullName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.role}>
                <FormLabel>Role</FormLabel>
                <Select
                  {...register('role', {
                    required: 'Please select a role',
                  })}
                  placeholder="Select role"
                >
                  <option value="Admin">Admin</option>
                  <option value="Examiner">Examiner</option>
                  <option value="Student">Student</option>
                </Select>
                <FormErrorMessage>
                  {errors.role && errors.role.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Account Status</FormLabel>
                <Switch
                  {...register('isActive')}
                  defaultChecked={user.is_active}
                  isDisabled={user.is_superuser}
                />
                <FormHelperText>
                  Active accounts can log in to the system
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Super User</FormLabel>
                <Switch
                  {...register('isSuperuser')}
                  defaultChecked={user.is_superuser}
                  isDisabled={user.is_superuser}
                />
                <FormHelperText>
                  Super users have full system access
                </FormHelperText>
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
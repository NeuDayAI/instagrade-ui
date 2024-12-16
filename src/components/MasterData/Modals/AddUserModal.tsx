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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  fullName: string;
  role: string;
  password: string;
  confirmPassword: string;
  isActive: boolean;
  isSuperuser: boolean;
}

export const AddUserModal = ({ isOpen, onClose }: AddUserModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch('password');

  const onSubmit = (data: FormData) => {
    // Here you would typically save the user
    console.log(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add User</ModalHeader>
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

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  type="password"
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: value =>
                      value === password || 'The passwords do not match',
                  })}
                  type="password"
                />
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Account Status</FormLabel>
                <Switch
                  {...register('isActive')}
                  defaultChecked
                />
                <FormHelperText>
                  Active accounts can log in to the system
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Super User</FormLabel>
                <Switch
                  {...register('isSuperuser')}
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
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
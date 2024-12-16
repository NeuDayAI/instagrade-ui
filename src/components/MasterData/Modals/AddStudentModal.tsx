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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useExamStore } from '../../../store/examStore';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  studentName: string;
  departmentId: string;
  semesterId: string;
  yearOfStudy: string;
  academicYear: string;
}

export const AddStudentModal = ({ isOpen, onClose }: AddStudentModalProps) => {
  const departments = useExamStore((state) => state.departments);
  const semesters = useExamStore((state) => state.semesters);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Here you would typically save the student
    console.log(data);
    onClose();
  };

  const currentYear = new Date().getFullYear();
  const academicYears = [
    `${currentYear-1}-${currentYear}`,
    `${currentYear}-${currentYear+1}`,
    `${currentYear+1}-${currentYear+2}`
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Student</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.studentName}>
                <FormLabel>Student Name</FormLabel>
                <Input
                  {...register('studentName', {
                    required: 'Student name is required',
                    minLength: {
                      value: 3,
                      message: 'Minimum length should be 3 characters',
                    },
                  })}
                  placeholder="e.g., John Doe"
                />
                <FormErrorMessage>
                  {errors.studentName && errors.studentName.message}
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

              <FormControl isInvalid={!!errors.semesterId}>
                <FormLabel>Semester</FormLabel>
                <Select
                  {...register('semesterId', {
                    required: 'Please select a semester',
                  })}
                  placeholder="Select semester"
                >
                  {semesters.map((sem) => (
                    <option key={sem.semester_id} value={sem.semester_id}>
                      {sem.semester_name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.semesterId && errors.semesterId.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.yearOfStudy}>
                <FormLabel>Year of Study</FormLabel>
                <Select
                  {...register('yearOfStudy', {
                    required: 'Please select year of study',
                  })}
                  placeholder="Select year"
                >
                  {[1, 2, 3, 4].map((year) => (
                    <option key={year} value={year}>
                      Year {year}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.yearOfStudy && errors.yearOfStudy.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.academicYear}>
                <FormLabel>Academic Year</FormLabel>
                <Select
                  {...register('academicYear', {
                    required: 'Please select academic year',
                  })}
                  placeholder="Select academic year"
                >
                  {academicYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.academicYear && errors.academicYear.message}
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
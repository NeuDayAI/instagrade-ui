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
import { Student } from '../../../types/exam';
import { useExamStore } from '../../../store/examStore';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

interface FormData {
  studentName: string;
  departmentId: string;
  semesterId: string;
  yearOfStudy: string;
  academicYear: string;
}

export const EditStudentModal = ({ isOpen, onClose, student }: EditStudentModalProps) => {
  const toast = useToast();
  const { departments, semesters, updateStudent } = useExamStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      studentName: student.student_name,
      departmentId: student.department_id.toString(),
      semesterId: student.semester_id.toString(),
      yearOfStudy: student.year_of_study.toString(),
      academicYear: student.academic_year,
    },
  });

  const currentYear = new Date().getFullYear();
  const academicYears = [
    `${currentYear-1}-${currentYear}`,
    `${currentYear}-${currentYear+1}`,
    `${currentYear+1}-${currentYear+2}`
  ];

  const onSubmit = (data: FormData) => {
    updateStudent(student.student_id, {
      ...student,
      student_name: data.studentName,
      department_id: parseInt(data.departmentId),
      semester_id: parseInt(data.semesterId),
      year_of_study: parseInt(data.yearOfStudy),
      academic_year: data.academicYear,
    });
    
    toast({
      title: 'Student updated',
      description: `${data.studentName} has been updated successfully`,
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
          <ModalHeader>Edit Student</ModalHeader>
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
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  FormErrorMessage,
  Text,
  Box,
  useToast,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCreateExamStore } from '../../store/createExamStore';
import { useExamStore } from '../../store/examStore';

interface FormData {
  examName: string;
  departmentId: string;
  selectedSubjects: string[];
}

export const ExamBasicDetails = () => {
  const toast = useToast();
  const { departments, subjects } = useExamStore();
  const { setExamDetails, setActiveStep } = useCreateExamStore();
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.500', 'gray.400');
  const labelColor = useColorModeValue('gray.800', 'gray.100');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const selectedDepartment = watch('departmentId');
  const departmentSubjects = subjects.filter(
    subject => subject.department_id === Number(selectedDepartment)
  );

  const onSubmit = (data: FormData) => {
    setExamDetails({
      examName: data.examName,
      departmentId: Number(data.departmentId),
      selectedSubjects: data.selectedSubjects.map(Number),
    });
    setActiveStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <FormControl isInvalid={!!errors.examName}>
          <FormLabel>Exam Name</FormLabel>
          <Input
            {...register('examName', {
              required: 'Exam name is required',
              minLength: {
                value: 5,
                message: 'Exam name must be at least 5 characters',
              },
            })}
            placeholder="e.g., Fall Semester Final Exam 2023"
            bg={bgColor}
            borderColor={borderColor}
          />
          <Text fontSize="sm" color={textColor} mt={1}>
            Include semester, year, and exam type for clarity
          </Text>
          <FormErrorMessage>
            {errors.examName && errors.examName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.departmentId}>
          <FormLabel>Department</FormLabel>
          <Select
            {...register('departmentId', {
              required: 'Please select a department',
            })}
            placeholder="Select department"
            bg={bgColor}
            borderColor={borderColor}
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

        {selectedDepartment && (
          <FormControl isInvalid={!!errors.selectedSubjects}>
            <FormLabel>Select Subjects</FormLabel>
            <Box 
              maxH="200px" 
              overflowY="auto" 
              borderWidth={1} 
              borderRadius="md" 
              p={2}
              bg={bgColor}
              borderColor={borderColor}
            >
              {departmentSubjects.map((subject) => (
                <Box key={subject.subject_id} p={2}>
                  <label>
                    <input
                      type="checkbox"
                      value={subject.subject_id}
                      {...register('selectedSubjects', {
                        required: 'Please select at least one subject',
                      })}
                    />{' '}
                    <Text as="span" color={labelColor}>
                      {subject.subject_name}
                    </Text>
                  </label>
                </Box>
              ))}
            </Box>
            <FormErrorMessage>
              {errors.selectedSubjects && errors.selectedSubjects.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <HStack justify="flex-end" pt={4}>
          <Button
            colorScheme="blue"
            type="submit"
          >
            Next
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};
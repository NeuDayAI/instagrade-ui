import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  HStack,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCreateExamStore } from '../../store/createExamStore';
import { useExamStore } from '../../store/examStore';
import { useNavigate } from 'react-router-dom';

interface SubjectDetail {
  subjectId: number;
  maxMarks: number;
  examDate: string;
  startTime: string;
  duration: number;
}

interface FormData {
  subjectDetails: SubjectDetail[];
}

export const ExamSubjectDetails = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { subjects } = useExamStore();
  const { examDetails, setActiveStep } = useCreateExamStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      subjectDetails: examDetails.selectedSubjects.map(subjectId => ({
        subjectId,
        maxMarks: 100,
        examDate: '',
        startTime: '',
        duration: 180,
      })),
    },
  });

  const onSubmit = (data: FormData) => {
    // Here you would typically save the exam data
    toast({
      title: 'Exam created successfully',
      status: 'success',
      duration: 3000,
    });
    navigate('/dashboard');
  };

  const selectedSubjects = subjects.filter(
    subject => examDetails.selectedSubjects.includes(subject.subject_id)
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <Table variant="simple" bg={useColorModeValue('white', 'gray.700')}>
          <Thead>
            <Tr>
              <Th>Subject</Th>
              <Th>Max Marks</Th>
              <Th>Exam Date</Th>
              <Th>Start Time</Th>
              <Th>Duration (mins)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {selectedSubjects.map((subject, index) => (
              <Tr key={subject.subject_id}>
                <Td>{subject.subject_name}</Td>
                <Td>
                  <FormControl isInvalid={!!errors.subjectDetails?.[index]?.maxMarks}>
                    <Input
                      type="number"
                      {...register(`subjectDetails.${index}.maxMarks` as const, {
                        required: 'Required',
                        min: { value: 1, message: 'Must be greater than 0' },
                      })}
                      w="100px"
                      bg={useColorModeValue('white', 'gray.700')}
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                    />
                    <FormErrorMessage>
                      {errors.subjectDetails?.[index]?.maxMarks?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Td>
                <Td>
                  <FormControl isInvalid={!!errors.subjectDetails?.[index]?.examDate}>
                    <Input
                      type="date"
                      {...register(`subjectDetails.${index}.examDate` as const, {
                        required: 'Required',
                      })}
                      bg={useColorModeValue('white', 'gray.700')}
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                    />
                    <FormErrorMessage>
                      {errors.subjectDetails?.[index]?.examDate?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Td>
                <Td>
                  <FormControl isInvalid={!!errors.subjectDetails?.[index]?.startTime}>
                    <Input
                      type="time"
                      {...register(`subjectDetails.${index}.startTime` as const, {
                        required: 'Required',
                      })}
                      bg={useColorModeValue('white', 'gray.700')}
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                    />
                    <FormErrorMessage>
                      {errors.subjectDetails?.[index]?.startTime?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Td>
                <Td>
                  <FormControl isInvalid={!!errors.subjectDetails?.[index]?.duration}>
                    <Input
                      type="number"
                      {...register(`subjectDetails.${index}.duration` as const, {
                        required: 'Required',
                        min: { value: 30, message: 'Min 30 mins' },
                        max: { value: 360, message: 'Max 360 mins' }
                      })}
                      placeholder="180"
                      bg={useColorModeValue('white', 'gray.700')}
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                    />
                    <FormErrorMessage>
                      {errors.subjectDetails?.[index]?.duration?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <HStack justify="flex-end" pt={4} spacing={4}>
          <Button
            variant="outline"
            onClick={() => setActiveStep(0)}
          >
            Back
          </Button>
          <Button
            colorScheme="blue"
            type="submit"
          >
            Create Exam
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};
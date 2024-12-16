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
import { FiInfo } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useExamStore } from '../../../store/examStore';

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  subjectName: string;
  departmentId: string;
  subjectType: string;
  rubricId: string;
}

export const AddSubjectModal = ({ isOpen, onClose }: AddSubjectModalProps) => {
  const departments = useExamStore((state) => state.departments);
  const rubrics = useExamStore((state) => state.rubrics);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Here you would typically save the subject
    console.log(data);
    onClose();
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

              <FormControl isInvalid={!!errors.rubricId}>
                <FormLabel>Evaluation Rubric</FormLabel>
                <HStack>
                  <Select
                    {...register('rubricId', {
                      required: 'Please select a rubric',
                    })}
                    placeholder="Select rubric"
                  >
                    {rubrics.map((rubric) => (
                      <option key={rubric.rubric_id} value={rubric.rubric_id}>
                        {rubric.name}
                      </option>
                    ))}
                  </Select>
                  <Popover placement="right">
                    <PopoverTrigger>
                      <IconButton
                        aria-label="View rubric details"
                        icon={<FiInfo />}
                        size="sm"
                        variant="ghost"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody whiteSpace="pre-wrap">
                        {watch('rubricId') && 
                          rubrics.find(r => r.rubric_id === Number(watch('rubricId')))?.rubric_text
                        }
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </HStack>
                <FormErrorMessage>
                  {errors.rubricId && errors.rubricId.message}
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
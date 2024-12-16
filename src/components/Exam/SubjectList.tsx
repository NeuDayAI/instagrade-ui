import {
  VStack,
  Box,
  Heading,
  Text,
  Button,
  Progress,
  useToast
} from '@chakra-ui/react';
import { Subject } from '../../types/exam';
import { Link } from 'react-router-dom';
import { useExamStore } from '../../store/examStore';

interface SubjectListProps {
  examId: number;
  subjects: Subject[];
}

export const SubjectList = ({ examId, subjects }: SubjectListProps) => {
  const toast = useToast();
  const studentMarks = useExamStore(state => state.studentMarks);
  
  const getSubjectProgress = (subjectId: number) => {
    const subjectMarks = studentMarks.filter(
      sm => sm.exam_id === examId && sm.subject_id === subjectId
    );
    return (subjectMarks.length / 30) * 100; // Assuming 30 students per class
  };

  return (
    <VStack spacing={4} align="stretch">
      {subjects.map((subject) => (
        <Box
          key={subject.subject_id}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
        >
          <Heading size="md" mb={2}>{subject.subject_name}</Heading>
          <Text mb={2}>Type: {subject.subject_type}</Text>
          <Text mb={3}>Max Marks: {subject.subject_id}</Text>
          
          <Progress
            hasStripe
            value={getSubjectProgress(subject.subject_id)}
            colorScheme="blue"
            mb={3}
          />

          <Button
            as={Link}
            to={`/subject/${subject.subject_id}`}
            colorScheme="blue"
            size="sm"
          >
            View Details
          </Button>
        </Box>
      ))}
    </VStack>
  );
};
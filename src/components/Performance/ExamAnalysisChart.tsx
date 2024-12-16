import React from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useExamStore } from '../../store/examStore';

interface ExamAnalysisChartProps {
  studentId: number;
  examId: number;
}

export const ExamAnalysisChart = ({ studentId, examId }: ExamAnalysisChartProps) => {
  const { studentMarks, getSubject } = useExamStore();
  
  const examMarks = studentMarks.filter(
    mark => mark.exam_id === examId && mark.student_id === studentId
  );

  const subjectPerformance = examMarks.map(mark => {
    const subject = getSubject(mark.subject_id);
    const feedbacks = JSON.parse(mark.answer_feedbacks_json || '{}');
    const questionCount = Object.keys(feedbacks).length;
    
    return {
      subject: subject?.subject_name || '',
      marks: mark.marks_obtained,
      questionsAttempted: questionCount,
      averagePerQuestion: mark.marks_obtained / questionCount
    };
  });

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Box
          p={6}
          bg={useColorModeValue('white', 'gray.700')}
          borderRadius="lg"
          shadow="sm"
        >
          <Heading size="md" mb={4}>Subject-wise Performance</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="marks" fill="#4299E1" name="Marks Obtained" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box
          p={6}
          bg={useColorModeValue('white', 'gray.700')}
          borderRadius="lg"
          shadow="sm"
        >
          <Heading size="md" mb={4}>Average Marks per Question</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="averagePerQuestion" 
                fill="#48BB78" 
                name="Avg. Marks/Question" 
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
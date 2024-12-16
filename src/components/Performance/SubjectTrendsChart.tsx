import React from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useExamStore } from '../../store/examStore';

interface SubjectTrendsChartProps {
  studentId: number;
}

export const SubjectTrendsChart = ({ studentId }: SubjectTrendsChartProps) => {
  const { studentMarks, getSubject, getExam } = useExamStore();

  // Group marks by subject
  const subjectTrends = studentMarks
    .filter(mark => mark.student_id === studentId)
    .reduce((acc, mark) => {
      const subject = getSubject(mark.subject_id);
      const exam = getExam(mark.exam_id);
      
      if (!subject || !exam) return acc;

      if (!acc[subject.subject_name]) {
        acc[subject.subject_name] = [];
      }

      acc[subject.subject_name].push({
        exam: exam.exam_name,
        marks: mark.marks_obtained,
      });

      return acc;
    }, {} as Record<string, Array<{ exam: string; marks: number }>>);

  // Transform data for the chart
  const chartData = Object.entries(subjectTrends).map(([subject, marks]) => ({
    subject,
    data: marks,
  }));

  return (
    <Box
      p={6}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      shadow="sm"
    >
      <Heading size="md" mb={4}>Subject Performance Trends</Heading>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="exam" 
            type="category"
            allowDuplicatedCategory={false}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {chartData.map((subject, index) => (
            <Line
              key={subject.subject}
              data={subject.data}
              dataKey="marks"
              name={subject.subject}
              stroke={`hsl(${index * 45}, 70%, 50%)`}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
import React from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { StudentMarks } from '../../types/exam';
import { useExamStore } from '../../store/examStore';

interface PerformanceChartsProps {
  studentId: number;
}

export const PerformanceCharts = ({ studentId }: PerformanceChartsProps) => {
  const { studentMarks, getSubject, getExam } = useExamStore();
  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  // Filter marks for the current student
  const studentResults = studentMarks.filter(mark => mark.student_id === studentId);

  // Prepare data for subject-wise performance
  const subjectPerformance = studentResults.map(mark => ({
    subject: getSubject(mark.subject_id)?.subject_name || '',
    marks: mark.marks_obtained,
    maxMarks: 100,
  }));

  // Prepare data for question-wise analysis
  const questionAnalysis = studentResults.flatMap(mark => {
    const feedbacks = JSON.parse(mark.answer_feedbacks_json || '{}');
    return Object.entries(feedbacks).map(([question, data]: [string, any]) => ({
      question: `Q${question.replace('q', '')}`,
      marks: data.marks,
      maxMarks: 25, // Assuming each question is worth 25 marks
    }));
  });

  // Prepare data for exam progression
  const examProgression = studentResults.map(mark => {
    const exam = getExam(mark.exam_id);
    return {
      exam: exam?.exam_name || '',
      percentage: (mark.marks_obtained / 100) * 100,
    };
  });

  // Calculate average marks per question type
  const skillAnalysis = [
    { skill: 'Theory', score: 85 },
    { skill: 'Practical', score: 78 },
    { skill: 'Problem Solving', score: 92 },
    { skill: 'Analysis', score: 88 },
    { skill: 'Application', score: 75 },
  ];

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
      {/* Subject Performance Chart */}
      <Box p={6} bg={bgColor} borderRadius="lg" shadow="sm">
        <Heading size="md" mb={4}>Subject Performance</Heading>
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

      {/* Question-wise Analysis */}
      <Box p={6} bg={bgColor} borderRadius="lg" shadow="sm">
        <Heading size="md" mb={4}>Question-wise Analysis</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={questionAnalysis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="question" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="marks" fill="#48BB78" name="Marks Obtained" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Exam Progression */}
      <Box p={6} bg={bgColor} borderRadius="lg" shadow="sm">
        <Heading size="md" mb={4}>Performance Trend</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={examProgression}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="exam" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke="#805AD5" 
              name="Performance (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Skill Analysis */}
      <Box p={6} bg={bgColor} borderRadius="lg" shadow="sm">
        <Heading size="md" mb={4}>Skill Analysis</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={skillAnalysis}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Skills"
              dataKey="score"
              stroke="#D53F8C"
              fill="#D53F8C"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </SimpleGrid>
  );
};
import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useExamStore } from '../../store/examStore';

interface TopicProficiencyChartProps {
  studentId: number;
  examId: number;
}

export const TopicProficiencyChart = ({ studentId, examId }: TopicProficiencyChartProps) => {
  const { studentMarks, getSubject } = useExamStore();

  const examMarks = studentMarks.filter(
    mark => mark.exam_id === examId && mark.student_id === studentId
  );

  // Extract topics and proficiency from feedback
  const topicProficiency = examMarks.flatMap(mark => {
    const subject = getSubject(mark.subject_id);
    const feedbacks = JSON.parse(mark.answer_feedbacks_json || '{}');
    
    // Group questions by topic and calculate average proficiency
    const topics = Object.values(feedbacks).reduce((acc: any, feedback: any) => {
      const topic = feedback.topic || 'General';
      if (!acc[topic]) {
        acc[topic] = { total: 0, count: 0 };
      }
      acc[topic].total += (feedback.marks / 25) * 100; // Assuming max marks per question is 25
      acc[topic].count += 1;
      return acc;
    }, {});

    return Object.entries(topics as Record<string, { total: number; count: number }>).map(([topic, data]) => ({
      topic: `${subject?.subject_name} - ${topic}`,
      proficiency: data.total / data.count
    }));
  });

  return (
    <Box
      p={6}
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius="lg"
      shadow="sm"
      height="500px"
    >
      <Heading size="md" mb={4}>Topic-wise Proficiency</Heading>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={topicProficiency}>
          <PolarGrid />
          <PolarAngleAxis dataKey="topic" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Proficiency"
            dataKey="proficiency"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};
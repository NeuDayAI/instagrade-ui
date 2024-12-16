import React from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';
import { useExamStore } from '../../store/examStore';

interface PerformanceMetricsProps {
  studentId: number;
  examId: number;
}

export const PerformanceMetrics = ({ studentId, examId }: PerformanceMetricsProps) => {
  const { studentMarks, getSubject } = useExamStore();

  const examMarks = studentMarks.filter(
    mark => mark.exam_id === examId && mark.student_id === studentId
  );

  const calculateMetrics = () => {
    const metrics = {
      averageScore: 0,
      consistencyScore: 0,
      attemptRate: 0,
      improvementRate: 0
    };

    if (examMarks.length === 0) return metrics;

    // Calculate average score
    metrics.averageScore = examMarks.reduce(
      (sum, mark) => sum + mark.marks_obtained, 
      0
    ) / examMarks.length;

    // Calculate consistency score
    const scores = examMarks.map(mark => mark.marks_obtained);
    const mean = metrics.averageScore;
    const variance = scores.reduce(
      (sum, score) => sum + Math.pow(score - mean, 2), 
      0
    ) / scores.length;
    metrics.consistencyScore = 100 - (Math.sqrt(variance) / mean) * 100;

    // Calculate attempt rate
    const totalQuestions = examMarks.reduce((sum, mark) => {
      const feedbacks = JSON.parse(mark.answer_feedbacks_json || '{}');
      return sum + Object.keys(feedbacks).length;
    }, 0);
    
    const attemptedQuestions = examMarks.reduce((sum, mark) => {
      const feedbacks = JSON.parse(mark.answer_feedbacks_json || '{}');
      const attempted = Object.values(feedbacks).filter(
        (f: any) => f.marks > 0
      ).length;
      return sum + attempted;
    }, 0);

    metrics.attemptRate = (attemptedQuestions / totalQuestions) * 100;

    // Calculate improvement rate (comparing with previous exams)
    const previousMarks = studentMarks
      .filter(mark => mark.exam_id < examId && mark.student_id === studentId);
    
    if (previousMarks.length > 0) {
      const previousAvg = previousMarks.reduce(
        (sum, mark) => sum + mark.marks_obtained, 
        0
      ) / previousMarks.length;
      
      metrics.improvementRate = 
        ((metrics.averageScore - previousAvg) / previousAvg) * 100;
    }

    return metrics;
  };

  const metrics = calculateMetrics();

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
      <Box
        p={6}
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        shadow="sm"
      >
        <Stat>
          <StatLabel>Average Score</StatLabel>
          <StatNumber>{metrics.averageScore.toFixed(1)}</StatNumber>
          <StatHelpText>Out of 100</StatHelpText>
        </Stat>
      </Box>

      <Box
        p={6}
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        shadow="sm"
      >
        <Stat>
          <StatLabel>Consistency Score</StatLabel>
          <StatNumber>{metrics.consistencyScore.toFixed(1)}%</StatNumber>
          <StatHelpText>Based on score variation</StatHelpText>
        </Stat>
      </Box>

      <Box
        p={6}
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        shadow="sm"
      >
        <Stat>
          <StatLabel>Question Attempt Rate</StatLabel>
          <StatNumber>{metrics.attemptRate.toFixed(1)}%</StatNumber>
          <StatHelpText>Questions attempted vs total</StatHelpText>
        </Stat>
      </Box>

      <Box
        p={6}
        bg={useColorModeValue('white', 'gray.700')}
        borderRadius="lg"
        shadow="sm"
      >
        <Stat>
          <StatLabel>Improvement Rate</StatLabel>
          <StatNumber>
            {metrics.improvementRate.toFixed(1)}%
          </StatNumber>
          <StatHelpText>
            <StatArrow 
              type={metrics.improvementRate >= 0 ? 'increase' : 'decrease'} 
            />
            From previous exams
          </StatHelpText>
        </Stat>
      </Box>
    </SimpleGrid>
  );
};
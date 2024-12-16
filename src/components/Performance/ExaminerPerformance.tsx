import React from 'react';
import {
  VStack,
  SimpleGrid,
  Box,
  Heading,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuthStore } from '../../store/authStore';
import { useExamStore } from '../../store/examStore';

export const ExaminerPerformance = () => {
  const { user } = useAuthStore();
  const { studentMarks, getSubject } = useExamStore();
  
  const examinerMarks = studentMarks.filter(mark => mark.examiner_id === user?.id);
  
  const subjectPerformance = examinerMarks.reduce((acc, mark) => {
    const subject = getSubject(mark.subject_id);
    if (!subject) return acc;
    
    if (!acc[subject.subject_name]) {
      acc[subject.subject_name] = {
        totalMarks: 0,
        count: 0,
        verified: 0,
        rejected: 0
      };
    }
    
    acc[subject.subject_name].totalMarks += mark.marks_obtained;
    acc[subject.subject_name].count += 1;
    if (mark.status === 'verified') acc[subject.subject_name].verified += 1;
    if (mark.status === 'rejected') acc[subject.subject_name].rejected += 1;
    
    return acc;
  }, {} as Record<string, { totalMarks: number; count: number; verified: number; rejected: number; }>);

  return (
    <VStack spacing={6} align="stretch">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {Object.entries(subjectPerformance).map(([subject, data], index) => (
          <Box
            key={index}
            p={6}
            bg={useColorModeValue('white', 'gray.700')}
            borderRadius="lg"
            shadow="sm"
          >
            <VStack align="start" spacing={4}>
              <Heading size="md">{subject}</Heading>
              <StatGroup width="100%">
                <Stat>
                  <StatLabel>Avg. Marks</StatLabel>
                  <StatNumber>
                    {(data.totalMarks / data.count).toFixed(1)}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Verified</StatLabel>
                  <StatNumber color="green.500">
                    {data.verified}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Rejected</StatLabel>
                  <StatNumber color="red.500">
                    {data.rejected}
                  </StatNumber>
                </Stat>
              </StatGroup>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
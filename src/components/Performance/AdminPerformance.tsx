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
import { useExamStore } from '../../store/examStore';

export const AdminPerformance = () => {
  const { departments, exams, studentMarks } = useExamStore();
  
  const departmentPerformance = departments.map(dept => {
    const examResults = studentMarks.filter(mark =>
      exams.find(e => e.exam_id === mark.exam_id)?.department_id === dept.department_id
    );
    
    const avgMarks = examResults.reduce((sum, mark) => sum + mark.marks_obtained, 0) / examResults.length;
    
    return {
      department: dept.department_name,
      averageMarks: avgMarks || 0,
      totalStudents: examResults.length,
      passRate: (examResults.filter(mark => mark.marks_obtained >= 40).length / examResults.length) * 100 || 0
    };
  });

  return (
    <VStack spacing={6} align="stretch">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {departmentPerformance.map((dept, index) => (
          <Box
            key={index}
            p={6}
            bg={useColorModeValue('white', 'gray.700')}
            borderRadius="lg"
            shadow="sm"
          >
            <VStack align="start" spacing={4}>
              <Heading size="md">{dept.department}</Heading>
              <StatGroup width="100%">
                <Stat>
                  <StatLabel>Avg. Marks</StatLabel>
                  <StatNumber>{dept.averageMarks.toFixed(1)}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pass Rate</StatLabel>
                  <StatNumber>{dept.passRate.toFixed(1)}%</StatNumber>
                </Stat>
              </StatGroup>
              <Progress
                value={dept.averageMarks}
                size="sm"
                width="100%"
                colorScheme="blue"
                borderRadius="full"
              />
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
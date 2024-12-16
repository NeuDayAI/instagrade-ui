import React from 'react';
import {
  VStack,
  Box,
  Select,
  SimpleGrid,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Progress,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useExamStore } from '../../store/examStore';
import { useAuthStore } from '../../store/authStore';
import { SubjectTrendsChart } from './SubjectTrendsChart';
import { ExamAnalysisChart } from './ExamAnalysisChart';
import { TopicProficiencyChart } from './TopicProficiencyChart';
import { PerformanceMetrics } from './PerformanceMetrics';

interface StudentPerformanceProps {
  studentId: number;
}

export const StudentPerformance = ({ studentId }: StudentPerformanceProps) => {
  const [selectedExamId, setSelectedExamId] = React.useState<string>('');
  const { exams } = useExamStore();

  const studentExams = exams.filter(exam => {
    const marks = useExamStore.getState().studentMarks.some(
      mark => mark.exam_id === exam.exam_id && mark.student_id === studentId
    );
    return marks;
  });

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Select
          placeholder="Select examination for detailed analysis"
          value={selectedExamId}
          onChange={(e) => setSelectedExamId(e.target.value)}
          mb={6}
        >
          {studentExams.map(exam => (
            <option key={exam.exam_id} value={exam.exam_id}>
              {exam.exam_name}
            </option>
          ))}
        </Select>

        <Tabs variant="enclosed">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Subject Analysis</Tab>
            <Tab>Topic Proficiency</Tab>
            <Tab>Performance Metrics</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ExamAnalysisChart 
                studentId={studentId}
                examId={Number(selectedExamId)}
              />
            </TabPanel>
            
            <TabPanel>
              <SubjectTrendsChart 
                studentId={studentId}
              />
            </TabPanel>
            
            <TabPanel>
              <TopicProficiencyChart
                studentId={studentId}
                examId={Number(selectedExamId)}
              />
            </TabPanel>
            
            <TabPanel>
              <PerformanceMetrics
                studentId={studentId}
                examId={Number(selectedExamId)}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
};
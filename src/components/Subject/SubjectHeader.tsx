import React from 'react';
import {
  HStack,
  IconButton,
  Heading,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

interface SubjectHeaderProps {
  subjectName: string;
  stats: {
    totalStudents: number;
    evaluatedCount: number;
    pendingCount: number;
  };
  onBack: () => void;
}

export const SubjectHeader = ({ subjectName, stats, onBack }: SubjectHeaderProps) => {
  return (
    <>
      <HStack mb={6} spacing={4}>
        <IconButton
          aria-label="Back"
          icon={<FiArrowLeft />}
          onClick={onBack}
        />
        <Heading size="lg">{subjectName}</Heading>
      </HStack>

      <StatGroup mb={8}>
        <Stat>
          <StatLabel>Total Students</StatLabel>
          <StatNumber>{stats.totalStudents}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Evaluated</StatLabel>
          <StatNumber>{stats.evaluatedCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Pending</StatLabel>
          <StatNumber>{stats.pendingCount}</StatNumber>
        </Stat>
      </StatGroup>
    </>
  );
};
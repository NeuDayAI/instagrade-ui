import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  IconButton,
  Checkbox,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiFileText } from 'react-icons/fi';
import { Student, StudentMarks } from '../../types/exam';
import { VerificationActions } from './VerificationActions';

interface StudentListProps {
  students: Student[];
  studentMarks: StudentMarks[];
  examId: number;
  subjectId: number;
  isExaminer: boolean;
  selectedRows: StudentMarks[];
  onRowSelect: (marks: StudentMarks, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

export const StudentList = ({
  students,
  studentMarks,
  examId,
  subjectId,
  isExaminer,
  selectedRows,
  onRowSelect,
  onSelectAll,
}: StudentListProps) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {isExaminer && (
            <Th>
              <Checkbox
                isChecked={selectedRows.length === studentMarks.length}
                isIndeterminate={selectedRows.length > 0 && selectedRows.length < studentMarks.length}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </Th>
          )}
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Status</Th>
          <Th>Marks</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {students.map((student) => {
          const marks = studentMarks.find(sm => sm.student_id === student.student_id);
          return (
            <Tr key={student.student_id}>
              {isExaminer && (
                <Td>
                  <Checkbox
                    isChecked={selectedRows.some(row => row.student_marks_id === marks?.student_marks_id)}
                    isDisabled={!marks || marks.status !== 'pending_verification'}
                    onChange={(e) => marks && onRowSelect(marks, e.target.checked)}
                  />
                </Td>
              )}
              <Td>{student.student_id}</Td>
              <Td>{student.student_name}</Td>
              <Td>
                <HStack spacing={2}>
                  <Badge colorScheme={marks ? "green" : "orange"}>
                    {marks ? "EVALUATED" : "PENDING"}
                  </Badge>
                  {marks && (
                    <Badge colorScheme={
                      marks.status === 'verified' ? 'green' :
                      marks.status === 'rejected' ? 'red' :
                      marks.status === 'manual_evaluation' ? 'purple' : 'orange'
                    }>
                      {marks.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  )}
                </HStack>
              </Td>
              <Td>{marks?.marks_obtained || '-'}</Td>
              <Td>
                <HStack spacing={2}>
                  <Box>
                    <Tooltip label={marks ? "View Answer Sheet" : "No answer sheet available"}>
                      <IconButton
                        as={Link}
                        to={`/exam/${examId}/subject/${subjectId}/student/${student.student_id}`}
                        aria-label="View Answer Sheet"
                        icon={<FiFileText />}
                        size="sm"
                        isDisabled={!marks}
                      />
                    </Tooltip>
                  </Box>
                  {isExaminer && marks?.status === 'pending_verification' && (
                    <VerificationActions
                      selectedMarks={[marks]}
                      onVerificationComplete={() => onRowSelect(marks, false)}
                    />
                  )}
                </HStack>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
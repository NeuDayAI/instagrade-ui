import React from 'react';
import {
  VStack,
  HStack,
  Button,
  useDisclosure,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { AddStudentModal } from './Modals/AddStudentModal';
import { EditStudentModal } from './Modals/EditStudentModal';
import { useExamStore } from '../../store/examStore';
import { ImportDataButton } from './Common/ImportDataButton';
import { DataTable } from './Common/DataTable';
import { Student } from '../../types/exam';

export const StudentManager = () => {
  const { 
    isOpen: isAddOpen, 
    onOpen: onAddOpen, 
    onClose: onAddClose 
  } = useDisclosure();
  const { 
    isOpen: isEditOpen, 
    onOpen: onEditOpen, 
    onClose: onEditClose 
  } = useDisclosure();
  const toast = useToast();
  const { students, deleteStudent, getDepartmentName, getSemesterName } = useExamStore();
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

  const columnHelper = createColumnHelper<Student>();
  
  const columns = [
    columnHelper.accessor('student_id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('student_name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('department_id', {
      header: 'Department',
      cell: info => getDepartmentName(info.getValue()),
    }),
    columnHelper.accessor('semester_id', {
      header: 'Semester',
      cell: info => getSemesterName(info.getValue()),
    }),
    columnHelper.accessor('year_of_study', {
      header: 'Year',
      cell: info => (
        <Badge colorScheme="blue">
          Year {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('academic_year', {
      header: 'Academic Year',
      cell: info => info.getValue(),
    }),
  ];

  const handleImport = (data: any[]) => {
    toast({
      title: 'Students imported successfully',
      status: 'success',
      duration: 3000,
    });
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    onEditOpen();
  };

  const handleDelete = (student: Student) => {
    deleteStudent(student.student_id);
    toast({
      title: 'Student deleted',
      description: `${student.student_name} has been removed`,
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between">
        <Button colorScheme="blue" onClick={onAddOpen}>
          Add Student
        </Button>
        <ImportDataButton onImport={handleImport} />
      </HStack>

      <DataTable
        data={students}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddStudentModal isOpen={isAddOpen} onClose={onAddClose} />
      {selectedStudent && (
        <EditStudentModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          student={selectedStudent}
        />
      )}
    </VStack>
  );
};
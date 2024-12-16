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
import { AddSubjectModal } from './Modals/AddSubjectModal';
import { EditSubjectModal } from './Modals/EditSubjectModal';
import { useExamStore } from '../../store/examStore';
import { ImportDataButton } from './Common/ImportDataButton';
import { DataTable } from './Common/DataTable';
import { Subject } from '../../types/exam';

export const SubjectManager = () => {
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
  const { subjects, deleteSubject, getDepartmentName } = useExamStore();
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);

  const columnHelper = createColumnHelper<Subject>();
  
  const columns = [
    columnHelper.accessor('subject_id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('subject_name', {
      header: 'Subject Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('department_id', {
      header: 'Department',
      cell: info => getDepartmentName(info.getValue()),
    }),
    columnHelper.accessor('subject_type', {
      header: 'Type',
      cell: info => (
        <Badge colorScheme={info.getValue() === 'Core' ? 'blue' : 'purple'}>
          {info.getValue()}
        </Badge>
      ),
    }),
  ];

  const handleImport = (data: any[]) => {
    toast({
      title: 'Subjects imported successfully',
      status: 'success',
      duration: 3000,
    });
  };

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    onEditOpen();
  };

  const handleDelete = (subject: Subject) => {
    deleteSubject(subject.subject_id);
    toast({
      title: 'Subject deleted',
      description: `${subject.subject_name} has been removed`,
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between">
        <Button colorScheme="blue" onClick={onAddOpen}>
          Add Subject
        </Button>
        <ImportDataButton onImport={handleImport} />
      </HStack>

      <DataTable
        data={subjects}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddSubjectModal isOpen={isAddOpen} onClose={onAddClose} />
      {selectedSubject && (
        <EditSubjectModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          subject={selectedSubject}
        />
      )}
    </VStack>
  );
};
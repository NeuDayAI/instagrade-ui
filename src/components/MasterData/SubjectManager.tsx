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
import { ImportDataButton } from './Common/ImportDataButton';
import { DataTable } from './Common/DataTable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subjectService, departmentService , Subject} from '@/services/api';
import {  } from '@/services/api';

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
 
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);
  const queryClient = useQueryClient();
  const columnHelper = createColumnHelper<Subject>();
  
  const querySubject = useQuery(
    ['subjects'],
    () => subjectService.getSubjects()
  );

  const queryDepartment = useQuery(
    ['departments'],
    () => departmentService.getDepartments()
  );

  const getDepartmentName = (departmentId: number) => {
    const department = queryDepartment.data?.data.data.find(
      dep => dep.department_id === departmentId
    );
    return department?.department_name || '';
  }
  // Mutation to delete a subject
  const deleteMutation = useMutation(subjectService.deleteSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects']);
      toast({
        title: 'Subject deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

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
    deleteMutation.mutate(subject.subject_id);
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
        data={querySubject.data?.data.data || []}
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
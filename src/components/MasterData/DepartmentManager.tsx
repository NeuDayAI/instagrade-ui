import React, { useEffect } from 'react';
import {
  VStack,
  HStack,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { AddDepartmentModal } from './Modals/AddDepartmentModal';
import { EditDepartmentModal } from './Modals/EditDepartmentModal';
import { ImportDataButton } from './Common/ImportDataButton';
import { DataTable } from './Common/DataTable';
import { APIError, Department } from '@/services/api';
import { departmentService } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from 'axios';

export const DepartmentManager = () => {
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
  const queryClient = useQueryClient()
  const query = useQuery(
    ['departments'],
    () => departmentService.getDepartments()
  );
  
  const [selectedDepartment, setSelectedDepartment] = React.useState<Department | null>(null);

  const columnHelper = createColumnHelper<Department>();
  
  const columns = [
    columnHelper.accessor('department_id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('department_name', {
      header: 'Department Name',
      cell: info => info.getValue(),
    }),
  ];

  const handleImport = (data: any[]) => {
    toast({
      title: 'Data imported successfully',
      status: 'success',
      duration: 3000,
    });
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    onEditOpen();
  };

  const deleteDepartmentMutation = useMutation(
    (id: number) => departmentService.deleteDepartment(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['departments']);
        toast({
          title: 'Department deleted successfully',
          status: 'success',
          duration: 3000,
        });
      },
      onError: (error: AxiosError<APIError>) => {
        let errorMessage : string = '';
          if (error.response) {
            // Server responded with an error status
            errorMessage = error.response.data.message;
          } else if (error.request) {
            // Request made but no response received
            errorMessage = 'Network error: ' + error.request;
          } else {
            // Something else went wrong
            errorMessage = error.message;
          }
        toast({
          title: 'Failed to delete department',
          description: errorMessage,
          status: 'error',
          duration: 3000,
        });
      },
    }
  );
  const handleDelete = (department: Department) => {
    deleteDepartmentMutation.mutate(department.department_id);
  };
 

  return (
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between">
        <Button colorScheme="blue" onClick={onAddOpen}>
          Add Department
        </Button>
        <ImportDataButton onImport={handleImport} />
      </HStack>

      <DataTable
        data={query?.data?.data.data || []}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddDepartmentModal isOpen={isAddOpen} onClose={onAddClose} />
      {selectedDepartment && (
        <EditDepartmentModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          department={selectedDepartment}
        />
      )}
    </VStack>
  );
};
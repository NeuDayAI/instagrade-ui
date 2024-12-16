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
import { useExamStore } from '../../store/examStore';
import { ImportDataButton } from './Common/ImportDataButton';
import { DataTable } from './Common/DataTable';
import { Department } from '../../types/exam';
import { departmentService } from '@/services/api';

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
  const { deleteDepartment } = useExamStore();
  const [departments, setDepartments] = React.useState<Department[]>([]);
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

  const handleDelete = (department: Department) => {
    deleteDepartment(department.department_id);
    toast({
      title: 'Department deleted',
      description: `${department.department_name} has been removed`,
      status: 'success',
      duration: 3000,
    });
  };

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getDepartments();
      setDepartments(response.data.items);
    } catch (error) {
      toast({
        title: 'Error fetching departments',
        status: 'error',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between">
        <Button colorScheme="blue" onClick={onAddOpen}>
          Add Department
        </Button>
        <ImportDataButton onImport={handleImport} />
      </HStack>

      <DataTable
        data={departments}
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
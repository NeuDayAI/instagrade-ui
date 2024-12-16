import React from 'react';
import {
  VStack,
  HStack,
  Button,
  useDisclosure,
  useToast,
  Badge,
  Switch,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { AddUserModal } from './Modals/AddUserModal';
import { EditUserModal } from './Modals/EditUserModal';
import { useExamStore } from '../../store/examStore';
import { ImportDataButton } from './Common/ImportDataButton';
import { DataTable } from './Common/DataTable';
import { User } from '../../types/exam';

export const UserManager = () => {
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
  const { users, deleteUser } = useExamStore();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const columnHelper = createColumnHelper<User>();
  
  const columns = [
    columnHelper.accessor('full_name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: info => (
        <Badge colorScheme={getRoleBadgeColor(info.getValue())}>
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('is_active', {
      header: 'Status',
      cell: info => (
        <Switch
          isChecked={info.getValue()}
          colorScheme="green"
          isDisabled={info.row.original.is_superuser}
        />
      ),
    }),
    columnHelper.accessor('is_superuser', {
      header: 'Super User',
      cell: info => (
        <Badge colorScheme={info.getValue() ? 'purple' : 'gray'}>
          {info.getValue() ? 'Yes' : 'No'}
        </Badge>
      ),
    }),
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'red';
      case 'Examiner':
        return 'purple';
      case 'Student':
        return 'green';
      default:
        return 'gray';
    }
  };

  const handleImport = (data: any[]) => {
    toast({
      title: 'Users imported successfully',
      status: 'success',
      duration: 3000,
    });
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    onEditOpen();
  };

  const handleDelete = (user: User) => {
    if (user.is_superuser) {
      toast({
        title: 'Cannot delete superuser',
        status: 'error',
        duration: 3000,
      });
      return;
    }
    deleteUser(user.id);
    toast({
      title: 'User deleted',
      description: `${user.full_name} has been removed`,
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between">
        <Button colorScheme="blue" onClick={onAddOpen}>
          Add User
        </Button>
        <ImportDataButton onImport={handleImport} />
      </HStack>

      <DataTable
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddUserModal isOpen={isAddOpen} onClose={onAddClose} />
      {selectedUser && (
        <EditUserModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          user={selectedUser}
        />
      )}
    </VStack>
  );
};
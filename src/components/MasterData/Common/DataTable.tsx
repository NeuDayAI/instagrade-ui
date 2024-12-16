import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
  HStack,
  Select,
  IconButton,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button, 
  Icon,
} from '@chakra-ui/react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortDirection,
  SortingState,
} from '@tanstack/react-table';
import { FiEdit2, FiTrash2, FiSearch, FiChevronUp, FiChevronDown } from 'react-icons/fi';

const SortIcon = ({ direction }: { direction: false | SortDirection }) => {
  if (!direction) return null;
  return (
    <Icon
      as={direction === 'asc' ? FiChevronUp : FiChevronDown}
      ml={2}
      boxSize={4}
    />
  );
};

interface DataTableProps<T> {
  data: T[];
  columns: any[];
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

export function DataTable<T>({ data, columns, onEdit, onDelete }: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState('');
  const [deleteItem, setDeleteItem] = React.useState<T | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const handleDelete = (row: T) => {
    setDeleteItem(row);
    onOpen();
  };

  const confirmDelete = () => {
    if (deleteItem) {
      onDelete(deleteItem);
      setDeleteItem(null);
      onClose();
    }
  };

  return (
    <Box>
      <HStack mb={4} spacing={4}>
        <Box flex={1}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color={useColorModeValue('gray.400', 'gray.500')} />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              value={filtering}
              onChange={e => setFiltering(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Select
          w="200px"
          placeholder="Rows per page"
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </HStack>

      <Table variant={useColorModeValue('simple', 'unstyled')}>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  cursor="pointer"
                  bg={useColorModeValue('gray.50', 'gray.700')}
                >
                  <HStack spacing={1}>
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>
                    <SortIcon direction={header.column.getIsSorted()} />
                  </HStack>
                </Th>
              ))}
              <Th>Actions</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit"
                    icon={<FiEdit2 />}
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => onEdit(row.original)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<FiTrash2 />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleDelete(row.original)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Item</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
import React, { useCallback } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { read, utils } from 'xlsx';
import { FiUpload } from 'react-icons/fi';

interface ImportDataButtonProps {
  onImport: (data: any[]) => void;
}

export const ImportDataButton = ({ onImport }: ImportDataButtonProps) => {
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(firstSheet);
        onImport(jsonData);
      } catch (error) {
        toast({
          title: 'Error importing file',
          description: 'Please check the file format and try again',
          status: 'error',
          duration: 3000,
        });
      }
    };

    reader.readAsArrayBuffer(file);
  }, [onImport, toast]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv']
    },
    multiple: false,
  });

  return (
    <Button
      {...getRootProps()}
      variant="outline"
      colorScheme="blue"
    >
      <FiUpload style={{ marginRight: '8px' }} />
      Import from Excel
      <input {...getInputProps()} style={{ display: 'none' }} />
    </Button>
  );
};
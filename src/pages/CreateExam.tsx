import React from 'react';
import { Container, Box, useColorModeValue } from '@chakra-ui/react';
import { BreadcrumbNav } from '../components/Layout/Breadcrumb';
import { CreateExamStepper } from '../components/CreateExam/CreateExamStepper';

export const CreateExam = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <BreadcrumbNav />
      <Box 
        bg={useColorModeValue('white', 'gray.700')} 
        borderRadius="lg" 
        p={8} 
        shadow="sm"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <CreateExamStepper />
      </Box>
    </Container>
  );
};
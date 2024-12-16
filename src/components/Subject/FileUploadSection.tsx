import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Progress,
  VStack,
  Button,
  HStack,
} from '@chakra-ui/react';
import { FiFileText } from 'react-icons/fi';

interface FileUploadState {
  progress: number;
  isUploading: boolean;
}

interface FileUploadSectionProps {
  isAdmin: boolean;
  uploadStates: {
    questionPaper?: FileUploadState;
    modelAnswer?: FileUploadState;
    answerSheets?: FileUploadState;
  };
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  questionPaperUrl: string;
  modelAnswerUrl: string;
}

export const FileUploadSection = ({
  isAdmin,
  uploadStates,
  onFileUpload,
  questionPaperUrl,
  modelAnswerUrl,
}: FileUploadSectionProps) => {
  if (!isAdmin) {
    return (
      <HStack spacing={4} mb={6}>
        <Button
          as="a"
          href={questionPaperUrl}
          target="_blank"
          leftIcon={<FiFileText />}
          colorScheme="blue"
          variant="outline"
        >
          View Question Paper
        </Button>
        <Button
          as="a"
          href={modelAnswerUrl}
          target="_blank"
          leftIcon={<FiFileText />}
          colorScheme="purple"
          variant="outline"
        >
          View Model Answer
        </Button>
      </HStack>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Upload Question Paper</FormLabel>
        <Input
          accept=".pdf"
          type="file"
          onChange={(e) => onFileUpload(e, 'questionPaper')}
        />
        {uploadStates.questionPaper?.isUploading && (
          <Progress 
            size="sm" 
            value={uploadStates.questionPaper.progress} 
            mt={2} 
            colorScheme="blue" 
          />
        )}
      </FormControl>
      
      <FormControl>
        <FormLabel>Upload Model Answer</FormLabel>
        <Input
          accept=".pdf"
          type="file"
          onChange={(e) => onFileUpload(e, 'modelAnswer')}
        />
        {uploadStates.modelAnswer?.isUploading && (
          <Progress 
            size="sm" 
            value={uploadStates.modelAnswer.progress} 
            mt={2} 
            colorScheme="blue" 
          />
        )}
      </FormControl>
      
      <FormControl>
        <FormLabel>Upload Answer Sheets (Bulk)</FormLabel>
        <Input
          accept=".pdf"
          type="file"
          multiple
          onChange={(e) => onFileUpload(e, 'answerSheets')}
        />
        {uploadStates.answerSheets?.isUploading && (
          <Progress 
            size="sm" 
            value={uploadStates.answerSheets.progress} 
            mt={2} 
            colorScheme="blue" 
          />
        )}
      </FormControl>
    </VStack>
  );
};
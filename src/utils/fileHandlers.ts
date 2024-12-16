import { UseToastOptions } from '@chakra-ui/react';

export const handleFileUpload = (
  file: File | null,
  type: 'question' | 'answers',
  toast: (options: UseToastOptions) => void
) => {
  if (file) {
    toast({
      title: `${type === 'question' ? 'Question paper' : 'Answer sheets'} uploaded`,
      status: 'success',
      duration: 3000,
    });
    return true;
  }
  return false;
};
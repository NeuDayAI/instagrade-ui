import React from 'react';
import {
  VStack,
  Box,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useColorModeValue,
  Divider,
  Heading,
} from '@chakra-ui/react';

interface MarksPanelProps {
  onDragStart: (marks: number) => void;
}

export const MarksPanel = ({ onDragStart }: MarksPanelProps) => {
  const [customMarks, setCustomMarks] = React.useState<number>(0);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const predefinedMarks = [1, 2, 3, 4, 5, 10, 15, 20];
  const commonFractions = [0.5, 1.5, 2.5, 3.5, 4.5];

  const handleDragStart = (e: React.DragEvent, marks: number) => {
    e.dataTransfer.setData('text/plain', marks.toString());
    onDragStart(marks);
  };

  const MarkButton = ({ marks }: { marks: number }) => (
    <Button
      draggable
      onDragStart={(e) => handleDragStart(e, marks)}
      size="sm"
      variant="outline"
      w="full"
      cursor="grab"
      _active={{ cursor: 'grabbing' }}
      _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
    >
      {marks}
    </Button>
  );

  return (
    <VStack
      spacing={4}
      p={4}
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      align="stretch"
      h="full"
      overflowY="auto"
    >
      <Heading size="sm">Marking Tools</Heading>
      
      <Box>
        <Text mb={2} fontWeight="medium">Custom Marks</Text>
        <NumberInput
          value={customMarks}
          onChange={(_, value) => setCustomMarks(value)}
          step={0.5}
          min={0}
          max={20}
          precision={1}
          mb={2}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          colorScheme="blue"
          size="sm"
          w="full"
          draggable
          onDragStart={(e) => handleDragStart(e, customMarks)}
          cursor="grab"
          _active={{ cursor: 'grabbing' }}
        >
          Drag {customMarks} marks
        </Button>
      </Box>

      <Divider />

      <Box>
        <Text mb={2} fontWeight="medium">Common Marks</Text>
        <VStack spacing={2}>
          {predefinedMarks.map((marks) => (
            <MarkButton key={marks} marks={marks} />
          ))}
        </VStack>
      </Box>

      <Divider />

      <Box>
        <Text mb={2} fontWeight="medium">Partial Marks</Text>
        <VStack spacing={2}>
          {commonFractions.map((marks) => (
            <MarkButton key={marks} marks={marks} />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};
import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  HStack,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { Rubric } from '../../types/exam';

interface RubricSelectorProps {
  rubrics: Rubric[];
  selectedRubric: string;
  onChange: (rubricId: string) => void;
  rubricText: string;
}

export const RubricSelector = ({ 
  rubrics, 
  selectedRubric, 
  onChange,
  rubricText 
}: RubricSelectorProps) => {
  return (
    <FormControl mb={4}>
      <FormLabel>Select Evaluation Rubric</FormLabel>
      <HStack>
        <Select
          value={selectedRubric}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Choose a rubric"
        >
          {rubrics.map((rubric) => (
            <option key={rubric.rubric_id} value={rubric.rubric_id}>
              {rubric.name}
            </option>
          ))}
        </Select>
        <Popover placement="right">
          <PopoverTrigger>
            <IconButton
              aria-label="View rubric details"
              icon={<FiInfo />}
              size="sm"
              variant="ghost"
            />
          </PopoverTrigger>
          <PopoverContent maxW="400px">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody whiteSpace="pre-wrap">
              {rubricText}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </FormControl>
  );
};
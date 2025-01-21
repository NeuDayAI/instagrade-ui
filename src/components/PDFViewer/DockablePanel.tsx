import React from 'react';
import {
  Box,
  IconButton,
  Heading,
  HStack,
  useColorModeValue,
  Collapse,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiMinimize2 } from 'react-icons/fi';

interface DockableProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  position?: 'left' | 'right';
  width?: string;
}

export const DockablePanel = ({
  title,
  children,
  isOpen,
  onToggle,
  position = 'left',
  width = '300px',
}: DockableProps) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      position="relative"
      h="full"
      w={isOpen ? width : '40px'}
      transition="width 0.2s"
      borderRight={position === 'left' ? '1px' : undefined}
      borderLeft={position === 'right' ? '1px' : undefined}
      borderColor={borderColor}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={bgColor}
        overflow="hidden"
      >
        <HStack
          p={2}
          borderBottomWidth="1px"
          borderColor={borderColor}
          justify="space-between"
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Collapse in={isOpen} style={{ width: '100%' }}>
            <Heading size="sm">{title}</Heading>
          </Collapse>
          <IconButton
            aria-label={isOpen ? 'Collapse' : 'Expand'}
            icon={isOpen 
              ? (position === 'left' ? <FiChevronLeft /> : <FiChevronRight />)
              : (position === 'left' ? <FiChevronRight /> : <FiChevronLeft />)
            }
            size="sm"
            variant="ghost"
            onClick={onToggle}
          />
        </HStack>
        <Collapse in={isOpen} style={{ height: 'calc(100% - 45px)' }}>
          <Box p={4} h="full" overflowY="auto">
            {children}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

interface DraggableMarkerProps {
  marks: number;
  position: { x: number; y: number };
  onPositionChange: (x: number, y: number) => void;
  onDelete: () => void;
}

export const DraggableMarker = ({ marks, position, onPositionChange, onDelete }: DraggableMarkerProps) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const markerRef = React.useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    if (markerRef.current) {
      const rect = markerRef.current.getBoundingClientRect();
      e.dataTransfer.setData('offset-x', (e.clientX - rect.left).toString());
      e.dataTransfer.setData('offset-y', (e.clientY - rect.top).toString());
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    onDelete();
  };

  return (
    <Box
      ref={markerRef}
      position="absolute"
      left={position.x}
      top={position.y}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
      cursor={isDragging ? 'grabbing' : 'grab'}
      bg={useColorModeValue('blue.500', 'blue.200')}
      color={useColorModeValue('white', 'gray.800')}
      px={2}
      py={1}
      borderRadius="md"
      boxShadow="md"
      userSelect="none"
      _hover={{
        transform: 'scale(1.05)',
      }}
      transition="transform 0.2s"
    >
      <Text fontSize="sm" fontWeight="bold">
        {marks}
      </Text>
    </Box>
  );
};
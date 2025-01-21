import React from 'react';
import {
  Box,
  VStack,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  Tooltip,
  Button,
} from '@chakra-ui/react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FiDownload, FiZoomIn, FiZoomOut, FiTrash2 } from 'react-icons/fi';
import { DraggableMarker } from './DraggableMarker';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Marker {
  id: string;
  marks: number;
  position: { x: number; y: number };
  pageNumber: number;
}

interface PDFViewerProps {
  pdfUrl: string;
  onMarksUpdate?: (totalMarks: number) => void;
}

export const PDFViewer = ({ pdfUrl, onMarksUpdate }: PDFViewerProps) => {
  const [numPages, setNumPages] = React.useState(0);
  const [scale, setScale] = React.useState(1.0);
  const [markers, setMarkers] = React.useState<Marker[]>([]);
  const pdfContainerRef = React.useRef<HTMLDivElement>(null);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDrop = (e: React.DragEvent, pageNumber: number) => {
    e.preventDefault();
    if (!pdfContainerRef.current) return;

    const marks = parseFloat(e.dataTransfer.getData('text/plain'));
    if (isNaN(marks)) return;

    const containerRect = pdfContainerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    const newMarker: Marker = {
      id: crypto.randomUUID(),
      marks,
      position: { x, y },
      pageNumber,
    };

    setMarkers(prev => {
      const newMarkers = [...prev, newMarker];
      updateTotalMarks(newMarkers);
      return newMarkers;
    });
  };

  const updateTotalMarks = (currentMarkers: Marker[]) => {
    const total = currentMarkers.reduce((sum, marker) => sum + marker.marks, 0);
    onMarksUpdate?.(total);
  };

  const clearAllMarkers = () => {
    setMarkers([]);
    onMarksUpdate?.(0);
  };

  return (
    <VStack spacing={4} align="stretch" h="full">
      <HStack justify="space-between">
        <HStack spacing={2}>
          <Tooltip label="Zoom Out">
            <IconButton
              aria-label="Zoom out"
              icon={<FiZoomOut />}
              onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
              size="sm"
            />
          </Tooltip>
          <Tooltip label="Zoom In">
            <IconButton
              aria-label="Zoom in"
              icon={<FiZoomIn />}
              onClick={() => setScale(prev => Math.min(prev + 0.2, 2.0))}
              size="sm"
            />
          </Tooltip>
          <Text fontSize="sm" color="gray.500">
            {Math.round(scale * 100)}% zoom
          </Text>
        </HStack>
        <HStack>
          <Button
            leftIcon={<FiTrash2 />}
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={clearAllMarkers}
          >
            Clear Marks
          </Button>
          <IconButton
            aria-label="Download PDF"
            icon={<FiDownload />}
            size="sm"
          />
        </HStack>
      </HStack>

      <Box
        ref={pdfContainerRef}
        flex={1}
        overflowY="auto"
        position="relative"
        onDragOver={(e) => e.preventDefault()}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading={<Text>Loading PDF...</Text>}
          error={<Text color="red.500">Failed to load PDF</Text>}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Box
              key={`page_${index + 1}`}
              position="relative"
              onDrop={(e) => handleDrop(e, index + 1)}
            >
              <Page
                pageNumber={index + 1}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
              {markers
                .filter(marker => marker.pageNumber === index + 1)
                .map(marker => (
                  <DraggableMarker
                    key={marker.id}
                    marks={marker.marks}
                    position={marker.position}
                    onPositionChange={(x, y) => {
                      setMarkers(prev =>
                        prev.map(m =>
                          m.id === marker.id
                            ? { ...m, position: { x, y } }
                            : m
                        )
                      );
                    }}
                    onDelete={() => {
                      setMarkers(prev => {
                        const newMarkers = prev.filter(m => m.id !== marker.id);
                        updateTotalMarks(newMarkers);
                        return newMarkers;
                      });
                    }}
                  />
                ))}
            </Box>
          ))}
        </Document>
      </Box>
    </VStack>
  );
};
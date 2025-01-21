import React from 'react';
import {
  Grid,
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
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { MarksPanel } from './MarksPanel';
import { DraggableMarker } from './DraggableMarker';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Marker {
  id: string;
  marks: number;
  position: { x: number; y: number };
  pageNumber: number;
}

interface EnhancedPDFViewerProps {
  pdfUrl: string;
  onMarksUpdate?: (totalMarks: number) => void;
}

export const EnhancedPDFViewer = ({ pdfUrl, onMarksUpdate }: EnhancedPDFViewerProps) => {
  const [numPages, setNumPages] = React.useState(0);
  const [scale, setScale] = React.useState(1.0);
  const [markers, setMarkers] = React.useState<Marker[]>([]);
  const [draggedMarks, setDraggedMarks] = React.useState<number | null>(null);
  const pdfContainerRef = React.useRef<HTMLDivElement>(null);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDrop = (e: React.DragEvent, pageNumber: number) => {
    e.preventDefault();
    if (!pdfContainerRef.current || draggedMarks === null) return;

    const containerRect = pdfContainerRef.current.getBoundingClientRect();
    const offsetX = parseInt(e.dataTransfer.getData('offset-x')) || 0;
    const offsetY = parseInt(e.dataTransfer.getData('offset-y')) || 0;

    const x = e.clientX - containerRect.left - offsetX;
    const y = e.clientY - containerRect.top - offsetY;

    const newMarker: Marker = {
      id: crypto.randomUUID(),
      marks: draggedMarks,
      position: { x, y },
      pageNumber,
    };

    setMarkers(prev => [...prev, newMarker]);
    updateTotalMarks([...markers, newMarker]);
  };

  const handleMarkerPositionChange = (markerId: string, x: number, y: number) => {
    setMarkers(prev =>
      prev.map(marker =>
        marker.id === markerId
          ? { ...marker, position: { x, y } }
          : marker
      )
    );
  };

  const handleMarkerDelete = (markerId: string) => {
    setMarkers(prev => {
      const newMarkers = prev.filter(marker => marker.id !== markerId);
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
    <Grid templateColumns={{ base: '1fr', lg: '250px 1fr' }} gap={4} h="full">
      <MarksPanel onDragStart={setDraggedMarks} />
      
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        p={4}
        borderRadius="md"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
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
            flex="1"
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
                        onPositionChange={(x, y) => handleMarkerPositionChange(marker.id, x, y)}
                        onDelete={() => handleMarkerDelete(marker.id)}
                      />
                    ))}
                </Box>
              ))}
            </Document>
          </Box>
        </VStack>
      </Box>
    </Grid>
  );
};
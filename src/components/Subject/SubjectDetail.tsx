import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  useToast,
  Progress,
  useColorModeValue,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Subject, StudentMarks } from '../../types/exam';
import { useExamStore } from '../../store/examStore';
import { useAuthStore } from '../../store/authStore';
import { AssignExaminerModal } from '../Exam/AssignExaminerModal';
import { SubjectHeader } from './SubjectHeader';
import { RubricSelector } from './RubricSelector';
import { FileUploadSection } from './FileUploadSection';
import { StudentList } from './StudentList';
import { VerificationActions } from './VerificationActions';

interface SubjectDetailProps {
  subject: Subject;
  examId: number;
}

export const SubjectDetail = ({ subject, examId }: SubjectDetailProps) => {
  const toast = useToast();
  const { 
    isOpen: isAssignExaminerOpen, 
    onOpen: onAssignExaminerOpen, 
    onClose: onAssignExaminerClose 
  } = useDisclosure();

  const navigate = useNavigate();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedRubric, setSelectedRubric] = useState('');
  const [selectedRubricText, setSelectedRubricText] = useState('');
  const [selectedRows, setSelectedRows] = useState<StudentMarks[]>([]);
  const [uploadStates, setUploadStates] = useState({});

  const { rubrics, getDepartmentName, getStudentMarks } = useExamStore();
  const { user } = useAuthStore();
  const studentMarks = getStudentMarks(examId, subject.subject_id);
  const students = useExamStore(state => state.students);

  const evaluatedCount = studentMarks.length;
  const totalStudents = students.length;
  const pendingCount = totalStudents - evaluatedCount;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    // Implementation remains the same
  };

  const handleRubricChange = (rubricId: string) => {
    setSelectedRubric(rubricId);
    if (rubricId) {
      const rubric = rubrics.find(r => r.rubric_id === Number(rubricId));
      setSelectedRubricText(rubric?.rubric_text || '');
    } else {
      setSelectedRubricText('');
    }
  };

  const startEvaluation = () => {
    if (!selectedRubric) {
      toast({
        title: "Please select a rubric",
        description: "An evaluation rubric must be selected before starting evaluation",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setIsEvaluating(true);
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsEvaluating(false);
        toast({
          title: "Evaluation completed",
          status: "success",
          duration: 3000,
        });
      }
    }, 1000);
  };

  return (
    <Box p={6}>
      <SubjectHeader
        subjectName={subject.subject_name}
        stats={{ totalStudents, evaluatedCount, pendingCount }}
        onBack={() => navigate(-1)}
      />
      
      <VStack spacing={6} align="stretch">
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Text fontWeight="bold" mb={2}>Subject Details</Text>
          <Text>Type: {subject.subject_type}</Text>
          <Text>Department: {getDepartmentName(subject.department_id)}</Text>
          {subject.rubric_id && (
            <Text>
              Rubric: {rubrics.find(r => r.rubric_id === subject.rubric_id)?.name}
            </Text>
          )}
        </Box>

        {!subject.rubric_id && user?.role === 'Examiner' && (
          <RubricSelector
            rubrics={rubrics}
            selectedRubric={selectedRubric}
            onChange={handleRubricChange}
            rubricText={selectedRubricText}
          />
        )}

        <FileUploadSection
          isAdmin={user?.role === 'Admin'}
          uploadStates={uploadStates}
          onFileUpload={handleFileUpload}
          questionPaperUrl="/sample-question.pdf"
          modelAnswerUrl="/sample-answer.pdf"
        />

        {isEvaluating && (
          <Box>
            <Text mb={2}>Evaluation in progress...</Text>
            <Progress value={progress} size="lg" colorScheme="blue" />
          </Box>
        )}

        {user?.role === 'Examiner' && (
          <Button
            colorScheme="blue"
            onClick={startEvaluation}
            isLoading={isEvaluating}
            loadingText="Evaluating"
          >
            Start Evaluation
          </Button>
        )}
        
        {user?.role === 'Admin' && (
          <Button
            colorScheme="purple"
            onClick={onAssignExaminerOpen}
          >
            Assign Examiner
          </Button>
        )}

        <AssignExaminerModal
          isOpen={isAssignExaminerOpen}
          onClose={onAssignExaminerClose}
          examId={examId}
          subjectId={subject.subject_id}
        />

        <Box>
          <Heading size="md" mb={4}>Student List</Heading>
          {user?.role === 'Examiner' && selectedRows.length > 0 && (
            <Box mb={4}>
              <VerificationActions
                selectedMarks={selectedRows}
                onVerificationComplete={() => setSelectedRows([])}
              />
            </Box>
          )}
          
          <StudentList
            students={students}
            studentMarks={studentMarks}
            examId={examId}
            subjectId={subject.subject_id}
            isExaminer={user?.role === 'Examiner'}
            selectedRows={selectedRows}
            onRowSelect={(marks, selected) => {
              setSelectedRows(prev => 
                selected 
                  ? [...prev, marks]
                  : prev.filter(row => row.student_marks_id !== marks.student_marks_id)
              );
            }}
            onSelectAll={(selected) => {
              setSelectedRows(selected ? studentMarks : []);
            }}
          />
        </Box>

      </VStack>
    </Box>
  );
};
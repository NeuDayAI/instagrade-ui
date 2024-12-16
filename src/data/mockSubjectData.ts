import { Student } from '../types/exam';

export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'John Doe',
    answerSheetUrl: '/mock-pdf/answer1.pdf',
    marks: 85,
    evaluationStatus: 'completed'
  },
  {
    id: 'STU002',
    name: 'Jane Smith',
    answerSheetUrl: '/mock-pdf/answer2.pdf',
    marks: 92,
    evaluationStatus: 'completed'
  },
  {
    id: 'STU003',
    name: 'Mike Johnson',
    answerSheetUrl: '/mock-pdf/answer3.pdf',
    marks: 78,
    evaluationStatus: 'completed'
  },
  {
    id: 'STU004',
    name: 'Sarah Williams',
    evaluationStatus: 'pending'
  },
  {
    id: 'STU005',
    name: 'Robert Brown',
    evaluationStatus: 'in_progress'
  }
];
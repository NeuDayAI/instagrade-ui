// API configuration
export const API_BASE_URL = 'http://localhost/api/v1';

export const API_ENDPOINTS = {
  // Department endpoints
  DEPARTMENTS: '/departments',
  DEPARTMENTS_FILTER: '/departments/filter',
  DEPARTMENT_BY_ID: (id: number) => `/departments/${id}`,

  // Semester endpoints
  SEMESTERS: '/semesters',
  SEMESTERS_FILTER: '/semesters/filter',
  SEMESTER_BY_ID: (id: number) => `/semesters/${id}`,

  // Subject endpoints
  SUBJECTS: '/subjects',
  SUBJECTS_FILTER: '/subjects/filter',
  SUBJECT_BY_ID: (id: number) => `/subjects/${id}`,

  // Exam endpoints
  EXAMS: '/exams',
  EXAMS_FILTER: '/exams/filter',
  EXAM_BY_ID: (id: number) => `/exams/${id}`,

  // Student endpoints
  STUDENTS: '/students',
  STUDENTS_FILTER: '/students/filter',
  STUDENT_BY_ID: (id: number) => `/students/${id}`,

  // Exam Subject endpoints
  EXAM_SUBJECTS: '/exam-subjects',
  EXAM_SUBJECTS_FILTER: '/exam-subjects/filter',
  EXAM_SUBJECT_BY_ID: (id: number) => `/exam-subjects/${id}`,

  // Student Marks endpoints
  STUDENT_MARKS: '/student-marks',
  STUDENT_MARKS_FILTER: '/student-marks/filter',
  STUDENT_MARKS_BY_ID: (id: number) => `/student-marks/${id}`,

  // File Operations endpoints
  UPLOAD_QUESTION_PAPER: '/files/upload/question-paper',
  UPLOAD_ANSWER_KEY: '/files/upload/answer-key',
  UPLOAD_ANSWER_SHEET: '/files/upload/answer-sheet',

  // OCR endpoints
  PERFORM_OCR: (examId: number, subjectId: number, studentId: number) => 
    `/ocr/${examId}/${subjectId}/${studentId}`,

  // Results endpoints
  GET_RESULT: '/results/get_result',
  RESULT_TO_PDF: '/results/result_to_pdf',

  // Evaluation endpoints
  GRADE_ANSWER: '/evaluation/grade_answer',

  // Rubrics endpoints
  RUBRICS: '/rubrics',
  RUBRICS_FILTER: '/rubrics/filter',
  RUBRIC_BY_ID: (id: number) => `/rubrics/id/${id}`,
  RUBRIC_BY_NAME: (name: string) => `/rubrics/name/${name}`,
};
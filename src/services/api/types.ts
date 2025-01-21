// Common response types
export interface PaginatedResponse<T> {
  data: T[];
  length: number;
}

// Error response type
export interface APIError {
 error: boolean,
 message: string,
 status_code: number
}

export interface Message {
  message: string;
}

// Department types
export interface Department {
  department_id: number;
  department_name: string;
}

export interface DepartmentCreate {
  department_name: string;
}

export interface DepartmentUpdate {
  department_name: string;
}

// Semester types
export interface Semester {
  semester_id: number;
  semester_name: string;
}

export interface SemesterCreate {
  semester_name: string;
}

export interface SemesterUpdate {
  semester_name: string;
}

// Subject types
export interface Subject {
  subject_id: number;
  subject_name: string;
  subject_type: string;
  department_id: number;
}

export interface SubjectCreate {
  subject_name: string;
  subject_type: string;
  department_id: number;
}

export interface SubjectUpdate {
  subject_name?: string;
  subject_type?: string;
  department_id?: number;
}

// Exam types
export interface Exam {
  exam_id: number;
  exam_name: string;
  department_id: number;
  semester_id: number;
  max_marks: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  start_date: string;
  end_date: string;
}

export interface ExamCreate {
  exam_name: string;
  department_id: number;
  semester_id: number;
  max_marks: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  start_date: string;
  end_date: string;
}

export interface ExamUpdate {
  exam_name?: string;
  department_id?: number;
  semester_id?: number;
  max_marks?: number;
  status?: 'upcoming' | 'ongoing' | 'completed';
  start_date?: string;
  end_date?: string;
}

// Student types
export interface Student {
  student_id: number;
  student_name: string;
  department_id: number;
  semester_id: number;
  year_of_study: number;
  academic_year: string;
}

export interface StudentCreate {
  student_name: string;
  department_id: number;
  semester_id: number;
  year_of_study: number;
  academic_year: string;
}

export interface StudentUpdate {
  student_name?: string;
  department_id?: number;
  semester_id?: number;
  year_of_study?: number;
  academic_year?: string;
}

// Student Marks types
export interface StudentMarks {
  student_marks_id: number;
  student_id: number;
  exam_subject_id: number;
  marks_obtained: number;
  answer_feedbacks_json: string;
  feedback_summary: string;
  exam_id: number;
  subject_id: number;
  status: 'pending_verification' | 'verified' | 'rejected' | 'manual_evaluation';
  examiner_id?: string;
  examiner_feedback?: string;
  verification_date?: string;
}

export interface StudentMarksCreate {
  student_id: number;
  exam_subject_id: number;
  marks_obtained: number;
  answer_feedbacks_json: string;
  feedback_summary: string;
  exam_id: number;
  subject_id: number;
  status: 'pending_verification' | 'verified' | 'rejected' | 'manual_evaluation';
  examiner_id?: string;
  examiner_feedback?: string;
  verification_date?: string;
}

export interface StudentMarksUpdate {
  marks_obtained?: number;
  answer_feedbacks_json?: string;
  feedback_summary?: string;
  status?: 'pending_verification' | 'verified' | 'rejected' | 'manual_evaluation';
  examiner_id?: string;
  examiner_feedback?: string;
  verification_date?: string;
}

// Rubric types
export interface Rubric {
  rubric_id: number;
  name: string;
  rubric_text: string;
}

export interface RubricCreate {
  name: string;
  rubric_text: string;
}

export interface RubricUpdate {
  name?: string;
  rubric_text?: string;
}

// Result types
export interface ResultResponse {
  exam_name: string;
  student_name: string;
  department_name: string;
  semester_name: string;
  total_marks: number;
  percentage: number;
  subject_results: Array<{
    subject_name: string;
    marks_obtained: number;
    feedback_summary: string;
    answer_feedbacks?: Record<string, {
      marks: number;
      feedback: string;
    }>;
  }>;
}
export interface Rubric {
  rubric_id: number;
  name: string;
  rubric_text: string;
}

export interface Department {
  department_id: number;
  department_name: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  full_name: string;
  is_active: boolean;
  is_superuser: boolean;
  hashed_password: string;
  department?: string;
  student_id?: string;
  joining_date?: string;
  designation?: string;
}

export interface Semester {
  semester_id: number;
  semester_name: string;
}

export interface Subject {
  subject_id: number;
  subject_name: string;
  subject_type: string;
  department_id: number;
  rubric_id?: number;
}

export interface Rubric {
  rubric_id: number;
  name: string;
  rubric_text: string;
}

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

export interface ExamSubject {
  exam_subject_id: number;
  exam_id: number;
  subject_id: number;
  max_marks: number;
  exam_date?: string;
  start_time?: string;
  duration?: number;
}

export interface Student {
  student_id: number;
  student_name: string;
  department_id: number;
  semester_id: number;
  year_of_study: number;
  academic_year: string;
}

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

export interface User {
  id: string;
  role: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string;
  hashed_password: string;
  department?: string;
  student_id?: string;
  joining_date?: string;
  designation?: string;
}
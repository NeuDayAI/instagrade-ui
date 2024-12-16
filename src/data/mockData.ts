import { Department, Exam, ExamSubject, Subject, Student, StudentMarks, Semester } from '../types/exam';
import { Rubric } from '../types/exam';

export const mockRubrics: Rubric[] = [
  {
    rubric_id: 1,
    name: "General Programming Assessment",
    rubric_text: `Code Quality (40 points):
    - Code organization and structure (10 points)
    - Proper naming conventions (10 points)
    - Code efficiency and optimization (10 points)
    - Error handling and validation (10 points)

    Problem Solving (30 points):
    - Algorithm design (15 points)
    - Solution effectiveness (15 points)

    Documentation (30 points):
    - Code comments (15 points)
    - Documentation clarity (15 points)`
  },
  {
    rubric_id: 2,
    name: "Database Design Evaluation",
    rubric_text: `Schema Design (40 points):
    - Normalization (15 points)
    - Relationship modeling (15 points)
    - Constraint definition (10 points)

    Query Optimization (30 points):
    - Index usage (15 points)
    - Query efficiency (15 points)

    Documentation (30 points):
    - Schema documentation (15 points)
    - Query documentation (15 points)`
  }
];

export const mockDepartments: Department[] = [
  { department_id: 1, department_name: 'Computer Science' },
  { department_id: 2, department_name: 'Electronics' },
  { department_id: 3, department_name: 'Artificial Intelligence' },
  { department_id: 4, department_name: 'Mechanical Engineering' },
  { department_id: 5, department_name: 'Civil Engineering' },
  { department_id: 6, department_name: 'Information Technology' },
  { department_id: 7, department_name: 'Electrical Engineering' }
];

export const mockSemesters: Semester[] = [
  { semester_id: 1, semester_name: 'Fall 2023' },
  { semester_id: 2, semester_name: 'Spring 2023' },
  { semester_id: 3, semester_name: 'Summer 2023' },
  { semester_id: 4, semester_name: 'Winter 2023' },
  { semester_id: 5, semester_name: 'Spring 2024' }
];

export const mockSubjects: Subject[] = [
  { 
    subject_id: 1, 
    subject_name: 'Data Structures',
    subject_type: 'Core',
    department_id: 1
  },
  { 
    subject_id: 2, 
    subject_name: 'Database Management',
    subject_type: 'Core',
    department_id: 1
  },
  { 
    subject_id: 3, 
    subject_name: 'Digital Electronics',
    subject_type: 'Core',
    department_id: 2
  },
  { 
    subject_id: 4, 
    subject_name: 'Machine Learning',
    subject_type: 'Core',
    department_id: 3
  },
  { 
    subject_id: 5, 
    subject_name: 'Web Development',
    subject_type: 'Elective',
    department_id: 1
  },
  { 
    subject_id: 6, 
    subject_name: 'Computer Networks',
    subject_type: 'Core',
    department_id: 1
  },
  { 
    subject_id: 7, 
    subject_name: 'Thermodynamics',
    subject_type: 'Core',
    department_id: 4
  },
  { 
    subject_id: 8, 
    subject_name: 'Structural Engineering',
    subject_type: 'Core',
    department_id: 5
  },
  { 
    subject_id: 9, 
    subject_name: 'Cloud Computing',
    subject_type: 'Elective',
    department_id: 6
  },
  { 
    subject_id: 10, 
    subject_name: 'Power Systems',
    subject_type: 'Core',
    department_id: 7
  },
  {
    subject_id: 11,
    subject_name: 'Operating Systems',
    subject_type: 'Core',
    department_id: 1
  },
  {
    subject_id: 12,
    subject_name: 'Software Engineering',
    subject_type: 'Core',
    department_id: 1
  },
  {
    subject_id: 13,
    subject_name: 'Artificial Intelligence',
    subject_type: 'Elective',
    department_id: 1
  },
  {
    subject_id: 14,
    subject_name: 'Computer Graphics',
    subject_type: 'Elective',
    department_id: 1
  }
];

export const mockExams: Exam[] = [
  {
    exam_id: 1,
    exam_name: 'End Semester Examination 2023',
    department_id: 1,
    semester_id: 1,
    max_marks: 100,
    status: 'completed',
    start_date: '2023-12-01',
    end_date: '2023-12-15'
  },
  {
    exam_id: 2,
    exam_name: 'Mid Semester Examination 2023',
    department_id: 3,
    semester_id: 1,
    max_marks: 100,
    status: 'completed',
    start_date: '2023-10-15',
    end_date: '2023-10-25'
  },
  {
    exam_id: 3,
    exam_name: 'Summer Semester 2023',
    department_id: 2,
    semester_id: 3,
    max_marks: 100,
    status: 'completed',
    start_date: '2023-07-01',
    end_date: '2023-07-15'
  },
  {
    exam_id: 4,
    exam_name: 'First Internal Assessment 2023',
    department_id: 4,
    semester_id: 1,
    max_marks: 50,
    status: 'completed',
    start_date: '2023-09-01',
    end_date: '2023-09-10'
  },
  {
    exam_id: 5,
    exam_name: 'Final Examination Spring 2024',
    department_id: 5,
    semester_id: 5,
    max_marks: 100,
    status: 'upcoming',
    start_date: '2024-04-15',
    end_date: '2024-04-30'
  },
  {
    exam_id: 6,
    exam_name: 'Mid Term Spring 2024',
    department_id: 2,
    semester_id: 5,
    max_marks: 100,
    status: 'upcoming',
    start_date: '2024-03-01',
    end_date: '2024-03-15'
  }
];

export const mockExamSubjects: ExamSubject[] = [
  {
    exam_subject_id: 1,
    exam_id: 1,
    subject_id: 1,
    max_marks: 100,
    exam_date: '2023-12-01',
    start_time: '09:00:00',
    duration: 180
  },
  {
    exam_subject_id: 2,
    exam_id: 1,
    subject_id: 2,
    max_marks: 100,
    exam_date: '2023-12-03',
    start_time: '14:00:00',
    duration: 180
  },
  {
    exam_subject_id: 3,
    exam_id: 2,
    subject_id: 4,
    max_marks: 100,
    exam_date: '2023-12-05',
    start_time: '10:00:00',
    duration: 180
  },
  {
    exam_subject_id: 4,
    exam_id: 3,
    subject_id: 3,
    max_marks: 100
  },
  {
    exam_subject_id: 5,
    exam_id: 4,
    subject_id: 7,
    max_marks: 50
  },
  {
    exam_subject_id: 6,
    exam_id: 5,
    subject_id: 8,
    max_marks: 100
  },
  {
    exam_subject_id: 7,
    exam_id: 6,
    subject_id: 3,
    max_marks: 100,
    exam_date: '2024-03-01',
    start_time: '09:00',
    duration: 180
  },
  {
    exam_subject_id: 8,
    exam_id: 6,
    subject_id: 4,
    max_marks: 100,
    exam_date: '2024-03-03',
    start_time: '14:00',
    duration: 180
  },
  {
    exam_subject_id: 9,
    exam_id: 6,
    subject_id: 5,
    max_marks: 100,
    exam_date: '2024-03-05',
    start_time: '09:00',
    duration: 180
  }
];

export const mockStudents: Student[] = [
  {
    student_id: 1,
    student_name: 'John Doe',
    department_id: 1,
    semester_id: 1,
    year_of_study: 2,
    academic_year: '2023-24'
  },
  {
    student_id: 2,
    student_name: 'Jane Smith',
    department_id: 1,
    semester_id: 1,
    year_of_study: 2,
    academic_year: '2023-24'
  },
  {
    student_id: 3,
    student_name: 'Mike Johnson',
    department_id: 2,
    semester_id: 1,
    year_of_study: 3,
    academic_year: '2023-24'
  },
  {
    student_id: 4,
    student_name: 'Sarah Williams',
    department_id: 3,
    semester_id: 1,
    year_of_study: 2,
    academic_year: '2023-24'
  },
  {
    student_id: 5,
    student_name: 'Robert Chen',
    department_id: 4,
    semester_id: 1,
    year_of_study: 3,
    academic_year: '2023-24'
  },
  {
    student_id: 6,
    student_name: 'Emily Davis',
    department_id: 5,
    semester_id: 5,
    year_of_study: 2,
    academic_year: '2023-24'
  },
  {
    student_id: 7,
    student_name: 'Alex Thompson',
    department_id: 6,
    semester_id: 1,
    year_of_study: 4,
    academic_year: '2023-24'
  },
  {
    student_id: 8,
    student_name: 'Maria Garcia',
    department_id: 7,
    semester_id: 2,
    year_of_study: 1,
    academic_year: '2023-24'
  }
];

export const mockStudentMarks: StudentMarks[] = [
  {
    student_marks_id: 1,
    student_id: 3,
    exam_subject_id: 1,
    marks_obtained: 85,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 15, feedback: 'Good understanding of concepts' },
      q2: { marks: 20, feedback: 'Excellent problem solving' }
    }),
    feedback_summary: 'Overall good performance',
    exam_id: 1,
    subject_id: 1,
    status: 'pending_verification'
  },
  {
    student_marks_id: 2,
    student_id: 3,
    exam_subject_id: 1,
    marks_obtained: 92,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 18, feedback: 'Perfect explanation' },
      q2: { marks: 25, feedback: 'Innovative approach' }
    }),
    feedback_summary: 'Exceptional performance',
    exam_id: 1,
    subject_id: 1,
    status: 'verified',
    examiner_id: '2',
    verification_date: '2024-01-15T10:30:00Z'
  },
  {
    student_marks_id: 3,
    student_id: 5,
    exam_subject_id: 5,
    marks_obtained: 45,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 22, feedback: 'Well structured answers' },
      q2: { marks: 23, feedback: 'Good practical understanding' }
    }),
    feedback_summary: 'Very good performance',
    exam_id: 4,
    subject_id: 7,
    status: 'pending_verification'
  },
  {
    student_marks_id: 4,
    student_id: 6,
    exam_subject_id: 6,
    marks_obtained: 88,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 43, feedback: 'Excellent problem analysis' },
      q2: { marks: 45, feedback: 'Great design approach' }
    }),
    feedback_summary: 'Outstanding work',
    exam_id: 5,
    subject_id: 8,
    status: 'pending_verification'
  },
  {
    student_marks_id: 5,
    student_id: 3,
    exam_subject_id: 11,
    marks_obtained: 35,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 8, feedback: 'Good understanding of basic concepts' },
      q2: { marks: 9, feedback: 'Well-structured solution' },
      q3: { marks: 10, feedback: 'Perfect implementation' },
      q4: { marks: 8, feedback: 'Minor errors in the approach' }
    }),
    feedback_summary: 'Strong performance overall with good problem-solving skills',
    exam_id: 1,
    subject_id: 11,
    status: 'verified'
  },
  {
    student_marks_id: 6,
    student_id: 3,
    exam_subject_id: 12,
    marks_obtained: 32,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 7, feedback: 'Good database design principles' },
      q2: { marks: 8, feedback: 'Correct normalization approach' },
      q3: { marks: 9, feedback: 'Well-optimized queries' },
      q4: { marks: 8, feedback: 'Good understanding of transactions' }
    }),
    feedback_summary: 'Demonstrated strong grasp of database concepts',
    exam_id: 1,
    subject_id: 12,
    status: 'verified'
  },
  {
    student_marks_id: 7,
    student_id: 3,
    exam_subject_id: 13,
    marks_obtained: 38,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 10, feedback: 'Excellent circuit analysis' },
      q2: { marks: 9, feedback: 'Very good understanding of digital logic' },
      q3: { marks: 10, feedback: 'Perfect implementation of state machines' },
      q4: { marks: 9, feedback: 'Well-designed sequential circuits' }
    }),
    feedback_summary: 'Outstanding performance in digital electronics',
    exam_id: 1,
    subject_id: 13,
    status: 'verified'
  },
  {
    student_marks_id: 8,
    student_id: 3,
    exam_subject_id: 14,
    marks_obtained: 34,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 8, feedback: 'Good understanding of ML algorithms' },
      q2: { marks: 9, feedback: 'Well-implemented neural network' },
      q3: { marks: 8, feedback: 'Good feature engineering' },
      q4: { marks: 9, feedback: 'Excellent model evaluation' }
    }),
    feedback_summary: 'Strong grasp of machine learning concepts',
    exam_id: 1,
    subject_id: 14,
    status: 'verified'
  },
  {
    student_marks_id: 9,
    student_id: 3,
    exam_subject_id: 1,
    marks_obtained: 88,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 22, feedback: 'Excellent data structure implementation' },
      q2: { marks: 23, feedback: 'Perfect algorithm analysis' },
      q3: { marks: 21, feedback: 'Great problem solving approach' },
      q4: { marks: 22, feedback: 'Optimal solution provided' }
    }),
    feedback_summary: 'Outstanding performance in data structures',
    exam_id: 1,
    subject_id: 1,
    status: 'verified'
  },
  {
    student_marks_id: 10,
    student_id: 3,
    exam_subject_id: 2,
    marks_obtained: 92,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 23, feedback: 'Perfect database design' },
      q2: { marks: 24, feedback: 'Excellent query optimization' },
      q3: { marks: 23, feedback: 'Great understanding of transactions' },
      q4: { marks: 22, feedback: 'Well explained normalization' }
    }),
    feedback_summary: 'Exceptional grasp of database concepts',
    exam_id: 1,
    subject_id: 2,
    status: 'verified',
    examiner_id: '2',
    verification_date: '2024-01-15T10:30:00Z'
  },
  {
    student_marks_id: 11,
    student_id: 3,
    exam_subject_id: 5,
    marks_obtained: 95,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 24, feedback: 'Excellent understanding of web technologies' },
      q2: { marks: 23, feedback: 'Perfect implementation of responsive design' },
      q3: { marks: 24, feedback: 'Great API design and implementation' },
      q4: { marks: 24, feedback: 'Outstanding frontend architecture' }
    }),
    feedback_summary: 'Exceptional web development skills demonstrated',
    exam_id: 2,
    subject_id: 5,
    status: 'verified',
    examiner_id: '2',
    verification_date: '2024-01-20T14:30:00Z'
  },
  {
    student_marks_id: 12,
    student_id: 3,
    exam_subject_id: 6,
    marks_obtained: 89,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 22, feedback: 'Strong understanding of network protocols' },
      q2: { marks: 23, feedback: 'Excellent analysis of network security' },
      q3: { marks: 22, feedback: 'Well-explained routing algorithms' },
      q4: { marks: 22, feedback: 'Great understanding of network layers' }
    }),
    feedback_summary: 'Strong performance in computer networks',
    exam_id: 2,
    subject_id: 6,
    status: 'verified',
    examiner_id: '4',
    verification_date: '2024-01-21T09:15:00Z'
  },
  {
    student_marks_id: 13,
    student_id: 3,
    exam_subject_id: 7,
    marks_obtained: 78,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 20, feedback: 'Good understanding of OS concepts' },
      q2: { marks: 19, feedback: 'Well-explained process scheduling' },
      q3: { marks: 20, feedback: 'Good memory management analysis' },
      q4: { marks: 19, feedback: 'Clear understanding of file systems' }
    }),
    feedback_summary: 'Good grasp of operating system concepts',
    exam_id: 3,
    subject_id: 11,
    status: 'verified',
    examiner_id: '2',
    verification_date: '2024-02-01T11:45:00Z'
  },
  {
    student_marks_id: 14,
    student_id: 3,
    exam_subject_id: 8,
    marks_obtained: 91,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 23, feedback: 'Excellent software design patterns' },
      q2: { marks: 23, feedback: 'Perfect agile methodology explanation' },
      q3: { marks: 22, feedback: 'Great project management approach' },
      q4: { marks: 23, feedback: 'Strong testing strategies' }
    }),
    feedback_summary: 'Outstanding software engineering principles',
    exam_id: 3,
    subject_id: 12,
    status: 'verified',
    examiner_id: '4',
    verification_date: '2024-02-02T13:20:00Z'
  },
  {
    student_marks_id: 15,
    student_id: 3,
    exam_subject_id: 9,
    marks_obtained: 88,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 22, feedback: 'Excellent understanding of cloud concepts' },
      q2: { marks: 23, feedback: 'Great practical knowledge' },
      q3: { marks: 21, feedback: 'Good grasp of scalability principles' },
      q4: { marks: 22, feedback: 'Strong understanding of cloud security' }
    }),
    feedback_summary: 'Outstanding cloud computing knowledge',
    exam_id: 2,
    subject_id: 9,
    status: 'verified',
    examiner_id: '2',
    verification_date: '2024-02-05T15:30:00Z'
  },
  {
    student_marks_id: 16,
    student_id: 3,
    exam_subject_id: 10,
    marks_obtained: 95,
    answer_feedbacks_json: JSON.stringify({
      q1: { marks: 24, feedback: 'Perfect understanding of power systems' },
      q2: { marks: 24, feedback: 'Excellent circuit analysis' },
      q3: { marks: 23, feedback: 'Strong problem-solving skills' },
      q4: { marks: 24, feedback: 'Outstanding theoretical knowledge' }
    }),
    feedback_summary: 'Exceptional grasp of power systems concepts',
    exam_id: 2,
    subject_id: 10,
    status: 'verified',
    examiner_id: '4',
    verification_date: '2024-02-06T09:45:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    full_name: 'Admin User',
    is_active: true,
    is_superuser: true,
    hashed_password: 'hashed_password_1',
    role: 'Admin',
    department: 'Information Technology',
    joining_date: '2020-01-15',
    designation: 'System Administrator'
  },
  {
    id: '2',
    email: 'examiner@example.com',
    full_name: 'John Examiner',
    is_active: true,
    is_superuser: false,
    hashed_password: 'hashed_password_2',
    role: 'Examiner',
    department: 'Computer Science',
    joining_date: '2021-03-20',
    designation: 'Senior Professor'
  },
  {
    id: '3',
    email: 'student@example.com',
    full_name: 'Mike Johnson',
    is_active: true,
    is_superuser: false,
    hashed_password: 'hashed_password_3',
    role: 'Student',
    department: 'Electronics',
    student_id: '3'  // Updated to match Mike Johnson's student_id
  },
  {
    id: '4',
    email: 'examiner2@example.com',
    full_name: 'Sarah Wilson',
    is_active: true,
    is_superuser: false,
    hashed_password: 'hashed_password_4',
    role: 'Examiner'
  },
  {
    id: '5',
    email: 'admin2@example.com',
    full_name: 'Michael Brown',
    is_active: true,
    is_superuser: true,
    hashed_password: 'hashed_password_5',
    role: 'Admin'
  },
  {
    id: '6',
    email: 'student2@example.com',
    full_name: 'David Lee',
    is_active: false,
    is_superuser: false,
    hashed_password: 'hashed_password_6',
    role: 'Student'
  }
];
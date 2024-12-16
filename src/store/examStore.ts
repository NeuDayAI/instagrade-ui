import { create } from 'zustand';
import { 
  Exam, 
  Subject, 
  Student, 
  Department,
  ExamSubject,
  StudentMarks,
  Semester 
} from '../types/exam';
import { User } from '../types/exam';
import { 
  mockExams, 
  mockSubjects, 
  mockRubrics,
  mockStudents, 
  mockDepartments,
  mockExamSubjects,
  mockStudentMarks,
  mockSemesters,
  mockUsers
} from '../data/mockData';

interface ExamStore {
  exams: Exam[];
  subjects: Subject[];
  rubrics: Rubric[];
  students: Student[];
  departments: Department[];
  examSubjects: ExamSubject[];
  studentMarks: StudentMarks[];
  semesters: Semester[];
  users: User[];
  selectedExam: Exam | null;
  selectedSubject: Subject | null;
  deleteDepartment: (id: number) => void;
  deleteSubject: (id: number) => void;
  deleteStudent: (id: number) => void;
  deleteUser: (id: string) => void;
  updateDepartment: (id: number, department: Department) => void;
  updateSubject: (id: number, subject: Subject) => void;
  updateStudent: (id: number, student: Student) => void;
  updateUser: (id: string, user: User) => void;
  setSelectedExam: (exam: Exam | null) => void;
  setSelectedSubject: (subject: Subject | null) => void;
  getDepartmentName: (departmentId: number) => string;
  getSemesterName: (semesterId: number) => string;
  getExamSubjects: (examId: number) => Subject[];
  getExam: (examId: number) => Exam | undefined;
  getSubject: (subjectId: number) => Subject | undefined;
  getStudent: (studentId: number) => Student | undefined;
  getStudentMarks: (examId: number, subjectId: number) => StudentMarks[];
  assignExaminer: (examId: number, subjectId: number, examinerId: string) => void;
  updateMarksVerification: (
    marksId: number,
    verification: {
      status: StudentMarks['status'];
      examiner_feedback?: string;
      verification_date?: string;
    }
  ) => void;
}

export const useExamStore = create<ExamStore>((set, get) => ({
  exams: mockExams,
  subjects: mockSubjects,
  rubrics: mockRubrics,
  students: mockStudents,
  departments: mockDepartments,
  examSubjects: mockExamSubjects,
  studentMarks: mockStudentMarks,
  semesters: mockSemesters,
  users: mockUsers,
  selectedExam: null,
  selectedSubject: null,
  
  deleteDepartment: (id) => set((state) => ({
    departments: state.departments.filter((dept) => dept.department_id !== id)
  })),

  deleteSubject: (id) => set((state) => ({
    subjects: state.subjects.filter((subj) => subj.subject_id !== id)
  })),

  deleteStudent: (id) => set((state) => ({
    students: state.students.filter((student) => student.student_id !== id)
  })),

  deleteUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id)
  })),
  
  updateDepartment: (id, updatedDepartment) => set((state) => ({
    departments: state.departments.map((dept) =>
      dept.department_id === id ? updatedDepartment : dept
    )
  })),

  updateSubject: (id, updatedSubject) => set((state) => ({
    subjects: state.subjects.map((subj) =>
      subj.subject_id === id ? updatedSubject : subj
    )
  })),

  updateStudent: (id, updatedStudent) => set((state) => ({
    students: state.students.map((student) =>
      student.student_id === id ? updatedStudent : student
    )
  })),

  updateUser: (id, updatedUser) => set((state) => ({
    users: state.users.map((user) =>
      user.id === id ? updatedUser : user
    )
  })),
  
  setSelectedExam: (exam) => set({ selectedExam: exam }),
  setSelectedSubject: (subject) => set({ selectedSubject: subject }),
  
  getDepartmentName: (departmentId) => {
    const department = get().departments.find(d => d.department_id === departmentId);
    return department?.department_name || 'Unknown Department';
  },
  
  getSemesterName: (semesterId) => {
    const semester = get().semesters.find(s => s.semester_id === semesterId);
    return semester?.semester_name || 'Unknown Semester';
  },
  
  getExamSubjects: (examId) => {
    const examSubjectIds = get().examSubjects
      .filter(es => es.exam_id === examId)
      .map(es => es.subject_id);
    return get().subjects.filter(s => examSubjectIds.includes(s.subject_id));
  },
  
  getStudentMarks: (examId, subjectId) => {
    return get().studentMarks.filter(
      sm => sm.exam_id === examId && sm.subject_id === subjectId
    );
  },
  
  assignExaminer: (examId, subjectId, examinerId) => {
    set((state) => ({
      studentMarks: state.studentMarks.map((mark) => {
        if (mark.exam_id === examId && mark.subject_id === subjectId) {
          return {
            ...mark,
            examiner_id: examinerId,
            status: 'pending_verification'
          };
        }
        return mark;
      })
    }));
  },

  updateMarksVerification: (marksId, verification) => {
    set((state) => ({
      studentMarks: state.studentMarks.map((mark) => {
        if (mark.student_marks_id === marksId) {
          return {
            ...mark,
            ...verification
          };
        }
        return mark;
      })
    }));
  },
  
  getExam: (examId) => {
    return get().exams.find(e => e.exam_id === examId);
  },
  
  getSubject: (subjectId) => {
    return get().subjects.find(s => s.subject_id === subjectId);
  },
  
  getStudent: (studentId) => {
    return get().students.find(s => s.student_id === studentId);
  },
}));
import { api } from './client';
import { API_ENDPOINTS } from './config';
import { Exam, ExamCreate, ExamUpdate, PaginatedResponse } from './types';

export const examService = {
  // Get all exams with pagination
  getExams: (skip = 0, limit = 100) => 
    api.get<PaginatedResponse<Exam>>(API_ENDPOINTS.EXAMS, { skip, limit }),

  // Get filtered exams
  getFilteredExams: (params: {
    id?: number;
    name?: string;
    department?: number;
    semester?: number;
    skip?: number;
    limit?: number;
  }) =>
    api.get<PaginatedResponse<Exam>>(API_ENDPOINTS.EXAMS_FILTER, params),

  // Get exam by ID
  getExamById: (id: number) =>
    api.get<Exam>(API_ENDPOINTS.EXAM_BY_ID(id)),

  // Create new exam
  createExam: (exam: ExamCreate) =>
    api.post<Exam>(API_ENDPOINTS.EXAMS, exam),

  // Update exam
  updateExam: (id: number, exam: ExamUpdate) =>
    api.put<Exam>(API_ENDPOINTS.EXAM_BY_ID(id), exam),

  // Delete exam
  deleteExam: (id: number) =>
    api.delete(API_ENDPOINTS.EXAM_BY_ID(id)),
};
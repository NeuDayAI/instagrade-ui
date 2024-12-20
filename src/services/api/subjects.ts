import { api } from './client';
import { API_ENDPOINTS } from './config';
import { Subject, SubjectCreate, SubjectUpdate, PaginatedResponse } from './types';

export const subjectService = {
  // Get all subjects with pagination
  getSubjects: (skip = 0, limit = 100) => 
    api.get<PaginatedResponse<Subject>>(API_ENDPOINTS.SUBJECTS, { skip, limit }),

  // Get filtered subjects
  getFilteredSubjects: (params: { id?: number; name?: string; skip?: number; limit?: number }) =>
    api.get<PaginatedResponse<Subject>>(API_ENDPOINTS.SUBJECTS_FILTER, params),

  // Get subject by ID
  getSubjectById: (id: number) =>
    api.get<Subject>(API_ENDPOINTS.SUBJECT_BY_ID(id)),

  // Create new subject
  createSubject: (subject: SubjectCreate) =>
    api.post<Subject>(API_ENDPOINTS.SUBJECTS, subject),

  // Update subject
  updateSubject: (id: number, subject: SubjectUpdate) =>
    api.put<Subject>(API_ENDPOINTS.SUBJECT_BY_ID(id), subject),

  // Delete subject
  deleteSubject: (id: number) =>
    api.delete(API_ENDPOINTS.SUBJECT_BY_ID(id)),
};
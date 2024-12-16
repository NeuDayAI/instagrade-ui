import { api } from './client';
import { API_ENDPOINTS } from './config';
import { ResultResponse } from './types';

export const resultService = {
  // Get result
  getResult: (params: {
    exam_id: number;
    student_id: number;
    include_individual_feedback?: boolean;
  }) =>
    api.get<ResultResponse>(API_ENDPOINTS.GET_RESULT, params),

  // Get result as PDF
  getResultPDF: (params: {
    exam_id: number;
    student_id: number;
    include_individual_feedback?: boolean;
  }) =>
    api.post(API_ENDPOINTS.RESULT_TO_PDF, params, {
      responseType: 'blob',
    }),

  // Grade answer
  gradeAnswer: (params: {
    exam_id: number;
    subject_id: number;
    student_id: number;
    rubric_name: string;
  }) =>
    api.post(API_ENDPOINTS.GRADE_ANSWER, null, { params }),
};
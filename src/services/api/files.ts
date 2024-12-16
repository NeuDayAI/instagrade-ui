import { api } from './client';
import { API_ENDPOINTS } from './config';

export const fileService = {
  // Upload question paper
  uploadQuestionPaper: (file: File, onProgress?: (percentage: number) => void) =>
    api.upload(API_ENDPOINTS.UPLOAD_QUESTION_PAPER, file, onProgress),

  // Upload answer key
  uploadAnswerKey: (file: File, onProgress?: (percentage: number) => void) =>
    api.upload(API_ENDPOINTS.UPLOAD_ANSWER_KEY, file, onProgress),

  // Upload answer sheet
  uploadAnswerSheet: (file: File, onProgress?: (percentage: number) => void) =>
    api.upload(API_ENDPOINTS.UPLOAD_ANSWER_SHEET, file, onProgress),

  // Perform OCR on answer sheet
  performOCR: (examId: number, subjectId: number, studentId: number) =>
    api.post(API_ENDPOINTS.PERFORM_OCR(examId, subjectId, studentId)),
};
import { create } from 'zustand';

interface ExamDetails {
  examName: string;
  departmentId: number;
  selectedSubjects: number[];
}

interface CreateExamStore {
  activeStep: number;
  examDetails: ExamDetails;
  setActiveStep: (step: number) => void;
  setExamDetails: (details: ExamDetails) => void;
}

export const useCreateExamStore = create<CreateExamStore>((set) => ({
  activeStep: 0,
  examDetails: {
    examName: '',
    departmentId: 0,
    selectedSubjects: [],
  },
  setActiveStep: (step) => set({ activeStep: step }),
  setExamDetails: (details) => set({ examDetails: details }),
}));
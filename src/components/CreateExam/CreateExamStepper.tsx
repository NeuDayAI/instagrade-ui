import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react';
import { ExamBasicDetails } from './ExamBasicDetails';
import { ExamSubjectDetails } from './ExamSubjectDetails';
import { useCreateExamStore } from '../../store/createExamStore';

const steps = [
  { title: 'Basic Details', description: 'Exam information' },
  { title: 'Subject Details', description: 'Configure subjects' },
];

export const CreateExamStepper = () => {
  const { activeStep } = useCreateExamStore();
  
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ExamBasicDetails />;
      case 1:
        return <ExamSubjectDetails />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Stepper index={activeStep} mb={8}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {renderStepContent()}
    </Box>
  );
};
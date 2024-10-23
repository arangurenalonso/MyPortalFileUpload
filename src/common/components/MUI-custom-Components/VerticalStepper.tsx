import { Box, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { ReactNode, useState } from 'react';

export type RenderVerticalStepContentProps = {
  handleNext: () => void;
  handleBack: () => void;
  isLastStep: boolean;
  isInitial: boolean;
};
// export type VerticalStepContentProps = {
//   label: string;
//   render: (
//     handleNext: () => void,
//     handleBack: () => void,
//     isLastStep: boolean,
//     isInitial: boolean
//   ) => JSX.Element;
// };

export type VerticalStepperProps = {
  render: {
    [key: string]: (args: RenderVerticalStepContentProps) => ReactNode;
  };
  stepsLabels: string[];
  initialStep?: number;
};

const VerticalStepper = ({
  stepsLabels,
  render,
  initialStep = 0,
}: VerticalStepperProps) => {
  const [activeStep, setActiveStep] = useState(initialStep);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ mx: 'auto', maxWidth: '100%' }}>
      <>
        <Stepper activeStep={activeStep} orientation="vertical">
          {Object.keys(render).map((key, index) => (
            <Step key={key}>
              <StepLabel>{stepsLabels[index]}</StepLabel>
              <StepContent>
                {render[key]({
                  handleNext,
                  handleBack,
                  isLastStep: activeStep === Object.keys(render).length - 1,
                  isInitial: activeStep === 0,
                })}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </>
    </Box>
  );
};

export default VerticalStepper;

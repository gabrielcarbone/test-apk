import { useState } from 'react';

interface UseWizardReturn {
  currentStep: number;
  wizardData: Record<string, any>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateStepData: (stepKey: string, data: any) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
}

export const useWizard = (totalSteps: number): UseWizardReturn => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<Record<string, any>>({});

  const nextStep = () => {
    if (currentStep < totalSteps + 1) { // +1 para incluir la página de confirmación
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps + 1) {
      setCurrentStep(step);
    }
  };

  const updateStepData = (stepKey: string, data: any) => {
    setWizardData(prev => ({
      ...prev,
      [stepKey]: data
    }));
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps + 1; // Página de confirmación
  const canGoNext = currentStep < totalSteps + 1;

  return {
    currentStep,
    wizardData,
    nextStep,
    prevStep,
    goToStep,
    updateStepData,
    isFirstStep,
    isLastStep,
    canGoNext
  };
};
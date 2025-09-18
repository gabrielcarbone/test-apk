import React from 'react';
import { useWizard } from '../hooks/useWizard';
import DenunciarStep1 from './DenunciarStep1';
import DenunciarStep2 from './DenunciarStep2';
import DenunciarStep3 from './DenunciarStep3';
import DenunciarCommit from './DenunciarCommit';
import './Denunciar.css';

const Denunciar: React.FC = () => {
  const {
    currentStep,
    wizardData,
    nextStep,
    prevStep,
    goToStep,
    updateStepData,
    isFirstStep,
    isLastStep
  } = useWizard(3);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DenunciarStep1
            data={wizardData.step1}
            onSave={(data) => updateStepData('step1', data)}
            onNext={nextStep}
            onPrev={prevStep}
            isFirstStep={isFirstStep}
          />
        );
      case 2:
        return (
          <DenunciarStep2
            data={wizardData.step2}
            onSave={(data) => updateStepData('step2', data)}
            onNext={nextStep}
            onPrev={prevStep}
            isFirstStep={isFirstStep}
          />
        );
      case 3:
        return (
          <DenunciarStep3
            data={wizardData.step3}
            onSave={(data) => updateStepData('step3', data)}
            onNext={nextStep}
            onPrev={prevStep}
            isFirstStep={isFirstStep}
          />
        );
      case 4:
        return (
          <DenunciarCommit
            data={wizardData}
            onEditStep={goToStep}
            onPrev={prevStep}
            isLastStep={isLastStep}
          />
        );
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Paso 1 de 3';
      case 2: return 'Paso 2 de 3';
      case 3: return 'Paso 3 de 3';
      case 4: return 'Confirmación';
      default: return '';
    }
  };

  return (
    <div className="screen">
      <div className="wizard-header">
        <h1>Realizar Denuncia</h1>
        <div className="step-indicator">
          <span className="step-title">{getStepTitle()}</span>
          <div className="claims-steps">
            <div className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>1</div>
            <div className={`step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>2</div>
            <div className={`step ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : ''}`}>3</div>
          </div>
          <div className="step-labels">
            <span>Póliza</span>
            <span>Hechos</span>
            <span>Personas</span>
          </div>
        </div>
      </div>
      
      <div className="wizard-content">
        {renderStep()}
      </div>
    </div>
  );
};

export default Denunciar;
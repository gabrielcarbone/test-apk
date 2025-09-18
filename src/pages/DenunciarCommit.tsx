import React, { useState } from 'react';
import ButtonCustom from '../components/ButtonCustom';

interface DenunciarCommitProps {
  data: {
    step1?: any;
    step2?: any;
    step3?: any;
  };
  onEditStep: (step: number) => void;
  onPrev: () => void;
  isLastStep?: boolean;
}

const DenunciarCommit: React.FC<DenunciarCommitProps> = ({
  data,
  onEditStep,
  onPrev
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Aquí iría la lógica para enviar la denuncia
      console.log('Enviando denuncia:', data);
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar denuncia:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPersonTypeLabel = (type: string) => {
    switch (type) {
      case 'conductor': return 'Conductor';
      case 'propietario': return 'Propietario';
      case 'lesionado': return 'Lesionado';
      case 'tercero': return 'Tercero';
      default: return 'Persona';
    }
  };

  if (isSubmitted) {
    return (
      <div className="step-container success-container">
        <div className="success-message">
          <h2>✅ Denuncia Enviada Exitosamente</h2>
          <p>Su denuncia ha sido registrada con el número: <strong>DN-{Date.now()}</strong></p>
          <p>Recibirá una confirmación por email y será contactado por nuestro equipo dentro de las próximas 24 horas.</p>
          <ButtonCustom 
            onClick={() => window.location.href = '/dashboard'} 
            className="primary-btn"
          >
            Volver al Dashboard
          </ButtonCustom>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      <h2>Confirmación de Denuncia</h2>
      <p>Revise toda la información antes de enviar su denuncia. Puede editarla haciendo clic en "Editar" en cada sección.</p>

      {/* Resumen Paso 1 - Póliza */}
      <div className="summary-section">
        <div className="section-header">
          <h3>📋 Datos de la Póliza</h3>
          <ButtonCustom 
            onClick={() => onEditStep(1)} 
            className="edit-btn"
          >
            Editar
          </ButtonCustom>
        </div>
        <div className="summary-content">
          <p><strong>Póliza:</strong> {data.step1?.selectedPolicy || 'No seleccionada'}</p>
          <p><strong>Fecha del siniestro:</strong> {data.step1?.incidentDate || 'No especificada'}</p>
          <p><strong>Hora del siniestro:</strong> {data.step1?.incidentTime || 'No especificada'}</p>
        </div>
      </div>

      {/* Resumen Paso 2 - Hechos */}
      <div className="summary-section">
        <div className="section-header">
          <h3>📝 Hechos del Siniestro</h3>
          <ButtonCustom 
            onClick={() => onEditStep(2)} 
            className="edit-btn"
          >
            Editar
          </ButtonCustom>
        </div>
        <div className="summary-content">
          <p><strong>Lugar:</strong> {data.step2?.incidentLocation || 'No especificado'}</p>
          <p><strong>Descripción:</strong> {data.step2?.incidentDescription || 'No especificada'}</p>
          <p><strong>Daños:</strong> {data.step2?.damages || 'No especificados'}</p>
          {data.step2?.witnesses && (
            <p><strong>Testigos:</strong> {data.step2.witnesses}</p>
          )}
          <p><strong>Denuncia policial:</strong> {data.step2?.policeReport ? 'Sí' : 'No'}</p>
          {data.step2?.policeReport && data.step2?.policeReportNumber && (
            <p><strong>N° Denuncia:</strong> {data.step2.policeReportNumber}</p>
          )}
        </div>
      </div>

      {/* Resumen Paso 3 - Personas */}
      <div className="summary-section">
        <div className="section-header">
          <h3>👥 Personas Involucradas</h3>
          <ButtonCustom 
            onClick={() => onEditStep(3)} 
            className="edit-btn"
          >
            Editar
          </ButtonCustom>
        </div>
        <div className="summary-content">
          {data.step3?.persons && data.step3.persons.length > 0 ? (
            data.step3.persons.map((person: any, index: number) => (
              <div key={person.id} className="person-summary">
                <p><strong>{getPersonTypeLabel(person.type)}:</strong> {person.name}</p>
                <p><strong>DNI:</strong> {person.dni}</p>
                <p><strong>Teléfono:</strong> {person.phone}</p>
                <p><strong>Email:</strong> {person.email}</p>
                <p><strong>Dirección:</strong> {person.address}</p>
                {index < data.step3.persons.length - 1 && <hr />}
              </div>
            ))
          ) : (
            <p>No hay personas registradas</p>
          )}
          
          {data.step3?.additionalNotes && (
            <div>
              <p><strong>Notas adicionales:</strong></p>
              <p>{data.step3.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="confirmation-warning">
        <p>⚠️ Al enviar esta denuncia, confirma que toda la información proporcionada es veraz y completa.</p>
      </div>

      <div className="step-navigation">
        <ButtonCustom onClick={onPrev} className="secondary-btn">
          Anterior
        </ButtonCustom>
        <ButtonCustom 
          onClick={handleSubmit} 
          className="primary-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Denuncia'}
        </ButtonCustom>
      </div>
    </div>
  );
};

export default DenunciarCommit;
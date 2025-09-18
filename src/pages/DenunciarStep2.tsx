import React, { useState, useEffect } from 'react';
import TextCustom from '../components/TextCustom';
import ButtonCustom from '../components/ButtonCustom';

interface DenunciarStep2Props {
  data?: any;
  onSave: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
}

const DenunciarStep2: React.FC<DenunciarStep2Props> = ({
  data,
  onSave,
  onNext,
  onPrev,
  isFirstStep
}) => {
  const [formData, setFormData] = useState({
    incidentLocation: data?.incidentLocation || '',
    incidentDescription: data?.incidentDescription || '',
    damages: data?.damages || '',
    witnesses: data?.witnesses || '',
    policeReport: data?.policeReport || false,
    policeReportNumber: data?.policeReportNumber || '',
    ...data
  });

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleInputChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onSave(newData);
  };

  const handleNext = () => {
    onSave(formData);
    onNext();
  };

  return (
    <div className="step-container">
      <h2>Hechos del Siniestro</h2>
      
      <div className="form-section">
        <h3>📍 Lugar del Siniestro</h3>
        <TextCustom
          type="text"
          value={formData.incidentLocation}
          onChange={(e) => handleInputChange('incidentLocation', e.target.value)}
          placeholder="Dirección completa donde ocurrió el siniestro"
        />
      </div>

      <div className="form-section">
        <h3>📝 Descripción de los Hechos</h3>
        <textarea
          value={formData.incidentDescription}
          onChange={(e) => handleInputChange('incidentDescription', e.target.value)}
          placeholder="Describa detalladamente cómo ocurrió el siniestro..."
          rows={5}
          className="form-textarea"
        />
      </div>

      <div className="form-section">
        <h3>💥 Daños Observados</h3>
        <textarea
          value={formData.damages}
          onChange={(e) => handleInputChange('damages', e.target.value)}
          placeholder="Describa los daños materiales y/o personales..."
          rows={3}
          className="form-textarea"
        />
      </div>

      <div className="form-section">
        <h3>👥 Testigos</h3>
        <textarea
          value={formData.witnesses}
          onChange={(e) => handleInputChange('witnesses', e.target.value)}
          placeholder="Nombre y contacto de testigos (opcional)"
          rows={2}
          className="form-textarea"
        />
      </div>

      <div className="form-section">
        <h3>🚔 Denuncia Policial</h3>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="policeReport"
            checked={formData.policeReport}
            onChange={(e) => handleInputChange('policeReport', e.target.checked)}
          />
          <label htmlFor="policeReport">Se realizó denuncia policial</label>
        </div>
        
        {formData.policeReport && (
          <TextCustom
            type="text"
            value={formData.policeReportNumber}
            onChange={(e) => handleInputChange('policeReportNumber', e.target.value)}
            placeholder="Número de la denuncia policial"
          />
        )}
      </div>

      <div className="step-navigation">
        {!isFirstStep && (
          <ButtonCustom onClick={onPrev} className="secondary-btn">
            Anterior
          </ButtonCustom>
        )}
        <ButtonCustom 
          onClick={handleNext} 
          className="primary-btn"
        >
          Continuar
        </ButtonCustom>
      </div>
    </div>
  );
};

export default DenunciarStep2;
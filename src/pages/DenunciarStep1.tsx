import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import TextCustom from '../components/TextCustom';
import ButtonCustom from '../components/ButtonCustom';

interface DenunciarStep1Props {
  data?: any;
  onSave: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
}

const DenunciarStep1: React.FC<DenunciarStep1Props> = ({
  data,
  onSave,
  onNext,
  onPrev,
  isFirstStep
}) => {
  const [formData, setFormData] = useState({
    selectedPolicy: '',
    incidentDate: '',
    incidentTime: '',
    ...data
  });

  useEffect(() => {
    if (data) {
      setFormData((prev: any) => ({ ...prev, ...data }));
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
      <div className="policy-data">
        <h3>📋 Datos de la Póliza</h3>
        <select 
          className="policy-select"
          value={formData.selectedPolicy}
          onChange={(e) => handleInputChange('selectedPolicy', e.target.value)}
        >
          <option value="">Seleccionar póliza...</option>
          <option value="policy1">Póliza x-xxxxx - Automotor</option>
          <option value="policy2">Póliza y-yyyyy - Hogar</option>
        </select>
        <ButtonCustom className="filter-btn">
          <Filter size={16} />
        </ButtonCustom>
      </div>

      {formData.selectedPolicy && (
        <div className="policy-info-card">
          <div className="info-row">
            <span>Número de Póliza</span>
            <span>x-xxxxxxx</span>
          </div>
          <div className="info-row">
            <span>Tipo de Seguro</span>
            <span>xxxxx</span>
          </div>
          <div className="info-row">
            <span>Riesgo</span>
            <span>x</span>
          </div>
          <div className="info-row">
            <span>Descripción</span>
            <span>xxxxx xxxxxx xx</span>
          </div>
          <div className="info-row">
            <span>Vigencia</span>
            <span>xx/xx/xxxx - xx/xx/xxxx</span>
          </div>
          <div className="policy-status">
            <span className="status-indicator">✅ Póliza vigente</span>
          </div>
        </div>
      )}

      <div className="incident-date">
        <h3>Fecha y hora del siniestro</h3>
        <div className="date-time-inputs">
          <TextCustom 
            type="date" 
            value={formData.incidentDate}
            onChange={(e) => handleInputChange('incidentDate', e.target.value)}
            placeholder="Fecha del siniestro"
          />
          <TextCustom 
            type="time"
            value={formData.incidentTime}
            onChange={(e) => handleInputChange('incidentTime', e.target.value)}
            placeholder="Hora del siniestro"
          />
        </div>
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

export default DenunciarStep1;
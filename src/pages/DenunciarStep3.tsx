import React, { useState, useEffect } from 'react';
import TextCustom from '../components/TextCustom';
import ButtonCustom from '../components/ButtonCustom';

interface DenunciarStep3Props {
  data?: any;
  onSave: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
}

interface Person {
  id: string;
  type: 'conductor' | 'propietario' | 'lesionado' | 'tercero';
  name: string;
  dni: string;
  phone: string;
  email: string;
  address: string;
}

const DenunciarStep3: React.FC<DenunciarStep3Props> = ({
  data,
  onSave,
  onNext,
  onPrev,
  isFirstStep
}) => {
  const [formData, setFormData] = useState({
    persons: data?.persons || [] as Person[],
    additionalNotes: data?.additionalNotes || '',
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

  const addPerson = (type: Person['type']) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      type,
      name: '',
      dni: '',
      phone: '',
      email: '',
      address: ''
    };
    
    const newPersons = [...formData.persons, newPerson];
    handleInputChange('persons', newPersons);
  };

  const updatePerson = (personId: string, field: keyof Person, value: string) => {
    const updatedPersons = formData.persons.map((person: Person) =>
      person.id === personId ? { ...person, [field]: value } : person
    );
    handleInputChange('persons', updatedPersons);
  };

  const removePerson = (personId: string) => {
    const filteredPersons = formData.persons.filter((person: Person) => person.id !== personId);
    handleInputChange('persons', filteredPersons);
  };

  const getPersonTypeLabel = (type: Person['type']) => {
    switch (type) {
      case 'conductor': return '🚗 Conductor';
      case 'propietario': return '📋 Propietario';
      case 'lesionado': return '🏥 Lesionado';
      case 'tercero': return '👤 Tercero';
      default: return 'Persona';
    }
  };

  const handleNext = () => {
    onSave(formData);
    onNext();
  };

  return (
    <div className="step-container">
      <h2>Personas Involucradas</h2>
      
      <div className="form-section">
        <h3>➕ Agregar Personas</h3>
        <div className="person-type-buttons">
          <ButtonCustom 
            onClick={() => addPerson('conductor')} 
            className="secondary-btn"
          >
            Agregar Conductor
          </ButtonCustom>
          <ButtonCustom 
            onClick={() => addPerson('propietario')} 
            className="secondary-btn"
          >
            Agregar Propietario
          </ButtonCustom>
          <ButtonCustom 
            onClick={() => addPerson('lesionado')} 
            className="secondary-btn"
          >
            Agregar Lesionado
          </ButtonCustom>
          <ButtonCustom 
            onClick={() => addPerson('tercero')} 
            className="secondary-btn"
          >
            Agregar Tercero
          </ButtonCustom>
        </div>
      </div>

      {formData.persons.map((person: Person) => (
        <div key={person.id} className="person-card">
          <div className="person-header">
            <h4>{getPersonTypeLabel(person.type)}</h4>
            <ButtonCustom 
              onClick={() => removePerson(person.id)}
              className="danger-btn small"
            >
              Eliminar
            </ButtonCustom>
          </div>
          
          <div className="person-form">
            <TextCustom
              type="text"
              value={person.name}
              onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
              placeholder="Nombre completo"
            />
            <TextCustom
              type="text"
              value={person.dni}
              onChange={(e) => updatePerson(person.id, 'dni', e.target.value)}
              placeholder="DNI"
            />
            <TextCustom
              type="tel"
              value={person.phone}
              onChange={(e) => updatePerson(person.id, 'phone', e.target.value)}
              placeholder="Teléfono"
            />
            <TextCustom
              type="email"
              value={person.email}
              onChange={(e) => updatePerson(person.id, 'email', e.target.value)}
              placeholder="Email"
            />
            <TextCustom
              type="text"
              value={person.address}
              onChange={(e) => updatePerson(person.id, 'address', e.target.value)}
              placeholder="Dirección"
            />
          </div>
        </div>
      ))}

      <div className="form-section">
        <h3>📝 Notas Adicionales</h3>
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
          placeholder="Cualquier información adicional relevante..."
          rows={4}
          className="form-textarea"
        />
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

export default DenunciarStep3;
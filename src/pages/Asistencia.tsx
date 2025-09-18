import React from 'react';
import { MapPin, Search } from 'lucide-react';
import TextCustom from '../components/TextCustom';
import ButtonCustom from '../components/ButtonCustom';
import './Asistencia.css';

const Asistencia: React.FC = () => {
  const services = [
    { name: 'Cerrajería', icon: '🔑' },
    { name: 'Electricidad', icon: '⚡' },
    { name: 'Gasista', icon: '🔥' },
    { name: 'Cristalería', icon: '🪟' },
    { name: 'Plomería', icon: '🔧' },
    { name: 'Seguridad y vigilancia', icon: '🛡️' }
  ];
  return (
    <div className="screen">
      <div className="search-section">
        <h3>¿Con qué necesitás asistencia?</h3>
        <div className="search-input">
          <Search size={20} />
          <TextCustom type="text" placeholder="Buscar póliza" />
        </div>
      </div>

      <div className="address-card">
        <MapPin size={20} />
        <div>
          <p>Avenida 1234, Buenos Aires.</p>
          <p>Póliza x-xxxxxx</p>
        </div>
      </div>

      <div className="services-section">
        <h3>¿Qué servicio necesitás?</h3>
        <div className="services-grid">
          {services.map((service, index) => (
            <ButtonCustom key={index} className="service-btn">
              <span className="service-icon">{service.icon}</span>
              <span>{service.name}</span>
            </ButtonCustom>
          ))}
        </div>
      </div>

      <div className="appointment-section">
        <h3>¡Agendá la visita!</h3>
        <div className="date-time-inputs">
          <TextCustom type="date" />
          <TextCustom type="time" />
        </div>
        <ButtonCustom className="primary-btn">Confirmar pedido</ButtonCustom>
      </div>
    </div>
  );
};

export default Asistencia;
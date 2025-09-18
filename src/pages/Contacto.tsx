import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import ButtonCustom from '../components/ButtonCustom';
import './Contacto.css';

const Contacto: React.FC = () => {
  return (
    <div className="screen">
      <div className="contact-info">
        <p>Nuestro horario de atención es de lunes a viernes, de 08:00 a 18:00 horas.</p>
        <p className="status-open">Abierto</p>
      </div>

      <div className="contact-options">
        <h3>¿Cómo te gustaría comunicarte?</h3>
        <div className="contact-grid">
          <ButtonCustom className="contact-btn">
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </ButtonCustom>
          <ButtonCustom className="contact-btn">
            <Phone size={20} />
            <span>Llamada telefónica</span>
          </ButtonCustom>
          <ButtonCustom className="contact-btn">
            <Mail size={20} />
            <span>Mensaje de texto</span>
          </ButtonCustom>
          <ButtonCustom className="contact-btn">
            <Mail size={20} />
            <span>Correo electrónico</span>
          </ButtonCustom>
        </div>
      </div>

      <div className="location-section">
        <h3>¿Querés acercarte personalmente?</h3>
        <p>Encontrá tu sucursal más cercana</p>
        <select className="location-select">
          <option>Elegí una provincia</option>
        </select>
        <div className="map-placeholder"></div>
        <div className="address-info">
          <p>Dirección: Av. Principal 1234</p>
          <p>Teléfono: 0800-800-000</p>
          <p>Horario de atención: Lunes a viernes, de 08 a 18 horas.</p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
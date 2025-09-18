import React, { useState } from 'react';
import SwitchCustom from '../components/SwitchCustom';
import ButtonCustom from '../components/ButtonCustom';
import './MiCuenta.css';

const MiCuenta: React.FC = () => {
  const [user] = useState({ name: 'Juan', phone: '11- xxxx xxxx', email: 'xxx' });
  return (
    <div className="screen">
      <div className="account-section">
        <h3>Datos personales</h3>
        <div className="account-field">
          <span>Teléfono: {user.phone}</span>
          <ButtonCustom className="change-btn">Cambiar</ButtonCustom>
        </div>
        <div className="account-field">
          <span>Correo electrónico: {user.email}</span>
          <ButtonCustom className="change-btn">Cambiar</ButtonCustom>
        </div>
      </div>

      <div className="security-section">
        <h3>Seguridad</h3>
        <div className="account-field">
          <span>Contraseña: ********</span>
          <ButtonCustom className="change-btn">Cambiar</ButtonCustom>
        </div>
        <div className="toggle-field">
          <span>Ingreso con datos biométricos</span>
          <SwitchCustom defaultChecked />
        </div>
      </div>

      <div className="notifications-section">
        <h3>Preferencias de notificaciones</h3>
        <p>Elegí dónde recibir tus notificaciones</p>
        
        <div className="notification-group">
          <div className="toggle-field">
            <span>Todos los canales</span>
            <SwitchCustom />
          </div>
          <div className="toggle-field">
            <span>Pantalla principal del celular</span>
            <SwitchCustom defaultChecked />
          </div>
          <div className="toggle-field">
            <span>Correo electrónico</span>
            <SwitchCustom />
          </div>
          <div className="toggle-field">
            <span>WhatsApp</span>
            <SwitchCustom />
          </div>
          <div className="toggle-field">
            <span>Mensaje de texto</span>
            <SwitchCustom />
          </div>
        </div>

        <div className="notification-types">
          <h4>Elegí qué notificaciones recibir</h4>
          <div className="toggle-field">
            <span>Todas</span>
            <SwitchCustom />
          </div>
          <div className="toggle-field">
            <span>Promociones y beneficios</span>
            <SwitchCustom defaultChecked />
          </div>
          <div className="toggle-field">
            <span>Vencimiento de pólizas</span>
            <SwitchCustom defaultChecked />
          </div>
          <div className="toggle-field">
            <span>Fechas de pago</span>
            <SwitchCustom defaultChecked />
          </div>
          <div className="toggle-field">
            <span>Seguimiento de denuncias</span>
            <SwitchCustom />
          </div>
          <div className="toggle-field">
            <span>Agenda de contacto</span>
            <SwitchCustom defaultChecked />
          </div>
        </div>
      </div>

      <ButtonCustom className="primary-btn">Guardar cambios</ButtonCustom>
    </div>
  );
};

export default MiCuenta;
import React from 'react';
import SwitchCustom from '../components/SwitchCustom';
import ButtonCustom from '../components/ButtonCustom';
import './Calendario.css';

const Calendario: React.FC = () => {
  return (
    <div className="screen">
      <div className="calendar-info">
        <p>Todas las fechas importantes de tu seguro en un solo lugar.</p>
      </div>
      
      <div className="calendar-grid">
        <div className="calendar-header">
          <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
        </div>
        <div className="calendar-body">
          {Array.from({length: 31}, (_, i) => (
            <ButtonCustom 
              key={i} 
              className={`calendar-day ${i === 5 || i === 21 ? 'highlighted' : ''}`}
            >
              {i + 1}
            </ButtonCustom>
          ))}
        </div>
      </div>

      <div className="calendar-options">
        <h3>¿Qué fechas querés visualizar?</h3>
        <div className="toggle-options">
          <div className="toggle-item">
            <span>Todas</span>
            <SwitchCustom />
          </div>
          <div className="toggle-item">
            <span>Vencimiento de pólizas</span>
            <SwitchCustom defaultChecked />
          </div>
          <div className="toggle-item">
            <span>Fechas de pago</span>
            <SwitchCustom defaultChecked />
          </div>
          <div className="toggle-item">
            <span>Seguimiento de denuncias</span>
            <SwitchCustom />
          </div>
          <div className="toggle-item">
            <span>Agenda de contacto</span>
            <SwitchCustom />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import ButtonCustom from '../components/ButtonCustom';
import './Denuncias.css';

const Denuncias: React.FC = () => {
  const [selectedPolicy] = useState('Póliza x-xxxxx - Automotor');
  
  const claims = [
    { id: 1, number: 'xxxxxx', date: 'xx/xx/xxxx', status: 'pedido de documentación', step: '2/5' },
    { id: 2, number: 'xxxxxx', date: 'xx/xx/xxxx', status: 'análisis', step: '3/5' },
    { id: 3, number: 'xxxxxx', date: 'xx/xx/xxxx', status: 'Cierre', step: '5/5' }
  ];
  return (
    <div className="screen">
      <div className="policy-select-section">
        <p>Seleccioná una póliza para hacer una nueva denuncia o conocer el historial.</p>
        <select className="policy-select">
          <option>{selectedPolicy}</option>
        </select>
        <ButtonCustom className="filter-btn">
          <Filter size={16} />
        </ButtonCustom>
      </div>

      <ButtonCustom className="primary-btn">Denunciar un siniestro</ButtonCustom>

      <div className="claims-history">
        <h3>📁 Historial de denuncias</h3>
        {claims.map((claim) => (
          <div key={claim.id} className="claim-card">
            <div className="claim-icon">🚗</div>
            <div className="claim-details">
              <p>Siniestro: {claim.number}</p>
              <p>Fecha: {claim.date}</p>
              <p>Estado: {claim.status} ({claim.step})</p>
            </div>
            <div className="claim-status">
              {claim.status === 'Cierre' ? '✅ Finalizada' : 
               claim.status === 'análisis' ? '🔄 En curso' : '⏱️ En curso'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Denuncias;
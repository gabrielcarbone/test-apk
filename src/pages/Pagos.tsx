import React, { useState } from 'react';
import { Filter, Download } from 'lucide-react';
import ButtonCustom from '../components/ButtonCustom';
import './Pagos.css';

const Pagos: React.FC = () => {
  const [selectedPolicy] = useState('Póliza x-xxxxx - Automotor');
  
  const payments = [
    { id: 1, endorsement: 0, installment: 3, amount: 'SX.XXXX,XX', dueDate: 'xx/xx/xxxx', status: 'Pendiente' },
    { id: 2, endorsement: 0, installment: 2, amount: 'SX.XXXX,XX', dueDate: 'xx/xx/xxxx', status: 'En proceso' },
    { id: 3, endorsement: 0, installment: 1, amount: 'SX.XXXX,XX', dueDate: 'xx/xx/xxxx', status: 'Pagado' }
  ];
  return (
    <div className="screen">
      <ButtonCustom className="primary-btn">Gestionar medios de pago</ButtonCustom>
      
      <div className="policy-select-section">
        <p>Seleccioná una póliza para hacer un pago o conocer el historial.</p>
        <select className="policy-select">
          <option>{selectedPolicy}</option>
        </select>
        <ButtonCustom className="filter-btn">
          <Filter size={16} />
        </ButtonCustom>
      </div>

      <div className="payments-section">
        <h3>💳 Cuotas y pagos</h3>
        <div className="select-all">
          <input type="checkbox" id="select-all" />
          <label htmlFor="select-all">Seleccionar todas cuotas pendientes</label>
        </div>

        {payments.map((payment) => (
          <div key={payment.id} className="payment-card">
            <div className="payment-details">
              <p>Endoso: {payment.endorsement} / Cuota: {payment.installment}</p>
              <p>Vencimiento: {payment.dueDate}</p>
              <p>Importe: {payment.amount}</p>
            </div>
            <div className="payment-status">
              {payment.status === 'Pagado' ? '✅ Pagado' :
               payment.status === 'En proceso' ? '🔄 En proceso' : '⏱️ Pendiente'}
            </div>
            <div className="payment-actions">
              <input type="checkbox" />
              <ButtonCustom className="download-btn">
                <Download size={16} />
              </ButtonCustom>
            </div>
          </div>
        ))}
      </div>

      <ButtonCustom className="primary-btn">Pagar cuotas seleccionadas</ButtonCustom>
    </div>
  );
};

export default Pagos;
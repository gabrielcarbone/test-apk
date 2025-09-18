import React from 'react';
import { Search, Eye, Download, Mail } from 'lucide-react';
import TextCustom from '../components/TextCustom';
import ButtonCustom from '../components/ButtonCustom';
import './Cobertura.css';

const Cobertura: React.FC = () => {
  return (
    <div className="screen">
      <div className="coverage-search">
        <h3>🔒 Conocé tu cobertura:</h3>
        <p>Usá el buscador para resolver tus dudas al instante.</p>
        
        <select className="policy-select">
          <option>Seleccionar póliza para empezar</option>
        </select>
        
        <div className="search-input">
          <Search size={20} />
          <TextCustom type="text" placeholder="¿Me cubre si...?" />
        </div>
      </div>

      <div className="documentation">
        <h3>📄 Documentación útil</h3>
        <p>Para conocer más detalles accedé a tu certificado de cobertura y póliza en un vistazo.</p>
        
        <div className="document-card">
          <span>Certificado de cobertura</span>
          <div className="document-actions">
            <ButtonCustom><Eye size={16} /></ButtonCustom>
            <ButtonCustom><Download size={16} /></ButtonCustom>
            <ButtonCustom><Mail size={16} /></ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cobertura;
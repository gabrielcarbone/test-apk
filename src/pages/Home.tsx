import React, { useState, useEffect } from 'react';
import ButtonCustom from '../components/ButtonCustom';
import CardPoliza from '../components/CardPoliza';
import Carousel from '../components/Carousel';
import { getStoredPolizas } from '../services/polizasService';
import { useAuth } from '../context/AuthContext';
import type { Poliza } from '../types/polizaTypes';
import './Home.css';

interface HomeProps {
  onNavigate: (screen: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [polizas, setPolizas] = useState<Poliza[]>([]);

  useEffect(() => {
    const loadPolizas = () => {
      try {
        const storedPolizas = getStoredPolizas();
        if (storedPolizas) {
          setPolizas(storedPolizas);
        } else {
          setPolizas([]);
        }
      } catch (error) {
        console.error('Error cargando pólizas en Home:', error);
        setPolizas([]);
      }
    };

    loadPolizas();

    // Listener para detectar cambios en localStorage de polizas
    const handlePolizasChange = () => {
      loadPolizas();
    };

    window.addEventListener('polizas-updated', handlePolizasChange);

    return () => {
      window.removeEventListener('polizas-updated', handlePolizasChange);
    };
  }, [user]);

  return (
    <div className="screen">
      
      <div className="policies-carousel">
        <h3>Mis Pólizas</h3>
        {polizas.length > 0 ? (
          <Carousel>
            {polizas.map((poliza) => (
              <CardPoliza key={poliza.id_poliza} poliza={poliza} />
            ))}
          </Carousel>
        ) : (
          <div className="policy-card single">
            <div className="policy-header">
              <span className="policy-type">📄 Pólizas</span>
              <span className="policy-badge">Sin datos</span>
            </div>
            <div className="policy-details">
              <p>No hay pólizas disponibles</p>
              <p>Inicia sesión para ver tus pólizas</p>
            </div>
          </div>
        )}
      </div>


      <div className="action-buttons">
        <ButtonCustom className="action-btn" onClick={() => onNavigate('coverage')}>
          Mi cobertura
        </ButtonCustom>
        <ButtonCustom className="action-btn" onClick={() => onNavigate('payments')}>
          Mis pagos
        </ButtonCustom>
        <ButtonCustom className="action-btn" onClick={() => onNavigate('claims-list')}>
          Mis denuncias
        </ButtonCustom>
      </div>

      <div className="quote-section">
        <h3>Cotizar</h3>
        <div className="quote-card">
          <span className="quote-icon">🚗</span>
          <div>
            <h4>Seguro de Automotor</h4>
            <p>Cotizá online</p>
            <small>O elegí el canal para pedir cotización</small>
          </div>
        </div>
      </div>

      <div className="news-section">
        <h3>Novedades</h3>
        <div className="news-placeholder">
          <div className="placeholder-image"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
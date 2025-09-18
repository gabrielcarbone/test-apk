import React from "react";
import type { Riesgo } from "../types/riesgoTypes";
import "./CardRiesgo.css";

interface CardRiesgoProps {
  riesgo: Riesgo;
  showSelectButton?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
}

const CardRiesgo: React.FC<CardRiesgoProps> = ({ riesgo, showSelectButton = false, isSelected = false, onSelect, onDeselect }) => {
  return (
    <div className="policy-card-detailed">
      <div className="policy-type-header">
        <span className="policy-icon">🚗</span>
        <span>Automotor</span>
        {/* <span className="circulation-badge">Tarjeta de circulación</span> */}
      </div>
      <div className="policy-details">
        {/* <p>
          <strong>Póliza:</strong> {riesgo.numero_poliza}
        </p>
        <p>
          <strong>Vigencia:</strong> {riesgo.inicio_vigencia.split(' ')[0]} al {riesgo.fin_vigencia.split(' ')[0]}
        </p> */}
        <p>
          <strong>Vehículo:</strong> {riesgo.vehiculo}
        </p>
        {riesgo.patente && riesgo.patente !== "A/D" && (
          <p>
            <strong>Patente:</strong> {riesgo.patente}
          </p>
        )}
        <p>
          <strong>Año:</strong> {riesgo.anio}
        </p>
        <p>
          <strong>Cobertura:</strong> {riesgo.descripcion_cobertura}
        </p>
        {/* <p>
          <strong>Asegurado:</strong> {riesgo.nombre_asegurado}
        </p> */}
        {riesgo.nombre_prov_asistencia && (
          <p>
            <strong>Asistencia:</strong> {riesgo.nombre_prov_asistencia}
          </p>
        )}
      </div>
      {showSelectButton && (
        <div className="policy-actions">
          {isSelected ? (
            <button 
              onClick={onDeselect}
              className="btn-deselect"
            >
              Deseleccionar
            </button>
          ) : (
            <button 
              onClick={onSelect}
              className="btn-select"
            >
              Seleccionar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardRiesgo;

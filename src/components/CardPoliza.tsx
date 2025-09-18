import React from "react";
import { Link } from "react-router-dom";
import type { Poliza } from "../types/polizaTypes";
import "./CardPoliza.css";

interface CardPolizaProps {
  poliza: Poliza;
}

const CardPoliza: React.FC<CardPolizaProps> = ({ poliza }) => {
  return (
    <div className="poliza-card-detailed">
      <div className="poliza-type-header">
        <span className="poliza-icon">📄</span>
        <span>{poliza.desc_ramo.trim()}</span>
        {poliza.vigente === "S" && (
          <span className="vigente-badge">Vigente</span>
        )}
      </div>
      <div className="poliza-details">
        <p>
          <strong>Póliza:</strong>{" "}
          <Link 
            to={`/poliza?id=${poliza.id_poliza}`}
            className="poliza-number-link"
          >
            {poliza.poliza}
          </Link>
        </p>
        <p>
          <strong>Descripción:</strong> {poliza.descripcion}
        </p>
        <p>
          <strong>Vigencia:</strong> {poliza.fe_inicio_vigencia} al{" "}
          {poliza.fe_fin_vigencia}
        </p>
        {/* <p>
          <strong>Negocio:</strong> {poliza.negocio}
        </p> */}
      </div>
    </div>
  );
};

export default CardPoliza;

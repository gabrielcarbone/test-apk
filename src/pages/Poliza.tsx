import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import polizasService, { getStoredPolizas } from "../services/polizasService";
import type { PolizaExtendida } from "../types/polizaTypes";
import "./Poliza.css";

const Poliza: React.FC = () => {
  const [poliza, setPoliza] = useState<PolizaExtendida | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loadPoliza = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const polizaId = searchParams.get("id");

        if (!polizaId) {
          setError("No se especificó ID de póliza");
          setLoading(false);
          return;
        }

        // Primero intentar buscar en localStorage
        const storedPolizas = getStoredPolizas();

        if (storedPolizas) {
          const foundPoliza = storedPolizas.find(
            (p) => p.id_poliza === polizaId
          );

          if (foundPoliza) {
            // Si encontramos la póliza, usar el servicio con el objeto completo
            const polizaData = await polizasService.getPolizaById(foundPoliza);

            if (polizaData) {
              setPoliza(polizaData);
            } else {
              setError("Póliza no encontrada");
            }
          } else {
            setError("Póliza no encontrada en el almacenamiento local");
          }
        } else {
          setError("No hay pólizas almacenadas");
        }
      } catch (err) {
        console.error("Error cargando pólizaxx:", err);
        setError("Error al cargar la póliza");
      } finally {
        setLoading(false);
      }
    };

    loadPoliza();
  }, [location.search]);

  if (loading) {
    return <div className="screen">Cargando póliza...</div>;
  }

  if (error) {
    return (
      <div className="screen">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!poliza) {
    return (
      <div className="screen">
        <div className="error-message">Póliza no encontrada</div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="poliza-header">
        <h2>Detalle de Póliza</h2>
        {poliza.vigente === "S" && (
          <span className="vigente-badge">Vigente</span>
        )}
      </div>

      <div className="poliza-info-card">
        <div className="poliza-type-header">
          <span className="poliza-icon">📄</span>
          <span>{poliza.desc_ramo?.trim() || "Ramo no especificado"}</span>
        </div>

        <div className="poliza-details-grid">
          <div className="detail-item">
            <strong>Póliza:</strong>
            <span>{poliza.poliza || "No especificado"}</span>
          </div>

          <div className="detail-item">
            <strong>Descripción:</strong>
            <span>{poliza.descripcion || "No especificado"}</span>
          </div>

          <div className="detail-item">
            <strong>Ramo:</strong>
            <span>{poliza.desc_ramo?.trim() || "No especificado"}</span>
          </div>

          <div className="detail-item">
            <strong>Vigencia:</strong>
            <span>
              {poliza.fe_inicio_vigencia || "No especificado"} al{" "}
              {poliza.fe_fin_vigencia || "No especificado"}
            </span>
          </div>

          {poliza.fechaEmision && (
            <div className="detail-item">
              <strong>Fecha de Emisión:</strong>
              <span>{poliza.fechaEmision}</span>
            </div>
          )}

          {poliza.estado && (
            <div className="detail-item">
              <strong>Estado:</strong>
              <span>{poliza.estado}</span>
            </div>
          )}

          {poliza.planComer && (
            <div className="detail-item">
              <strong>Plan Comercial:</strong>
              <span>{poliza.planComer.trim()}</span>
            </div>
          )}

          {poliza.formaPago && (
            <div className="detail-item">
              <strong>Forma de Pago:</strong>
              <span>{poliza.formaPago.trim()}</span>
            </div>
          )}

          {poliza.saldoVencido !== undefined && poliza.saldoVencido > 0 && (
            <div className="detail-item">
              <strong>Saldo Vencido:</strong>
              <span className="saldo-vencido">
                ${poliza.saldoVencido.toLocaleString()}
              </span>
            </div>
          )}

          {/* <div className="detail-item">
            <strong>Código de Ramo:</strong>
            <span>{poliza.cd_ramo}</span>
          </div> */}

          {/* <div className="detail-item">
            <strong>Negocio:</strong>
            <span>{poliza.negocio}</span>
          </div> */}

          {poliza.cd_sucursal && (
            <div className="detail-item">
              <strong>Sucursal:</strong>
              <span>{poliza.cd_sucursal}</span>
            </div>
          )}

          {poliza.certificado && (
            <div className="detail-item">
              <strong>Certificado:</strong>
              <span>{poliza.certificado}</span>
            </div>
          )}

          {poliza.riesgo > 0 && (
            <div className="detail-item">
              <strong>Riesgo:</strong>
              <span>{poliza.riesgo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Información del Tomador */}
      {poliza.tomador && (
        <div className="poliza-info-card">
          <h3 className="section-title">Información del Tomador</h3>
          <div className="poliza-details-grid">
            {poliza.tomador.nomTom && (
              <div className="detail-item">
                <strong>Nombre:</strong>
                <span>{poliza.tomador.nomTom.trim()}</span>
              </div>
            )}
            {poliza.tomador.domTom && (
              <div className="detail-item">
                <strong>Domicilio:</strong>
                <span>{poliza.tomador.domTom}</span>
              </div>
            )}
            {poliza.tomador.localTom && poliza.tomador.provTom && (
              <div className="detail-item">
                <strong>Localidad:</strong>
                <span>
                  {poliza.tomador.localTom.trim()},{" "}
                  {poliza.tomador.provTom.trim()}
                </span>
              </div>
            )}
            {poliza.tomador.codPTom && (
              <div className="detail-item">
                <strong>Código Postal:</strong>
                <span>{poliza.tomador.codPTom.trim()}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Riesgos */}
      {poliza.riesgos && poliza.riesgos.length > 0 && (
        <div className="poliza-info-card">
          <h3 className="section-title">Riesgos Cubiertos</h3>
          <div className="riesgos-list">
            {poliza.riesgos.map((riesgo, index) => (
              <div key={index} className="riesgo-item">
                <div className="riesgo-header">
                  <span className="riesgo-numero">Riesgo {riesgo.numero}</span>
                  <span
                    className={`estado-badge ${riesgo.estado.toLowerCase()}`}
                  >
                    {riesgo.estado}
                  </span>
                </div>
                <div className="riesgo-description">{riesgo.descripcion}</div>
                <div className="riesgo-vigencia">
                  Vigencia: {riesgo.iniVig} al {riesgo.finVig}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Poliza;

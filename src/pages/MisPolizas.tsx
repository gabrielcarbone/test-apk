import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import ButtonCustom from "../components/ButtonCustom";
import TextCustom from "../components/TextCustom";
import CardPoliza from "../components/CardPoliza";
import Carousel from "../components/Carousel";
import { getStoredPolizas } from "../services/polizasService";
import type { Poliza } from "../types/polizaTypes";
import "./MisPolizas.css";

const MisPolizas: React.FC = () => {
  const [polizas, setPolizas] = useState<Poliza[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const loadPolizas = () => {
      try {
        const storedPolizas = getStoredPolizas();
        if (storedPolizas) {
          setPolizas(storedPolizas);
        } else {
          console.warn("No hay pólizas almacenadas en el almacenamiento local");
          setPolizas([]);
        }
      } catch (error) {
        console.error(
          "Error cargando pólizas desde el almacenamiento local:",
          error
        );
        setPolizas([]);
      } finally {
        setLoading(false);
      }
    };

    loadPolizas();
  }, []);

  const normalizeText = (text: string) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredPolizas = polizas
    ? polizas.filter((poliza) => {
        const searchTerm = normalizeText(filterText);
        return (
          normalizeText(poliza.poliza).includes(searchTerm) ||
          normalizeText(poliza.descripcion).includes(searchTerm) ||
          normalizeText(poliza.desc_ramo).includes(searchTerm)
        );
      })
    : [];

  if (loading) {
    return <div className="screen">Cargando pólizas...</div>;
  }

  return (
    <div className="screen">
      <div className="filter-section">
        <div className="filter-input-wrapper">
          <TextCustom
            type="text"
            placeholder="Buscar por póliza, descripción o ramo..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="filter-input"
            showClearButton={true}
            onClear={() => setFilterText("")}
          />
          <ButtonCustom className="filter-btn">
            <Filter size={16} />
          </ButtonCustom>
        </div>
      </div>

      <div className="polizas-carousel">
        {filteredPolizas.length > 0 ? (
          <Carousel>
            {filteredPolizas.map((poliza) => (
              <CardPoliza key={poliza.id_poliza} poliza={poliza} />
            ))}
          </Carousel>
        ) : (
          <div className="no-results">
            <p>No se encontraron pólizas</p>
            {filterText && <p>Intenta modificar tu búsqueda</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisPolizas;

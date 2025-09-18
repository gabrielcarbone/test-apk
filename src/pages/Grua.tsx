import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { Filter } from "lucide-react";
import TextCustom from "../components/TextCustom";
import ButtonCustom from "../components/ButtonCustom";
import SwitchCustom from "../components/SwitchCustom";
import CardRiesgo from "../components/CardRiesgo";
import Carousel from "../components/Carousel";
import { getStoredRiesgos } from "../services/riesgosService";
import type { Riesgo } from "../types/riesgoTypes";
import "./Grua.css";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map click events
function MapClickHandler({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationChange(lat, lng);
    },
  });
  return null;
}

const Grua: React.FC = () => {
  const [address, setAddress] = useState("");
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [scheduleForLater, setScheduleForLater] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [riesgos, setRiesgos] = useState<Riesgo[]>([]);
  const [selectedRiesgo, setSelectedRiesgo] = useState<Riesgo | null>(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          reverseGeocode(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Buenos Aires center
          setPosition([-34.6037, -58.3816]);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    } else {
      // Geolocation not supported, default to Buenos Aires
      setPosition([-34.6037, -58.3816]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadRiesgos = () => {
      try {
        const storedRiesgos = getStoredRiesgos();
        if (storedRiesgos) {
          setRiesgos(storedRiesgos);
        }
      } catch (error) {
        console.error("Error cargando riesgos en Grua:", error);
        setRiesgos([]);
      }
    };

    loadRiesgos();
  }, []);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data.display_name) {
        setAddress(data.display_name);
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  const handleLocationChange = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    reverseGeocode(lat, lng);
  };


  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredRiesgos = riesgos.filter((riesgo) => {
    const searchTerm = normalizeText(vehicleSearch);
    return (
      normalizeText(riesgo.numero_poliza).includes(searchTerm) ||
      normalizeText(riesgo.patente).includes(searchTerm) ||
      normalizeText(riesgo.vehiculo).includes(searchTerm)
    );
  });

  const riesgosToShow = selectedRiesgo ? [selectedRiesgo] : filteredRiesgos;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Grúa request submitted:", {
      address,
      vehicleSearch,
      scheduleForLater,
      position,
    });
  };

  return (
    <div className="grua-container">
      <div className="grua-header">
        <img
          src="/images/grua/1_981.svg"
          alt="Back"
          className="grua-header__icon"
        />
        <h1 className="grua-header__title">Grúa</h1>
      </div>

      <p className="grua-description">
        Ingresá la dirección donde se encuentra el vehículo que necesita auxilio
        o buscala en el mapa.
      </p>

      <form onSubmit={handleSubmit} className="grua-form">
        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Dirección
          </label>
          <div className="input-wrapper">
            <TextCustom
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ingresá la dirección donde se encuentra el vehícl"
              className="input-field"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="map-container">
          {loading ? (
            <div className="map-loading">Obteniendo ubicación...</div>
          ) : position ? (
            <MapContainer
              center={position}
              zoom={15}
              className="leaflet-container"
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Ubicación del vehículo</Popup>
              </Marker>
              <MapClickHandler onLocationChange={handleLocationChange} />
            </MapContainer>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="vehicle-search" className="form-label">
            Vehículo
          </label>
          <div className="filter-input-wrapper">
            <TextCustom
              type="text"
              id="vehicle-search"
              placeholder="Buscar por riesgo, patente o marca..."
              value={vehicleSearch}
              onChange={(e) => setVehicleSearch(e.target.value)}
              className="filter-input"
              showClearButton={true}
              onClear={() => setVehicleSearch("")}
              spellCheck={false}
            />
            <ButtonCustom className="filter-btn">
              <Filter size={16} />
            </ButtonCustom>
          </div>
        </div>

        <div className="riesgos-carousel">
          {riesgosToShow.length > 0 ? (
            <Carousel
              forceHideNavigation={!!selectedRiesgo}
              forceHideIndicators={!!selectedRiesgo}
            >
              {riesgosToShow.map((riesgo) => (
                <CardRiesgo
                  key={`${riesgo.numero_poliza}-${riesgo.numero_riesgo}`}
                  riesgo={riesgo}
                  showSelectButton={true}
                  isSelected={
                    selectedRiesgo?.numero_poliza === riesgo.numero_poliza &&
                    selectedRiesgo?.numero_riesgo === riesgo.numero_riesgo
                  }
                  onSelect={() => setSelectedRiesgo(riesgo)}
                  onDeselect={() => setSelectedRiesgo(null)}
                />
              ))}
            </Carousel>
          ) : (
            <div className="no-riesgos">
              <p>No se encontraron vehículos</p>
              {vehicleSearch && <p>Intenta modificar tu búsqueda</p>}
            </div>
          )}
        </div>

        <div className="schedule-group">
          <p
            className={`schedule-group__text ${
              !selectedRiesgo || !address.trim() ? "disabled" : ""
            }`}
          >
            Quiero programar la grúa para otro momento.
          </p>
          <SwitchCustom
            checked={scheduleForLater}
            onChange={(_, checked) => setScheduleForLater(checked)}
            disabled={!selectedRiesgo || !address.trim()}
          />
        </div>

        <ButtonCustom
          type="submit"
          className="confirm-button"
          disabled={!selectedRiesgo || !address.trim()}
        >
          Confirmar pedido
        </ButtonCustom>
      </form>
    </div>
  );
};

export default Grua;

import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CreditCard,
  Home,
  Truck,
  Settings,
} from "lucide-react";
import "./Footer.css";

const Footer: React.FC = () => (
  <footer className="app-footer">
    <Link to="/denuncias" className="footer-btn">
      <AlertTriangle size={20} />
      <span>Denunciar</span>
    </Link>
    <Link to="/pagos" className="footer-btn">
      <CreditCard size={20} />
      <span>Pagar</span>
    </Link>
    <Link to="/" className="footer-btn">
      <Home size={20} />
      <span>Inicio</span>
    </Link>
    <Link to="/grua" className="footer-btn">
      <Truck size={20} />
      <span>Grúa</span>
    </Link>
    <Link to="/asistencia" className="footer-btn">
      <Settings size={20} />
      <span>Asistencia</span>
    </Link>
  </footer>
);

export default Footer;

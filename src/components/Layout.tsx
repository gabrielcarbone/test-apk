import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, showWelcomeMessage } = useAuth();

  const getTitle = (pathname: string): string => {
    const titles: { [key: string]: string } = {
      "/": showWelcomeMessage && user?.nombre ? `¡Hola ${user.nombre}!` : "Inicio",
      "/home": showWelcomeMessage && user?.nombre ? `¡Hola ${user.nombre}!` : "Inicio",
      "/calendario": "Mi calendario",
      "/mi-cuenta": "Mi cuenta",
      "/mis-polizas": "Mis pólizas",
      "/preguntas-frecuentes": "Preguntas frecuentes",
      "/pagos": "Pagos",
      "/asistencia": "Asistencia",
      "/contacto": "Centro de contacto",
      "/denuncias": "Denuncias",
      "/denunciar": "Denunciar",
      "/cobertura": "Mi cobertura",
      "/poliza": "Tarjeta de circulación",
    };
    return titles[pathname] || "App";
  };

  const handleMenuClick = () => setSidebarOpen(true);
  const handleBackClick = () => window.history.back();

  return (
    <div className="app-container">
      <Header 
        title={getTitle(location.pathname)}
        showBack={location.pathname !== '/' && location.pathname !== '/home'}
        onMenuClick={handleMenuClick}
        onBackClick={handleBackClick}
      />
      
      <main className="app-main">
        {children}
      </main>
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Footer />
    </div>
  );
};

export default Layout;
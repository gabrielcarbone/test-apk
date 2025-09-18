import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useAuth';
import ButtonCustom from './ButtonCustom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout.mutate();
    onClose();
  };

  return (
    <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`}>
      <div className="sidebar">
        <div className="sidebar-content">
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/mis-polizas')}
          >
            Mis pólizas
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/poliza')}
          >
            Tarjeta de circulación
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/calendario')}
          >
            Mi calendario
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/mi-cuenta')}
          >
            Mi cuenta
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/cobertura')}
          >
            Mi cobertura
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/preguntas-frecuentes')}
          >
            Preguntas frecuentes
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/denunciar')}
          >
            Denunciar
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/denuncias')}
          >
            Denuncias
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/grua')}
          >
            Grúa
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item"
            onClick={() => handleNavigation('/login')}
          >
            Login
          </ButtonCustom>
          <ButtonCustom 
            className="sidebar-item logout-item"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            {logout.isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
          </ButtonCustom>
        </div>
        <ButtonCustom 
          className="sidebar-close"
          onClick={onClose}
        >
          ×
        </ButtonCustom>
      </div>
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { Menu, Bell, User, ArrowLeft } from 'lucide-react';
import ButtonCustom from './ButtonCustom';
import './Header.css';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showBell?: boolean;
  onMenuClick: () => void;
  onBackClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showBell = true, 
  onMenuClick, 
  onBackClick 
}) => (
  <header className="app-header">
    <div className="header-left">
      <ButtonCustom 
        className="menu-btn" 
        onClick={onMenuClick}
      >
        <Menu size={24} />
      </ButtonCustom>
      {showBack && (
        <ButtonCustom className="back-btn" onClick={onBackClick}>
          <ArrowLeft size={20} />
        </ButtonCustom>
      )}
      <h1 className="header-title">{title}</h1>
    </div>
    <div className="header-right">
      <ButtonCustom className="icon-btn">
        <User size={20} />
      </ButtonCustom>
      {showBell && (
        <ButtonCustom className="icon-btn">
          <Bell size={20} />
        </ButtonCustom>
      )}
    </div>
  </header>
);

export default Header;
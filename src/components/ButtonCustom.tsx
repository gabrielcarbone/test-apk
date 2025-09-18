import React from 'react';

interface ButtonCustomProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ 
  children, 
  onClick, 
  className, 
  type = "button",
  disabled = false
}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonCustom;
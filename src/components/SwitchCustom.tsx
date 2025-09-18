import React from 'react';
import Switch from '@mui/material/Switch';

interface SwitchCustomProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const SwitchCustom: React.FC<SwitchCustomProps> = ({ 
  defaultChecked = false, 
  checked,
  onChange,
  className,
  disabled
}) => {
  return (
    <Switch 
      defaultChecked={defaultChecked}
      checked={checked}
      onChange={onChange}
      className={className}
      disabled={disabled}
    />
  );
};

export default SwitchCustom;
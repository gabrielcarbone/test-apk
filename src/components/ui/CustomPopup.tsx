import React from 'react';
import { Alert } from '@mui/material';
import type { Popup } from '../../types/popupTypes';

interface CustomPopupProps extends Omit<Popup, 'id'> {
  onClose: () => void;
}

export const CustomPopup: React.FC<CustomPopupProps> = ({
  type,
  message,
  children,
  onClose,
}) => {
  const content = children || message;

  const getMuiSeverity = (popupType: string) => {
    switch (popupType) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <Alert 
      severity={getMuiSeverity(type)} 
      onClose={onClose}
      sx={{ 
        mb: 1,
        '& .MuiAlert-message': {
          width: '100%'
        }
      }}
    >
      {content}
    </Alert>
  );
};
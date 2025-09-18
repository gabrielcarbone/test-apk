import React from 'react';
import { Box } from '@mui/material';
import { usePopup } from '../../hooks/usePopup';
import { CustomPopup } from './CustomPopup';

export const PopupContainer: React.FC = () => {
  const { popups, hidePopup } = usePopup();

  if (popups.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        maxWidth: 400,
        width: '100%',
      }}
    >
      {popups.map((popup) => (
        <CustomPopup
          key={popup.id}
          type={popup.type}
          message={popup.message}
          children={popup.children}
          onClose={() => hidePopup(popup.id)}
        />
      ))}
    </Box>
  );
};
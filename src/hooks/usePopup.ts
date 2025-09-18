import { useContext } from 'react';
import { PopupContext } from '../context/PopupContext';
import type { ShowPopupOptions } from '../types/popupTypes';

export const usePopup = () => {
  const context = useContext(PopupContext);
  
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }

  const { showPopup: showPopupBase, hidePopup, clearAll, popups } = context;

  const showPopup = (options: ShowPopupOptions) => {
    return showPopupBase(options);
  };

  const showSuccess = (message: string, options?: Partial<ShowPopupOptions>) => {
    return showPopup({ type: 'success', message, ...options });
  };

  const showError = (message: string, options?: Partial<ShowPopupOptions>) => {
    return showPopup({ type: 'error', message, ...options });
  };

  const showInfo = (message: string, options?: Partial<ShowPopupOptions>) => {
    return showPopup({ type: 'info', message, ...options });
  };

  const showWarning = (message: string, options?: Partial<ShowPopupOptions>) => {
    return showPopup({ type: 'warning', message, ...options });
  };

  return {
    popups,
    showPopup,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hidePopup,
    clearAll,
  };
};
import React, { createContext, useState, useCallback } from 'react';
import type { Popup, PopupContextType } from '../types/popupTypes';

export const PopupContext = createContext<PopupContextType | undefined>(undefined);

interface PopupProviderProps {
  children: React.ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [popups, setPopups] = useState<Popup[]>([]);

  const showPopup = useCallback((popup: Omit<Popup, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newPopup: Popup = {
      ...popup,
      id,
      autoClose: popup.autoClose ?? true,
      duration: popup.duration ?? 5000,
    };

    setPopups(prev => [...prev, newPopup]);

    if (newPopup.autoClose && newPopup.duration) {
      setTimeout(() => {
        hidePopup(id);
      }, newPopup.duration);
    }

    return id;
  }, []);

  const hidePopup = useCallback((id: string) => {
    setPopups(prev => {
      const popup = prev.find(p => p.id === id);
      if (popup?.onClose) {
        popup.onClose();
      }
      return prev.filter(p => p.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    popups.forEach(popup => {
      if (popup.onClose) {
        popup.onClose();
      }
    });
    setPopups([]);
  }, [popups]);

  const value: PopupContextType = {
    popups,
    showPopup,
    hidePopup,
    clearAll,
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
    </PopupContext.Provider>
  );
};
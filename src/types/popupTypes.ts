import { type ReactNode } from 'react';

export type PopupType = 'success' | 'error' | 'info' | 'warning';

export interface Popup {
  id: string;
  type: PopupType;
  message?: string;
  children?: ReactNode;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
}

export interface PopupContextType {
  popups: Popup[];
  showPopup: (popup: Omit<Popup, 'id'>) => string;
  hidePopup: (id: string) => void;
  clearAll: () => void;
}

export interface ShowPopupOptions {
  type: PopupType;
  message?: string;
  children?: ReactNode;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
}
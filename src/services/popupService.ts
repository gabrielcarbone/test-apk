import type { ShowPopupOptions } from '../types/popupTypes';

let popupContext: any = null;

export const initPopupService = (context: any) => {
  popupContext = context;
};

export const popupService = {
  show: (options: ShowPopupOptions) => {
    if (!popupContext) {
      console.error('PopupService not initialized. Call initPopupService first.');
      return '';
    }
    return popupContext.showPopup(options);
  },

  showSuccess: (message: string, options?: Partial<ShowPopupOptions>) => {
    return popupService.show({ type: 'success', message, ...options });
  },

  showError: (message: string, options?: Partial<ShowPopupOptions>) => {
    return popupService.show({ type: 'error', message, ...options });
  },

  showInfo: (message: string, options?: Partial<ShowPopupOptions>) => {
    return popupService.show({ type: 'info', message, ...options });
  },

  showWarning: (message: string, options?: Partial<ShowPopupOptions>) => {
    return popupService.show({ type: 'warning', message, ...options });
  },

  hide: (id: string) => {
    if (!popupContext) {
      console.error('PopupService not initialized. Call initPopupService first.');
      return;
    }
    popupContext.hidePopup(id);
  },

  clearAll: () => {
    if (!popupContext) {
      console.error('PopupService not initialized. Call initPopupService first.');
      return;
    }
    popupContext.clearAll();
  },
};
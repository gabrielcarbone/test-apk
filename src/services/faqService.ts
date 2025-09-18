import type { FAQResponse, FAQCategory } from "../types/faqTypes";
import { getMockFAQs } from "../mocks/faqMock";


// Funciones para manejo de FAQs en localStorage
export const getStoredFaqs = (): FAQCategory[] | null => {
  const data = localStorage.getItem(
    import.meta.env.VITE_STORAGE_KEY_FAQS || "faqs_data"
  );
  return data ? JSON.parse(data) : null;
};

export const setStoredFaqs = (faqsData: FAQCategory[]): void => {
  localStorage.setItem(
    import.meta.env.VITE_STORAGE_KEY_FAQS || "faqs_data",
    JSON.stringify(faqsData)
  );
  // Disparar evento personalizado para notificar cambios
  window.dispatchEvent(new CustomEvent("faqs-updated"));
};

export const removeStoredFaqs = (): void => {
  localStorage.removeItem(
    import.meta.env.VITE_STORAGE_KEY_FAQS || "faqs_data"
  );
};

export const hasStoredFaqs = (): boolean => {
  return !!getStoredFaqs();
};

class FAQService {
  async getAllFAQs(): Promise<FAQResponse> {
    try {
      // Por ahora siempre usar mocks para testing
      console.log("Using mock data for FAQs");
      const response = await getMockFAQs();
      
      // Guardar las categorías completas en localStorage
      if (response.data && Array.isArray(response.data)) {
        setStoredFaqs(response.data);
      }
      
      return response;

      /* 
      // Código para cuando la API esté lista:
      if (USE_MOCKS) {
        console.log('Using mock data for FAQs');
        const mockResponse = await getMockFAQs();
        setStoredFaqs(mockResponse.faqs);
        return mockResponse;
      }

      const response = await apiClient.get<FAQResponse>('/api/v1/faqs');
      setStoredFaqs(response.data.faqs);
      return response.data;
      */
    } catch (error) {
      console.error("Error fetching FAQs:", error);

      // Fallback to mocks if API fails
      console.log("API failed, falling back to mock data");
      const fallbackResponse = await getMockFAQs();
      if (fallbackResponse.data && Array.isArray(fallbackResponse.data)) {
        setStoredFaqs(fallbackResponse.data);
      }
      return fallbackResponse;
    }
  }
}

export default new FAQService();

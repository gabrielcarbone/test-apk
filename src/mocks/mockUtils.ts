/**
 * Simula latencia de red usando el valor configurable VITE_MOCK_DELAY
 * @param customDelay - Delay específico opcional, si no se proporciona usa VITE_MOCK_DELAY
 */
export const simulateNetworkDelay = async (customDelay?: number): Promise<void> => {
  const delay = customDelay ?? parseInt(import.meta.env.VITE_MOCK_DELAY || '800');
  await new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * Wrapper para funciones mock que añade delay automáticamente
 * @param mockFunction - Función mock a ejecutar
 * @param customDelay - Delay opcional específico para esta función
 */
export const withMockDelay = async <T>(
  mockFunction: () => T | Promise<T>,
  customDelay?: number
): Promise<T> => {
  await simulateNetworkDelay(customDelay);
  return await mockFunction();
};
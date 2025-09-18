import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { setUserData } from '../services/authService';
import type { EnrichedUserData } from '../types';

export const useCompleteUserProfile = () => {
  const { user, setUser } = useAuth();
  const [isHydrating, setIsHydrating] = useState(false);
  const [hydrationError, setHydrationError] = useState<string | null>(null);

  const hydrateUserProfile = async (): Promise<EnrichedUserData | null> => {
    if (!user) {
      console.warn("No user data available for hydration");
      return null;
    }

    setIsHydrating(true);
    setHydrationError(null);

    try {
      console.log("Starting user profile hydration...");

      // TODO: Agregar llamadas a servicios externos cuando sea necesario
      // Por ahora solo retornamos el usuario actual sin enriquecer
      
      const enrichedUser: EnrichedUserData = {
        ...user
        // Campos adicionales se pueden agregar aquí en el futuro
      };

      // Actualizar el contexto y localStorage
      setUser(enrichedUser);
      setUserData(enrichedUser);

      console.log("User profile hydration completed successfully");
      return enrichedUser;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown hydration error";
      console.error("User profile hydration failed:", errorMessage);
      setHydrationError(errorMessage);
      return null;
    } finally {
      setIsHydrating(false);
    }
  };

  const refreshUserProfile = async (): Promise<void> => {
    await hydrateUserProfile();
  };

  return {
    hydrateUserProfile,
    refreshUserProfile,
    isHydrating,
    hydrationError,
    enrichedUser: user as EnrichedUserData
  };
};
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  isAuthenticated,
  removeAuthToken,
  removeRefreshToken,
  removeUserData,
  getUserData,
} from "../services/authService";
import riesgosService from "../services/riesgosService";
import { removeStoredRiesgos } from "../services/riesgosService";
import polizasService from "../services/polizasService";
import { removeStoredPolizas } from "../services/polizasService";
import faqService from "../services/faqService";
import { removeStoredFaqs } from "../services/faqService";
import type { AuthContextType, UserData } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const checkAuthStatus = () => {
    const authStatus = isAuthenticated();
    setAuthenticated(authStatus);
    return authStatus;
  };

  const logout = () => {
    removeAuthToken();
    removeRefreshToken();
    removeUserData();
    removeStoredRiesgos();
    removeStoredPolizas();
    removeStoredFaqs();
    setUser(null);
    setAuthenticated(false);
    setShowWelcomeMessage(false);
  };

  const triggerWelcomeMessage = () => {
    setShowWelcomeMessage(true);
    setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 4000); // 4 segundos
  };

  const loadUserData = async () => {
    console.log("Cargando datos del usuario...");
    // Cargar datos del usuario desde localStorage
    const userData = getUserData();
    setUser(userData);

    // Cargar riesgos del API y guardarlos en localStorage
    try {
      await riesgosService.loadAndCacheRiesgos();
      console.log("Riesgos cargados y almacenados en almacenamiento local");
    } catch (error) {
      console.error("Error cargando riesgos post-login:", error);
    }

    // Cargar pólizas del API y guardarlas en localStorage
    try {
      await polizasService.loadAndCachePolizas();
      console.log("Pólizas cargadas y almacenadas en almacenamiento local");
    } catch (error) {
      console.error("Error cargando pólizas post-login:", error);
    }

    // Cargar FAQs del API y guardarlas en localStorage
    try {
      await faqService.getAllFAQs();
      console.log("FAQs cargadas y almacenadas en almacenamiento local");
    } catch (error) {
      console.error("Error cargando FAQs post-login:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = checkAuthStatus();
        if (authStatus) {
          await loadUserData();
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Verificar autenticación cada vez que cambie el localStorage
    const handleStorageChange = () => {
      const authStatus = checkAuthStatus();
      if (authStatus) {
        const userData = getUserData();
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: authenticated,
    isLoading,
    showWelcomeMessage,
    setUser,
    logout,
    triggerWelcomeMessage,
    loadUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

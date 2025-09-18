import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  setAuthToken,
  setRefreshToken,
  getAuthToken,
  removeAuthToken,
  removeRefreshToken,
  removeUserData,
  setUserData,
  isAuthenticated,
} from "../services/authService";
import type { LoginRequest, LoginResponse, UserData } from "../types";
import { useCompleteUserProfile } from "./useCompleteUserProfile";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { hydrateUserProfile } = useCompleteUserProfile();
  const { triggerWelcomeMessage, loadUserData } = useAuth();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.access_token) {
        // Guardar tokens
        setAuthToken(data.access_token);
        if (data.refresh_token) {
          setRefreshToken(data.refresh_token);
        }

        // Guardar datos del usuario
        const userData: UserData = {
          usuario_oracle: data.usuario_oracle || "",
          usuario_login: data.usuario_login || "",
          email: data.email || "",
          nombre: data.nombre || "",
          tipo_doc: data.tipo_doc,
          desc_tipo_doc: data.desc_tipo_doc,
          numero_doc: data.numero_doc,
          telefono_fijo: data.telefono_fijo,
          telefono_movil: data.telefono_movil,
        };
        setUserData(userData);

        // Forzar actualización del contexto de autenticación
        window.dispatchEvent(new Event("storage"));
        queryClient.invalidateQueries({ queryKey: ["user"] });

        // Disparar mensaje de bienvenida después del login exitoso
        triggerWelcomeMessage();

        // Cargar datos del usuario (riesgos y pólizas) y después hidratar perfil
        setTimeout(async () => {
          try {
            await loadUserData();
            console.log("Se cargaron riesgos y pólizas");
            
            await hydrateUserProfile();
            console.log("Se cargaron los datos del usuario");
          } catch (error) {
            console.error(`Error al cargar los datos del usuario: ${error}`);
          }
        }, 100); // Pequeño delay para permitir que el contexto se actualice primero
      }
    },
    onError: (error) => {
      console.error(`Login fallido:" ${error}`);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      removeAuthToken();
      removeRefreshToken();
      removeUserData();
      queryClient.clear();
    },
    onSuccess: () => {
      window.location.href = "/login";
    },
  });
};

export const useAuthToken = () => {
  return {
    token: getAuthToken(),
    isAuthenticated: isAuthenticated(),
    setToken: setAuthToken,
    removeToken: removeAuthToken,
  };
};

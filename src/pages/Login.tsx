import React, { useState } from "react";
import { User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import TextCustom from "../components/TextCustom";
import ButtonCustom from "../components/ButtonCustom";
import "./Login.css";

const Login: React.FC = () => {
  // const [username, setUsername] = useState('pruebasmisseguros@nacion-seguros.com.ar');
  // const [password, setPassword] = useState('Prueba2025');
  const [username, setUsername] = useState("prueba12@app.com");
  const [password, setPassword] = useState("Prueba2025");
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la ruta desde donde vino el usuario, o '/' por defecto
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          // Redirigir a la ruta intentada originalmente
          navigate(from, { replace: true });
        },
      }
    );
  };

  return (
    <div className="app-container">
      <div className="login-screen">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="user-avatar">
            <User size={48} />
          </div>
          <div className="form-group">
            <label>Usuario</label>
            <TextCustom
              type="text"
              placeholder="Escribí tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <TextCustom
              type="password"
              placeholder="Escribí tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordToggle={true}
            />
          </div>
          <ButtonCustom
            type="submit"
            className="primary-btn"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Iniciando sesión..." : "Ingresar"}
          </ButtonCustom>
          {loginMutation.error && (
            <div className="error-message">
              Error: {loginMutation.error.message}
            </div>
          )}
          <ButtonCustom type="button" className="text-btn">
            Olvidé mi contraseña
          </ButtonCustom>
        </form>
        <div className="logo-section">
          <h2>Logo</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;

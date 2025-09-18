import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando datos del usuario...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div>Usuario no autenticado</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', margin: '20px' }}>
      <h2>Perfil del Usuario</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        <div>
          <strong>Nombre:</strong> {user.nombre}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Usuario Oracle:</strong> {user.usuario_oracle}
        </div>
        <div>
          <strong>Usuario Login:</strong> {user.usuario_login}
        </div>
        {user.numero_doc && (
          <div>
            <strong>{user.desc_tipo_doc}:</strong> {user.numero_doc}
          </div>
        )}
        {user.telefono_movil && (
          <div>
            <strong>Teléfono móvil:</strong> {user.telefono_movil}
          </div>
        )}
        {user.telefono_fijo && (
          <div>
            <strong>Teléfono fijo:</strong> {user.telefono_fijo}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
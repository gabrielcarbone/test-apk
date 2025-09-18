import React from 'react';
import { useCompleteUserProfile } from '../hooks/useCompleteUserProfile';
import { useAuth } from '../context/AuthContext';

const EnrichedUserProfile: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { enrichedUser, isHydrating, hydrationError, refreshUserProfile } = useCompleteUserProfile();

  if (isLoading) {
    return <div>Cargando datos del usuario...</div>;
  }

  if (!isAuthenticated || !enrichedUser) {
    return <div>Usuario no autenticado</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', margin: '20px' }}>
      <h2>Perfil Completo del Usuario</h2>
      
      {/* Datos básicos del login */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Datos Básicos:</h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          <div><strong>Nombre:</strong> {enrichedUser.nombre}</div>
          <div><strong>Email:</strong> {enrichedUser.email}</div>
          <div><strong>Usuario Oracle:</strong> {enrichedUser.usuario_oracle}</div>
        </div>
      </div>

      {/* Datos adicionales - extensible para futuros servicios */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Información Adicional:</h3>
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          Los datos adicionales de servicios externos aparecerán aquí cuando estén disponibles.
        </div>
      </div>

      {/* Estado de hidratación */}
      <div style={{ marginBottom: '20px' }}>
        {isHydrating && (
          <div style={{ color: 'blue' }}>
            🔄 Actualizando datos adicionales...
          </div>
        )}
        
        {hydrationError && (
          <div style={{ color: 'red' }}>
            ❌ Error al cargar datos: {hydrationError}
          </div>
        )}
      </div>

      {/* Botón de refresh */}
      <button 
        onClick={refreshUserProfile}
        disabled={isHydrating}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isHydrating ? 'not-allowed' : 'pointer',
          opacity: isHydrating ? 0.6 : 1
        }}
      >
        {isHydrating ? 'Actualizando...' : 'Actualizar Datos'}
      </button>
      
      {/* Debug info */}
      <details style={{ marginTop: '20px' }}>
        <summary>Debug - Datos completos del usuario</summary>
        <pre style={{ background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
          {JSON.stringify(enrichedUser, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default EnrichedUserProfile;
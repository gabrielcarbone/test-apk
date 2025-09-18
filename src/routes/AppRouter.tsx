import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import Calendario from '../pages/Calendario';
import MiCuenta from '../pages/MiCuenta';
import MisPolizas from '../pages/MisPolizas';
import PreguntasFrecuentes from '../pages/PreguntasFrecuentes';
import Pagos from '../pages/Pagos';
import Asistencia from '../pages/Asistencia';
import Contacto from '../pages/Contacto';
import Denuncias from '../pages/Denuncias';
import Login from '../pages/Login';
import Cobertura from '../pages/Cobertura';
import Poliza from '../pages/Poliza';
import Denunciar from '../pages/Denunciar';
import Grua from '../pages/Grua';

export const AppRouter: React.FC = () => {

  return (
    <Routes>
      {/* Ruta pública - Sin Layout */}
      <Route path="/login" element={<Login />} />
      
      {/* Rutas protegidas - Con Layout */}
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home onNavigate={() => {}} />
              </ProtectedRoute>
            } />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home onNavigate={() => {}} />
              </ProtectedRoute>
            } />
            <Route path="/calendario" element={
              <ProtectedRoute>
                <Calendario />
              </ProtectedRoute>
            } />
            <Route path="/mi-cuenta" element={
              <ProtectedRoute>
                <MiCuenta />
              </ProtectedRoute>
            } />
            <Route path="/mis-polizas" element={
              <ProtectedRoute>
                <MisPolizas />
              </ProtectedRoute>
            } />
            <Route path="/preguntas-frecuentes" element={
              <ProtectedRoute>
                <PreguntasFrecuentes />
              </ProtectedRoute>
            } />
            <Route path="/pagos" element={
              <ProtectedRoute>
                <Pagos />
              </ProtectedRoute>
            } />
            <Route path="/asistencia" element={
              <ProtectedRoute>
                <Asistencia />
              </ProtectedRoute>
            } />
            <Route path="/contacto" element={
              <ProtectedRoute>
                <Contacto />
              </ProtectedRoute>
            } />
            <Route path="/denuncias" element={
              <ProtectedRoute>
                <Denuncias />
              </ProtectedRoute>
            } />
            <Route path="/denunciar" element={
              <ProtectedRoute>
                <Denunciar />
              </ProtectedRoute>
            } />
            <Route path="/cobertura" element={
              <ProtectedRoute>
                <Cobertura />
              </ProtectedRoute>
            } />
            <Route path="/poliza" element={
              <ProtectedRoute>
                <Poliza />
              </ProtectedRoute>
            } />
            <Route path="/grua" element={
              <ProtectedRoute>
                <Grua />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
};
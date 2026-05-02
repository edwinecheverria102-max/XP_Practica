import React from 'react';
import { Sidebar } from './Componentes/sidebar';
import './Componentes/sedebar.css'; // Asegúrate de que el body tenga margin: 0

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

      <Sidebar />

      <main style={{ flex: 1, padding: '40px', display: 'flex', justifyContent: 'center' }}>

        <div style={{ width: '100%', maxWidth: '500px' }}>
          <h1>Contenido Principal</h1>
          <p>Aquí se cargará el formulario de Iniciar Sesión o los CRUDs.</p>
        </div>

      </main>
    </div>
  );
};

export default App;
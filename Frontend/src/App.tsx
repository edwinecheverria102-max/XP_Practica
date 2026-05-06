import React, { useState } from 'react';
import { Sidebar } from './Componentes/sidebar';
import './Componentes/sedebar.css';

import { Login } from './Equipos/Equipo_1/Equipo_1';
import { Registro } from './Equipos/Equipo_2/Equipo_2';
import { Catalogo as CatalogoEquipo3 } from './Equipos/Equipo_3/Equipo_3';
import { Catalogo } from './Equipos/Equipo_4/Equipo_4';
import { Usuarios } from './Equipos/Equipo_5/Equipo_5';
import { Agregar } from './Equipos/Equipo_6/Equipo_6';
import { Ver } from './Equipos/Equipo_7/Equipo_7';
import { Editar } from './Equipos/Equpo_8/Equipo_8';
import { Inventario } from './Equipos/Equipo_9/Equipo_9';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login')

  const renderContent = () => {
    switch (activeTab) {
      case 'login':
        return <Login />
      case 'registro':
        return <Registro />
      case 'perfil':
        return <div>Perfil</div>
      case 'catalogo':
       return <CatalogoEquipo3 />
      case 'usuarios':
        return <Usuarios />
      case 'agregar':
        return <Agregar />
      case 'ver':
        return <Ver />
      case 'editar':
        return <Editar />
      case 'inventario':
        return <Inventario />
      default:
        return <div>Selecciona una opción</div>
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{
        flex: 1,
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './sedebar.css'

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const menuItems = [
    { id: 'login', label: 'Iniciar Sesión' },
    { id: 'registro', label: 'Registro' },
    { id: 'perfil', label: 'Mi Perfil' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'usuarios', label: 'Usuarios' },
    { id: 'agregar', label: 'Agregar' },
    { id: 'ver', label: 'Ver' },
    { id: 'editar', label: 'Editar' },
    { id: 'inventario', label: 'Inventario' }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <aside className="sidebar-container">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Biblioteca XP</h2>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`sidebar-btn ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
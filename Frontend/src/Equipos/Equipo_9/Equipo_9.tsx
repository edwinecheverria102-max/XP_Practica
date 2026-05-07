import React, { useState, useEffect } from 'react';

// Ajusta esta URL si tu backend de FastAPI corre en otro puerto
const API_URL = 'http://127.0.0.1:8000/libros';

export const Inventario = () => {
    const [libros, setLibros] = useState<any[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    
    // Estado para el nuevo libro que será enviado al POST
    // Nota: Asegúrate de que los nombres coincidan exactamente con tu Pydantic LibroCreate
    const [nuevoLibro, setNuevoLibro] = useState({
        titulo: '',
        autor: '', 
        genero: '',
        precio: '',
        cantidad_disponible: '' // Puede llamarse 'stock' en tu backend, cámbialo si es necesario
    });

    // 1. Obtener los libros al cargar la vista
    useEffect(() => {
        fetchLibros();
    }, []);

    const fetchLibros = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                setLibros(data);
            }
        } catch (error) {
            console.error('Error de red al cargar el inventario:', error);
        }
    };

    // 2. Manejar cambios en el formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNuevoLibro({ ...nuevoLibro, [name]: value });
    };

    // 3. Consumir tu nuevo endpoint POST /libros
    const handleAgregarLibro = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...nuevoLibro,
                precio: parseFloat(nuevoLibro.precio),
                cantidad_disponible: parseInt(nuevoLibro.cantidad_disponible, 10)
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const libroAgregado = await response.json();
                setLibros([...libros, libroAgregado]);
                setMostrarFormulario(false);
                setNuevoLibro({ titulo: '', autor: '', genero: '', precio: '', cantidad_disponible: '' }); 
                alert("Libro agregado correctamente");
            } else {
                // Si el backend rechaza la petición (ej. Error 422 o 500)
                const errorData = await response.json();
                console.error('El backend retornó un error:', errorData);
                alert(`Error del servidor: ${JSON.stringify(errorData.detail || errorData)}`);
            }
        } catch (error) {
            // Si no se puede conectar al backend (ej. CORS o servidor apagado)
            console.error('Error de red al enviar el libro:', error);
            alert("Error de red: No se pudo conectar al Backend. Revisa la consola (F12) o verifica el CORS.");
        }
    };

    // 4. Lógica de búsqueda
    const librosFiltrados = libros.filter(libro => 
        libro.titulo?.toLowerCase().includes(busqueda.toLowerCase()) || 
        libro.autor?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            {/* Cabecera del Inventario */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Inventario de Libros</h2>
                <div>
                    <input 
                        type="text" 
                        placeholder="Buscar libro..." 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '250px' }}
                    />
                    <button 
                        onClick={() => setMostrarFormulario(!mostrarFormulario)}
                        style={{ padding: '8px 16px', backgroundColor: mostrarFormulario ? '#6c757d' : '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {mostrarFormulario ? 'Cancelar' : '+ Agregar Libro'}
                    </button>
                </div>
            </div>

            {/* Formulario de Inserción */}
            {mostrarFormulario && (
                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #dee2e6' }}>
                    <h3 style={{ marginTop: 0 }}>Registrar Nuevo Libro</h3>
                    <form onSubmit={handleAgregarLibro} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <input type="text" name="titulo" placeholder="Título" value={nuevoLibro.titulo} onChange={handleInputChange} required style={inputStyle} />
                        <input type="text" name="autor" placeholder="Autor" value={nuevoLibro.autor} onChange={handleInputChange} required style={inputStyle} />
                        <input type="text" name="genero" placeholder="Género" value={nuevoLibro.genero} onChange={handleInputChange} required style={inputStyle} />
                        <input type="number" step="0.01" name="precio" placeholder="Precio ($)" value={nuevoLibro.precio} onChange={handleInputChange} required style={inputStyle} />
                        <input type="number" name="cantidad_disponible" placeholder="Cantidad Disponible" value={nuevoLibro.cantidad_disponible} onChange={handleInputChange} required style={inputStyle} />
                        <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Guardar
                        </button>
                    </form>
                </div>
            )}

            {/* Tabla de Datos */}
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'white' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ccc' }}>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Título</th>
                        <th style={thStyle}>Autor</th>
                        <th style={thStyle}>Género</th>
                        <th style={thStyle}>Precio</th>
                        <th style={thStyle}>Cantidad</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {librosFiltrados.length > 0 ? (
                        librosFiltrados.map((libro, index) => (
                            <tr key={libro.id_libro || index} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={tdStyle}>{libro.id_libro || '-'}</td>
                                <td style={tdStyle}>{libro.titulo}</td>
                                <td style={tdStyle}>{libro.autor}</td>
                                <td style={tdStyle}>{libro.genero}</td>
                                <td style={tdStyle}>${Number(libro.precio).toFixed(2)}</td>
                                <td style={tdStyle}>{libro.cantidad_disponible}</td>
                                <td style={tdStyle}>
                                    <button style={{ ...btnAccionStyle, backgroundColor: '#ffc107', color: '#000' }}>Editar</button>
                                    <button style={{ ...btnAccionStyle, backgroundColor: '#dc3545', color: '#fff' }}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                No se encontraron registros en el inventario.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Estilos en línea básicos para mantener la simplicidad y no depender de CSS externos extra
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: '1 1 150px' };
const thStyle = { padding: '12px 15px', color: '#333' };
const tdStyle = { padding: '12px 15px' };
const btnAccionStyle = { margin: '0 4px', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' };
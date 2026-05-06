import React, { useState, useEffect } from 'react';

export const Editar = ({ id_libro = 5 }) => { 
    
    const [titulo, setTitulo] = useState("");
    const [isbn, setIsbn] = useState("");
    const [autor, setAutor] = useState("");
    const [categoria, setCategoria] = useState("");
    
    const [anioPublicacion, setAnioPublicacion] = useState(0);
    const [estadoLibro, setEstadoLibro] = useState("");
    
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatosLibro = async () => {
            try {
           
                const response = await fetch(`http://localhost:8000/libros/${id_libro}`);
                if (response.ok) {
                    const data = await response.json();
                    
                    setTitulo(data.titulo || "");
                    setIsbn(data.isbn || "");
                    
                    setAutor(data.id_autor ? String(data.id_autor) : "");
                    setCategoria(data.id_categoria ? String(data.id_categoria) : "");
                    
                    setAnioPublicacion(data.anio_publicacion || 0);
                    setEstadoLibro(data.estado || "Disponible");
                } else {
                    alert("ERROR: El libro no existe en la base de datos.");
                }
            } catch (error) {
                console.error("Error al conectar con la API:", error);
                alert("ERROR: No se pudo conectar al servidor.");
            } finally {
                setCargando(false);
            }
        };

        cargarDatosLibro();
    }, [id_libro]);

    const handleCancelar = () => {
        if (window.confirm("¿Seguro que quieres salir sin guardar los cambios?")) {
            window.location.reload(); 
        }
    };

    const handleGuardar = async () => {
        if (!autor || !categoria) {
            alert("ATENCION: Por favor selecciona un autor y una categoria.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/libros/${id_libro}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    titulo: titulo, 
                    isbn: isbn, 
                    id_autor: parseInt(autor), 
                    id_categoria: parseInt(categoria),
                    anio_publicacion: anioPublicacion, 
                    estado: estadoLibro 
                }),
            });

            if (response.ok) {
                alert(`EXITO: El libro "${titulo}" se actualizo correctamente.`);
            } else {
                const error = await response.json();
                alert(`ERROR: ${error.detail || "No se pudo actualizar"}`);
            }
        } catch (error) {
            alert("ERROR: El backend no responde.");
        }
    };

    const handleEliminar = async () => {
        if (!window.confirm("¿Estas completamente seguro de eliminar este libro de la biblioteca?")) return;

        try {
            const response = await fetch(`http://localhost:8000/libros/${id_libro}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("ELIMINADO: Registro borrado con exito.");
                window.location.reload(); 
            } else {
                alert("ERROR: El libro no pudo ser eliminado.");
            }
        } catch (error) {
            alert("ERROR: Conexion fallida.");
        }
    };

    const styles = {
        container: { maxWidth: '550px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' },
        title: { fontSize: '28px', fontWeight: 'bold', marginBottom: '5px', color: '#111827' },
        divider: { height: '6px', backgroundColor: '#4F46E5', width: '100%', marginBottom: '20px', borderRadius: '10px' },
        card: { backgroundColor: '#d5d5d5', borderRadius: '15px', padding: '40px', border: '4px solid #111827', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' },
        label: { display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#374151', marginBottom: '8px', textTransform: 'uppercase' as const },
        input: { width: '100%', padding: '12px 16px', borderRadius: '14px', border: '2px solid #D1D5DB', marginBottom: '22px', backgroundColor: '#f3f4f6dc', boxSizing: 'border-box' as const },
        buttonContainer: { display: 'flex', justifyContent: 'space-between', marginTop: '30px', gap: '12px' },
        btnCancelar: { backgroundColor: '#858585', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', flex: 1 },
        btnEliminar: { backgroundColor: '#EF4444', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', flex: 1 },
        btnGuardar: { backgroundColor: '#4F46E5', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }
    };

    if (cargando) {
        return <div style={styles.container}><h3>Cargando informacion del libro...</h3></div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Editar Libro</h2>
            <div style={styles.divider}></div>
            <div style={styles.card}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label style={styles.label}>Titulo del libro</label>
                    <input style={styles.input} type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                    <label style={styles.label}>ISBN</label>
                    <input style={styles.input} type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                   
                    <label style={styles.label}>Autor</label>
                    <select style={styles.input} value={autor} onChange={(e) => setAutor(e.target.value)}>
                        <option value="" disabled>Seleccione un autor...</option>
                        <option value="1">Gabriel Garcia Marquez</option>
                        <option value="2">Isabel Allende</option>
                        <option value="3">George Orwell</option>
                        <option value="4">J.K. Rowling</option>
                        <option value="5">Isaac Asimov</option>
                    </select>

                    <label style={styles.label}>Categoria</label>
                    <select style={styles.input} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="" disabled>Seleccione una categoria...</option>
                        <option value="1">Realismo Magico</option>
                        <option value="2">Ciencia Ficcion</option>
                        <option value="3">Fantasia</option>
                        <option value="4">Distopia</option>
                        <option value="5">Novela Historica</option>
                    </select>

                    <div style={styles.buttonContainer}>
                        <button type="button" style={styles.btnCancelar} onClick={handleCancelar}>Cancelar</button>
                        <button type="button" style={styles.btnEliminar} onClick={handleEliminar}>Eliminar Libro</button>
                        <button type="button" style={styles.btnGuardar} onClick={handleGuardar}>Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
import React, { useState } from 'react'

interface VerProps {
    onSubmit?: (data: { titulo: string; autor: string }) => void
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

export const Ver: React.FC<VerProps> = ({ onSubmit }) => {
    const [showForm, setShowForm] = useState(false)
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [idAutor, setIdAutor] = useState('0')
    const [idCategoria, setIdCategoria] = useState('0')
    const [isbn, setIsbn] = useState('')
    const [anioPublicacion, setAnioPublicacion] = useState('0')
    const [estado, setEstado] = useState('Disponible')
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)
        setError(null)

        const payload = {
            titulo,
            autor_nombre: autor,
            id_autor: Number(idAutor),
            id_categoria: Number(idCategoria),
            isbn,
            anio_publicacion: Number(anioPublicacion),
            estado,
        }

        try {
            const response = await fetch(`${API_URL}/libros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error('Error al guardar el libro')
            }

            await response.json()

            if (onSubmit) {
                onSubmit({ titulo, autor })
            }

            setMessage('Libro guardado correctamente.')
            setTitulo('')
            setAutor('')
            setShowForm(false)
        } catch (err) {
            setError('No se pudo guardar el libro. Verifica la conexión con el backend.')
        }
    }

    return (
        <section>
            <button
                type="button"
                onClick={() => setShowForm(true)}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                + Agregar Libro
            </button>
            <h1>Agregar libro</h1>

            {showForm && (
                <form aria-label="formulario agregar libro" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="titulo">Título</label>
                        <input
                            id="titulo"
                            name="titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="autor">Autor</label>
                        <input
                            id="autor"
                            name="autor"
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="id_autor">ID autor</label>
                        <input
                            id="id_autor"
                            name="id_autor"
                            type="number"
                            value={idAutor}
                            onChange={(e) => setIdAutor(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="id_categoria">ID categoría</label>
                        <input
                            id="id_categoria"
                            name="id_categoria"
                            type="number"
                            value={idCategoria}
                            onChange={(e) => setIdCategoria(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="isbn">ISBN</label>
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="anio_publicacion">Año de publicación</label>
                        <input
                            id="anio_publicacion"
                            name="anio_publicacion"
                            type="number"
                            value={anioPublicacion}
                            onChange={(e) => setAnioPublicacion(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="estado">Estado</label>
                        <select
                            id="estado"
                            name="estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="Prestado">Prestado</option>
                            <option value="Reservado">Reservado</option>
                        </select>
                    </div>
                    <button type="submit">Guardar libro</button>
                </form>
            )}

            {message && <p style={{ color: 'green', marginTop: '20px' }}>{message}</p>}
            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        </section>
    )
}


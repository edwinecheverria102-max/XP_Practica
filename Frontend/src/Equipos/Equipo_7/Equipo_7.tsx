import React, { useEffect, useState } from 'react';
import './Equipo_7.css';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

interface Libro {
  id_libro: number;
  titulo: string;
  estado: string;
  prestamo_activo: {
    id_usuario: number;
    fecha_devolucion_prevista: string;
  } | null;
}

interface VerProps {
  onSubmit?: (data: { titulo: string; autor: string }) => void;
}

const initialFormState = {
  titulo: '',
  autor: '',
  idAutor: '0',
  idCategoria: '0',
  isbn: '',
  anioPublicacion: '0',
  estado: 'Disponible',
};

export const Ver: React.FC<VerProps> = ({ onSubmit }) => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({ titulo: '', estado: '' });
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idAutor, setIdAutor] = useState('0');
  const [idCategoria, setIdCategoria] = useState('0');
  const [isbn, setIsbn] = useState('');
  const [anioPublicacion, setAnioPublicacion] = useState('0');
  const [estado, setEstado] = useState('Disponible');
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

const fetchInventario = () => {
    setLoading(true);
    fetch(`${API_URL}/inventario`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => setLibros(data))
      .catch((err) => setFetchError(err.message || 'Error al cargar el inventario'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch(`${API_URL}/inventario`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setLibros(data))
      .catch((err) => setFetchError(err.message || 'Error al cargar el inventario'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setFormError(null);

    const payload = {
      titulo,
      autor_nombre: autor,
      id_autor: Number(idAutor),
      id_categoria: Number(idCategoria),
      isbn,
      anio_publicacion: Number(anioPublicacion),
      estado,
    };

    try {
      const response = await fetch(`${API_URL}/libros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el libro');
      }

      await response.json();

      if (onSubmit) {
        onSubmit({ titulo, autor });
      }

      setMessage('Libro guardado correctamente.');
      setTitulo('');
      setAutor('');
      setIdAutor('0');
      setIdCategoria('0');
      setIsbn('');
      setAnioPublicacion('0');
      setEstado('Disponible');
      setShowForm(false);
    } catch (err) {
      setFormError('No se pudo guardar el libro. Verifica la conexión con el backend.');
    }
  };

  const handleEditClick = (libro: Libro) => {
    setEditingId(libro.id_libro);
    setEditFormData({ titulo: libro.titulo, estado: libro.estado });
    setMessage(null);
    setFormError(null);
  };

  const handleEditFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id_libro: number) => {
    try {
      const response = await fetch(`${API_URL}/libros/${id_libro}`, {
        method: 'PUT', 
		headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: editFormData.titulo,
          estado: editFormData.estado,
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar el libro');

      setMessage('Libro actualizado correctamente.');
      setEditingId(null); 
	  fetchInventario(); 
	} catch (err) {
      setFormError('No se pudo actualizar el libro. Verifica la conexión con el backend.');
    }
  };

  return (
    <div>
      <section>
        <h2>Inventario de Libros</h2>
        {loading && <p>Cargando inventario...</p>}
        {fetchError && <p style={{ color: 'red' }}>Error: {fetchError}</p>}
        <table className="equipo7-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Estado</th>
              <th>Préstamo</th>
			  <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!loading && !fetchError && libros.length === 0 ? (
              <tr>
                <td colSpan={3}>No hay datos en el inventario</td>
              </tr>
            ) : (
              libros.map((libro) => (
                <tr key={libro.id_libro}>
                <td>
    {editingId === libro.id_libro ? (
      <input
        type="text"
        name="titulo"
        value={editFormData.titulo}
        onChange={handleEditFormChange}
        style={{ width: '100%', padding: '4px' }}
      />
    ) : (
      libro.titulo
    )}
  </td>  
<td>
    {editingId === libro.id_libro ? (
      <select
        name="estado"
        value={editFormData.estado}
        onChange={handleEditFormChange}
        style={{ padding: '4px' }}
      >
        <option value="Disponible">Disponible</option>
        <option value="Prestado">Prestado</option>
        <option value="Reservado">Reservado</option>
      </select>
    ) : (
      libro.estado
    )}
  </td>			
  <td>{libro.prestamo_activo ? (
                      <div>
                        Usuario: {libro.prestamo_activo.id_usuario}
                        <br />
                        Devolución: {libro.prestamo_activo.fecha_devolucion_prevista}
                      </div>
                    ) : (
                      <span>Sin préstamo activo</span>
                    )}
                  </td>
               {/* Celda de Acciones */}
                  <td>
                    {editingId === libro.id_libro ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleSaveEdit(libro.id_libro)}
                          style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                        >
                          Guardar
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEditClick(libro)}
                        style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '3px', cursor: 'pointer' }}
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <section style={{ marginTop: '32px' }}>
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
            marginBottom: '20px',
          }}
        >
          + Agregar Libro
        </button>
        <h2>Agregar libro</h2>

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
        {formError && <p style={{ color: 'red', marginTop: '20px' }}>{formError}</p>}
      </section>
    </div>
  );
};

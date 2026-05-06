import React, { useEffect, useState } from 'react';
import './Equipo_7.css';

interface Libro {
  id_libro: number;
  titulo: string;
  estado: string;
  prestamo_activo: {
    id_usuario: number;
    fecha_devolucion_prevista: string;
  } | null;
}

export const Ver = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const endpoint = 'http://127.0.0.1:8000/inventario';

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setLibros(data))
      .catch((err) => setError(err.message || 'Error al cargar el inventario'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Inventario de Libros</h2>
      {loading && <p>Cargando inventario...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <table className="equipo7-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Estado</th>
            <th>Préstamo</th>
          </tr>
        </thead>
        <tbody>
          {libros.length === 0 ? (
            <tr>
              <td colSpan={3}>No hay datos en el inventario</td>
            </tr>
          ) : (
            libros.map((libro) => (
              <tr key={libro.id_libro}>
                <td>{libro.titulo}</td>
                <td>{libro.estado}</td>
                <td>
                  {libro.prestamo_activo ? (
                    <div>
                      Usuario: {libro.prestamo_activo.id_usuario}
                      <br />
                      Devolución: {libro.prestamo_activo.fecha_devolucion_prevista}
                    </div>
                  ) : (
                    <span>Sin préstamo activo</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

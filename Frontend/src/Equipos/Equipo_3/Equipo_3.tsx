import { useState, useEffect } from 'react'

interface Libro {
  id: number
  titulo: string
  autor: string
  genero: string
  estado: 'Disponible' | 'Rentado'
}

const librosIniciales: Libro[] = [
  { id: 101, titulo: 'Fundación', autor: 'Isaac Asimov', genero: 'Ciencia ficción', estado: 'Disponible' },
  { id: 102, titulo: '1984', autor: 'George Orwell', genero: 'Distopía', estado: 'Rentado' },
  { id: 103, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', genero: 'Fábula', estado: 'Disponible' },
  { id: 104, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', genero: 'Clásico', estado: 'Rentado' },
  { id: 105, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', genero: 'Realismo mágico', estado: 'Disponible' },
]

export const Catalogo = () => {
  const [libros, setLibros] = useState<Libro[]>([])

  useEffect(() => {
    setLibros(librosIniciales)
  }, [])

  return (
    <div style={{ padding: '24px' }}>
      <h1>Catálogo general</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
        {libros.map((libro) => (
          <div key={libro.id} style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{
                background: libro.estado === 'Disponible' ? '#eaf3de' : '#faeeda',
                color: libro.estado === 'Disponible' ? '#3b6d11' : '#854f0b',
                padding: '2px 10px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 500
              }}>
                {libro.estado}
              </span>
              <span style={{ fontSize: '12px', color: '#888' }}>ID: {libro.id}</span>
            </div>
            <p style={{ fontWeight: 600, fontSize: '15px', margin: '4px 0' }}>{libro.titulo}</p>
            <p style={{ fontSize: '13px', color: '#666', margin: '0 0 12px' }}>{libro.autor} · {libro.genero}</p>
            <button style={{
              width: '100%',
              padding: '8px',
              background: '#4a3fbf',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              Ver información
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
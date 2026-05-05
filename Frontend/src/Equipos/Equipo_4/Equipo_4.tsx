import { useState } from 'react'

const SIDEBAR_ACTIVE = '#FFB800'

interface Libro {
  id_libro: number
  titulo: string
  isbn: string | null
  anio_publicacion: number | null
  estado: string
}

function EstadoBadge({ estado }: { estado: string }) {
  const disponible = estado === 'Disponible'
  return (
    <span data-testid="estado-badge" style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 6,
      fontSize: 12, fontWeight: 500,
      background: disponible ? '#d1fae5' : '#fef3c7',
      color: disponible ? '#065f46' : '#92400e',
    }}>
      {estado}
    </span>
  )
}

function LibroCard({ libro }: { libro: Libro }) {
  return (
    <div data-testid="libro-card" style={{
      background: '#fff', border: '2px solid #1a1f2e',
      borderRadius: 12, padding: '28px 32px', maxWidth: 520,
    }}>
      <EstadoBadge estado={libro.estado} />
      <h2 data-testid="libro-titulo" style={{ fontSize: 28, fontWeight: 700, margin: '12px 0 28px', color: '#0f1117' }}>
        {libro.titulo}
      </h2>
      <div style={{ display: 'flex', gap: 48 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 4px' }}>ISBN</p>
          <p data-testid="libro-isbn" style={{ fontSize: 14, fontWeight: 500, color: '#0f1117', margin: 0 }}>{libro.isbn ?? '—'}</p>
        </div>
        {libro.anio_publicacion && (
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#6b7280', textTransform: 'uppercase', margin: '0 0 4px' }}>Año de publicación</p>
            <p data-testid="libro-anio" style={{ fontSize: 14, fontWeight: 500, color: '#0f1117', margin: 0 }}>{libro.anio_publicacion}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const Ver = () => {
  const [idInput, setIdInput] = useState('')
  const [libro, setLibro]     = useState<Libro | null>(null)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const buscar = async () => {
    if (!idInput) return
    setLoading(true)
    setError('')
    setLibro(null)
    try {
      const res = await fetch(`http://localhost:8000/libros/${idInput}`)
      if (!res.ok) { setError('Libro no encontrado'); return }
      setLibro(await res.json())
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px 48px', background: '#f1f5f9', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0f1117', margin: '0 0 8px' }}>
        Información del Libro
      </h1>
      <div style={{ width: 200, height: 4, background: 'linear-gradient(90deg, #6366f1, #818cf8)', borderRadius: 2, marginBottom: 32 }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, maxWidth: 520 }}>
        <input
          data-testid="input-id-libro"
          type="number"
          min={1}
          placeholder="ID del libro (ej. 1)"
          value={idInput}
          onChange={e => setIdInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && buscar()}
          style={{
            flex: 1, padding: '8px 12px', borderRadius: 8,
            border: '1.5px solid #d1d5db', fontSize: 14,
            outline: 'none', color: '#0f1117', background: '#fff',
          }}
        />
        <button
          data-testid="btn-buscar"
          onClick={buscar}
          style={{
            padding: '8px 18px', borderRadius: 8, border: 'none',
            background: SIDEBAR_ACTIVE, color: '#0f1117',
            fontWeight: 600, fontSize: 14, cursor: 'pointer',
          }}
        >
          Buscar
        </button>
      </div>

      {loading && <p style={{ color: '#6b7280', fontSize: 14 }}>Cargando...</p>}
      {error   && <p data-testid="error-msg" style={{ color: '#dc2626', fontSize: 14 }}>{error}</p>}
      {libro   && <LibroCard libro={libro} />}
    </div>
  )
}
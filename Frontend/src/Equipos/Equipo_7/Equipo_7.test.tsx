import '@testing-library/jest-dom'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Ver } from './Equipo_7'

const mockInventario = [
  {
    id_libro: 1,
    titulo: 'Cien años de soledad',
    estado: 'Disponible',
    prestamo_activo: null,
  },
  {
    id_libro: 2,
    titulo: '1984',
    estado: 'Rentado',
    prestamo_activo: {
      id_usuario: 1,
      fecha_devolucion_prevista: '2026-05-05',
    },
  },
  {
    id_libro: 3,
    titulo: 'La casa de los espíritus',
    estado: 'Disponible',
    prestamo_activo: {
      id_usuario: 4,
      fecha_devolucion_prevista: '2026-05-01',
    },
  },
]

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('test del equipo 7', () => {
  it('debe mostrar los datos del inventario en la tabla', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockInventario),
      })
    )

    Object.defineProperty(globalThis, 'fetch', {
      value: fetchMock,
      configurable: true,
    })

    render(<Ver />)

    await waitFor(() => {
      expect(screen.getByText('Cien años de soledad')).toBeInTheDocument()
      expect(screen.getByText('1984')).toBeInTheDocument()
      expect(screen.getByText('La casa de los espíritus')).toBeInTheDocument()
    })

    expect(screen.getAllByText('Disponible')).toHaveLength(2)
    expect(screen.getByText('Rentado')).toBeInTheDocument()
    expect(screen.getByText(/Usuario: 1/)).toBeInTheDocument()
    expect(screen.getByText(/Devolución: 2026-05-05/)).toBeInTheDocument()
    expect(screen.getByText(/Usuario: 4/)).toBeInTheDocument()
    expect(screen.getByText(/Devolución: 2026-05-01/)).toBeInTheDocument()
  })

  it('debe mostrar un botón para agregar libro', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockInventario),
      })
    )

    Object.defineProperty(globalThis, 'fetch', {
      value: fetchMock,
      configurable: true,
    })

    render(<Ver />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /agregar libro/i })).toBeInTheDocument()
    })
  })

  it('debe mostrar el formulario de agregar libro al hacer clic', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockInventario),
      })
    )

    Object.defineProperty(globalThis, 'fetch', {
      value: fetchMock,
      configurable: true,
    })

    render(<Ver />)

    const botonAgregar = await screen.findByRole('button', { name: /agregar libro/i })
    await userEvent.click(botonAgregar)

    const formulario = screen.getByRole('form', { name: /formulario agregar libro/i })
    expect(formulario).toBeInTheDocument()
  })

  it('debe mostrar los campos título y autor en el formulario', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockInventario),
      })
    )

    Object.defineProperty(globalThis, 'fetch', {
      value: fetchMock,
      configurable: true,
    })

    render(<Ver />)

    const botonAgregar = await screen.findByRole('button', { name: /agregar libro/i })
    await userEvent.click(botonAgregar)

    const campoTitulo = screen.getByLabelText(/título/i)
    const campoAutor = screen.getByLabelText(/^Autor$/i)

    expect(campoTitulo).toBeInTheDocument()
    expect(campoAutor).toBeInTheDocument()
  })

  it('debe permitir llenar los campos y enviar el formulario', async () => {
    const mockOnSubmit = vi.fn()
    const mockedFetch = vi.fn((input, init) => {
      const url = typeof input === 'string' ? input : input.url
      if (url.includes('/inventario') && (!init || init.method === undefined)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockInventario),
        })
      }

      if (url.includes('/libros') && init?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id_libro: 1,
            titulo: 'El Quijote',
            isbn: null,
            anio_publicacion: null,
            estado: 'Disponible',
          }),
        })
      }

      return Promise.reject(new Error('Unexpected fetch'))
    })

    Object.defineProperty(globalThis, 'fetch', {
      value: mockedFetch,
      configurable: true,
    })

    render(<Ver onSubmit={mockOnSubmit} />)

    await waitFor(() => {
      expect(screen.getByText('Cien años de soledad')).toBeInTheDocument()
    })

    const botonAgregar = screen.getByRole('button', { name: /agregar libro/i })
    await userEvent.click(botonAgregar)

    const campoTitulo = screen.getByLabelText(/título/i)
    const campoAutor = screen.getByLabelText(/^Autor$/i)
    const campoIdAutor = screen.getByLabelText(/id autor/i)
    const campoIdCategoria = screen.getByLabelText(/id categoría/i)
    const campoISBN = screen.getByLabelText(/isbn/i)
    const campoAnio = screen.getByLabelText(/año de publicación/i)
    const campoEstado = screen.getByLabelText(/estado/i)
    const botonSubmit = screen.getByRole('button', { name: /guardar libro/i })

    await userEvent.type(campoTitulo, 'El Quijote')
    await userEvent.type(campoAutor, 'Miguel de Cervantes')
    await userEvent.clear(campoIdAutor)
    await userEvent.type(campoIdAutor, '0')
    await userEvent.clear(campoIdCategoria)
    await userEvent.type(campoIdCategoria, '0')
    await userEvent.type(campoISBN, '1234567890')
    await userEvent.clear(campoAnio)
    await userEvent.type(campoAnio, '0')
    await userEvent.selectOptions(campoEstado, 'Disponible')
    await userEvent.click(botonSubmit)

    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining('/libros'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: 'El Quijote',
          autor_nombre: 'Miguel de Cervantes',
          id_autor: 0,
          id_categoria: 0,
          isbn: '1234567890',
          anio_publicacion: 0,
          estado: 'Disponible',
        }),
      })
    )

    expect(mockOnSubmit).toHaveBeenCalledWith({
      titulo: 'El Quijote',
      autor: 'Miguel de Cervantes',
    })
  })
})

import '@testing-library/jest-dom'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Ver } from './Equipo_7'

beforeEach(() => {
    vi.restoreAllMocks()
})

describe('test del equipo 7', () => {
    it('debe mostrar un botón para agregar libro', () => {
        render(<Ver />)

        const botonAgregar = screen.getByRole('button', { name: /agregar libro/i })

        expect(botonAgregar).toBeInTheDocument()
    })

    it('debe mostrar el formulario de agregar libro al hacer clic', async () => {
        render(<Ver />)

        const botonAgregar = screen.getByRole('button', { name: /agregar libro/i })
        await userEvent.click(botonAgregar)

        const formulario = screen.getByRole('form', { name: /formulario agregar libro/i })
        expect(formulario).toBeInTheDocument()
    })

    it('debe mostrar los campos título y autor en el formulario', async () => {
        render(<Ver />)

        const botonAgregar = screen.getByRole('button', { name: /agregar libro/i })
        await userEvent.click(botonAgregar)

        const campoTitulo = screen.getByLabelText(/título/i)
        const campoAutor = screen.getByLabelText(/^Autor$/i)

        expect(campoTitulo).toBeInTheDocument()
        expect(campoAutor).toBeInTheDocument()
    })

    it('debe permitir llenar los campos y enviar el formulario', async () => {
        const mockOnSubmit = vi.fn()
        const mockedFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    id_libro: 1,
                    titulo: 'El Quijote',
                    isbn: null,
                    anio_publicacion: null,
                    estado: 'Disponible'
                })
            }) as Promise<Response>
        )
        global.fetch = mockedFetch as any

        render(<Ver onSubmit={mockOnSubmit} />)

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
                    estado: 'Disponible'
                })
            })
        )

        expect(mockOnSubmit).toHaveBeenCalledWith({
            titulo: 'El Quijote',
            autor: 'Miguel de Cervantes'
        })
    })
})
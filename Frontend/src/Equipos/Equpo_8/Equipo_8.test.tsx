import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Editar } from './Equipo_8' // Asegúrate de que la ruta sea correcta
import React from 'react'

describe('test del equipo 8 - Editar Libro', () => {

    it('Historia 1: Debe renderizar el formulario con los inputs para Título e ISBN', () => {
        render(<Editar />)
        
        // Buscamos que existan los campos de texto
        const inputTitulo = screen.getByLabelText(/Título del libro/i)
        const inputIsbn = screen.getByLabelText(/ISBN/i)
        
        expect(inputTitulo).toBeDefined()
        expect(inputIsbn).toBeDefined()
    })

    it('Historia 2: Debe mostrar dropdowns para seleccionar Autor y Categoría', () => {
        render(<Editar />)
        
        // Buscamos que existan elementos tipo 'combobox' (selectores/dropdowns)
        const selectAutor = screen.getByLabelText(/Autor/i)
        const selectCategoria = screen.getByLabelText(/Categoría/i)
        
        expect(selectAutor.tagName).toBe('SELECT')
        expect(selectCategoria.tagName).toBe('SELECT')
    })

    it('Historia 3: Debe mostrar el botón de Guardar Cambios y un botón rojo de Eliminar Libro', () => {
        render(<Editar />)
        
        const btnGuardar = screen.getByRole('button', { name: /Guardar Cambios/i })
        const btnEliminar = screen.getByRole('button', { name: /Eliminar Libro/i })
        
        expect(btnGuardar).toBeDefined()
        expect(btnEliminar).toBeDefined()
        
        // Validamos visualmente que tenga alguna clase de color rojo (basado en Tailwind o CSS genérico)
        // Puedes ajustar la clase 'bg-red' según el framework CSS que estén usando
        expect(btnEliminar.className).toMatch(/red/i) 
    })
})
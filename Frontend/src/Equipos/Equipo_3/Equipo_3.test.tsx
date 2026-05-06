import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Catalogo } from './Equipo_3'

describe('test del equipo 3', () => {

  it('muestra el título Catálogo general', () => {
    render(<Catalogo />)
    expect(screen.getByText('Catálogo general')).toBeDefined()
  })

  it('muestra el libro Fundación', () => {
    render(<Catalogo />)
    expect(screen.getByText('Fundación')).toBeDefined()
  })

  it('muestra el badge Disponible', () => {
    render(<Catalogo />)
    const badges = screen.getAllByText('Disponible')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('muestra el badge Rentado', () => {
    render(<Catalogo />)
    const badges = screen.getAllByText('Rentado')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('muestra el ID del libro', () => {
    render(<Catalogo />)
    expect(screen.getByText('ID: 101')).toBeDefined()
  })

  it('muestra el autor del libro', () => {
    render(<Catalogo />)
    expect(screen.getByText(/Isaac Asimov/)).toBeDefined()
  })

  it('muestra el género del libro', () => {
    render(<Catalogo />)
    expect(screen.getByText(/Ciencia ficción/)).toBeDefined()
  })

  it('muestra el botón Ver información', () => {
    render(<Catalogo />)
    const botones = screen.getAllByText('Ver información')
    expect(botones.length).toBeGreaterThan(0)
  })

})
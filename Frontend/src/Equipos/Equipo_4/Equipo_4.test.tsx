import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Ver as Catalogo } from './Equipo_4'

describe('test del equipo 4', () => {

  it('renderiza el componente', () => {
    render(<Catalogo />)
    expect(screen.getByText('Información del Libro')).toBeTruthy()
  })

  it('muestra el input de búsqueda', () => {
    render(<Catalogo />)
    expect(screen.getByTestId('input-id-libro')).toBeTruthy()
  })

  it('muestra el botón buscar', () => {
    render(<Catalogo />)
    expect(screen.getByTestId('btn-buscar')).toBeTruthy()
  })

  it('no muestra tarjeta si no se ha buscado', () => {
    render(<Catalogo />)
    expect(screen.queryByTestId('libro-card')).toBeNull()
  })

  it('no muestra error si no se ha buscado', () => {
    render(<Catalogo />)
    expect(screen.queryByTestId('error-msg')).toBeNull()
  })

  it('el input acepta valor numérico', () => {
    render(<Catalogo />)
    const input = screen.getByTestId('input-id-libro') as HTMLInputElement
    fireEvent.change(input, { target: { value: '1' } })
    expect(input.value).toBe('1')
  })

  it('el botón buscar es clickeable', () => {
    render(<Catalogo />)
    const btn = screen.getByTestId('btn-buscar')
    expect(() => fireEvent.click(btn)).not.toThrow()
  })

  it('no lanza error si el input está vacío al buscar', () => {
    render(<Catalogo />)
    expect(() => fireEvent.click(screen.getByTestId('btn-buscar'))).not.toThrow()
  })

  it('el input responde a Enter', () => {
    render(<Catalogo />)
    const input = screen.getByTestId('input-id-libro')
    expect(() => fireEvent.keyDown(input, { key: 'Enter' })).not.toThrow()
  })

})
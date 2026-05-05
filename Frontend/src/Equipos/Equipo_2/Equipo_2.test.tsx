import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Equipo_2 from './Equipo_2'

describe('Registro - Equipo 2', () => {

  it('muestra todos los campos del formulario', () => {
    render(<Equipo_2 />)
    expect(screen.getByPlaceholderText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/correo electronico/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/^contrasena$/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/confirmar contrasena/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/numero de telefono/i)).toBeInTheDocument()
  })

  it('muestra error cuando contrasenas no coinciden', () => {
    render(<Equipo_2 />)
    fireEvent.change(screen.getByPlaceholderText(/nombre completo/i), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByPlaceholderText(/correo electronico/i), { target: { value: 'juan@mail.com' } })
    fireEvent.change(screen.getByPlaceholderText(/^contrasena$/i), { target: { value: 'abc123' } })
    fireEvent.change(screen.getByPlaceholderText(/confirmar contrasena/i), { target: { value: 'xyz999' } })
    fireEvent.change(screen.getByPlaceholderText(/numero de telefono/i), { target: { value: '6561234567' } })
    fireEvent.click(screen.getByText(/finalizar registro/i))
    expect(screen.getByText(/las contrasenas no coinciden/i)).toBeInTheDocument()
  })

  it('boton deshabilitado con campos vacios', () => {
    render(<Equipo_2 />)
    const boton = screen.getByText(/finalizar registro/i)
    expect(boton).toBeDisabled()
  })

})
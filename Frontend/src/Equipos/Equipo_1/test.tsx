import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Login } from './Equipo_1'

describe('Login - enlace a registro', () => {
  it('llama la navegación a registro al hacer clic en Crear cuenta', () => {
    const onGoToRegistro = vi.fn()
    render(<Login onGoToRegistro={onGoToRegistro} />)

    fireEvent.click(screen.getByRole('button', { name: 'Registrate Aqui' }))

    expect(onGoToRegistro).toHaveBeenCalledTimes(1)
  })
})

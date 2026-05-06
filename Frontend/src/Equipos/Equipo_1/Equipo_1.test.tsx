import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act } from 'react-dom/test-utils'
import { createRoot, type Root } from 'react-dom/client'
import { Login } from './Equipo_1'

describe('Login', () => {
	let container: HTMLDivElement
	let root: Root

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
		root = createRoot(container)

		act(() => {
			root.render(<Login />)
		})
	})

	afterEach(() => {
		act(() => {
			root.unmount()
		})
		document.body.innerHTML = ''
	})

	it('muestra un formulario claro para ingresar correo y contraseña', () => {
		expect(container.querySelector('h1')?.textContent).toBe('Iniciar sesión')
		expect(container.querySelector('p')?.textContent).toContain(
			'Ingresa tu correo y contraseña'
		)
		expect(container.querySelector('input[type="email"]')).not.toBeNull()
		expect(container.querySelector('input[type="password"]')).not.toBeNull()
		expect(container.querySelector('label[for="email"]')?.textContent).toBe(
			'Correo electrónico'
		)
		expect(container.querySelector('label[for="password"]')?.textContent).toBe(
			'Contraseña'
		)
		const buttons = container.querySelectorAll('button')
		expect(buttons).toHaveLength(3)
		expect(buttons[0]?.textContent).toBe('Iniciar sesión')
		expect(buttons[1]?.textContent).toBe('Registrarse')
		expect(buttons[2]?.textContent).toBe('Cancelar')
		expect(Array.from(buttons).every((button) => button.className.includes('login-button'))).toBe(true)
	})

	it('muestra un aviso de "contraseña es incorrecta" si las credenciales son inválidas', async () => {
		window.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 401,
			json: async () => ({ detail: 'contraseña es incorrecta' })
		})

		const emailInput = container.querySelector('input[type="email"]') as HTMLInputElement
		const passwordInput = container.querySelector('input[type="password"]') as HTMLInputElement
		const form = container.querySelector('form') as HTMLFormElement

		act(() => {
			emailInput.value = 'test@example.com'
			emailInput.dispatchEvent(new Event('input', { bubbles: true }))

			passwordInput.value = 'wrongpassword'
			passwordInput.dispatchEvent(new Event('input', { bubbles: true }))
		})

		await act(async () => {
			form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
		})

		const errorMsg = container.querySelector('.error-message')
		expect(errorMsg).not.toBeNull()
		expect(errorMsg?.textContent).toContain('contraseña es incorrecta')
	})
})
// @ts-nocheck
/* eslint-disable */
import * as React from 'react'

function Equipo_2() {
  const [nombre, setNombre] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [contrasena, setContrasena] = React.useState('')
  const [confirmar, setConfirmar] = React.useState('')
  const [telefono, setTelefono] = React.useState('')
  const [error, setError] = React.useState('')
  const [exito, setExito] = React.useState(false)
  const [cargando, setCargando] = React.useState(false)

  const camposCompletos = nombre && correo && contrasena && confirmar && telefono

  const handleSubmit = async () => {
    if (contrasena !== confirmar) {
      setError('Las contrasenas no coinciden')
      return
    }
    setError('')
    setCargando(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contrasena, telefono })
      })
      if (response.ok) {
        setExito(true)
      } else {
        const data = await response.json()
        setError(data.detail || 'Error al registrar')
      }
    } catch (e) {
      setError('No se pudo conectar al servidor')
    }
    setCargando(false)
  }

  return React.createElement('div', { style: { padding: '2rem', maxWidth: '400px', margin: '0 auto' } },
    React.createElement('h2', null, 'Crear cuenta nueva'),
    exito ? React.createElement('p', { style: { color: 'green', fontWeight: 'bold' } }, 'Registro exitoso! Tu cuenta fue creada.') : null,
    React.createElement('input', { placeholder: 'Nombre completo', value: nombre, onChange: (e: any) => setNombre(e.target.value), style: { display: 'block', width: '100%', marginBottom: '1rem' } }),
    React.createElement('input', { placeholder: 'Correo electronico', value: correo, onChange: (e: any) => setCorreo(e.target.value), style: { display: 'block', width: '100%', marginBottom: '1rem' } }),
    React.createElement('input', { placeholder: 'Contrasena', type: 'password', value: contrasena, onChange: (e: any) => setContrasena(e.target.value), style: { display: 'block', width: '100%', marginBottom: '1rem' } }),
    React.createElement('input', { placeholder: 'Confirmar contrasena', type: 'password', value: confirmar, onChange: (e: any) => setConfirmar(e.target.value), style: { display: 'block', width: '100%', marginBottom: '1rem' } }),
    React.createElement('input', { placeholder: 'Numero de telefono', value: telefono, onChange: (e: any) => setTelefono(e.target.value), style: { display: 'block', width: '100%', marginBottom: '1rem' } }),
    error ? React.createElement('p', { style: { color: 'red' } }, error) : null,
    React.createElement('button', { onClick: handleSubmit, disabled: !camposCompletos || cargando },
      cargando ? 'Registrando...' : 'Finalizar registro'
    )
  )
}

export default Equipo_2
export { Equipo_2 as Registro }
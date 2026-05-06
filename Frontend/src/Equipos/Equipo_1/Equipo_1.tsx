import { useState } from 'react';
import './Equipo_1.css'

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        try {
            // Ejemplo de llamada al backend
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                // Según la historia de usuario, el mensaje DEBE ser "contraseña es incorrecta"
                setError('contraseña es incorrecta');
                return;
            }

            // Login exitoso
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    }

    return (
        <section className="login-page" aria-labelledby="login-title">
            <h1 className="login-title" id="login-title">Iniciar sesión</h1>
            <p className="login-copy">Ingresa tu correo y contraseña para acceder a tu cuenta.</p>

            <form className="login-form" onSubmit={handleSubmit}>
                {error && (
                    <div className="error-message" style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                        {error}
                    </div>
                )}
                
                <div className="login-field">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="login-actions">
                    <button className="login-button login-button--primary" type="submit">Iniciar sesión</button>
                </div>
            </form>
        </section>
    )
}

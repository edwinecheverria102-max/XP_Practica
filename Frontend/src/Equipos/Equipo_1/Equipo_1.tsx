import './Equipo_1.css'

export const Login = () => {
    return (
        <section className="login-page" aria-labelledby="login-title">
            <h1 className="login-title" id="login-title">Iniciar sesión</h1>
            <p className="login-copy">Ingresa tu correo y contraseña para acceder a tu cuenta.</p>

            <form className="login-form">
                <div className="login-field">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Tu contraseña"
                    />
                </div>

                <div className="login-actions">
                    <button className="login-button login-button--primary" type="submit">Iniciar sesión</button>
                </div>
            </form>
        </section>
    )
}

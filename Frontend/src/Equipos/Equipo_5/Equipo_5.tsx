import React, { useEffect, useState } from "react";

interface Libro {
  titulo: string;
  fecha_entrega: string;
}

interface Usuario {
  nombre_completo: string;
  fecha_registro: string;
  correo: string;
  telefono: string;
  libros_en_posesion: Libro[];
}

export const Usuarios = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState(false);
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/usuarios/1")
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
        setCorreo(data.correo);
        setTelefono(data.telefono);
      })
      .catch((err) => console.error(err));
  }, []);

const guardarCambios = () => {
  fetch("http://127.0.0.1:8000/usuarios/1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo,
      telefono,
    }),
  })
    .then(res => res.json())
    .then(data => {
      setUsuario(data);   // 🔥 ahora sí viene completo
      setEditando(false);
    })
    .catch(err => console.error(err));
};

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Mi Perfil</h1>

        <div>
          <button
            onClick={() => setEditando(!editando)}
            style={{
              background: "#5b5bd6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {editando ? "Cancelar" : "Editar"}
          </button>

          {editando && (
            <button
              onClick={guardarCambios}
              style={{
                background: "#28a745",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Guardar
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          height: "5px",
          background: "#5b5bd6",
          marginBottom: "20px",
        }}
      />

      {/* CARD USUARIO */}
      <div
        style={{
          background: "#eaeaea",
          padding: "25px",
          borderRadius: "10px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h2>{usuario.nombre_completo}</h2>
        <p>Miembro desde: {usuario.fecha_registro}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div>
            <strong>Correo</strong>

            {editando ? (
              <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                style={{ display: "block", marginTop: "5px" }}
              />
            ) : (
              <p style={{ color: "blue" }}>{usuario.correo}</p>
            )}
          </div>

          <div>
            <strong>Teléfono</strong>

            {editando ? (
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={{ display: "block", marginTop: "5px" }}
              />
            ) : (
              <p>{usuario.telefono}</p>
            )}
          </div>
        </div>
      </div>

      {/* LIBROS */}
      <div
        style={{
          border: "2px solid black",
          borderRadius: "8px",
          padding: "20px",
          background: "white",
        }}
      >
        <h3>LIBROS EN POSESIÓN ACTUAL</h3>

        {usuario.libros_en_posesion.length === 0 ? (
          <p>No tienes libros actualmente</p>
        ) : (
          usuario.libros_en_posesion.map((libro, index) => (
            <div
              key={index}
              style={{
                background: "#f4b400",
                padding: "15px",
                borderRadius: "6px",
                marginTop: "10px",
              }}
            >
              <strong>"{libro.titulo}"</strong>
              <p>Fecha de entrega: {libro.fecha_entrega}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
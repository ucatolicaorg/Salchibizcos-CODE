import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import "../auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    email: "",
    password: "",
    role: "estudiante",
  });
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      await auth.register(form);
      navigate("/");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submit}>
        <h2>Registro de Usuario</h2>
        {err && <p style={{ color: "red", textAlign: "center" }}>{err}</p>}
        <input
          name="nombre"
          placeholder="Nombre"
          className="input-field"
          value={form.nombre}
          onChange={onChange}
          required
        />
        <input
          name="apellido"
          placeholder="Apellido"
          className="input-field"
          value={form.apellido}
          onChange={onChange}
          required
        />
        <input
          name="edad"
          type="number"
          placeholder="Edad"
          className="input-field"
          value={form.edad}
          onChange={onChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          className="input-field"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="input-field"
          value={form.password}
          onChange={onChange}
          required
        />
        <select
          name="role"
          className="input-field"
          value={form.role}
          onChange={onChange}
        >
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
        </select>
        <button type="submit" className="auth-button">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

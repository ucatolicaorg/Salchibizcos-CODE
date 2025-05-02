import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import "../auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const togglePwd = () => setShowPwd((p) => !p);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      await auth.login({ email: form.email, password: form.password });
      navigate("/users");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLoginClick}>
        <img
          src="https://i.imgur.com/MKpzI59.jpeg"
          className="user-avatar"
          alt="Avatar"
        />
        <h2>Iniciar sesión</h2>
        {err && <p style={{ color: "red", textAlign: "center" }}>{err}</p>}
        <input
          name="email"
          type="email"
          className="input-field"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <div className="input-group">
          <input
            name="password"
            type={showPwd ? "text" : "password"}
            className="input-field"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePwd}
          >
            {showPwd ? (
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M1 12C2.73 7.61 6 4.5 12 4.5s9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 
                  6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 
                  17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8
                  c-1.66 0-3 1.34-3 3s1.34 3 3 3"/></svg>
            )}
          </button>
        </div>
        <button type="submit" className="auth-button">
          Iniciar sesión
        </button>
        <div className="switch-form">
          <span
            className="switch-link"
            onClick={() => navigate("/register")}
          >
            ¿No tienes cuenta? Regístrate
          </span>
        </div>
      </form>
    </div>
  );
}

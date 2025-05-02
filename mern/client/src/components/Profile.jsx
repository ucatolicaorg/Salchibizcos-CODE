// client/src/components/Profile.jsx

import React, { useEffect, useState } from "react";
import { users, auth } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [err, setErr] = useState("");

  // 1. Al montar, obtenemos datos del usuario
  useEffect(() => {
    users
      .get(id)
      .then((u) => {
        setUser(u);
        setForm(u);
      })
      .catch(() => nav("/"));
  }, [id, nav]);

  // 2. Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // 3. Cerrar sesión
  const handleLogout = async () => {
    await auth.logout();
    nav("/");
  };

  // 4. Guardar cambios
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Solo enviamos los campos permitidos
      const { nombre, apellido, edad } = form;
      await users.update(id, { nombre, apellido, edad });
      // Refrescamos datos y salimos de edición
      const updated = await users.get(id);
      setUser(updated);
      setForm(updated);
      setIsEditing(false);
      alert("Perfil actualizado correctamente");
    } catch (e) {
      setErr(e.message);
    }
  };

  if (!user) return null; // o un spinner...

  return (
    <div className="auth-container max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>

      {err && <p className="text-red-600 text-center mb-4">{err}</p>}

      {isEditing ? (
        // ---------- FORMULARIO DE EDICIÓN ----------
        <form className="auth-form" onSubmit={handleSave}>
          <label className="font-medium">Nombre:</label>
          <input
            name="nombre"
            className="input-field"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <label className="font-medium">Apellido:</label>
          <input
            name="apellido"
            className="input-field"
            value={form.apellido}
            onChange={handleChange}
            required
          />

          <label className="font-medium">Edad:</label>
          <input
            name="edad"
            type="number"
            className="input-field"
            value={form.edad}
            onChange={handleChange}
            required
          />

          <label className="font-medium">Correo electrónico:</label>
          <input
            name="email"
            type="email"
            className="input-field bg-gray-100 cursor-not-allowed"
            value={form.email}
            disabled
          />

          <label className="font-medium">Rol:</label>
          <input
            name="role"
            className="input-field bg-gray-100 cursor-not-allowed"
            value={form.role}
            disabled
          />

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="auth-button flex-1"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              className="auth-button bg-gray-400 hover:bg-gray-500 flex-1"
              onClick={() => {
                setForm(user);
                setIsEditing(false);
                setErr("");
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        // ---------- VISTA SOLO LECTURA ----------
        <div className="space-y-2">
          <p><span className="font-semibold">Nombre:</span> {user.nombre}</p>
          <p><span className="font-semibold">Apellido:</span> {user.apellido}</p>
          <p><span className="font-semibold">Edad:</span> {user.edad}</p>
          <p><span className="font-semibold">Correo:</span> {user.email}</p>
          <p><span className="font-semibold">Rol:</span> {user.role}</p>

          <div className="flex gap-4 mt-6">
            <button
              className="auth-button flex-1"
              onClick={() => setIsEditing(true)}
            >
              Editar perfil
            </button>
            <button
              className="auth-button flex-1 bg-red-500 hover:bg-red-600"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

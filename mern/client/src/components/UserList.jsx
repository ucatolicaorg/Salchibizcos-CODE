// client/src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import { users, auth } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function UserList() {
  const [list, setList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const all = await users.list();
        setList(all);
      } catch {
        // estudiante -> va a su perfil
        const me = await users.me();
        nav(`/users/${me._id}`);
      }
    })();
  }, [nav]);

  const logout = async () => {
    await auth.logout();
    nav("/");
  };

  return (
    <div className="w-full p-6">
      <button onClick={logout} className="auth-button mb-4">
        Cerrar sesión
      </button>
      <h3 className="text-lg font-semibold p-4">Lista de Usuarios</h3>
      <table className="w-full text-sm border">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Apellido</th>
            <th className="px-4 py-2 text-left">Edad</th>
            <th className="px-4 py-2 text-left">Correo</th>
            <th className="px-4 py-2 text-left">Rol</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="px-4 py-2">{u.nombre}</td>
              <td className="px-4 py-2">{u.apellido}</td>
              <td className="px-4 py-2">{u.edad}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/users/${u._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  Ver / Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

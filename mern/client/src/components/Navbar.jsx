// client/src/components/Navbar.jsx

import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/users">
          <img
            alt="Prograthon logo"
            className="h-16 w-16 rounded-full"
            src="https://i.imgur.com/MKpzI59.jpeg"
          />
        </NavLink>
      </nav>
    </div>
  );
}

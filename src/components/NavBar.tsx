import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="navBrand">My FastFood Application</div>

      <div className="navLinks">
        <NavLink
          to="/"
          className={({ isActive }) => "navLink" + (isActive ? " active" : "")}
          end>
          Home
        </NavLink>

        <NavLink
          to="/review"
          className={({ isActive }) => "navLink" + (isActive ? " active" : "")}>
          Review
        </NavLink>
      </div>
    </nav>
  );
}

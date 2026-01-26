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
        <NavLink
          to="/chat"
          className={({ isActive }) => "navLink" + (isActive ? " active" : "")}>
          Chat
        </NavLink>

        {/* { (
          <>
            <span className="navLink" style={{ cursor: "default" }}>
              {#}
            </span>
            <button
              className="navLink"
              onClick={#}
              style={{ border: "none" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                "navLink" + (isActive ? " active" : "")
              }>
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                "navLink" + (isActive ? " active" : "")
              }>
              Register
            </NavLink>
          </>
        )} */}
      </div>
    </nav>
  );
}

import { useNavigate, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => { window.location.href = token ? "/home" : "/"; }}>
        <svg className="nav-logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
          <path d="M9 16.5l5 5 9-9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="nav-logo-text">TaskApp</span>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <NavLink to="/home" className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}>
              Home
            </NavLink>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="nav-logout" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="nav-login-btn" onClick={() => navigate("/")}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

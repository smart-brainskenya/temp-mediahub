import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src="/assets/Logo.png" alt="Smart Brains MediaHub" />
          Smart Brains MediaHub
        </Link>
        <div className="nav-links">
          <Link to="/images">Images</Link>
          <Link to="/videos">Videos</Link>
        </div>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

import { Outlet, NavLink } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: 12, padding: 12 }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About the Project</NavLink>
      </nav>
      <main style={{ padding: 12 }}>
        <Outlet /> {/* child routes render here */}
      </main>
    </div>
  );
}

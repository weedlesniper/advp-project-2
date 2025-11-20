import { Outlet, NavLink } from "react-router-dom";
import "./App.css";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function App() {
  return (

    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand to="/">&lt;OCROO/&gt;</Navbar.Brand>
        <Nav className="me-auto">

          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/settings">Settings</Nav.Link>

        </Nav>
      </Navbar>
      <main style={{ padding: 20 }}>
        <Outlet /> {/* child routes render here */}
      </main>
    </div>
  );
}

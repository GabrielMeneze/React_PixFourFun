import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/img/LOGO.png'
import './index.css';

export default function Header() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="logo" href="#home"><img src={logo} alt="Logo pix4fun" width="195" height="50"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

          </Nav>

          <Nav>
            <Nav.Link href='#home'>Inicio</Nav.Link>
            <Nav.Link href='#buy'>Comprar</Nav.Link>
            <Nav.Link href='#doubt'>Dúvidas </Nav.Link>
            <Nav.Link href='#contact'>Contatos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

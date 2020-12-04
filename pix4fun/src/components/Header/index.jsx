import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './index.css';

const header = () => {
   return(
    <Navbar bg="light" expand="lg">
    <Navbar.Brand class="Logo" href="#home">Pix4you</Navbar.Brand>
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
   )
}
    

export default header;

import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import React from "react";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import logo from "../../assets/img/LOGO.png";
import "./index.css";

export default function Header() {
  const history = useHistory();

  const sair = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");

    history.push("/");
  };

  const renderLogado = () => {
    const token = localStorage.getItem("token");

    if (token === null) {
      return (
        <Nav
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="#buy">Comprar</Nav.Link>
          <Nav.Link href="#doubt">Dúvidas </Nav.Link>
          <Nav.Link href="#contact">Contatos</Nav.Link>
          <Nav.Link href="/Carrinho">Carrinho</Nav.Link>
          <hr />
          <Nav.Link
            href="/logincadastro"
            alt="Link para página de login ou cadastro"
          >
            Logar ou Cadastrar
          </Nav.Link>
        </Nav>
      );
    } else if (jwtDecode(token).Role === "Administrador Geral") {
      return (
        <Nav
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link
            style={{
              color: "#7c7c7c",
            }}
            eventKey="disabled"
            disabled
          >
          </Nav.Link>
          <Dropdown>
            <Dropdown.Toggle
              className="dropdownToggle"
              style={{
                backgroundColor: "#F8F9FA",
                border: "none",
                color: "#7c7c7c",
                textTransform: "uppercase",
                fontSize: 14,
                fontWeight: 700,
              }}
              id="dropdown-basic"
            >
              BEM-VINDO {jwtDecode(token).nameid}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                style={{
                  color: "#7c7c7c",
                  fontSize: 14,
                  fontWeight: 700,
                }}
                onClick={(event) => sair(event)}
              >
                Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      );
    } else {
      return (
        <Nav
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Nav.Link href="/">INÍCIO</Nav.Link>
          <Nav.Link href="/#buy">COMPRAR</Nav.Link>
          <Nav.Link href="/#doubt">DÚVIDAS </Nav.Link>
          <Nav.Link href="/#contact">CONTATOS</Nav.Link>
          <Nav.Link href="/Carrinho">Carrinho</Nav.Link>
          <hr />
          <Dropdown>
            <Dropdown.Toggle
              className="dropdownToggle"
              style={{
                backgroundColor: "#F8F9FA",
                border: "none",
                color: "#7c7c7c",
                textTransform: "uppercase",
                fontSize: 14,
                fontWeight: 700,
              }}
              id="dropdown-basic"
            >
              BEM-VINDO {jwtDecode(token).nameid}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                style={{
                  color: "#7c7c7c",
                  fontSize: 14,
                  fontWeight: 700,
                }}
                onClick={(event) => sair(event)}
              >
                Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      );
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#F8F9FA",
        fontFamily: "Arial,Helvetica,sans-serif",
        textTransform: "uppercase",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      <Navbar
        className="navbar"
        bg="light"
        expand="lg"
        style={{ maxWidth: 1000, margin: "0 auto" }}
      >
        <Navbar.Brand className="logo" href="/">
          <img src={logo} alt="Logo pix4fun" width="195" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>

          {renderLogado()}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
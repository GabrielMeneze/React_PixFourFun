import React from "react";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "./index.css";
import { ModalFooter } from "react-bootstrap";

export default function LoginCadastro() {
  return (
    <div className="main">
      <Header />

      <div className="ContainerGeral">
        <div className="form" method="post">
          <fieldset className="FildSet">
            <div className="ContainerLogin">
              <h1 className="titulo">Entrar</h1>
              <label>
                E-mail
                <input className="inputEmail" id="email" type="email" />
              </label>
              <label>
                Senha
                <input className="senha" id="senha" type="password" />
              </label>
              <input
                className="botton"
                type="submit"
                name="prosseguir"
                value="Prosseguir"
              />
            </div>
          </fieldset>
        </div>
        <hr className="linha" />
        <div className="form" method="post">
          <fieldset className="FildSet">
            <div className="ContainerLogin">
              <h1 className="titulo">Cadastre sua conta</h1>
              <label>
                Nome
                <input className="name" id="name" type="text" />
              </label>
              <label>
                E-mail
                <input className="email" id="email" type="email" />
              </label>
              <label>
                Senha
                <input className="senha" id="senha" type="password" />
              </label>
              <label>
                Telefone
                <input className="phone" id="phone" type="number" />
              </label>
              <label>
                CEP
                <input className="cep" id="cep" type="text" />
              </label>
              <label>
                Complemento
                <input className="complemento" id="complemento" type="text" />
              </label>
              <input
                className="botton"
                type="submit"
                name="cadastrar"
                value="Cadastrar"
              />
            </div>
          </fieldset>
        </div>
      </div>

      <Footer />
    </div>
  );
}

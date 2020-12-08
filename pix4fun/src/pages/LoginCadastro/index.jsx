import React, { useState } from "react";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import "./index.css";
import { ModalFooter } from "react-bootstrap";

export default function LoginCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [telefone, setTelefone] = useState("");

  return (
    <div className="main">
      <Header />

      <div className="loginCadastro">
        <section id="login">
          <form method="post">
            <p>Faça o login</p>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="field">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>
            <button className="btnEnviar">Logar</button>
          </form>
        </section>

        <hr />

        <section id="cadastro">
          <form method="post">
            <p>Faça o cadastro</p>
            <div className="field">
              <label>Nome</label>
              <input
                required
                type="text"
                name="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                required
                type="text"
                name="email"
                value={emailCadastro}
                onChange={(event) => setEmailCadastro(event.target.value)}
              />
            </div>
            <div className="field">
              <label>Senha</label>
              <input
                required
                type="password"
                name="senha"
                value={senhaCadastro}
                onChange={(event) => setSenhaCadastro(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="telefone">Telefone</label>
              <input
                required
                type="tel"
                pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
                name="telefone"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
              />
            </div>

            <button className="btnEnviar">Cadastrar</button>
          </form>
        </section>
      </div>

      {/* <div className="ContainerGeral">
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
      </div> */}

      <Footer />
    </div>
  );
}

import "./index.css";
import React, { useState } from "react";
import { url } from "../../utils/constants";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";

export default function LoginCadastro() {
  const [idPerfil, setIdPerfil] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const history = useHistory();

  const cadastrar = (event) => {
    event.preventDefault();

    const perfilUsuario =
      localStorage.getItem("token") === null
        ? null
        : jwt_decode(localStorage.getItem("token"));

    fetch(url + "usuario", {
      method: "POST",
      body: JSON.stringify({
        nome: nome,
        email: emailCadastro,
        senha: senhaCadastro,
        telefone: telefone,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        idPerfilAcesso: 1,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log(response.json());

        alert("Usuario cadastrado.");
        history.push("/");
      }
    });
  };

  const logar = (event) => {
    event.preventDefault();

    fetch(url + "login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        // Verifica se a validação for OK e caso seja, informa a resposta
        if (response.ok) return response.json();

        // Caso validação não seja OK informa um alert
        alert("Dado inválido");
      })
      .then((data) => {
        // Armazena o token
        localStorage.setItem("token", data.token);

        let usuario = jwt_decode(data.token);

        console.log(usuario);

        // Após efetuar login encaminha para uma página
        // if (usuario.Role === "1") {
        //   history.push("/");
        // } else {
        //   history.push("/");
        // }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main">
      <Header />

      <div className="loginCadastro">
        <section id="login">
          <Form onSubmit={(event) => logar(event)}>
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
            <Button type="submit" className="btnEnviar">Logar</Button>
          </Form>
        </section>

        <hr />

        <section id="cadastro">
          <Form onSubmit={(event) => cadastrar(event)}>
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
            <div className="Field">
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
            <div className="Field">
              <label>CEP</label>
              <input
                required
                type="text"
                name="cep"
                value={cep}
                onChange={(event) => setCep(event.target.value)}
              />
            </div>
            <div className="Field">
              <label>Rua</label>
              <input
                required
                type="text"
                name="rua"
                value={rua}
                onChange={(event) => setRua(event.target.value)}
              />
            </div>
            <div className="Field">
              <label>Numero</label>
              <input
                required
                type="text"
                name="numero"
                value={numero}
                onChange={(event) => setNumero(event.target.value)}
              />
            </div>
            <div className="Field">
              <label>Complemento</label>
              <input
                required
                type="text"
                name="complemento"
                value={complemento}
                placeholder="Se não houver, não preencha este campo"
                onChange={(event) => setComplemento(event.target.value)}
              />
            </div>

            <Button type="submit" className="btnEnviar">Cadastrar</Button>
          </Form>
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

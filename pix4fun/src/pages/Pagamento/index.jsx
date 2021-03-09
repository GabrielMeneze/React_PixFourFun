import "./index.css";
import React, { useState } from "react";
import { url } from "../../utils/constants";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";

export default function Pagamento() {
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

  // Faz o cadastro do usuário
  const cadastrar = (event) => {
    event.preventDefault();

    // Faz a conexão com o banco de dados
    fetch(url + "Usuario", {
      // Define o método que será utilizado
      method: "POST",
      // Define as informações que são necessárias para o login
      body: JSON.stringify({
        nome: nome,
        email: emailCadastro,
        senha: senhaCadastro,
        idPerfilAcesso: 2,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      // Verifica a resposta, e se for OK mostra um alert informando que o usuário foi cadastrado
      if (response.ok) {
        console.log(response.json());

        alert("Admin Cadastrado,basta logar");
        history.push("/Pagamento");
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

        history.push("/");

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
                placeholder="Insira seu e-mail"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="field">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                value={senha}
                placeholder="Insira sua senha"
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
                placeholder="Nome e Sobrenome"
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
            <div className="Field">
              <label>Email</label>
              <input
                required
                type="text"
                name="email"
                placeholder="Insira um e-mail válido"
                value={emailCadastro}
                onChange={(event) => setEmailCadastro(event.target.value)}
              />
            </div>
            <div className="field">
              <label>Senha</label>
              <input
                required
                type="password"
                placeholder="Insira uma senha"
                name="senha"
                value={senhaCadastro}
                onChange={(event) => setSenhaCadastro(event.target.value)}
              />
            </div>

            <Button type="submit" className="btnEnviar">Cadastrar</Button>
          </Form>
        </section>
      </div>
      <div id="contact" />
      <div id="doubt" />
      <Footer />
    </div>
  );
}

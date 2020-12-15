import "./index.css";
import React, { useState } from "react";
import { url } from "../../utils/constants";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Footer from "../../components/Footer/index";
import Header from "../../components/Header/index";

export default function LoginCadastro() {
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
    fetch(url + "usuario", {
      // Define o método que será utilizado
      method: "POST",
      // Define as informações que são necessárias para o login
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
      // Verifica a resposta, e se for OK mostra um alert informando que o usuário foi cadastrado
      if (response.ok) {
        alert("Usuario cadastrado.");
        // Envia o usuário para a página principal
        history.push("/");
      }
    });
  };

  // Faz o login do usuário
  const logar = (event) => {
    event.preventDefault();

    // Faz a conexão com o banco de dados
    fetch(url + "login", {
      // Define o método que será utilizado
      method: "POST",
      // Define as informações que são necessárias para o login
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
        history.push("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main">
      <Header />

      <div className="loginCadastro">
        <section id="login">
          {/* Formulário de login
          "onSubmit" é para definir o evento que acontecerá quando o formulário for enviado
          */}
          <Form onSubmit={(event) => logar(event)}>
            <p>Faça o login</p>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                placeholder="Insira seu e-mail"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="field">
              <label>Senha</label>
              <input
                type="password"
                placeholder="Insira sua senha"
                name="senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>
            <Button type="submit" className="btnEnviar">
              Logar
            </Button>
          </Form>
        </section>

        <hr />

        <section id="cadastro">
          {/* Formulário de cadastro
          "onSubmit" é para definir o evento que acontecerá quando o formulário for enviado
          */}
          <Form onSubmit={(event) => cadastrar(event)}>
            <p>Faça o cadastro</p>
            <div className="field">
              <label>Nome</label>
              <input
                required
                type="text"
                placeholder="Nome e Sobrenome"
                name="nome"
                value={nome}
                // "onChange" define o valor do input
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
            <div className="Field">
              <label>Email</label>
              <input
                required
                type="text"
                placeholder="Insira um e-mail válido"
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
                placeholder="Insira uma senha"
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
                placeholder="(xx) xxxxx-xxxx"
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
                placeholder="xxxxx-xxx"
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
                placeholder="Insira sua rua"
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
                placeholder="Número da casa ou prédio"
                name="numero"
                value={numero}
                onChange={(event) => setNumero(event.target.value)}
              />
            </div>
            <div className="Field">
              <label>Complemento</label>
              <input
                type="text"
                name="complemento"
                value={complemento}
                placeholder="Se não houver, não preencha este campo"
                onChange={(event) => setComplemento(event.target.value)}
              />
            </div>

            <Button type="submit" className="btnEnviar">
              Cadastrar
            </Button>
          </Form>
        </section>
      </div>

      <Footer />
    </div>
  );
}

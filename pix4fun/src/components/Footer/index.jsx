import React, { useState } from "react";
import "./index.css";
import logoIN from '../../assets/img/001-instagram.svg'
import logoFB from '../../assets/img/002-facebook.svg'
import logoPT from '../../assets/img/003-pinterest.svg'


export default function Footer() {
    
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarEmail = () => {
    return nome;
  };

  return (
    <footer id="rodape">
      <div className="container">
        <div className="flex">
          <div className="textFooter">
            <p>Pix4Fun</p>
            <p>IMPRESSÃO DE FOTOS NO FORMATO POLAROID</p>
            <a href="mailto:CONTATO@PIX4FUN.COM.BR">CONTATO@PIX4FUN.COM.BR</a>
          </div>

<<<<<<< Updated upstream
          <form method="post" className="contato">
            <p>Entre em contato conosco</p>
            <div className="field">
              <input
                type="text"
                name="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Nome"
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="field">
              <textarea
                rows="3"
                cols="35"
                name="nome"
                value={mensagem}
                onChange={(event) => setMensagem(event.target.value)}
                placeholder="Mensagem"
              />
            </div>

            <button className="btnEnviar" onChange={enviarEmail}>Enviar</button>
=======
          <form className="contact-form" onSubmit={sendEmail}>
            <input type="hidden" name="contact_number" />
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input className="btnEnviar" type="submit" value="Send" />
>>>>>>> Stashed changes
          </form>
        </div>

        <div className="pFooter">
          <p>©PIX4FUN Todos os direitos reservados. CNPJ 18.882.937/0001-01</p>
          <p>SIGA-NOS EM NOSSAS REDES SOCIAIS PARA FICAR POR DENTRO DE TODAS AS
            NOVIDADES!</p>
        </div>

        <div className="links">
            <a href="https://instagram.com/pix4funphoto"><img src={logoIN} alt="Logo com link para o Instagram do pix4fun"/></a>
            <a href="https://www.facebook.com/pix4funphoto"><img src={logoFB} alt="Logo com link para o Facebook do pix4fun"/></a>
            <a href="https://www.pinterest.com/"><img src={logoPT} alt="Logo com link para o Pinterest do pix4fun"/></a>
        </div>

        {
          // Formulário com boostrap
        }

        {/* <Form onSubmit={event => enviarEmail(event)}>
          <Form.Group controlId="formBasicContato">
          <Form.Control type="text" placeholder="Nome" value={nome} onChange={event => setNome(event.target.value)} />
          <Form.Control type="text" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
          <Form.Control as="textarea" rows="3" placeholder="Mensagem" value={mensagem} onChange={event => setMensagem(event.target.value)} />
          </Form.Group>
        </Form> */}
      </div>
    </footer>
  );
}
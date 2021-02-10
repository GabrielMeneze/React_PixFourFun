import React, { useState } from "react";
import "./index.css";
import logoIN from '../../assets/img/001-instagram.svg'
import logoFB from '../../assets/img/002-facebook.svg'
import logoPT from '../../assets/img/003-pinterest.svg'
import emailjs from 'emailjs-com';


export default function Footer() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_1gaplug', 'template_fuwm9ed', e.target, 'user_0wIRb9eHUQfkmEWEasXf1')
      .then((result) => {
        console.log(result.text);
        alert('Menssagem enviada')
      }, (error) => {
        console.log(error.text);
      });
  }
  return (
    <footer id="rodape">
      <div className="container">
        <div className="flex">
          <div className="textFooter">
            <p>Pix4Fun</p>
            <p>IMPRESSÃO DE FOTOS NO FORMATO POLAROID</p>
            <a href="mailto:CONTATO@PIX4FUN.COM.BR">CONTATO@PIX4FUN.COM.BR</a>
          </div>

          <form className="contact-form" onSubmit={sendEmail}>
            <input type="hidden" name="contact_number" />
            <label>Nome</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Mensagem</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
          </form>
        </div>

        <div className="pFooter">
          <p>©PIX4FUN Todos os direitos reservados. CNPJ 18.882.937/0001-01</p>
          <p>SIGA-NOS EM NOSSAS REDES SOCIAIS PARA FICAR POR DENTRO DE TODAS AS
            NOVIDADES!</p>
        </div>

        <div className="links">
          <a href="https://instagram.com/pix4funphoto"><img src={logoIN} alt="Logo com link para o Instagram do pix4fun" /></a>
          <a href="https://www.facebook.com/pix4funphoto"><img src={logoFB} alt="Logo com link para o Facebook do pix4fun" /></a>
          <a href="https://www.pinterest.com/"><img src={logoPT} alt="Logo com link para o Pinterest do pix4fun" /></a>
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
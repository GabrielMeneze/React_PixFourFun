import React, { useState } from "react";
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./index.css";
export default function Home() {
  const token = localStorage.getItem("token");

  // array que da valor aos botões comprar
  let produtos = [
    {
      name: 'Pack com 6 fotos polaroid',
      price: 17.99,
      qtd: 6,
      inCart: 0
    }
  ]

  let produtos1 = [
    {
      name: 'Pack com 12 fotos polaroid',
      price: 21.99,
      qtd: 6,
      inCart: 0
    }
  ]
  let produtos2 = [
    {
      name: 'Pack com 18 fotos polaroid',
      price: 26.99,
      qtd: 6,
      inCart: 0
    }
  ]
  
  // Botões que direcionam para pagina de login ou upload
  function botaoComprar() {
    if (token === null) {
      return (
        <Link
          onClick={(i) => {
            cartsnumber(produtos[i]);
            custoTotal(produtos[i]);
          }}
          id="bota" to="/LoginCadastro" className="buyButton" >
          COMPRAR
        </Link>
      );
    } else {
      return (
        <Link
          onClick={(i) => {
            cartsnumber(produtos[i]);
            custoTotal(produtos[i]);
          }}
          id="bota" to="/uploadimagem" className="buyButton">
          COMPRAR
        </Link>
      );
    }
  };
  function botaoComprar2() {
    if (token === null) {
      return (
        <Link
          onClick={(i) => {
            cartsnumber1(produtos1[i]);
            custoTotal(produtos1[i]);
          }}
          id="bota" to="/LoginCadastro" className="buyButton" >
          COMPRAR
        </Link>
      );
    } else {
      return (
        <Link
          onClick={(i) => {
            cartsnumber1(produtos1[i]);
            custoTotal(produtos1[i]);
          }}
          id="bota" to="/uploadimagem" className="buyButton">
          COMPRAR
        </Link>
      );
    }
  };
  function botaoComprar3() {
    if (token === null) {
      return (
        <Link
          onClick={(i) => {
            cartsnumber2(produtos2[i]);
            custoTotal(produtos2[i]);
          }}
          id="bota" to="/LoginCadastro" className="buyButton" >
          COMPRAR
        </Link>
      );
    } else {
      return (
        <Link
          onClick={(i) => {
            cartsnumber2(produtos2[i]);
            custoTotal(produtos2[i]);
          }}
          id="bota" to="/uploadimagem" className="buyButton">
          COMPRAR
        </Link>
      );
    }
  };

  function cartsnumber() {
    let productnumber = localStorage.getItem('cartNumber');

    productnumber = parseInt(productnumber);

    if (productnumber) {
      localStorage.setItem('cartNumber', productnumber + 1);
    } else {
      localStorage.setItem('cartNumber', 1);
    }
    setItems(produtos)
  }

  //  cria um array com os produtos selecionados: para ver os mesmos é necessario ir a application no console e selecionar um produto
  function setItems() {
    let cartItems = localStorage.getItem('produtoinCart');
    console.log(cartItems)
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {
      if (cartItems[produtos.name] === undefined) {
        cartItems = {
          ...cartItems,
          [produtos.name]: produtos
        }
      }
      cartItems[produtos.name].inCart += 1;
    } else {
      produtos.inCart = 1;
      cartItems = {
        [produtos.name]: produtos
      }
    }

    localStorage.setItem('produtoinCart', JSON.stringify(cartItems))
  }

  function cartsnumber1() {
    let productnumber = localStorage.getItem('cartNumber');

    productnumber = parseInt(productnumber);

    if (productnumber) {
      localStorage.setItem('cartNumber', productnumber + 1);
    } else {
      localStorage.setItem('cartNumber', 1);
    }
    setItems1(produtos1)
  }

  //  cria um array com os produtos selecionados: para ver os mesmos é necessario ir a application no console e selecionar um produto
  function setItems1() {
    let cartItems = localStorage.getItem('produtoinCart');
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {
      if (cartItems[produtos1.name] === undefined) {
        cartItems = {
          ...cartItems,
          [produtos1.name]: produtos1
        }
      }
      cartItems[produtos1.name].inCart += 1;
    } else {
      produtos1.inCart = 1;
      cartItems = {
        [produtos1.name]: produtos1
      }
    }
    localStorage.setItem('produtoinCart', JSON.stringify(cartItems))
  }

  function cartsnumber2() {
    let productnumber = localStorage.getItem('cartNumber');

    productnumber = parseInt(productnumber);

    if (productnumber) {
      localStorage.setItem('cartNumber', productnumber + 1);
    } else {
      localStorage.setItem('cartNumber', 1);
    }
    setItems2(produtos2)
  }

  //  cria um array com os produtos selecionados: para ver os mesmos é necessario ir a application no console e selecionar um produto
  function setItems2() {
    let cartItems = localStorage.getItem('produtoinCart');
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {
      if (cartItems[produtos2.name] === undefined) {
        cartItems = {
          ...cartItems,
          [produtos2.name]: produtos2
        }
      }
      cartItems[produtos2.name].inCart += 1;
    } else {
      produtos2.inCart = 1;
      cartItems = {
        [produtos2.name]: produtos2
      }
    }

    localStorage.setItem('produtoinCart', JSON.stringify(cartItems))
  }




  // Calcula o preço total
  function custoTotal() {

    let custo = localStorage.getItem('custoTotal');
    console.log(typeof custo);

    if (custo != null) {
      custo = parseInt(custo);
      localStorage.setItem('custoTotal', custo + produtos.price);
    } else {
      localStorage.setItem('custoTotal', produtos.price);
    }
  }


  return (
    <div>
      <Header />
      <div className="mainBanner">
        <h1>IMPRIMA SUAS MEMÓRIAS COM ESTILO</h1>
        <a href="#summary" className="btnMainBanner">
          CONHEÇA
        </a>
      </div>
      <div className="container">
        <section id="summary">
          <h2>VEJA COMO É FÁCIL</h2>
          <div className="summaryCards">
            <div className="textSummary">
              <p className="imgTextSummary">1</p>
              <div>
                <h3>ESCOLHA SEU PACK</h3>
                <p>Temos packs com 6, 12 e 18 fotos.</p>
              </div>
            </div>
            <div className="textSummary">
              <p className="imgTextSummary2">2</p>
              <div>
                <h3>ENVIE SUAS FOTOS</h3>
                <p>
                  Cliquem em comprar no pack escolhido, escolha suas fotos,
                  edite-as e nos envie.
                </p>
              </div>
            </div>
            <div className="textSummary">
              <p className="imgTextSummary3">3</p>
              <div>
                <h3>PRONTO</h3>
                <p>
                  Finalize com o pagamento, endereço de envio e pronto; agora é
                  só aguardar suas fotos chegarem na sua casa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="buy">
          <h2>VAMOS EXPERIMENTAR?</h2>
          <div className="packs">
            <div className="pack1">
              <h3>PACK COM 6</h3>
              <div className="limitImg">
                <div className="imgPack1" />
              </div>
              <div className="packDesc">
                <p>
                  <span>•TAMANHOS</span>
                </p>
                <p>Quadrado: 9cm x 11cm</p>
                <p>paisagem: 11cm x 9cm</p>
                <p>
                  retrato: 7,5cm x 12cm
                  <br />
                  <br />
                </p>
                <span>
                  <p>•Fotos no formato</p>
                  <p>
                    Polaroid®
                    <br />
                    <br />
                  </p>
                  <p>•Papel fotográfico</p>
                  <p>
                    Kodak®
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="precoPack">
                <h4>R$ 17,99</h4>
              </div>
              <div className="buy buy1">
                {botaoComprar()}
              </div>
            </div>
            <div className="pack2">
              <h3>PACK COM 12</h3>
              <div className="limitImg">
                <div className="imgPack2" />
              </div>
              <div className="packDesc">
                <p>
                  <span>•TAMANHOS</span>
                </p>
                <p>Quadrado: 9cm x 11cm</p>
                <p>paisagem: 11cm x 9cm</p>
                <p>
                  retrato: 7,5cm x 12cm
                  <br />
                  <br />
                </p>
                <span>
                  <p>•Fotos no formato</p>
                  <p>
                    Polaroid®
                    <br />
                    <br />
                  </p>
                  <p>•Papel fotográfico</p>
                  <p>
                    Kodak®
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="precoPack">
                <h4>R$ 21,99</h4>
              </div>
              <div className="buy buy2">
                {botaoComprar2()}
              </div>
            </div>
            <div className="pack3">
              <h3>PACK COM 18</h3>
              <div className="limitImg">
                <div className="imgPack3" />
              </div>
              <div className="packDesc">
                <p>
                  <span>•TAMANHOS</span>
                </p>
                <p>Quadrado: 9cm x 11cm</p>
                <p>paisagem: 11cm x 9cm</p>
                <p>
                  retrato: 7,5cm x 12cm
                  <br />
                  <br />
                </p>
                <span>
                  <p>•Fotos no formato</p>
                  <p>
                    Polaroid®
                    <br />
                    <br />
                  </p>
                  <p>•Papel fotográfico</p>
                  <p>
                    Kodak®
                    <br />
                    <br />
                  </p>
                </span>
              </div>
              <div className="precoPack">
                <h4>R$ 26,99</h4>
              </div>
              <div className="buy buy3">
                {botaoComprar3()}
              </div>
            </div>
          </div>
        </section>
        <section id="faq">
          <h2>F.A.Q</h2>
          <div className="pergunta">
            <h4>Em que material serão reveladas as minhas fotos?</h4>
            <p>
              Suas fotos serão reveladas em papel fotográfico Kodak® em
              laboratório fotográfico profissional.
            </p>
          </div>
          <div className="pergunta">
            <h4>QUAIS as formas DE PAGAMENTO?</h4>
            <p>
              Trabalhamos com a plataforma de pagamentos do Pagseguro, portanto
              aceitamos cartões e boleto.
            </p>
          </div>
          <div className="pergunta">
            <h4>COMO Serão Enviadas as minhas fotos?</h4>
            <p>
              Suas fotos serão enviadas por carta registrada através do Correios
              em uma embalagem Pics.polaroid personalizada com frete fixo de R$10,00.
            </p>
          </div>
          <div className="pergunta">
            <h4>EM QUANTO TEMPO RECEBEREI MINHAS FOTOS?</h4>
            <p>
              Após confirmado o pagamento, pedimos um prazo de 3 dias para a
              produção. Logo após passa a vigorar o prazo de entrega de carta
              registrada dos Correios, que leva de 3 a 14 dias úteis dependendo
              da região.
            </p>
          </div>
        </section>
      </div>
      <div>
        <div id="contact" />
        <div id="doubt" />
        <Footer />
      </div>
    </div>
  );
}
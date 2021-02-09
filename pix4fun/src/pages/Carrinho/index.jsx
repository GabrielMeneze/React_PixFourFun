import React, { useState } from 'react';
import Header from '../../components/Header'
import './index.css';
import Footer from '../../components/Footer';


const Carrinho = () => {
    // SDK de Mercado Pago
    const mercadopago = require('mercadopago');

    // Configura credenciais
    mercadopago.configure({
        access_token: 'TEST-1605680289481240-012320-53dbb9ecc09e7e7ef91c0ebf42e213cc-540136132'
    });

    // Cria um objeto de preferência
    let preference = {
        items: [
            {
                title: 'Meu produto',
                unit_price: 100,
                quantity: 1,
            }
        ]
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            // Este valor substituirá a string "<%= global.id %>" no seu HTML
            global.id = response.body.id;
        }).catch(function (error) {
            console.log(error);
        });

    const [listarImgs, setListarImgs] = React.useState(localStorage.getItem("produtoinCart"));
    const [custoTotal, setCustoTotal] = React.useState(localStorage.getItem("custoTotal"))
    const [cartNumber, setCartNumber] = React.useState(localStorage.getItem("cartNumber"))

    function Validar(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        if (data.Cupom) {
            if (data.Cupom === 'PIX10') {
                let desconto = (custoTotal * 0.9);
                setCustoTotal(desconto);
                console.log('novo valor com 10% de desconto: ', desconto)
            } else {
                console.log('cupom não é valido')
            }
        } else {
            console.log('é necessario preencher o campo')
        }
    }

    var separadores = ['"', ':', ',', '}']
    const keys = listarImgs.split(new RegExp('(' + separadores.join('|') + ')'))
    console.log(keys)

    const custoFrete = () => {
        var frete = 10.00
        setCustoTotal(custoTotal + frete)
    }

    return (

        <div className="mai">
            <Header />
            <div className="produto-detalhes">
                <div className="con">
                    <div className="produto-h">
                        <h5 className="titulo">produto</h5>
                        <h5 className="preco">preço</h5>
                        <h5 className="quantidade">quantidade</h5>
                        <h5 className="total">total</h5>
                    </div>
                </div>
                <div className="con">
                    <div className="produto-carrinho">
                        {<p className="pack-nome" >{keys[14]}</p>}
                        {<p className="preco-b">{keys[24]}</p>}
                        {<p className="quantidade-b">{cartNumber}</p>}
                        {<p className="custo">{keys[24]}</p>}
                    </div>
                </div>
            </div>
            <section className="container-resumo">
                <div className="resumo-pedido">
                    <div className="limit-div">
                        <h5>Resumo pedido</h5>
                        <div className="resumo-detalhes">
                            {<p>{cartNumber} produto(s)</p>}
                            {<p>R${keys[24]}</p>}
                        </div>
                        <div className="resumo-detalhes">
                            {<p>frete</p>}
                            {<p>{keys[48]}</p>}
                        </div>
                        <div className="resumo-detalhes">
                            <form className="form-cupom" onSubmit={Validar}>
                                <div className="form-cupom">
                                    <input
                                        type="text"
                                        name="Cupom"
                                        className="input-cupom"
                                    >
                                    </input>
                                    <button
                                        type="submit"
                                        value="vcupom"
                                        onClick={custoFrete}
                                    >OK</button>
                                </div>
                            </form>
                        </div>

                        <hr />

                        <div className="resumo-detalhes">
                            <strong>total</strong>
                            <strong>{custoTotal}</strong>
                        </div>
                        <div className="buy-area">
                            <button className="buy-button">
                                COMPRAR
                        </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* <form onSubmit={pagamentoHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="pago"
                            className="form-control"
                        >
                        </input>
                        <button
                            type="submit"
                            value="Pago"
                        >mercado</button>
                    </div>
                </form> */}
            <script
                src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                data-preference-id='<%= global.id %>'>
            </script>
            <Footer />
        </div>

    )
}

export default Carrinho;

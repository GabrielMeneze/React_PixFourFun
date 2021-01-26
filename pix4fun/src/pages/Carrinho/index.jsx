import React, { useState } from 'react';
import Header from '../../components/Header'
import './index.css';
import Footer from '../../components/Footer';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import { preferences } from 'mercadopago';
import { Button } from 'bootstrap';



const Carrinho = () => {

    // SDK de Mercado Pago
    const mercadopago = require('mercadopago');

    // Configura credenciais
    mercadopago.configure({
        access_token: 'PROD_ACCESS_TOKEN'
    });

    // Cria um objeto de preferência
    class MercadopagoController{
        async mercadopago({request}){
            let preference = {
                items: [
                    {
                        title: 'Meu produto',
                        unit_price: 100,
                        quantity: 1,
                    }
                ]
            };

            const res = await mercadopago.preferences.create(preference);

            return res;
        }
    }

    // mercadopago.preferences.create(preference)
    //     .then(function (response) {
    //         // Este valor substituirá a string "<%= global.id %>" no seu HTML
    //         global.id = response.body.id;
    //     }).catch(function (error) {
    //         console.log(error);
    //     });

    function Validar(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        if (data.Cupom) {
            if (data.Cupom === 'PIX10') {
                let desconto = (custoTotal / 10 - custoTotal);
                alert('Cupom válido')
                console.log(desconto)
            } else {
                alert('cupom não é válido')
            }
        } else {
            alert('é necessario preencher o campo')
        }
    }

    const [listarImgs, setListarImgs] = React.useState(localStorage.getItem("produtoinCart"));
    const [custoTotal, setCustoTotal] = React.useState(localStorage.getItem("custoTotal"))

    const keys = listarImgs.split('"')

    const custo = () => {
        setCustoTotal('custoTotal', keys[8] * keys[12] + keys[14])
    }

    console.log(keys)

    return (
        <div className="mai">
            <Header />
            <div className="produto-detalhes">
                <div className="con">
                    <div className="produto-h">
                        <h5 className="titulo">Produto</h5>
                        <h5 className="preco">preço</h5>
                        <h5 className="quantidade">quantidade</h5>
                        <h5 className="total">total</h5>
                    </div>
                </div>
                <div className="con">
                    <div className="produto-carrinho">
                        {<p className="nome">{keys[1]}</p>}
                        {<p className="preco-b">{keys[8]}</p>}
                        {<p className="quantidade-b">{keys[12]}</p>}
                        {<p className="custo">{custoTotal}</p>}
                    </div>
                </div>
            </div>
            <div className="resumo-pedido">
                <div className="limit-div">
                    <h5>Resumo pedido</h5>
                    <div className="resumo-detalhes">
                        {<p>{keys[12]} produto(s)</p>}
                        {<p>R${keys[8]}</p>}
                    </div>
                    <div className="resumo-detalhes">
                        {<p>frete</p>}
                        {<p>{keys[14]}</p>}
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
                                >OK</button>
                            </div>
                        </form>
                    </div>

                    <hr />

                    <div className="resumo-detalhes">
                        <strong>total</strong>
                        <strong>{keys[8]}</strong>
                    </div>
                    <div className="buy-area">
                        <button className="buy-button">
                            COMPRAR
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Carrinho;

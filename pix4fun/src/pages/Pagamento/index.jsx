import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Button, Form } from 'react-bootstrap';

export default function Pagamento() {
    let Correios = require('node-correios');
    let correios = new Correios();

    let args = {
        sCepOrigem: "81200100",
        sCepDestino: "05205380",
        nVlPeso: ".1",
        nCdFormato: "3",
        nVlComprimento: "15",
        nVlAltura: "0",
        nVlLargura: "15",
        nCdServico: "04014",
        nVlDiametro: "0"
    };

    fetch(correios.calcPreco(args), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Request-Width, Content-Type, Accept'
        }
    })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });


    // const [cepDestino, setCepDestino] = useState('');

    // const { calcularPrecoPrazo } = require("correios-brasil");

    // let args = {
    //     sCepOrigem: "81200100",
    //     sCepDestino: cepDestino,
    //     nVlPeso: ".1",
    //     nCdFormato: "3",
    //     nVlComprimento: "15",
    //     nVlAltura: "0",
    //     nVlLargura: "15",
    //     nCdServico: "04014",
    //     nVlDiametro: "0"
    // };

    // const calcularCep = (event) => {
    //     event.preventDefault()

    //     fetch(calcularPrecoPrazo(args), {
    //         headers: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Headers': 'Origin, X-Request-Width, Content-Type, Accept'
    //         }
    //     })
    //         .then((data) => {
    //             console.log(data)
    //         })
    // }

    // // SDK de Mercado Pago
    // const mercadopago = require('mercadopago');

    // // Configura credenciais
    // mercadopago.configure({
    //     access_token: 'PROD_ACCESS_TOKEN'
    // });

    // // Cria um objeto de preferência
    // let preference = {
    //     items: [
    //         {
    //             title: 'Pack 1',
    //             unit_price: 1899,
    //             quantity: 1,
    //         }
    //     ]
    // };

    // mercadopago.preferences.create(preference)
    //     .then(function (response) {
    //         // Este valor substituirá a string "<%= global.id %>" no seu HTML
    //         global.id = response.body.id;
    //     }).catch(function (error) {
    //         console.log(error);
    //     });

    return (
        <div>
            <Header />
            {/* <Form onSubmit={event => calcularCep(event)}>
                <Form.Group>
                    <Form.Label>Digite seu CEP</Form.Label>
                    <Form.Control value={cepDestino} onChange={event => setCepDestino(event.target.value)} type="text" placeholder="Digite aqui seu CEP" />
                    <Button type="submit">Calcular</Button>
                </Form.Group>
            </Form> */}

            <script
                src="https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
                data-preference-id='<%= global.id %>'>
            </script>
            <Footer />
        </div>
    )
}
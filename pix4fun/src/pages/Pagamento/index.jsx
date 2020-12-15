import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Pagamento() {
    // SDK de Mercado Pago
    const mercadopago = require('mercadopago');

    // Configura credenciais
    mercadopago.configure({
        access_token: 'PROD_ACCESS_TOKEN'
    });

    // Cria um objeto de preferência
    let preference = {
        items: [
            {
                title: 'Pack 1',
                unit_price: 1899,
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

    return (
        <div>
            <Header />
            <script
                src="http://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
                data-preference-id='<%= global.id %>'>
            </script>
            <Footer />
        </div>
    )
}
import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TrackingEvents from '../../components/TrackingEvents';
import './index.css';

export default function Pagamento() {



    // const [frete, setFrete] = React.useState(localStorage.getItem(' '))

    const [events, setEvents] = useState([]);

    const submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        fetch('http://localhost:3001/?tracking=' + data.tracking)
            .then(response => response.json())
            .then(data => {
                const events = data.events;
                setEvents(events);
            })
            .catch(console.error);
    };

    function calcularHandler(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        fetch('http://localhost:3002/?calcular=' + data.calcular)
            .then(response => response.json())
            .then(console.log)
            .catch(console.error)
    }


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

    return (
        <div className="bloco">
            <Header />
            <div className="localdeentrega">
                <h1>Rastreamento de pacote:</h1>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input
                            name="tracking"
                            type="text"
                            className="form-control"
                        />

                        <button
                            type="submit"
                            value="Track"
                        >  Track
                        </button>
                    </div>
                </form>

                <TrackingEvents events={events} />


                <form onSubmit={calcularHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="calcular"
                            className="form-control"
                        >
                        </input>
                        <button
                            type="submit"
                            value="Calcular"
                        >Calcular</button>
                    </div>
                </form>
                <script
                    src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                    data-preference-id='<%= global.id %>'>
                </script>
            </div>
            <div id="contact" />
            <div id="doubt" />
            <Footer />
        </div>
    )


}
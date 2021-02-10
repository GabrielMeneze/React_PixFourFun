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


                
                <script
                    src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                    data-preference-id='TEST-99dc7658-aafe-4a21-b88b-1f2cc48a70a1'>
                </script>
            </div>
            <div id="contact" />
            <div id="doubt" />
            <Footer />
        </div>
    )


}
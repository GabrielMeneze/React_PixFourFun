import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TrackingEvents from '../../components/TrackingEvents';
import './index.css';

export default function Pagamento() {

    const [events, setEvents] = useState([]);
    const [results, setResults] = useState([]);

    const { consultarCep } = require("correios-brasil");


    // Busca o cep
    // const cep = "08743670 ";

    // consultarCep(cep).then((response) => {
    //     console.log(response);
    // });


    // Valida o cupom
    function Validar(cupom) {
        return new Promise((resolve, reject) => {
            if (cupom === 'PIX10') {
                resolve({
                    sucess: true,
                    CupomName: cupom,
                    msg: 'Cupom válido'
                })
            } else {
                reject({
                    sucess: false,
                    msg: 'Cupom invalido'
                })
            }
        })
    }


    async function doTheJob() {
        const ValidarResponse = await Validar('PIX10');
        console.log(ValidarResponse);
    }



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
        console.log('*** App.subimitHandler.data', data)
    }


    return (
        doTheJob(),
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

            </div>
            <div id="contact" />
            <div id="doubt" />
            <Footer />
        </div>
    )


}
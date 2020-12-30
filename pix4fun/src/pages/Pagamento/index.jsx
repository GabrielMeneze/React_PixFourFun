import React, {useState} from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Pagamento() {
    
    const [events, setEvents] = useState([]);
    

    const { consultarCep } = require("correios-brasil");

    // Busca o cep
    const cep = "08743670 "; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve

    consultarCep(cep).then((response) => {
        console.log(response);
    });

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

    console.log(events);
    const submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        fetch('http://localhost:3001/?tracking='+ data.tracking)
        .then(response => response.json())
        .then(data => {
            const events = data.events || [];
            setEvents(events);
        })
        .catch(console.error);
    };

    return (
        doTheJob(),
        <div className="container">
            <Header />
            <div className="localdeentrega">
                <h1>Local de entrega</h1>

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

            </div>
            <Footer />
        </div>
    )


}
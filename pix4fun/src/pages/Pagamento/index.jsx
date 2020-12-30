import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Pagamento() {
    
    var correiosBrasil = require("correios-brasil")

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


    return (
        doTheJob(),
        <div className="container">
            <Header />
            <div className="localdeentrega">
                <h1>Local de entrega</h1>
            </div>
            <Footer />
        </div>
    )


}
import React, { useState } from 'react';
import Header from '../../components/Header'
import './index.css';
import Footer from '../../components/Footer';

const Carrinho = () => {
    
    const [cart, cartitems] = useState(localStorage.getItem("cartItems"))

    return (
        <div className="mai">
            <Header />
            <div className="con">
                <div className="produto-h">
                    <h5 className="titulo">Produto</h5>
                    <h5 className="preco">preço</h5>
                    <h5 className="quantidade">quantidade</h5>
                    <h5 className="total">total</h5>
                </div>
            </div>
            <div className="produtos">

            </div>
            <Footer />
        </div>

    )
}

export default Carrinho;


// // Valida o cupom
// function Validar(cupom) {
//     return new Promise((resolve, reject) => {
//         if (cupom === 'PIX10') {
//             resolve({
//                 sucess: true,
//                 CupomName: cupom,
//                 msg: 'Cupom válido'
//             })
//         } else {
//             reject({
//                 sucess: false,
//                 msg: 'Cupom invalido'
//             })
//         }
//     })
// }

// async function doTheJob() {
//     const ValidarResponse = await Validar();
//     console.log(ValidarResponse);
// }

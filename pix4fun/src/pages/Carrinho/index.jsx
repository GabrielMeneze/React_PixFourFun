import React from 'react';
import './index.css';

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
    
<script src="main.js"></script>

const Carrinho = () => {
    return (
        <div className="mai">
            <div className="con">
                <div className="produto-h">
                    <h5 className="titulo">Produto</h5>
                    <h5 className="preco">preço</h5>
                    <h5 className="quantidade">quantidade</h5>
                    <h5 className="total">total</h5>
                </div>

                <div className="produtos">

                </div>
            </div>
        </div>

    )
}

export default Carrinho;

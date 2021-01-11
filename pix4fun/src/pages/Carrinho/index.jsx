import React from 'react';

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
    const ValidarResponse = await Validar( );
    console.log(ValidarResponse);
}

const Carrinho = () => {

    const inputEscolher = React.useRef();
    const refbtnEscolher = () => inputEscolher.current.click();

    return (
        <div className="main">
            <input
                ref={inputEscolher}
            >
            </input>
            <button
                onClick={refbtnEscolher}
                onChange={Validar}
            >
                validar
            </button>
        </div>
    )
}

export default Carrinho;

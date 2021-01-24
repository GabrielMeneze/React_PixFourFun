import React, { useState } from 'react';
import Header from '../../components/Header'
import './index.css';
import Footer from '../../components/Footer';


const Carrinho = () => {

    function Validar(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        if (data.Cupom) {
            if (data.Cupom === 'PIX10') {
                let desconto = (custoTotal / 10 - custoTotal);
                console.log('novo valor com 10% de desconto: ', desconto)
            } else {
                console.log('cupom não é valido')
            }
        } else {
            console.log('é necessario preencher o campo')
        }
    }

    const [listarImgs, setListarImgs] = React.useState(localStorage.getItem("produtoinCart"));
    const [custoTotal, setCustoTotal] = React.useState(localStorage.getItem("custoTotal"))

    const keys = listarImgs.split('"')

    const custo = () => {
        setCustoTotal('custoTotal', keys[8] * keys[12] + keys[14])
    }

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
            <div className="con">
                <div className="produto-carrinho">
                    {<p className="nome">{keys[1]}</p>}
                    {<p className="preco-b">{keys[8]}</p>}
                    {<p className="quantidade-b">{keys[12]}</p>}
                    {<p className="custo">{custoTotal}</p>}
                </div>
            </div>
            <form onSubmit={Validar}>
                <div className="form-group">
                    <input
                        type="text"
                        name="Cupom"
                        className="form-control"
                    >
                    </input>
                    <button
                        type="submit"
                        value="vcupom"
                    >OK</button>
                </div>
            </form>

            <Footer />
        </div>

    )
}

export default Carrinho;
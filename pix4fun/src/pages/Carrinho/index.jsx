import React, { useState } from 'react';
import Header from '../../components/Header'
import './index.css';
import Footer from '../../components/Footer';


const Carrinho = () => {

    const [listarImgs, setListarImgs] = React.useState(localStorage.getItem("produtoinCart"));
    const [custoTotal, setCustoTotal] = useState(0)
    const [cartNumber, setCartNumber] = React.useState(localStorage.getItem("cartNumber"))
    const [fretePreco, setFrete] = React.useState(localStorage.getItem("frete"))

    function Validar(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        if (data.Cupom) {
            if (data.Cupom === 'PIX10') {
                let desconto = (custoeFrete * 0.9);
                if (frete) {
                    console.log('e')
                    setCustoTotal(descontoEcusto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                } else {
                    console.log('s')
                    setCustoTotal(desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                }
                console.log('novo valor com 10% de desconto: ', desconto)
            } else {
                console.log('cupom não é valido')
            }
        } else {
            console.log('é necessario preencher o campo')
        }
    }



    function calcularHandler(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        fetch('http://localhost:3002/?calcular=' + data.calcular)
            .then(response => response.json())
            .then(r => {
                return (
                    console.log(r),
                    localStorage.setItem('frete', r.result[1].Valor),
                    window.location.reload()
                )
            })
            .catch(console.error)

        if (frete) {
            setCustoTotal(FreteCusto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        }


    }

    var separadores = ['"', ':', ',', '}']
    const keys = listarImgs.split(new RegExp('(' + separadores.join('|') + ')'))

    let custo = parseFloat(keys[24])
    let frete = parseFloat(fretePreco)
    let custoeFrete = (custo + frete)
    let desconto = (custo * 0.9)
    let descontoEcusto = (desconto + frete)
    let FreteCusto = (frete + custo)



    return (
        <div className="mai">
            <Header />
            <div className="produto-detalhes">
                <div className="con">
                    <div className="produto-h">
                        <h5 className="titulo">produto</h5>
                        <h5 className="preco">preço</h5>
                        <h5 className="quantidade">quantidade</h5>
                        <h5 className="total">total</h5>
                    </div>
                </div>
                <div className="con">
                    <div className="produto-carrinho">
                        {<p className="pack-nome" >{keys[14]}</p>}
                        {<p className="preco-b">{keys[24]}</p>}
                        {<p className="quantidade-b">{cartNumber}</p>}
                        {<p className="custo">{keys[24]}</p>}
                    </div>
                </div>
            </div>
            <section className="container-resumo">
                <div className="resumo-pedido">
                    <div className="limit-div">
                        <h5>Resumo pedido</h5>
                        <div className="resumo-detalhes">
                            {<p>{cartNumber} produto(s)</p>}
                            {<p>R${keys[24]}</p>}
                        </div>
                        <div className="resumo-detalhes">
                            {<p>frete</p>}
                            {<p>R${fretePreco}</p>}
                        </div>
                        <div className="resumo-inputs">
                            <form onSubmit={calcularHandler}>
                                <div className="form-group">
                                    <input
                                        placeholder="CEP"
                                        type="text"
                                        name="calcular"
                                        className="form-control"
                                    >
                                    </input>
                                    <button
                                        type="submit"
                                        value="Calcular"
                                        className="input-btn"
                                    >Calcular</button>
                                </div>
                            </form>
                            <form className="form-cupom" onSubmit={Validar}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="Cupom"
                                        className="form-control"
                                        placeholder="Cupom"
                                    >
                                    </input>
                                    <button
                                        type="submit"
                                        value="vcupom"
                                        className="input-btn"
                                    >OK</button>
                                </div>
                            </form>
                        </div>

                        <hr />

                        <div className="resumo-detalhes">
                            <strong>total</strong>
                            <strong>{custoTotal}</strong>
                        </div>

                        <form action="http://localhost:3006/checkout" method="POST">
                            <input type="hidden" name="title" value={keys[14]}/>
                            <input type="hidden" name="price" value={custoeFrete}/>
                            <input type="submit" value="comprar" class="btn btn-primary btn-block"/>
                        </form>

                    </div>
                </div>
            </section>


        </div>

    )
}

export default Carrinho;
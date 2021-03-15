import { encode } from 'iconv-lite';
import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import TrackingEvents from '../../components/TrackingEvents';
import { useHistory } from "react-router-dom";
import './index.css';

export default function Pagamento() {

    //VARIÁVEIS CUPOM
    const [idCupom, setIdCupom] = useState('')
    const [valorDesconto, setValorDesconto] = useState('')
    const [dataValidade, setDataValidade] = useState('')
    const [palavraChave, setPalavraChave] = useState('')
    const [id, setId] = useState('')


    //VARIÁVEIS PACK 
    const [tipoPack, setTipoPack] = useState('')
    const [preco, setPreco] = useState('')

    //VARIAVEIS PEDIDO 
    const [idUsuario, setIdUsuaro] = useState('')
    const [idPack, setIdPack] = useState('')
    const [statusPedido, setStatusPedido] = useState('')



    const [listar, setListar] = useState([])

    const history = useHistory();


    // // const [frete, setFrete] = React.useState(localStorage.getItem(' '))

    // const [events, setEvents] = useState([]);

    // const submitHandler = (event) => {
    //     event.preventDefault();

    //     const formData = new FormData(event.target);
    //     const data = Object.fromEntries(formData);

    //     fetch('http://localhost:3001/?tracking=' + data.tracking)
    //         .then(response => response.json())
    //         .then(data => {
    //             const events = data.events;
    //             setEvents(events);
    //         })
    //         .catch(console.error);
    // };

    // function main() {
    //     const encodeString = "729799107101114328297110107";

    //     const result = here(encodeString);
    // }

    // function here(encodeString) {
    //     '729799107101114328297110107'.charCodeAt(0);
    // }

    // var balde = 2
    // var parede = parseInt(window.prompt("Tamanho da parede em metros: "))
    // var x = parede/2;
    // console.log("Você precisara de ", x, "baldes de tinta")


    //crud do cupom 
    const listarCupom = () => {
        fetch('http://localhost:5000/api/Cupom', {
            method: "GET"
        })
            .then(res => {
                console.log(res)

            })
    }

    const adicionarCupom = (event) => {
        event.preventDefault();

        fetch("http://localhost:5000/api/Cupom", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                valorDesconto: valorDesconto,
                dataValidade: dataValidade,
                palavraChave: palavraChave
            })
        }).then((response) => {
            // Verifica a resposta, e se for OK mostra um alert informando que o usuário foi cadastrado
            if (response.ok) {
                console.log(response.json());

                alert("Cupom cadastrado.");

            }
        })
    }

    function excluirCupom() {
        fetch("http://localhost:5000/api/Cupom/" + id, {
            method: "DELETE",
            headers: {
                id: id
            }
        }).then((response) => {
            // Verifica a resposta, e se for OK mostra um alert informando que o usuário foi cadastrado
            if (response.ok) {
                console.log(response.json());
                alert("Cupom excluido.");

            } else {
                console.log(response.json())
                alert("nao foi possível deletar o cupom ")
            }
        })
    }

    const listarPack = () => {
        fetch("http://localhost:5000/api/Pack", {
            method: "GET"
        }).then(res => {
            console.log(res)

        })

    }

    const adicionarPack = () => {
        fetch("http://localhost:5000/api/Pack", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                tipoPack: tipoPack,
                preco: preco
            })
        }).then((response) => {
            // Verifica a resposta, e se for OK mostra um alert informando que o usuário foi cadastrado
            if (response.ok) {
                console.log(response.json());

                alert("Pack cadastrado.");
            } else {
                console.log(response.json())
                alert("nao foi possível cadastrar o pack")
            }
        })

    }

    function excluirPack() {
        fetch("http://localhost:5000/api/Pack/" + id, {
            method: "DELETE",
            headers: {
                id: id
            }
        }).then((response) => {
            // Verifica a resposta, e se for OK mostra um alert informando que o usuário foi cadastrado
            if (response.ok) {
                console.log(response.json());
                alert("Pack excluido.");

            } else {
                console.log(response.json())
                alert("nao foi possível deletar o pack ")
            }
        })
    }

    const listarPedidos = () => {
        fetch("http://localhost:5000/api/Pack", {
            method: "GET"
        }).then(res => {
            console.log(res)

        }).then(data => {
            setListar(data)
            console.log(data)
        })
    }
    
    const adicionarPedido = () => {
        fetch("http://localhost:5000/api/Pedido", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: {
                idUsuario : idUsuario,
                idPack : idPack,
                statusPedido: statusPedido
            }
        }).then((response) => {
            // Verifica a resposta, e se for OK mostra um alert informando que o usuário foi cadastrado
            if (response.ok) {
                console.log(response.json());

                alert("Pedido cadastrado.");
            } else {
                console.log(response.json())
                alert("nao foi possível cadastrar o pedido")
            }
        })

    }



    return (

        // main(),
        <div className="bloco">
            <Header />
            <button className="uhul" onClick={listarCupom}>Listar Cupom</button>

            <form action="POST" onSubmit={(event) => adicionarCupom(event)} className="cadastroCupom">
                <label>Palavra Chave</label>
                <input type="text" onChange={e => setPalavraChave(e.target.value)}></input>
                <label>Data de Validade</label>
                <input type="date" onChange={e => setDataValidade(e.target.value)}></input>
                <label>Valor do desconto</label>
                <input onChange={e => setValorDesconto(e.target.value)}></input>
                <button type="submit">Adicionar</button>
            </form>


            <form onSubmit={(event) => excluirCupom(event)} className="excluirCupom">
                <label>Id do cupom a ser excluído</label>
                <input type="number" onChange={e => setId(e.target.value)} ></input>
                <button type="submit">Excluir</button>
            </form>

            <button className="uhul" onClick={listarPack}>Listar Pack</button>

            <form onSubmit={(event) => adicionarPack(event)} className="cadastroCupom">
                <label>Tipo pack</label>
                <input type="text" onChange={e => setTipoPack(e.target.value)}></input>
                <label>Preço</label>
                <input onChange={e => setPreco(e.target.value)}></input>
                <button type="submit">Adicionar pack</button>
            </form>

            <form onSubmit={(event) => excluirPack(event)} className="excluirCupom">
                <label>Id do pack a ser excluído</label>
                <input type="number" onChange={e => setId(e.target.value)} ></input>
                <button type="submit">Excluir</button>
            </form>

            <button className="uhul" onClick={listarPedidos}>Listar Pack</button>

            <form onSubmit={(event) => adicionarPedido(event)} className="cadastroCupom">
                <label>IdUsuario</label>
                <input type="number" onChange={e => setIdUsuaro(e.target.value)}></input>
                <label>Id Pack</label>
                <input onChange={e => setIdPack(e.target.value)}></input>
                <label>status</label>
                <input onChange={e => setStatusPedido(e.target.value)}></input>
                <button type="submit">Adicionar pedido</button>
            </form>

            <Footer />
        </div>
    )
    }
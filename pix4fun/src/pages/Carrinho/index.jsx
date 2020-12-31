import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import logo from "../../assets/img/LOGO.png";
import './index.css';


export default function Pagamento() {
    return (
        <div className="bloco">
            <Header />
            <div className="informacoes">
                <h3>Produto</h3>
                <h3>entrega</h3>
                <h3>preco</h3>
            </div>
            <hr className="lin" />
            <div className="imge">
                <img src={logo} alt="Logo pix4fun" width="97" height="25" />
            </div>
            <div className="itens">
                <h3>Pack com 18 fotos</h3>
                <h3>......</h3>
                <h3>.......</h3>
            </div>
            {/* <hr className="lin"/> */}
            <Footer />
        </div>
    )
}
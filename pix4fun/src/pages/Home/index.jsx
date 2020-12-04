import React from 'react';
import Header from '../../components/header';
import './index.css';


export default function Home() {
    return (
        
        <div>
            <div>
              <Header/>
            </div>
            <div className="mainBanner">
                <h1>IMPRIMA SUAS MEMÓRIAS COM ESTILO</h1>
                <a href="/" className="btnMainBanner">CONHEÇA</a>
            </div>

            <section className="summary">
                <h2>VEJA COMO É FÁCIL</h2>
                <div className="summaryCards">
                    <div className="textSummary">
                        <p className="imgTextSummary">1</p>
                        <div>
                            <h3>ESCOLHA SEU PACK</h3>
                            <p>Temos packs com 6, 12 e 18 fotos.</p>
                        </div>
                    </div>
                    <div className="textSummary">
                        <p className="imgTextSummary2">2</p>
                        <div>
                            <h3>ENVIE SUAS FOTOS</h3>
                            <p>Cliquem em comprar no pack escolhido, escolha suas fotos, edite-as e nos envie.</p>
                        </div>
                    </div>
                    <div className="textSummary">
                        <p className="imgTextSummary3">3</p>
                        <div>
                            <h3>PRONTO</h3>
                            <p>Finalize com o pagamento, endereço de envio e pronto; agora é só aguardar suas fotos chegarem na sua casa.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="buy">
                <h2>VAMOS EXPERIMENTAR?</h2>
                <div className="packs">
                    <div className="pack1">
                        <h3>PACK COM 6</h3>
                        <div className="imgPack1" />
                        <div className="packDesc">
                            <p><span>•TAMANHOS</span></p>
                            <p>Quadrado: 9cm x 11cm</p>
                            <p>paisagem: 11cm x 9cm</p>
                            <p>retrato: 7,5cm x 12cm<br /><br /></p>
                            <span>
                                <p>•Fotos no formato</p>
                                <p>Polaroid®<br /><br /></p>
                                <p>•Papel fotográfico</p>
                                <p>Kodak®<br /><br /></p>
                                <p>•Frete FIXO R$10,00</p>
                            </span>
                        </div>

                        <div className="precoPack">
                            <h4>R$ 17,99</h4>
                        </div>

                        <a href="/Pagamento" className="buyButton">COMPRAR</a>
                    </div>
                    <div className="pack2">
                        <h3>PACK COM 12</h3>
                        <div className="imgPack2" />
                        <div className="packDesc">
                            <p><span>•TAMANHOS</span></p>
                            <p>Quadrado: 9cm x 11cm</p>
                            <p>paisagem: 11cm x 9cm</p>
                            <p>retrato: 7,5cm x 12cm<br /><br /></p>
                            <span>
                                <p>•Fotos no formato</p>
                                <p>Polaroid®<br /><br /></p>
                                <p>•Papel fotográfico</p>
                                <p>Kodak®<br /><br /></p>
                                <p>•Frete FIXO R$10,00</p>
                            </span>
                        </div>

                        <div className="precoPack">
                            <h4>R$ 21,99</h4>
                        </div>

                        <a href="/Pagamento" className="buyButton">COMPRAR</a>
                    </div>
                    <div className="pack3">
                        <h3>PACK COM 18</h3>
                        <div className="imgPack3" />
                        <div className="packDesc">
                            <p><span>•TAMANHOS</span></p>
                            <p>Quadrado: 9cm x 11cm</p>
                            <p>paisagem: 11cm x 9cm</p>
                            <p>retrato: 7,5cm x 12cm<br /><br /></p>
                            <span>
                                <p>•Fotos no formato</p>
                                <p>Polaroid®<br /><br /></p>
                                <p>•Papel fotográfico</p>
                                <p>Kodak®<br /><br /></p>
                                <p>•Frete FIXO R$10,00</p>
                            </span>
                        </div>

                        <div className="precoPack">
                            <h4>R$ 26,99</h4>
                        </div>

                        <a href="/Pagamento" className="buyButton">COMPRAR</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import './index.css';



const UploadImagem = () => {
  return (
    <div className="Main">
      <div>
        <Header />
      </div>

      <div className="ContainerText">
        <h2 className="text">
          Agora é a hora de<br></br> nos enviar suas<br></br> fotos!
          <span className="textGray">Simples e <br></br>rápido.</span>

          <h3>Selecione suas fotos favoritas, recorte<br></br> no formato em que deseja e clique e<br></br> enviar. Pronto! Receberemos um aviso e<br></br> suas fotos começarão a ser impressas.
          </h3>
        </h2>

        <div className="botton">
          <p>Escolher Fotos</p>
        </div>
      </div>


      <div>
        <Footer />
      </div>
    </div>
  )
}

export default UploadImagem;
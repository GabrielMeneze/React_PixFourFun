import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import './index.css';


const UploadImagem = () => {

  const [state, setState] = useState('');

  const escolherImg = event => {
    setState({
      selectedFile: event.target.files[0]
    })
  }

  const uparImg = () => {
    const fd = new FormData();
    fd.append('image', state.selectedFile, state.selectedFile.name)
    fetch('http://localhost:5000/api/Foto', fd)
      .then(res => {
        console.log(res)
      });
  }


  return (
    <div className="Main">


      <Header />

      <div className="ContainerText">
        <h2 className="text">
          Agora é a hora de<br></br> nos enviar suas<br></br> fotos!
          <span className="textGray">Simples e <br></br>rápido.</span>
          <p>Selecione suas fotos favoritas, recorte<br></br> no formato em que deseja e clique e<br></br> enviar. Pronto! Receberemos um aviso e<br></br> suas fotos começarão a ser impressas.
          </p>
        </h2>
      </div>

      <button>
        <input
          type="file"
          className="BtnChoseFile"
          onChange={escolherImg}
        />
      </button>
      <button
        onClick={uparImg}

      >Upload</button>

      <script src="https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
        data-preference-id="304819906-8b23b308-730a-4948-bbe3-9410fcc5fa95">
      </script>



      <Footer />
    </div>
  )
}
export default UploadImagem;
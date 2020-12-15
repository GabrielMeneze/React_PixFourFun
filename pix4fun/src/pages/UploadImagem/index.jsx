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

  const uparImg = async e => {
    const fd = new FormData();
    fd.append('image', state.selectedFile)
    fetch('http://localhost:5000/api/Foto', fd)
      .then(res => {
        console.log(res)
      });
  }

  return (
    <div className="ContainerMain">
      <Header />

      {/* Containem que contem a parte de escolha do usuario */}
      <div className="ContainerOne">
        {/* Container que possui o texto */}
        <div className="ContainerTextOne">
          <h2 className="textOne">
            Agora é a hora de<br></br> nos enviar suas<br></br> fotos!
          <span className="textGray">Simples e <br></br>rápido.</span>
            <p>Selecione suas fotos favoritas, recorte<br></br>
            no formato em que deseja e clique e<br></br> enviar. Pronto!
             Receberemos um aviso e<br></br> suas fotos começarão a ser impressas.
          </p>
          </h2>
        </div>

        {/* Container do botão "Escolher Imagem" */}
        <div className="ContainerBtn">
          <button>
            <input
              type="file"
              className="BtnChoseFile"
              onChange={escolherImg}
            />
          </button>
        </div>
      </div>

      <hr className="linha" />

      <td className="ContainerTwo">
        <div className="ContainerArquivos">
          <div className="itensTable">
            <p>imagem</p>
            <div className="BtnGrupo">
              <button>Excluir</button>
              <button>Cortar</button>
              <button>Frase</button>
            </div>
          </div>
        </div>
      </td>

      <button
        className="BtnChoseFile"
        onClick={uparImg}
      >Enviar</button>
      

      <Footer />
    </div>
  )
}
export default UploadImagem;







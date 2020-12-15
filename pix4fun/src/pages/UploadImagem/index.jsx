import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import './index.css';


const UploadImagem = () => {

  
  const [state, setState] = useState('');

  const escolherImg = event =>{ 
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
          <input
            className="BtnChoseFile"
            type="file"
            onClick={escolherImg}
          />
        </div>
      </div>

      <hr className="linha" />

      <table className="ContainerTwo">
        <div className="ContainerArquivos">
          <td className="itensTable">
            <p>imagem</p>
            <td className="BtnGrupo">
              <button>Excluir</button>
              <button>Cortar</button>
              <button>Frase</button>
            </td>
          </td>
        </div>
      </table>
      
      <button
      className="BtnChoseFile"
      onClick={uparImg}
      >Enviar</button>

      <Footer />
    </div>
  )
}
export default UploadImagem;







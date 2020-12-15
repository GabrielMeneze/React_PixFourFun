import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import {url} from '../../utils/constants'
import './index.css';


const UploadImagem = () => {
  // Parte teste listar--------------------------------------------------------------------------
  const [token, setToken] = useState('')
  const [texto, setTexto] = useState('');
  const [imagem, setImagem] = useState({});
  const [state, setState] = useState('');
  const [post, setPosts] = useState([]);


//   useEffect(()=>{
//     listarimg();
//     AsyncStorage.getItem('@jwt').then(data => {
//         var token = data;
//         setToken(token)
//     });
//   }, [])



//   const listarimg = () => {
//     fetch(`${url}Dicas`, {
//       method : 'GET',
//       headers : {
//         'Content-Type' : 'application/json',
//         'Authorization': 'Bearer ' + token 
//       }
//     })
//     .then(response => response.json())
//     .then(dados => {
//       console.log(dados.data);
//       setPosts(dados.data);
//     })
//     .catch(err => console.error(err));
//   }


//   let openImagePickerAsync = async () => {
//     let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }
    
//     let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
//     if (pickerResult.cancelled === true) {
//       return;
//     }
// }


// Parte que ja está funcionando-----------------------------------------------------------------------------------
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
      

      <Footer id="rodape"/>
    </div>
  )
}
export default UploadImagem;







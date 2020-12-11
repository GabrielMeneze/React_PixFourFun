import React, { Component, useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import './index.css';


const UploadImagem = () => { 

  const [image, setImage] = useState('')
  const [loading, setLoading] = useState('')

  const UploadImage = async e =>{ 
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    setLoading(true)
    const res = await fetch('http://localhost:3000/upload/imagens/',
    {
      method : 'POST',
      body : data
    })
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }
  

  return (
    <div className="Main">
    

        <Header/>

      <div className="ContainerText">
        <h2 className="text">
          Agora é a hora de<br></br> nos enviar suas<br></br> fotos!
          <span className="textGray">Simples e <br></br>rápido.</span>
          <h3>Selecione suas fotos favoritas, recorte<br></br> no formato em que deseja e clique e<br></br> enviar. Pronto! Receberemos um aviso e<br></br> suas fotos começarão a ser impressas.
          </h3>
        </h2>
      </div>
      
        <div className="Up">
          <input
            type="file"
            name="file"          
            placeholder="Upload an image"
            onChange={UploadImage}
          />

          {loading ? (
            <h3>loading...</h3>
          ): ( 
            <img src={image} style={{width: '300px'}} />
          )}
        </div>

        <Footer/>
    </div> 
  )
}
export default UploadImagem;
import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { generateDownload } from "../../utils/cropimage";
import './index.css';
import { get } from 'jquery';


const UploadImagem = () => {

    const [state, setState] = useState('')
    const [image, setImage] = React.useState(null)
    const [croppedarea, setCroppedarea] = React.useState(null)
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom, setZoom] = React.useState(1)
    const [rotation, setRotation] = useState(0)
    const [fotocropada, setFotocropada] = useState(false)
    const [contador, setContador] = useState(0);
    const [desContador, setDescontador] = useState(18);

    //Seleciona imagem
    const escolherImg = (event) => {
        setState({
            selectedFile: URL.createObjectURL(event.target.files[0])
        })

        console.log(event)
    }

    // Upa imagem para a api
    const uparImg = async e => {

        const fd = new FormData();
        fd.append('image', state.selectedFile)
        fetch('http://localhost:5000/api/Foto', fd)
            .then(res => {
                console.log(res)
            });
    }

    //Referencia o input no Botão escolher imagem
    const inputEscolher = React.useRef();
    const refbtnEscolher = () => inputEscolher.current.click();

    //Referencia o input no Botão Cortar
    const inputCortar = React.useRef();
    const SelectPopUp = () => inputCortar.current.click();

    // Referencia o input no Botão Frase
    const inputFrase = React.useRef();
    const Frase = () => inputFrase.current.click();

    //Componente que define a area do crop
    const onCropComplete = (cropPorcentagem, cropPixels) => {
        console.log(cropPorcentagem, cropPixels);
        setCroppedarea(cropPixels)
    }

    // Componente que escolhe arquivo, e o corta 
    const onSelectFile = (event) => {
        const reader = new FileReader();
        
        
        setFotocropada({
            ArquivoSelecionado:   reader.readAsDataURL(event.target.files[0]),
            ArquivoSelecionado: reader.addEventListener("load", () => {
                setImage(reader.result)
            })
        })
        console.log(event)
    };


    //Mostra a quantidade de imagens selecionadas
    function AddContador() {
        
            setContador(contador + 1)
            setDescontador(desContador - 1)
        
    }

    

    return (

        <div className="ContainerMain">
            <Header />

            <div className="ContainerOne">
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

                <div className="ContainerBtn">


                    <input
                        type="file"
                        ref={inputEscolher}
                        accept='image/*'
                        onChange={escolherImg}
                        style={{ display: 'none' }}
                        onClick={AddContador}
                    />
                    <Button
                        variant="contained"
                        onClick={refbtnEscolher}
                    >Escolher</Button>
                </div>
            </div>
            <hr className="linha" />
            {/* ----------------------------------------------Fim do 1°Container------------------------------------------------------ */}

            <td className="ContainerTwo">
                <div className="Contador">
                    <h3>Você selecionou: {contador} imagens, ainda pode selecionar {desContador}</h3>
                </div>
                <div className="container-cropper">
                    {image ? (
                        <>
                            <div className='cropper'>
                                {/* Define area a ser cortada */}
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>

                            <div className='slider'>
                                {/* Define o zoom */}
                                <Slider
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e, zoom) => setZoom(zoom)}
                                    color='secondary'
                                />
                            </div>
                            <input
                                type="file"
                                ref={inputEscolher}
                                accept='image/*'
                                onChange={escolherImg}
                                style={{ display: 'none' }}
                                onClick={AddContador}
                            />
                            <Button
                                variant="contained"
                                onClick={refbtnEscolher}
                            >Escolher outra</Button>

                            <Button
                                variant="contained"
                                className="BtnChoseFile"
                                onClose={() => setFotocropada}
                            >Salvar</Button>
                        </>
                    ) : null}
                    <div className="itensTable">
                        <div className="imagem">
                            <img src={fotocropada.ArquivoSelecionado} />
                        </div>
                        <div className="container-buttons">

                            <Button variant="contained">Excluir</Button>

                            <input
                                type="file"
                                ref={inputCortar}
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={onSelectFile}
                                onClick={AddContador}
                            />
                            <Button
                                variant="contained"
                                onClick={SelectPopUp}
                            >Cortar</Button>


                            <input
                                type="text"
                                ref={inputFrase}
                                style={{ display: 'none' }}
                            />
                            <Button
                                variant="contained"
                                onClick={Frase}
                            >Frase</Button>
                        </div>
                    </div>
                </div>
            </td>



            <Footer id="rodape" />
        </div>
    )
}
export default UploadImagem;



{/* <Button
    variant="contained"
    className="BtnChoseFile"
    onClick={uparImg}
>enviar</Button> */}
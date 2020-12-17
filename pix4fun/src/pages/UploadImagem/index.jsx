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


const UploadImagem = () => {

    // Bloco escolher e upar arquivo---------------
    const [state, setState] = useState('');
    // Component para Escolher imagem
    const escolherImg = event => {
        setState({
            selectedFile: event.target.files[0]
        })
    }
    // Component para upar imagem
    const uparImg = async e => {

        const fd = new FormData();
        fd.append('image', state.selectedFile)
        fetch('http://localhost:5000/api/Foto', fd)
            .then(res => {
                console.log(res)
            });
    }
    // Fim bloco Escolher e Upar-------------------


    const inputEscolher = React.useRef();
    const refbtnEscolher = () => inputEscolher.current.click();

    const inputCortar = React.useRef();
    const SelectPopUp = () => inputCortar.current.click();


    const [image, setImage] = React.useState(null)
    const [croppedarea, setCroppedarea] = React.useState(null)
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom, setZoom] = React.useState(1)

    const onCropComplete = (cropPorcentagem, cropPixels) => {
        console.log(cropPorcentagem, cropPixels);
        setCroppedarea(cropPixels)
    }

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
        }
    };


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
                    />
                    <Button
                        variant="contained"
                        onClick={refbtnEscolher}
                    >Escolher</Button>
                </div>
            </div>

            <hr className="linha" />

            <td className="ContainerTwo">
                <div className="container-cropper">
                    {image ? (
                        <>
                            <div className='cropper'>
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
                                <Slider
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e, zoom) => setZoom(zoom)}
                                    color='secondary'
                                />
                            </div>
                        </>
                    ) : null}
                    <div className="itensTable">
                        <p>imagem</p>
                        <div className="container-buttons">
                            <Button variant="contained">Excluir</Button>
                            <input
                                type="file"
                                ref={inputCortar}
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={onSelectFile}
                            />
                            <Button
                                variant="contained"
                                onClick={SelectPopUp}
                            >Cortar</Button>
                            <Button variant="contained">Frase</Button>
                        </div>
                    </div>
                </div>
            </td>

            <button
                className="BtnChoseFile"
                onClick={uparImg}
            >Enviar</button>


            <Footer id="rodape" />
        </div>
    )
}
export default UploadImagem;
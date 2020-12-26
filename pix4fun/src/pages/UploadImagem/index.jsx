import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import { Modal, Form } from 'react-bootstrap';
import './index.css';

const UploadImagem = () => {
    // Variaveis do crop
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom, setZoom] = React.useState(1)
    const [image, setImage] = React.useState(null)
    const [croppedarea, setCroppedarea] = React.useState(null)

    // Variaveis referentes aos botões
    const [frase, setFrase] = useState('')
    const [contador, setContador] = useState(0);
    const [desContador, setDescontador] = useState(18);
    const [modalShow, setModalShow] = React.useState(false)

    // Variaveis dos blocos
    const [bloco1, setBloco1] = useState(null)
    const [bloco2, setBloco2] = useState(null)

    //Referencia o input no Botão escolher imagem
    const inputEscolher = React.useRef();
    const refbtnEscolher = () => inputEscolher.current.click();

    //Referencia o input no Botão escolher outra imagem
    const inputEscollherOutra = React.useRef();
    const refEscolherOutra = () => inputEscollherOutra.current.click();

    //Referencia o input no Botão Cortar
    const inputCortar = React.useRef();
    const refCortar = () => inputCortar.current.click();

    //Componente que define a area do crop
    const onCropComplete = (cropPorcentagem, cropPixels) => {
        console.log(cropPorcentagem, cropPixels);
        setCroppedarea(cropPixels)
    }

    // Upa imagem para a api
    const uparImg = async e => {
        const fd = new FormData();
        fd.append('image', croppedarea)
        fetch('http://localhost:5000/api/Upload', fd)
            .then(res => {
                console.log(res)
            });
    }

    // Componente que escolhe arquivo, e o corta 
    const AbrirCrop = (event) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.addEventListener("load", () => {
            setImage(reader.result)
        })

    };

    //Mostra a quantidade de imagens selecionadas
    function AddContador() {
        setContador(contador + 1)
        setDescontador(desContador - 1)
    }

    // Define frase que acompanhará foto
    function ModalFrase(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ fontFamily: "Questrial" }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Frase da foto
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Digite sua frase abaixo
                    </p>
                    <input style={{ padding: "0 5px" }} value={frase} onChange={event => setFrase(event.target.frase)} type="text" placeholder="Frase" />
                    <Button style={{ textTransform: "none", marginLeft: 5 }} type="submit">Enviar</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (

        <div className="ContainerMain">
            <Header />
            <div className="ContainerOne">
                <div className="ContainerA_Text">
                    <h2 className="textOne">
                        Agora é a hora de<br></br> nos enviar suas<br></br> fotos!
          <span className="textGray">Simples e <br></br>rápido.</span>
                        <p>Selecione suas fotos favoritas, recorte<br></br>
                            no formato em que deseja e clique e<br></br> enviar. Pronto!
                            Receberemos um aviso e<br></br> suas fotos começarão a ser impressas.
                        </p>
                    </h2>
                </div>
                <div className="ContainerB_escolher">
                    <input
                        type="file"
                        ref={inputEscolher}
                        accept='image/*'
                        onChange={AbrirCrop}
                        onClick={() => setBloco1(true)}
                        style={{ display: 'none' }}
                    />
                    <button
                        className="Btn"
                        onClick={refbtnEscolher}
                        href="#crop"
                    >Escolher imagem</button>
                </div>
            </div>
            <hr className="lin" id="crop" />
            {/* ----------------------------------------------Fim do 1°Container------------------------------------------------------ */}
            <div className="ContainerTwo">
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
                                    max={6}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e, zoom) => setZoom(zoom)}
                                    color='secondary'
                                />
                            </div>

                            {/* Salva e lista a imagem */}
                            <button
                                variant="contained"
                                className="Btn"
                                onClick={() => setImage(false)}
                            >salvar imagem cortada </button>
                        </>
                    ) : null}
                    
                </div>

                    <div className="blocos">
                        {bloco1 ? (
                            <>
                                <div className="bloco1">
                                    <div className="imagem">
                                        <img src={croppedarea} />
                                    </div>
                                    <div className="container-buttons">

                                        <Button variant="contained">Excluir</Button>

                                        <input
                                            type="file"
                                            ref={inputCortar}
                                            accept='image/*'
                                            style={{ display: 'none' }}
                                            onChange={AbrirCrop}
                                            onClick={AddContador}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={refCortar}
                                        >Cortar</Button>



                                        <Button variant="primary" onClick={() => setModalShow(true)}>
                                            Frase
                            </Button>

                                        <ModalFrase
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : null}

                        {bloco2 ? (
                            <>
                                <div className="bloco2">
                                    <div className="imagem">
                                        <img src={croppedarea} />
                                    </div>
                                    <div className="container-buttons">
                                        <Button variant="contained">Excluir</Button>
                                        <input
                                            type="file"
                                            ref={inputCortar}
                                            accept='image/*'
                                            style={{ display: 'none' }}
                                            onChange={AbrirCrop}
                                            onClick={AddContador}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={refCortar}
                                        >Cortar</Button>
                                        <Button variant="primary" onClick={() => setModalShow(true)}>
                                            Frase
                            </Button>
                                        <ModalFrase
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>
                                </div>

                            </>
                        ) : null}

                    </div>

                    {/* Abre bloco 2 */}
                    <div className="btnAbrir">
                        <input
                            type="file"
                            ref={inputEscollherOutra}
                            accept='image/*'
                            onChange={AbrirCrop}
                            onClick={() => setBloco2(true)}
                            style={{ display: 'none' }}
                        />
                        <Button
                            variant="contained"
                            onClick={refEscolherOutra}
                        >Escolher outra imagem</Button>
                    </div>
            </div>
            <Footer id="rodape" />
        </div>
    )
}
export default UploadImagem;



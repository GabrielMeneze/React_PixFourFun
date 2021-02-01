// Fechar o crop como você fecha o input da frase

import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import { Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './index.css';

const UploadImagem = () => {
    const [imagens, setImagens] = useState([])
    const [limitador, setLimitador] = useState(0)
    const [des, setDes] = useState(-1)
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom, setZoom] = React.useState(1)
    const [image, setImage] = React.useState(null)
    const [bloco1, setBloco1] = React.useState(null)
    const [croppedarea, setCroppedarea] = React.useState(null)
    const [qtdImgs, setQntdItens] = React.useState(localStorage.getItem("produtoinCart"))

    const keys = qtdImgs.split(' ')

    // Variaveis referentes aos botões
    const [frase, setFrase] = useState('')
    const [modalShow, setModalShow] = React.useState(false)

    //Referencia o input no Botão escolher imagem
    const inputEscolher = React.useRef();
    const refbtnEscolher = () => inputEscolher.current.click();

    //Referencia o input no Botão Cortar
    const inputCortar = React.useRef();
    const refCortar = () => inputCortar.current.click();

    //Referencia o limitador de fotos
    const inputLimit = React.useRef();
    const refLimit = () => inputLimit.current.click();

    //Componente que define a area do crop
    const onCropComplete = (cropPorcentagem, cropPixels) => {
        setCroppedarea(cropPixels)
        console.log(cropPorcentagem, croppedarea)
    }

    // Upa imagem para a api
    const uparFrase = () => {
        const fd = new FormData();
        fd.append('FraseFoto', frase)
        fetch('http://localhost:3000/api/Foto/FraseFoto', fd)
            .then(res => {
                console.log(res)
            });
    }

    // componente que escolhe a imagem
    const escolherImg = event => {

        var pack6 = 5;
        var pack12 = 11;
        var pack18 = 17;

        // Verificação para limitar quantidade de fotos escolhidas
        if (limitador == 0) {
            // seleciona a foto
            imagens.push(URL.createObjectURL(event.target.files[0]))
            setImagens(
                imagens
            );
            console.log(imagens)
            if (keys[6] == 6) {
                setLimitador(limitador + pack6)
            }
            else if (keys[6] == 12) {
                setLimitador(limitador + pack12);
            }
            else if (keys[6] == 18) {
                setLimitador(limitador + pack18);
            }
        } else {
            imagens.push(URL.createObjectURL(event.target.files[0]))
            setImagens(
                imagens
            );

            setLimitador(limitador + des)
            if (limitador == 1) {
                alert('Pronto! agora basta enviar as fotos')
            }
        }
    }

    // Upa imagem para a api
    const uparImg = (event) => {
        if (limitador > 0) {
            alert('você ainda pode selecionar mais fotos')
        } else {
                const fd = new FormData();
                fd.append('image', imagens)
                fetch('http://localhost:5000/api/Foto', fd)
                .then(res =>{
                  console.log(res)
                });
        }
    }


    // Componente que escolhe a imagem e o corta 
    const AbrirCrop = (event, props) => {
        const reader = new FileReader();

        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0])
            reader.addEventListener("load", () => {
                setImage(reader.result)
            })
        }
    };




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
                    <Button style={{ textTransform: "none", marginLeft: 5 }} type="submit" onClick={uparFrase}>Enviar</Button>
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
                        href="#ContainerT"
                        type="file"
                        ref={inputEscolher}
                        accept='image/*'
                        onChange={escolherImg}
                        onClick={() => setBloco1(true)}
                        style={{ display: 'none' }}
                    />
                    <button
                        className="Btn"
                        onClick={refbtnEscolher}
                    >Escolher imagem</button>
                </div>
            </div>

            <hr className="lin" id="ContainerT" />
            {/* ----------------------------------------------Fim do 1°Container------------------------------------------------------ */}

            <div className="ContainerTwo">
                <div className="container-cropper" >
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
                            <Button
                                className="Btn"
                                onClick={() => setImage(false)}
                            >salvar imagem cortada </Button>
                        </>
                    ) : null}

                </div>

                <div className="container_bloco">
                    {imagens.map(item => {
                        return (
                            <div className="bloco">
                                <div className="imagem">
                                    {/* lista a imagem no bloco */}
                                    <img src={item} />
                                </div>
                                <div className="container-buttons">
                                    {/* botão excluir */}
                                    <Button >Excluir</Button>

                                    {/* Abre o cortar imagem */}
                                    <input
                                        type="file"
                                        ref={inputCortar}
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={AbrirCrop}
                                    />
                                    <Button
                                        onClick={refCortar}
                                    >Cortar</Button>
                                    {/* Abre o input para a frase da foto */}
                                    <Button
                                        onClick={() => setModalShow(true)}>
                                        Frase
                                    </Button>
                                    <ModalFrase
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="container-subimit">
                    {<p>Você ainda pode escolher {limitador} imagens</p>}
                    <div className="container-newImage">
                    <input
                        href="#ContainerT"
                        type="file"
                        ref={inputEscolher}
                        accept='image/*'
                        onChange={escolherImg}
                        onClick={() => setBloco1(true)}
                        style={{ display: 'none' }}
                    />
                    </div>
                    <div className="container-salvar">
                        <input
                            href="#ContainerT"
                            ref={inputLimit}
                            style={{ display: 'none' }}
                        ></input>
                        <button
                            className="Btn-2"
                            onClick={refbtnEscolher}
                        >ESCOLHER IMAGEM</button>
                        <Button className="btn" type="submit" onClick={uparImg} onChange={refLimit}>Salvar e enviar</Button>
                    </div>
                </div>
            </div>

            <div id="contact" />
            <div id="doubt" />
            <Footer/>
        </div>
    )
}
export default UploadImagem;



import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import { Modal, Form } from 'react-bootstrap';
import './index.css';

const UploadImagem = () => {
    // Variaveis
    const [state, setState] = useState('')
    const [image, setImage] = React.useState(null)
    const [fechar, setFechar] = React.useState(null)
    const [frase, setFrase] = useState('')
    const [croppedarea, setCroppedarea] = React.useState(null)
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom, setZoom] = React.useState(1)
    const [contador, setContador] = useState(0);
    const [desContador, setDescontador] = useState(18);
    const [bloco2, setBloco2] = useState(null)
    const [modalShow, setModalShow] = React.useState(false)

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

    //Seleciona imagem(esta aqui ainda para utilizar como base para listar imagem)
    // const escolherImg = (event) => {
    //     setState({
    //         selectedFile: URL.createObjectURL(event.target.files[0])
    //     })
    // }

    // Upa imagem para a api
    const uparImg = async e => {
        const fd = new FormData();
        fd.append('image', state.selectedFile)
        fetch('http://localhost:5000/api/Foto', fd)
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
        console.log(event)
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
                    <Form onSubmit={event => ('')}></Form>
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
                        onChange={AbrirCrop}
                        style={{ display: 'none' }}
                    />
                    <Button
                        variant="contained"
                        onClick={refbtnEscolher}
                        href="#crop"
                    >Escolher</Button>
                </div>
            </div>
            <hr id="crop" />

            {/* ----------------------------------------------Fim do 1°Container------------------------------------------------------ */}

            <div className="ContainerTwo">
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
                            {/* Botão para escolher outra imagem para realizar o crop */}
                            <input
                                type="file"
                                ref={inputEscolher}
                                accept='image/*'
                                onChange={AbrirCrop}
                                style={{ display: 'none' }}
                            />
                            <Button
                                variant="contained"
                                onClick={refbtnEscolher}
                            >Escolher outra imagem</Button>
                            {/* Botão para subir imagem para a api */}
                            <Button
                                variant="contained"
                                className="BtnChoseFile"
                                onClick={uparImg}
                                onClick={() => setImage(null)}
                            >salvar</Button>
                            {/* <h3>Você selecionou: {contador} imagens, ainda pode selecionar {desContador}</h3> */}
                        </>
                    ) : null}

                    <div className="blocos">
                        <div className="bloco1">
                            <div className="imagem">
                                <img src={state.selectedFile} />
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
                                    onClick={SelectPopUp}
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


                        {bloco2 ? (
                            <>
                                <div className="bloco2">
                                    <div className="imagem">
                                        <img src={state.selectedFile} />
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
                                            onClick={SelectPopUp}
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
                            ref={inputEscolher}
                            accept='image/*'
                            onChange={AbrirCrop}
                            onClick={() => setBloco2(true)}
                            style={{ display: 'none' }}
                        />
                        <Button
                            variant="contained"
                            onClick={refbtnEscolher}
                        >Escolher outra imagem</Button>
                    </div>

                    <hr />


                </div>
            </div>
            <Footer id="rodape" />
        </div>
    )
}
export default UploadImagem;



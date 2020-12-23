import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import { url } from '../../utils/constants'
import { Modal, Form } from 'react-bootstrap';

import './index.css';
import { render } from '@testing-library/react';

const UploadImagem = () => {
    const [idFoto, setIdFoto] = useState('')
    const [state, setState] = useState('')
    const [image, setImage] = React.useState(null)
    const [fechar, setFechar] = useState(true)
    const [frase, setFrase] = useState('')
    const [croppedarea, setCroppedarea] = React.useState(null)
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom, setZoom] = React.useState(1)
    const [contador, setContador] = useState(0);
    const [desContador, setDescontador] = useState(18);

    const [bloco, setBloco] = useState(true)


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

    //Seleciona imagem
    const escolherImg = (event) => {
        setState({
            selectedFile: URL.createObjectURL(event.target.files[0])
        })
        console.log(event)
    }



    const aparecerBloco = () => {
        if (bloco == true) {
            return

        }
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

    // Componente que escolhe arquivo, e o corta 
    const AbrirCrop = (event) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.addEventListener("load", () => {
            setImage(reader.result)
        })
        console.log(event)
    };



    // Fecha o crop
    const CloseCrop = () => {
        setImage({
            fecharcrop: null
        })
    }


    //Mostra a quantidade de imagens selecionadas
    function AddContador() {
        setContador(contador + 1)
        setDescontador(desContador - 1)
    }

    const salvarFrase = (event) => {
        event.preventDefault()

        fetch(url + 'foto' + 'idFoto', {
            METHOD: 'POST', 
            body: JSON.stringify({
                frase: frase
            })
            .then(response => {
                console.log(response.json())
            })
        })
    }

    const [modalShow, setModalShow] = React.useState(false);

    function ModalFrase(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-40w"
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
                    <Form onSubmit={event => salvarFrase(event)}></Form>
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

            <div className="ContainerTwo">
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
                            >salvar</Button>

                        </>
                    ) : null}



                    <div className="itensTable">
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
                            {/* <input
                                type="text"
                                ref={inputFrase}
                                placeholder="Coloque uma frase"
                                style={{ display: 'none' }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleShow()}

                            >Frase</Button> */}
                        </div>
                    </div>
                    <hr />


                </div>
            </div>
            <Footer id="rodape" />
        </div>
    )
}
export default UploadImagem;



import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import { Modal } from 'react-bootstrap';
import './index.css';

const UploadImagem = () => {
    // Variaveis dos blocos
    const [state, setState] = useState('')
    // Variaveis do crop
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom, setZoom] = React.useState(1)
    const [image, setImage] = React.useState(null)
    const [croppedarea, setCroppedarea] = React.useState(null)

    // Variaveis referentes aos botões
    const [frase, setFrase] = useState('')
    const [modalShow, setModalShow] = React.useState(false)

    //Referencia o input no Botão escolher imagem
    const inputEscolher = React.useRef();
    const refbtnEscolher = () => inputEscolher.current.click();

    //Referencia o input no Botão Cortar
    const inputCortar = React.useRef();
    const refCortar = () => inputCortar.current.click();

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

    const escolherImg = event => {
        setState({
            selectedFile: URL.createObjectURL(event.target.files[0])
        })
    }

    // Upa imagem para a api
    const uparImg = (event) => {
        const fd = new FormData();
        fd.append('FraseFoto', frase)
        fetch('http://localhost:3000/api/Upload', fd)
            .then(res => {
                console.log(res)
            });
    }


    // Componente que escolhe arquivo, e o corta 
    const AbrirCrop = (event) => {
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
    <script src="main.js"></script>

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
                            // // onClick={() => setImage(false)}
                            // onChange={uparImg}
                            >salvar imagem cortada </Button>
                        </>
                    ) : null}

                </div>

                <div className="blocos">
                    {/* {bloco1 ? (
                                    <> */}
                    <div className="bloco1">
                        <div className="imagem">
                            <img src={state.selectedFile} />
                            {/* <div className="verification"/> */}
                        </div>
                        <div className="container-buttons">
                            <Button >Excluir</Button>
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

                    <div>
                    <Button className="btn" type="submit" onClick={uparImg}>salv</Button>
                    </div>

                    {/* </>
                                ) : null} */}
                </div>
            </div>

            <div id="contact" />
            <div id="doubt" />
            <Footer />
        </div>
    )
}
export default UploadImagem;



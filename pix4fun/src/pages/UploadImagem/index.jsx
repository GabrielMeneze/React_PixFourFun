// Fechar o crop como você fecha o input da frase

import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import { Modal } from 'react-bootstrap';
import Home from '../Home/index.jsx'
import './index.css';

const UploadImagem = () => {

    const [state, setState] = useState('')
    const [contador, setContador] = useState(5)
    const [des, setDes] = useState(-13)
    const [crop, setCrop] = React.useState({ x: 0, y: 0 })
    const [zoom, setZoom] = React.useState(1)
    const [image, setImage] = React.useState(null)
    const [bloco1, setBloco1] = React.useState(null)
    const [croppedarea, setCroppedarea] = React.useState(null)
    const [qtdImgs, setQntdItens] = React.useState(localStorage.getItem("produtoinCart"))

    console.log(qtdImgs)


    const keys = qtdImgs.split(' ')

    const limitFotos = () => {
        var pack6 = 6;
        var pack12 = 12;
        var pack18 = 18;

        if (keys[6] == 6) {
            setContador(contador + pack6)

        } else if (keys[6] == 12) {
            setContador(contador + pack12);
        } else {
            setContador(contador + pack18);
        }
    }

    console.log(keys)

    console.log(limitFotos)

    console.log(contador)

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

    // componente que escolhe a imagem
    const escolherImg = (event) => {

        if (contador > 0) {
            setState({
                selectedFile: URL.createObjectURL(event.target.files[0])
            })   
        } else {
            alert("Você não pode mais selecionar imagens")
        }

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

    const Qtd = () => {
        if (contador === 0) {
            <p>Você não pode mais selecionar imagens</p>
        } else {
            setContador(contador + des);
        }
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
                        //faz o laço de repetição do contador funcionar de acordo com o produto
                        //onChange={limitFotos}
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

                <div className="blocos">
                    {bloco1 ? (
                        <>
                            <div className="bloco1">
                                <div className="imagem">
                                    <img src={state.selectedFile} />
                                    {/* <div className="verification"/> */}
                                </div>
                                <div className="container-buttons">
                                    <Button >Excluir</Button>

                                    {/* Abre o crop de imagem */}
                                    <input
                                        type="file"
                                        ref={inputCortar}
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={AbrirCrop}
                                        onClick={Qtd}
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

                            <div className="container-buttons botaosalvar">

                                {<p>Você ainda pode escolher {contador} imagens</p>}
                                <Button className="btn" type="submit" onClick={uparImg} onChange={limitFotos}>Salvar e enviar</Button>
                            </div>

                        </>
                    ) : null}
                </div>
            </div>

            <div id="contact" />
            <div id="doubt" />
            <Footer />
        </div>
    )
}
export default UploadImagem;



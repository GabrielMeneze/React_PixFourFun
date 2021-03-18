import React, { useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import { Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { url } from "../../utils/constants";
import './index.css';

const UploadImagem = () => {
    const [imagens, setImagens] = useState([])
    const [limitador, setLimitador] = useState(0)
    const [des, setDes] = useState(-1)
    const [li, setLi] = useState('oi')
    const [container2, setContainer2] = React.useState(null)
    const [image, setImage] = React.useState(null)
    const [frase, setFrase] = useState('')
    const [qtdImgs, setQntdItens] = React.useState(localStorage.getItem("produtoinCart"))
    const keys = qtdImgs.split(' ')
    const [modalShow, setModalShow] = React.useState(false)
    const [modalcrop, setModalcrop] = React.useState(false)

    //Referencia o input no Botão escolher imagem
    const inputEscolher = React.useRef();
    const refbtnEscolher = () => inputEscolher.current.click();

    //Referencia o input no Botão Cortar
    const inputCortar = React.useRef();
    const refCortar = () => inputCortar.current.click();

    // Upa imagem para a api
    const uparFrase = () => {
        const fd = new FormData();
        fd.append('FraseFoto', frase)
        fetch('http://localhost:5000/api/Foto/FraseFoto', fd)
            .then(res => {
                console.log(res)
            });
    }


    
    // componente que escolhe a imagem
    const escolherImg = event => {

        var pack6 = 5;
        var pack12 = 11;
        var pack18 = 17;

        console.log(keys)
        // Verificação para limitar quantidade de fotos escolhidas
        if (limitador == 0 && li == 'oi') {

            // seleciona a foto
            imagens.push(URL.createObjectURL(event.target.files[0]))
            setImagens(imagens)

            if (keys[2] == 6) {
                setLimitador(limitador + pack6)
            }
            else if (keys[2] == 12) {
                setLimitador(limitador + pack12);
            }
            else if (keys[2] == 18) {
                setLimitador(limitador + pack18);
            }
        } else if (li == 'oi') {


            // seleciona a foto
            imagens.push(URL.createObjectURL(event.target.files[0]))
            setImagens(imagens)

            setLimitador(limitador + des)

            if (limitador == 1) {
                alert('Pronto! agora basta enviar as fotos')
                setLi('hoje');
            }
        } else if (li == 'hoje') {
            alert('voce não pode mais selecionar imagens')
        }
    }

    

    // // Upa imagem para a api
    // const uparImg = (event) => {

    // }




    function excluirImg(index) {
        var i = 1
        const list = Array.from(imagens)
        list.splice(index, 1);

        setImagens(list);
        setLi('oi')
        setLimitador(limitador + i);
    }



    function ModalCrop(props) {

        // Variaveis que constituem o crop
        const [crop, setCrop] = React.useState({ x: 0, y: 0 })
        const [zoom, setZoom] = React.useState(1)
        const [aspect, setAspect] = React.useState(1)
        const [image, setImage] = React.useState(null)
        const [inputImg, setInputImg] = useState('')
        const [blob, setBlob] = React.useState(null)

        // const createImage = (url) => {
        //     new Promise((resolve, reject) => {
        //         const imagee = new imagee()
        //         imagee.addEventListener('load', () => resolve(imagee))
        //         imagee.addEventListener('error', error => reject(error))
        //         imagee.setAttribute('crossOrigin', 'anonymous')
        //         imagee.src = url
        //     })
        // }
        const getCroppedImg = async (imageSrc, crop) => {
            // const image = await createImage(imageSrc)
            // const canvas = document.createElement('canvas')
            // const ctx = canvas.getContext('2d')

            // return new Promise((resolve) => {
            //     canvas.toBlob((blob) => {
            //         resolve(blob)
            //     }, 'imagee/jpeg')
            // })
        }

        //Componente que define a area do crop: x, y, width, height
        const onCropComplete = async (cropPixels) => {
            const imagemCortada = await getCroppedImg(
                inputImg,
                cropPixels
            )
            getBlob(imagemCortada);
        }

        function getBlob(blob) {
            setBlob(blob)
        }

        // Componente que escolhe a imagem a ser recortada
        const AbrirCrop = (e) => {

            const file = e.target.files[0]
            const reader = new FileReader()

            reader.addEventListener('load', () => {
                setInputImg(reader.result)
            }, false)

            if (file) {
                reader.readAsDataURL(file)
            }
        };

        function uparCrop(e) {
            e.preventDefault()
            const fd = new FormData();
            fd.append('image', blob, { contentType: blob.type })
            fetch('http://localhost:5000/api/Foto', fd)
                .then(res => {
                    console.log(res)
                });
        }


        // Funções referentes aos botôes Paisagem Quadrado Retrato
        function Dime1() { setAspect(1) } // Quadrado
        function Dime2() { setAspect(2.1) } // Paisagem
        function Dime3() { setAspect(0.9) } // Retrato

        // retorna o front-end do modal e o crop
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
                        Recorte a imagem
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {inputImg ? (
                        <>
                            <div className="FraseBtn">
                                <h3>Escolha a dimensão da sua foto</h3>
                            </div>
                            <div className="btns" >
                                <Button onClick={Dime1}>Quadrado</Button>
                                <Button onClick={Dime2}>Paisagem</Button>
                                <Button onClick={Dime3}>Retrato</Button>
                            </div>
                            <div className="container-cropper" >
                                <div className='cropper'>
                                    <Cropper
                                        image={inputImg}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={aspect}
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
                            </div>
                        </>
                    ) : null}


                    <input
                        type="file"
                        ref={inputCortar}
                        accept='image/*'
                        style={{ display: 'none' }}
                        onChange={AbrirCrop}
                    />

                    <Button
                        onClick={refCortar}
                    >Escolher imagem a ser cortada</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={uparCrop}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        );
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
                        onChange={escolherImg}
                        onClick={() => setContainer2(true)}
                        style={{ display: 'none' }}
                    />
                    <button
                        className="Btn"
                        onClick={refbtnEscolher}
                    >Escolher imagem</button>
                </div>
                {/* <form>
                    <input type="file" multiple={true} onChange={e => onFileChange(e.target.files); escolherImg;} />
                    <button onClick={handleClick}>Upload</button>
                </form> */}
            </div>

            <hr className="lin" id="ContainerT" />
            {/* ----------------------------------------------Fim do 1°Container------------------------------------------------------ */}
            {container2 ? (
                <>
                    <div className="ContainerTwo">

                        <div className="container_bloco">
                            {imagens.map(item => {
                                return (
                                    <div className="bloco-imagem">
                                        <div className="imagem">
                                            {/* lista a imagem no bloco */}
                                            <img src={item} />
                                        </div>
                                        <div className="container-buttons">
                                            {/* botão excluir */}
                                            <Button onClick={() => excluirImg(item.id)} >Excluir</Button>

                                            {/* Abre o cortar imagem */}
                                            <Button
                                                onClick={() => setModalcrop(true)}
                                            >Cortar</Button>
                                            <ModalCrop
                                                show={modalcrop}
                                                onHide={() => setModalcrop(false)}
                                            />
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
                        <div className="man">
                            <div className="container-subimit">
                                {<p>Você ainda pode escolher {limitador} imagens</p>}
                                <div className="escolherdnv">
                                    <Link to="#" className="Btn"
                                         >SALVAR </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            <div id="contact" />
            <div id="doubt" />
            <Footer />
        </div >
    )
}
export default UploadImagem;



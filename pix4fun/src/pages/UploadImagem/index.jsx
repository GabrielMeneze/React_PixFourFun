// import React, { useState, useEffect, useCallback } from 'react';
// import Header from '../../components/Header/index';
// import Footer from '../../components/Footer/index';
// import ReactDOM from 'react-dom'
// import Cropper from 'react-easy-crop'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import { withStyles } from '@material-ui/core/styles'
// import { getOrientation } from 'get-orientation/browser'
// import './index.css';


// const ORIENTATION_TO_ANGLE = {
//   '3': 180,
//   '6': 90,
//   '8': -90,
// }

// const UploadImagem = ({classes}) => {

// // Parte teste crop---------------------------------------------------------------------------------------
// const [imageSrc, setImageSrc] = React.useState(null)
//   const [crop, setCrop] = useState({ x: 0, y: 0 })
//   const [rotation, setRotation] = useState(0)
//   const [zoom, setZoom] = useState(1)
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
//   const [croppedImage, setCroppedImage] = useState(null)

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels)
//   }, [])

//   const showCroppedImage = useCallback(async () => {
//     try {
//       const croppedImage = await getCroppedImg(
//         imageSrc,
//         croppedAreaPixels,
//         rotation
//       )
//       console.log('donee', { croppedImage })
//       setCroppedImage(croppedImage)
//     } catch (e) {
//       console.error(e)
//     }
//   }, [imageSrc, croppedAreaPixels, rotation])

//   const onClose = useCallback(() => {
//     setCroppedImage(null)
//   }, [])

//   const onFileChange = async e => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0]
//       let imageDataUrl = await readFile(file)

//       // apply rotation if needed
//       const orientation = await getOrientation(file)
//       const rotation = ORIENTATION_TO_ANGLE[orientation]
//       if (rotation) {
//         imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
//       }

//       setImageSrc(imageDataUrl)
//     }
//   }








//   // Parte teste listar--------------------------------------------------------------------------
//   const [token, setToken] = useState('')
//   const [texto, setTexto] = useState('');
//   const [imagem, setImagem] = useState({});
//   const [state, setState] = useState('');
//   const [post, setPosts] = useState([]);


// //   useEffect(()=>{
// //     listarimg();
// //     AsyncStorage.getItem('@jwt').then(data => {
// //         var token = data;
// //         setToken(token)
// //     });
// //   }, [])



// //   const listarimg = () => {
// //     fetch(`${url}Dicas`, {
// //       method : 'GET',
// //       headers : {
// //         'Content-Type' : 'application/json',
// //         'Authorization': 'Bearer ' + token 
// //       }
// //     })
// //     .then(response => response.json())
// //     .then(dados => {
// //       console.log(dados.data);
// //       setPosts(dados.data);
// //     })
// //     .catch(err => console.error(err));
// //   }


// //   let openImagePickerAsync = async () => {
// //     let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
// //     if (permissionResult.granted === false) {
// //       alert("Permission to access camera roll is required!");
// //       return;
// //     }
    
// //     let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
// //     if (pickerResult.cancelled === true) {
// //       return;
// //     }
// // }


// // Parte que ja está funcionando-----------------------------------------------------------------------------------
// const escolherImg = event => {
//   setState({
//     selectedFile: event.target.files[0]
//   })
// }

//   const uparImg = async e => {

//     const fd = new FormData();
//     fd.append('image', state.selectedFile)
//     fetch('http://localhost:5000/api/Foto', fd)
//       .then(res => {
//         console.log(res)
//       });
//   }

//   return (

//     // Parte do crop
    

    
//     <div className="ContainerMain">
//       <Header />
      
//       <div>
//       {imageSrc ? (
//         <React.Fragment>
//           <div className={classes.cropContainer}>
//             <Cropper
//               image={imageSrc}
//               crop={crop}
//               rotation={rotation}
//               zoom={zoom}
//               aspect={4 / 3}
//               onCropChange={setCrop}
//               onRotationChange={setRotation}
//               onCropComplete={onCropComplete}
//               onZoomChange={setZoom}
//             />
//           </div>
//           <div className={classes.controls}>
//             <div className={classes.sliderContainer}>
//               <Typography
//                 variant="overline"
//                 classes={{ root: classes.sliderLabel }}
//               >
//                 Zoom
//               </Typography>
//               <Slider
//                 value={zoom}
//                 min={1}
//                 max={3}
//                 step={0.1}
//                 aria-labelledby="Zoom"
//                 classes={{ container: classes.slider }}
//                 onChange={(e, zoom) => setZoom(zoom)}
//               />
//             </div>
//             <div className={classes.sliderContainer}>
//               <Typography
//                 variant="overline"
//                 classes={{ root: classes.sliderLabel }}
//               >
//                 Rotation
//               </Typography>
//               <Slider
//                 value={rotation}
//                 min={0}
//                 max={360}
//                 step={1}
//                 aria-labelledby="Rotation"
//                 classes={{ container: classes.slider }}
//                 onChange={(e, rotation) => setRotation(rotation)}
//               />
//             </div>
//             <Button
//               onClick={showCroppedImage}
//               variant="contained"
//               color="primary"
//               classes={{ root: classes.cropButton }}
//             >
//               Show Result
//             </Button>
//           </div>
//           <ImgDialog img={croppedImage} onClose={onClose} />
//         </React.Fragment>
//       ) : (
//         <input type="file" onChange={onFileChange} accept="image/*" />
//       )}
//     </div>



//       {/* Containem que contem a parte de escolha do usuario */}
//       <div className="ContainerOne">
//         {/* Container que possui o texto */}
//         <div className="ContainerTextOne">
//           <h2 className="textOne">
//             Agora é a hora de<br></br> nos enviar suas<br></br> fotos!
//           <span className="textGray">Simples e <br></br>rápido.</span>
//             <p>Selecione suas fotos favoritas, recorte<br></br>
//             no formato em que deseja e clique e<br></br> enviar. Pronto!
//              Receberemos um aviso e<br></br> suas fotos começarão a ser impressas.
//           </p>
//           </h2>
//         </div>

//         {/* Container do botão "Escolher Imagem" */}
//         <div className="ContainerBtn">
//           <button>
//             <input
//               type="file"
//               className="BtnChoseFile"
//               onChange={escolherImg}
//             />
//           </button>
//         </div>
//       </div>

//       <hr className="linha" />

//       <td className="ContainerTwo">
//         <div className="ContainerArquivos">
//           <div className="itensTable">
//             <p>imagem</p>
//             <div className="BtnGrupo">
//               <button>Excluir</button>
//               <button>Cortar</button>
//               <button>Frase</button>
//             </div>
//           </div>
//         </div>
//       </td>

//       <button
//         className="BtnChoseFile"
//         onClick={uparImg}
//       >Enviar</button>
      

//       <Footer id="rodape"/>
//     </div>
//   )
// }
// export default UploadImagem;
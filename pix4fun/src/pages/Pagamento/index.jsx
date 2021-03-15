import "./index.css";
import React, { useState } from "react";


export default function Pagamento() {

  const [images, setImages] = useState([]);
    
    const onFileChange = (files) => {
      setImages(f => [...f, ...files]);
    };
    
    const handleClick = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            // 'images' name of the formData values must match the action method param on your controller
            formData.append(`images`, images[i]);   
        }
        
        // Make sure you api is running on the same endpoint or you need to set up CORS
        fetch('http://localhost:5000/api/Upload', {
            body: formData,
            method: "POST" // Make sure you add the method POST to your request when API is only accepting POST
        }).then(res => console.log(res));
    };
    
    return (
        <form>
            <input type="file" multiple={true} onChange={onFileChange} />
            <button onClick={handleClick}>Upload</button>
        </form>
    )
};


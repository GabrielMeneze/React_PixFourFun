const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3006;

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

//middleware    
app.use(bodyParser.urlencoded({ extended: false }))

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-7350916820655330-121001-8c949b85ceccc996ae9edfac9688d20d-238845500'
  });

  

// routes
app.post('/checkout', (req, res) => {

    let preference = {
        items: [
          {
            title: req.body.title,
            unit_price: parseInt(req.body.price),
            quantity: 1,
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){

        console.log(response.body);
        res.redirect(response.body.init_point)

      }).catch(function(error){
        console.log(error);
      });

});


app.listen(PORT, () => console.log('listening on port' + PORT));



const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const { calcularPrecoPrazo } = require("correios-brasil");
const PORT = 3002;
app.get('/', (req, res) => {

  const {calcular} = req.query

  const Calcular = {
    // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
    sCepOrigem: "06540040",
    sCepDestino:  calcular,
    nVlPeso: "1",
    nCdFormato: "1",
    nVlComprimento: "20",
    nVlAltura: "20",
    nVlLargura: "20",
    nCdServico: ["04014", '04510'], //Array com os códigos de serviço
    nVlDiametro: "0",
  };


  calcularPrecoPrazo(Calcular)
    .then((result) => {
      res.json({ message: "sucess", result })
    })
    .catch((error) => {
      res.json({ message: "error", error })
    })
})
app.listen(PORT, () => console.log('listening on port' + PORT))
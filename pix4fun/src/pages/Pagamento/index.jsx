import react from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { req, res, response, doSubmit } from "mercadopago";

export default function Pagamento() {
  // SDK de Mercado Pago
  const mercadopago = require("mercadopago");

  // Configura credenciais
  mercadopago.configure({
    access_token: "PROD_ACCESS_TOKEN",
  });

  // Cria um objeto de preferência
  let preference = {
    items: [
      {
        title: "Pack 1",
        unit_price: 18.99,
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // Este valor substituirá a string "<%= global.id %>" no seu HTML
      global.id = response.body.id;
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <Header />
      <form action="/process_payment" method="post" id="paymentForm">
        <h3>Detalhe do comprador</h3>
        <div>
          <div>
            <label for="email">E-mail</label>
            <input id="email" name="email" type="text" value="test@test.com" />
          </div>
          <div>
            <label for="docType">Tipo de documento</label>
            <select
              id="docType"
              name="docType"
              data-checkout="docType"
              type="text"
            ></select>
          </div>
          <div>
            <label for="docNumber">Número do documento</label>
            <input
              id="docNumber"
              name="docNumber"
              data-checkout="docNumber"
              type="text"
            />
          </div>
        </div>
        <h3>Detalhes do cartão</h3>
        <div>
          <div>
            <label for="cardholderName">Titular do cartão</label>
            <input
              id="cardholderName"
              data-checkout="cardholderName"
              type="text"
            />
          </div>
          <div>
            <label for="">Data de vencimento</label>
            <div>
              <input
                type="text"
                placeholder="MM"
                id="cardExpirationMonth"
                data-checkout="cardExpirationMonth"
                onselectstart="return false"
                onpaste="return false"
                oncopy="return false"
                oncut="return false"
                ondrag="return false"
                ondrop="return false"
                autocomplete="off"
              />
              <span class="date-separator">/</span>
              <input
                type="text"
                placeholder="YY"
                id="cardExpirationYear"
                data-checkout="cardExpirationYear"
                onselectstart="return false"
                onpaste="return false"
                oncopy="return false"
                oncut="return false"
                ondrag="return false"
                ondrop="return false"
                autocomplete="off"
              />
            </div>
          </div>
          <div>
            <label for="cardNumber">Número do cartão</label>
            <input
              type="text"
              id="cardNumber"
              data-checkout="cardNumber"
              onselectstart="return false"
              onpaste="return false"
              oncopy="return false"
              oncut="return false"
              ondrag="return false"
              ondrop="return false"
              autocomplete="off"
            />
          </div>
          <div>
            <label for="securityCode">Código de segurança</label>
            <input
              id="securityCode"
              data-checkout="securityCode"
              type="text"
              onselectstart="return false"
              onpaste="return false"
              oncopy="return false"
              oncut="return false"
              ondrag="return false"
              ondrop="return false"
              autocomplete="off"
            />
          </div>
          <div id="issuerInput">
            <label for="issuer">Banco emissor</label>
            <select id="issuer" name="issuer" data-checkout="issuer"></select>
          </div>
          <div>
            <label for="installments">Parcelas</label>
            <select type="text" id="installments" name="installments"></select>
          </div>
          <div>
            <input
              type="hidden"
              name="transactionAmount"
              id="transactionAmount"
              value="100"
            />
            <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
            <input type="hidden" name="description" id="description" />
            <br />
            <button type="submit">Pagar</button>
            <br />
          </div>
        </div>
      </form>
      <script
        src="https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js"
        data-preference-id="<%= global.id %>"
      ></script>

      <Footer />
    </div>
  );
}

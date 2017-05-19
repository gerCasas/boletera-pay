import Component from 'inferno-component';
import { linkEvent } from 'inferno';
// import OpenPay from 'openpay';
import './CreditCartInfo.css';
import ApiServicePay from '../../utils/ApiServicePay';

function handleClick(obj) {
  // console.log(obj.openpay_instance);
  // console.log(obj.device_id);
  // console.log(window.Openpay);

  obj.openpay_instance.setId('mwhtkgq2w0ml9ianvfe0');
  obj.openpay_instance.setApiKey('pk_bfe456b162c8400bb2819793c2d540d9');
  obj.openpay_instance.setSandboxMode(true);
  var deviceDataId = obj.openpay_instance.deviceData.setup("openpayForm", "deviceIdField");

  obj.openpay_instance.token.extractFormAndCreate('payment-form', sucess_callbak, error_callbak);

  function sucess_callbak(response) {
    console.log("SUCCESS RESPONSE");
    var token_id = response.data.id;
    console.log(token_id, "TOOOKEN");
    console.log(deviceDataId, "DEVICEEEE");

    ApiServicePay.ChargeOpenPay("card", token_id, deviceDataId, 10)
    .then(
      res => {
        console.log(res, "RESPUESTA");
      },
      error => {
      }
    );
  }

  function error_callbak(response) {
    var desc = response.data.description != undefined ? response.data.description : response.message;
    console.log("ERROR [" + response.status + "] " + desc);
    // alert("ERROR [" + response.status + "] " + desc);
  }
}


class CreditCartInfo extends Component {

  deviceDataId;

  // componentDidMount() {
  //   // OpenPay.setId('mzdtln0bmtms6o3kck8f');
  //   // OpenPay.setApiKey('pk_f0660ad5a39f4912872e24a7a660370c');
  //   // var deviceSessionId = OpenPay.deviceData.setup("payment-form", "deviceIdHiddenFieldName");
  //
  //
  //   // let s = document.createElement('script');
  //   // s.type = 'text/javascript';
  //   // s.async = true;
  //   // // s.src = "https://openpay.s3.amazonaws.com/openpay.v1.js"
  //   // // s.innerHTML = 'alert(\'Test\')';
  //   // s.innerHTML = ' OpenPay.setId(\'mwhtkgq2w0ml9ianvfe0\'); OpenPay.setApiKey(\'pk_bfe456b162c8400bb2819793c2d540d9\'); OpenPay.setSandboxMode(true); var deviceDataId = OpenPay.deviceData.setup(\'openpayForm\', \'deviceIdField\'); console.log(deviceDataId); ';
  //   // console.log(s);
  //   // document.body.appendChild(s);
  //
  //
  //
  //
  //   // console.log(this);
  //   // console.log(window.OpenPay);
  //
  //   // window.OpenPay.setId('mwhtkgq2w0ml9ianvfe0');
  //   // window.OpenPay.setApiKey('pk_bfe456b162c8400bb2819793c2d540d9');
  //   // window.OpenPay.setSandboxMode(true);
  //   // this.deviceDataId = window.OpenPay.deviceData.setup("openpayForm", "deviceIdField");
  //   // console.log(this.deviceDataId);
  //
  // }

  render(props, state) {

    return (
      <div>

        <div className="bkng-tb-cntnt">
          <div className="pymnts">
            <form action="#" method="POST" id="payment-form">
              <input type="hidden" name="token_id" id="token_id"/>
              <div className="pymnt-itm card active">
                <h2>Tarjeta de crédito o débito</h2>
                <div className="pymnt-cntnt">
                  <div className="card-expl">
                    <div className="credit"><h4>Tarjetas de crédito</h4></div>
                    <div className="debit"><h4>Tarjetas de débito</h4></div>
                  </div>
                  <div className="sctn-row">
                    <div className="sctn-col l">
                      <label>Nombre del titular</label><input type="text" placeholder="Como aparece en la tarjeta" autocomplete="off" data-openpay-card="holder_name"/>
                    </div>
                    <div className="sctn-col">
                      <label>Número de tarjeta</label><input type="text" autocomplete="off" data-openpay-card="card_number"/></div>
                    </div>
                    <div className="sctn-row">
                      <div className="sctn-col l">
                        <label>Fecha de expiración</label>
                        <div className="sctn-col half l"><input type="text" placeholder="Mes" data-openpay-card="expiration_month"/></div>
                        <div className="sctn-col half l"><input type="text" placeholder="Año" data-openpay-card="expiration_year"/></div>
                      </div>
                      <div className="sctn-col cvv"><label>Código de seguridad</label>
                        <div className="sctn-col half l"><input type="text" placeholder="3 dígitos" autocomplete="off" data-openpay-card="cvv2"/></div>
                      </div>
                    </div>
                    <div className="openpay"><div className="logo">Transacciones realizadas vía:</div>
                    <div className="shield">Tus pagos se realizan de forma segura con encriptación de 256 bits</div>
                  </div>
                  <div className="sctn-row">
                    <a className="button rght" id="pay-button" onClick={ linkEvent({props: props, instance: this, openpay_instance: window.OpenPay }, handleClick) }>Pagar</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default CreditCartInfo;

import ApiServicePay from '../../utils/ApiServicePay';
import Component from 'inferno-component';
import { linkEvent } from 'inferno';
import './CardView.css';

function handleClick(obj) {

  console.log("EVEEENTSS");

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
    console.log("^^^^^^^");
    console.log(response.status);
    console.log("^^^^^^^");

    switch (response.status) {
      case 400:

      break;

      default:
      break;
    }

    obj.instance.setState({
      alert_message: response.data.description
    });
  }
}

class CardView extends Component {

  constructor() {
    super();
    this.state = {
      alert_message: ''
    };
  }

  render(props, state) {

    var myAlertContent;
    if (state.alert_message != '') myAlertContent = <div id="alert-options" className="alert alert-danger no-margin-bottom" role="alert">{state.alert_message}</div>

    return (
     <div>

      {myAlertContent}

      <div className="container-fluid">
        <div className="row">
          <div className="custom-columns-cards-1">
            <div className="credit-card-view card-expl-card-view-custom-position">
              <h4>Tarjetas de crédito</h4>
            </div>
          </div>

          <div className="custom-columns-cards-2">
            <div className="debit-card-view card-expl-card-view-custom-position">
              <h4>Tarjetas de débito</h4>
            </div>
            <div className="debit-card-view-2 card-expl-custom-border"/>
          </div>
        </div>
      </div>

      <div className="tab-content max-width-80">
        <div id="stripe" className="tab-pane fade in active">

          <form accept-charset="UTF-8" action="/" className="require-validation" data-cc-on-file="false" data-stripe-publishable-key="pk_bQQaTxnaZlzv4FnnuZ28LFHccVSaj" id="payment-form" method="post">
            <div>
              <input name="utf8" type="hidden" value="✓" />
              <input name="_method" type="hidden" value="PUT" />
              <input name="authenticity_token" type="hidden" value="qLZ9cScer7ZxqulsUWazw4x3cSEzv899SP/7ThPCOV8=" />
            </div>

            <div className="form-row">
              <div className="form-group required">
                <div className="error form-group hide">
                  <div className="alert-danger alert">
                    Please correct the errors and try again.
                  </div>
                </div>

                <label className="control-label no-bold">Nombre del titular</label>
                <input className="form-control" size="4" type="text" data-openpay-card="holder_name"/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group card required">
                <label className="control-label no-bold">Número de la tarjeta</label>
                <input autocomplete="off" className="form-control card-number" size="20" type="text" data-openpay-card="card_number"/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group cvc required">
                <div className="col-xs-4 no-padding-left">
                  <label className="control-label no-bold">CVC</label>
                  <input autocomplete="off" className="form-control card-cvc" placeholder="ex. 311" size="4" type="text" data-openpay-card="cvv2"/>
                </div>
              </div>
            </div>

            <div className="form-group expiration required">
              <div className="col-xs-4">
                <label className="control-label no-bold">Mes</label>
                <input className="form-control card-expiry-month" placeholder="MM" size="2" type="text" data-openpay-card="expiration_month"/>
              </div>
            </div>

            <div className="form-group expiration required">
              <div className="col-xs-4 no-padding-right">
                <label className="control-label no-bold">Año</label>
                <input className="form-control card-expiry-year" placeholder="YYYY" size="4" type="text" data-openpay-card="expiration_year"/>
              </div>
            </div>

          </form>

          <button className="btn btn-primary button-icon-white paypal-btn-cstm" onClick={ linkEvent({props: props, instance: this, openpay_instance: window.OpenPay }, handleClick) }> Continuar <i className="fa-cog fa fa-credit-card" aria-hidden="true"></i></button>

        </div>
      </div>
     </div>
   );
  }
}

export default CardView;

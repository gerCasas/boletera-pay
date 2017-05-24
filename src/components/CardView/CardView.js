import ApiServicePay from '../../utils/ApiServicePay';
import Component from 'inferno-component';
import { connect } from 'inferno-mobx';
import './CardView.css';


const CardView = connect (['chargeParams'],
class CardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      holder_name_value:'',
      card_number_value:'',
      cvv2_value:'',
      expiration_month_value:'',
      expiration_year_value:'',
      alert_message: '',
      buy_button_state: '',
      buy_button_icon: 'fa fa-credit-card'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {

    if (this.props.chargeParams.amount === '0' || this.props.chargeParams.amount === '' || this.props.chargeParams.amount === undefined ) {

      this.setState({
        alert_message: 'El saldo a pagar tiene que se mayor a cero.',
      });
      event.preventDefault();
      return
    }

    let instance = this;
    this.setState({
      buy_button_state: '1',
      buy_button_icon: 'fa fa-circle-o-notch fa-spin'
    });
    // console.log("EVEEENTSS");

    window.OpenPay.setId('mwhtkgq2w0ml9ianvfe0');
    window.OpenPay.setApiKey('pk_bfe456b162c8400bb2819793c2d540d9');
    window.OpenPay.setSandboxMode(true);
    var deviceDataId = window.OpenPay.deviceData.setup("openpayForm", "deviceIdField");

    window.OpenPay.token.extractFormAndCreate('payment-form', sucess_callbak, error_callbak);

    function sucess_callbak(response) {
      // console.log("SUCCESS RESPONSE");
      // console.log(instance ,"SUCCESS RESPONSE");
      var token_id = response.data.id;
      // console.log(token_id, "TOOOKEN");
      // console.log(deviceDataId, "DEVICEEEE");

      ApiServicePay.ChargeOpenPay("card", token_id, deviceDataId, instance.props.chargeParams.amount)
      .then(
        res => {
          console.log(res, "RESPUESTA");
        },
        error => {
          instance.setState({
            alert_message: 'Ocurrio un problema al procesar el pago.',
            buy_button_state: '',
            buy_button_icon: 'fa fa-credit-card'
          });
        }
      );
    }

    function error_callbak(response) {
      var desc = response.data.description != undefined ? response.data.description : response.message;
      // console.log("ERROR [" + response.status + "] " + desc);
      // console.log("^^^^^^^");
      // console.log(response);
      // console.log("^^^^^^^");

      // console.log(instance);
      let mesageError = '';
      // let mesageErrorArray = [];
      // switch (response.status) {
      //   case 400:
      //     if (instance.state.holder_name_value == '') mesageErrorArray.push("es requerido el nombre del titular");
      //     if (instance.state.card_number_value == '') mesageErrorArray.push("es requerido el número de la tarjeta");
      //     if (instance.state.cvv2_value == '') mesageErrorArray.push("es requerido el CVC");
      //     if (instance.state.expiration_month_value == '') mesageErrorArray.push("es requerido el mes");
      //     if (instance.state.expiration_year_value == '') mesageErrorArray.push("es requerido el año");
      //
      //     let i = 0;
      //     let coma = '';
      //     for (i = 0; i < mesageErrorArray.length; i++) {
      //       coma = ((i+1) < mesageErrorArray.length) ? ", " : ".";
      //       mesageError += mesageErrorArray[i] + coma;
      //     }
      //
      //   break;
      //
      //   default:
      //   break;
      // }

      mesageError = response.data.description

      instance.setState({
        alert_message: mesageError,
        buy_button_state: '',
        buy_button_icon: 'fa fa-credit-card'
      });
    }

    event.preventDefault();
  }

  render(props, state) {

    //TODO: Alerta en view paypal similar a esta, la alerta se podria hacer component
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

          <form onSubmit={this.handleSubmit} accept-charset="UTF-8" action="/" className="require-validation" data-cc-on-file="false" data-stripe-publishable-key="pk_bQQaTxnaZlzv4FnnuZ28LFHccVSaj" id="payment-form" method="post">
            <div>
              <input name="utf8" type="hidden" value="✓" />
              <input name="_method" type="hidden" value="PUT" />
              <input name="authenticity_token" type="hidden" value="qLZ9cScer7ZxqulsUWazw4x3cSEzv899SP/7ThPCOV8=" />
            </div>

            <div className="form-row">
              <div className="form-group required">
                <label className="control-label no-bold">Nombre del titular</label>
                <input name="holder_name_value" value={this.state.holder_name_value} onInput={this.handleChange} className="form-control" size="4" type="text" data-openpay-card="holder_name"/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group card required">
                <label className="control-label no-bold">Número de la tarjeta</label>
                <input name="card_number_value" value={this.state.card_number_value} onInput={this.handleChange} autocomplete="off" className="form-control card-number" size="20" type="text" data-openpay-card="card_number"/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group cvc required">
                <div className="col-xs-4 no-padding-left">
                  <label className="control-label no-bold">CVC</label>
                  <input name="cvv2_value" value={this.state.cvv2_value} onInput={this.handleChange} autocomplete="off" className="form-control card-cvc" placeholder="ex. 311" size="4" type="text" data-openpay-card="cvv2"/>
                </div>
              </div>
            </div>

            <div className="form-group expiration required">
              <div className="col-xs-4">
                <label className="control-label no-bold">Mes</label>
                <input name="expiration_month_value" value={this.state.expiration_month_value} onInput={this.handleChange} className="form-control card-expiry-month" placeholder="MM" size="2" type="text" data-openpay-card="expiration_month"/>
              </div>
            </div>

            <div className="form-group expiration required">
              <div className="col-xs-4 no-padding-right">
                <label className="control-label no-bold">Año</label>
                <input name="expiration_year_value" value={this.state.expiration_year_value} onInput={this.handleChange} className="form-control card-expiry-year" placeholder="YYYY" size="4" type="text" data-openpay-card="expiration_year"/>
              </div>
            </div>

            <button data-loading-text="Sending..." disabled={this.state.buy_button_state} className="btn btn-primary button-icon-white paypal-btn-cstm" type="submit" value="Submit" autocomplete="off" > Continuar <i className={this.state.buy_button_icon} aria-hidden="true"></i>
            </button>

          </form>

        </div>
      </div>
     </div>
   );
  }
})

export default CardView;

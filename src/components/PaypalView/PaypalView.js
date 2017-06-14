import { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../.././utils/ApiServicePay';
import { connect } from 'inferno-mobx';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import './PaypalView.css';

function handleClick(obj) {

  // console.log(obj, "propsss");

  // console.log(props.amount, "AMOUNT");
  if (obj.props.amount === '' || obj.props.amount === '0' || obj.props.token === '' || obj.props.amount === undefined || obj.props.token === undefined) {
    // console.log("RETURN");
    // console.log(props);

    obj.instance.setState({
      alert_message: 'El saldo a pagar tiene que se mayor a cero.'
    });

  } else {
    // console.log("si");
    // console.log(props);
    ApiService.sendPay("paypal", obj.props.token, obj.props.amount)
    .then(
      res => {
        if (res !== '#my404') {
          //success
          // console.log(res);
          window.location = res.approval_url
        } else {
          // 404
        }
      },
        error => {
      }
    );
  }
}

const PaypalView = connect (['chargeParams'],
class PaypalView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alert_message: ''
    }
  }

  render(props, state) {

    let myAlertContent;
    if (state.alert_message != '') myAlertContent = <ErrorAlert description={state.alert_message}/>

    return (
     <div>

      {myAlertContent}

      <div className="paypal-logo-container">
        <div className="paypal-logo" />
      </div>

      <button className="btn btn-warning paypal-btn-cstm" onClick={ linkEvent({props: this.props.chargeParams, instance: this}, handleClick) } >Continuar con Paypal <i className="fa fa-paypal fa-cog" aria-hidden="true"></i></button>
     </div>
    )
  };
})

export default PaypalView;

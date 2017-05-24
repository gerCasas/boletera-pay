import { linkEvent } from 'inferno';
import Component from 'inferno-component';
import ApiService from '../.././utils/ApiServicePay';
import { connect } from 'inferno-mobx';
import './PaypalView.css';

function handleClick(props) {

  console.log(props, "propsss");

  // console.log(props.amount, "AMOUNT");
  if (props.amount === '' || props.amount === '0' || props.token === '' || props.amount === undefined || props.token === undefined) {
    // console.log("RETURN");
    // console.log(props);
  } else {
    // console.log("si");
    // console.log(props);
    ApiService.sendPay("paypal", props.token, props.amount)
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

  render(props, state) {

    console.log(this.props.chargeParams);

    return (
     <div>
      <div className="paypal-logo-container">
        <div className="paypal-logo" />
      </div>

      <button className="btn btn-warning paypal-btn-cstm" onClick={ linkEvent(this.props.chargeParams, handleClick) } >Continuar con Paypal <i className="fa fa-paypal fa-cog" aria-hidden="true"></i></button>
     </div>
    )
  };
})

export default PaypalView;

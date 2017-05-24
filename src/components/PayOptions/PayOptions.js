import {linkEvent} from 'inferno';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import './PayOptions.css';
import { connect } from 'inferno-mobx';
// import ApiService from '../.././utils/ApiServicePay';

// function handleClick(props) {
//
//   // console.log(props.amount, "AMOUNT");
//   if (props.amount === '' || props.amount === '0' || props.token === '' || props.amount === undefined || props.token === undefined) {
//     // console.log("RETURN");
//     // console.log(props);
//   } else {
//     // console.log("si");
//     // console.log(props);
//     ApiService.sendPay("paypal", props.token, props.amount)
//     .then(
//       res => {
//         if (res !== '#my404') {
//           //success
//           // console.log(res);
//           window.location = res.approval_url
//         } else {
//           // 404
//         }
//       },
//         error => {
//       }
//     );
//   }
// }

function changeActive(props) {
  props.instance.setState({
     activeButtonClassName: props.optionsSelected
  });
}

const PayOptions = connect (['chargeParams'],
class PayOptions extends Component {

  constructor() {
    super();
    this.state = {
      activeButtonClassName: ''
    };
  }

  render(props, state) {

    return (
      <div>

        <div className="sidebar-offcanvas text-align-center" id="sidebar">
          <div className="list-group">

            <Link to={"/paypal-opcion/"}>
              <a href="#" className={state.activeButtonClassName==='paypal' ? 'list-group-item active': 'list-group-item'} onClick={linkEvent({optionsSelected: "paypal", instance: this}, changeActive)}>Pagar con Paypal</a>
            </Link>

            <Link to={"/tarjeta-opcion/"}>
              <a href="#" className={state.activeButtonClassName==='openpay' ? 'list-group-item active': 'list-group-item'} onClick={linkEvent({optionsSelected: "openpay", instance: this}, changeActive)}>Pagar con Tarjeta</a>
            </Link>
          </div>

          <div className="jumbotron jumbotron-flat">
            <div className="center">
              <h4>SALDO A PAGAR:</h4>
            </div>
            <div className="paymentAmt">{`$`+props.chargeParams.amount}</div>
            <div className="center">
              <h4>Concepto:</h4>
              <h4>{props.chargeParams.description}</h4>
            </div>
          </div>
        </div>

      </div>
    );
  }
})

export default PayOptions;

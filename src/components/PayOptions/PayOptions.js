import { linkEvent } from 'inferno';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import './PayOptions.css';
import ApiService from '../.././utils/ApiServicePay';

function handleClick(props) {

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


class PayOptions extends Component {
  render(props, state) {

    return (
      <div>

        <div className="col-xs-12 col-sm-3 sidebar-offcanvas" id="sidebar">
          <div className="list-group">
            <a href="#" className="list-group-item active">Pagar con Paypal</a>
            <a href="#" className="list-group-item">Pagar con Tarjeta</a>
          </div>
        </div>

        <div>
          <button type="button" className="btn btn-primary" onClick={ linkEvent(props, handleClick) }>Pagar con Paypal  <i className="fa fa-paypal" aria-hidden="true"></i></button>
        </div>
        <div>
          <Link to={'/openpay/'+ props.token +'/'+ props.amount +'/'+ props.description}>
            <button type="button" className="btn btn-warning margin-top-10" onClick={ linkEvent(props, handleClick) }>Pagar con Tarjeta  <i className="fa fa-credit-card" aria-hidden="true"></i></button>
          </Link>
        </div>
      </div>
    );
  }
}

export default PayOptions;

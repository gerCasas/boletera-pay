import './PaypalView.css';

const PaypalView = function(props) {
  return (
   <div>
     <button className="btn btn-warning paypal-btn-cstm">Continuar con Paypal <i className="fa fa-paypal fa-cog" aria-hidden="true"></i></button>
   </div>
  )
}

export default PaypalView;

import './CardView.css';

const CardView = function(props) {
  return (
   <div>


    <div className="tab-content max-width-80">
      <div id="stripe" className="tab-pane fade in active">

        <form accept-charset="UTF-8" action="/" className="require-validation" data-cc-on-file="false" data-stripe-publishable-key="pk_bQQaTxnaZlzv4FnnuZ28LFHccVSaj" id="payment-form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="✓" /><input name="_method" type="hidden" value="PUT" /><input name="authenticity_token" type="hidden" value="qLZ9cScer7ZxqulsUWazw4x3cSEzv899SP/7ThPCOV8=" /></div>

          <div className="form-row">
            <div className="form-group required">
              <div className="error form-group hide">
                <div className="alert-danger alert">
                  Please correct the errors and try again.
                </div>
              </div>

              <label className="control-label no-bold">Nombre del titular</label>
              <input className="form-control" size="4" type="text"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group card required">
              <label className="control-label no-bold">Número de la tarjeta</label>
              <input autocomplete="off" className="form-control card-number" size="20" type="text"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group cvc required">
              <label className="control-label no-bold">CVC</label>
              <input autocomplete="off" className="form-control card-cvc" placeholder="ex. 311" size="4" type="text"/>
            </div>
          </div>

          <div className="form-group expiration required">
            <label className="control-label no-bold">Expiration</label>
            <input className="form-control card-expiry-month" placeholder="MM" size="2" type="text"/>
          </div>

          <div className="form-group expiration required">
            <label className="control-label no-bold">Year</label>
            <input className="form-control card-expiry-year" placeholder="YYYY" size="4" type="text"/>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="control-label no-bold"></label>
              <button className="form-control btn btn-primary button-icon-white paypal-btn-cstm" type="submit"> Continuar <i className="fa-cog fa fa-credit-card" aria-hidden="true"></i></button>
            </div>
          </div>

        </form>

      </div>
    </div>
   </div>
  )
}

export default CardView;

import Component from 'inferno-component';
import './DescriptionView.css';

class DescriptionView extends Component {

  render(props, state) {

    return (
      <div>

        <div className="container">
          <div className="row color-description">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
              <h3 className="color-description">Descripción</h3>
              <p className="description-view-concept">{props.description}</p>
              <h3 className="color-description">Cantidad a Pagar</h3>
              <p className="description-view-concept">{props.amount}</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default DescriptionView;

import Component from 'inferno-component';
import './Header.css';

class Header extends Component {
  render(props, state) {

    return (
      <div>

        <div className="page-header App-header">
          <h1><small>Selecciona el método de pago</small></h1>
        </div>

      </div>
    );
  }
}

export default Header;

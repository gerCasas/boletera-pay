import Component from 'inferno-component';
import './App.css';
import logo from "../public/favicon.ico"

class App extends Component {

  render({children}, state) {

    return (
      <div className="App">

        <nav className="navbar navbar-default navbar-fixed-top ">
          <div className="container">
            <div className="navbar-header">

              <a className="navbar-brand" href="#">
                <img alt="Brand" src={logo}></img>
              </a>
              <p className="navbar-text">Boletera Pay</p>
            </div>
          </div>
        </nav>

        {
          children
        }

      </div>
    );
  }
}

export default App;

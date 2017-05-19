import Component from 'inferno-component';
import './App.css';
import logo from "../public/favicon.ico"
import PayOptions from "./components/PayOptions/PayOptions"
// import Header from "./components/Header/Header"

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

        <div className="margin-top-60">
          <div className="container">
            <div className="row ">
              <div className="col-xs-12 col-md-4">
                <PayOptions />
              </div>
              <div className="col-xs-12 col-md-7 col-md-offset-1 border-custom">
                {
                  children
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;

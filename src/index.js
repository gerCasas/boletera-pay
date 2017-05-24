import { render } from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import { Provider } from 'inferno-mobx'
import { observable } from 'mobx'
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';
import ErrorRequestPage from './components/ErrorRequestPage/ErrorRequestPage';
import PaypalView from './components/PaypalView/PaypalView';
import CardView from './components/CardView/CardView';
import redirectLink from './components/redirectLink/redirectLink';
// import PayOptions from './components/PayOptions/PayOptions';
import Home from './components/Home/Home';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

let chargeParams = observable({ token:'', amount: '', description: '' })

const browserHistory = createBrowserHistory();
const routes = (
  <Provider chargeParams={ chargeParams }>
    <Router history={ browserHistory }>
      <Route component={ App }>
        <IndexRoute component={ Home }/>

        <Route path="/:token/:amount/:description" component={ redirectLink }/>
        <Route path="/paypal-opcion/" component={ PaypalView }/>
        <Route path="/tarjeta-opcion/" component={ CardView }/>

        <Route path="*" component={ ErrorRequestPage }/>
      </Route>
    </Router>
  </Provider>
);

render(routes , document.getElementById('app'));

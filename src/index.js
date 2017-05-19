import { render } from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import { Provider } from 'inferno-mobx'
import { observable } from 'mobx'
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';
import ErrorRequestPage from './components/ErrorRequestPage/ErrorRequestPage';
import CreditCartInfo from './components/CreditCartInfo/CreditCartInfo';
// import PayOptions from './components/PayOptions/PayOptions';
import Home from './components/Home/Home';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

let myStoreValues = observable({ description: '', amount: '' })

const browserHistory = createBrowserHistory();

const routes = (
  <Provider myStoreValues={ myStoreValues }>
    <Router history={ browserHistory }>
      <Route component={ App }>
        <IndexRoute component={ Home }/>

        <Route path="/:token/:amount/:description" component={ Home }/>
        <Route path="/openpay/:token/:amount/:description" component={ CreditCartInfo }/>

        <Route path="*" component={ ErrorRequestPage }/>
      </Route>
    </Router>
  </Provider>
);

render(routes , document.getElementById('app'));

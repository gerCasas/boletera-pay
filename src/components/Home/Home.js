import PayOptions from '../PayOptions/PayOptions';
import Header from '../Header/Header';
import DescriptionView from '../DescriptionView/DescriptionView';
import './Home.css';

const Home = function(props) {
  return (
   <div>
      <Header />
      <div className="container">
        <div className="row ">
        
          <PayOptions amount={props.params.amount} token={props.params.token} description={props.params.description} />
        </div>
       </div>
   </div>
  )
}

export default Home;

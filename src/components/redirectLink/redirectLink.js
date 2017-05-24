import Component from 'inferno-component';
import { connect } from 'inferno-mobx';

const redirectLink = connect (['chargeParams'],
class redirectLink extends Component {

  componentDidMount() {
    this.props.chargeParams.token = this.props.params.token;
    this.props.chargeParams.amount = this.props.params.amount;
    this.props.chargeParams.description = this.props.params.description;
    this.context.router.push("/")
  }

})

export default redirectLink;


const ErrorAlert = function(props) {
  return (
   <div>
     <div id="alert-options" className="alert alert-danger no-margin-bottom" role="alert">{props.description}</div>
   </div>
  )
}

export default ErrorAlert;

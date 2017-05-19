// const API = 'http://localhost:4000/pay/';
// const API = 'http://localhost:4001/pay/';
const API = 'http://localhost:4000/';

function sendPay(pay_method, token, amount) {
  return fetch(`${API}${pay_method}/${token}/${amount}`)
    .then(_verifyResponse, _handleError);
}

function ChargeOpenPay(pay_method, token, device_session_id, amount) {
  return fetch(`${API}/charge/${pay_method}/${token}/${device_session_id}/${amount}`)
    .then(_verifyResponse, _handleError);
}

// Verify that the fetched response is JSON
function _verifyResponse(res) {
  let contentType = res.headers.get('content-type');

  if (res.status === 404 || res.status === 400) {
    return '#my404';
  }

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json();
  } else {
    _handleError({ message: 'Response was not JSON'});
  }
}

// Handle fetch errors
function _handleError(error) {
  console.error('An error occurrde:', error);
  throw error;
}

// Export ApiServicePay
const ApiServicePay = { sendPay, ChargeOpenPay };
export default ApiServicePay;

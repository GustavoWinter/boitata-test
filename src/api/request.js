const URI = 'https://www.mocky.io/v2/'

const unauthRequest = ({ path, body, method, handleResponse, handleError }) =>
  fetch(`${URI}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(handleResponse)
  .catch(handleError)


// If the request should have auth, call the proper method
export default ({ auth = false, path, body, method = 'GET', handleError, handleResponse }) =>{
  return unauthRequest({ path, body, method, handleResponse, handleError })
  // return auth
  //   ? authRequest({ path, body, method })
  //   : unauthRequest({ path, body, method })
}

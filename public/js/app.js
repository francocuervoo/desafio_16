// Enviar nombre de usuario

const enviar = e => {

  e.preventDefault();

  const usuario = document.getElementById('nombre').value;

  sessionStorage.setItem("userName", usuario)

  axios.post('/login', {
    nombre: usuario
  })
  .then( res => {

    // Al usar Axios el redireccionamiento debe hacerse del lado del cliente
    // según la respuesta recibida del servidor => res.data.login == 'ok'

    if (res.data.login == 'ok') {
      window.location = '/products'
    } else {
      window.location = '/login'
    }
  })
  .catch( error => {
    console.log (error);
    window.location = '/login'
  })
}
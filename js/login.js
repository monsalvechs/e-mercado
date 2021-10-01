//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
  
  function validarFormulario(evento) {
    evento.preventDefault();
    var email = document.getElementById('inputEmail').value;
    if(email.length == 0) {
      alert('No has escrito nada en correo');
      return;
    }
    var password = document.getElementById('inputPassword').value;
    if (password.length < 6) {
      alert('La clave no es válida');
      return;
    }
    
    localStorage.setItem('User-Logged', JSON.stringify({email: inputEmail.value}));

    this.submit();
  }
  
/*var element = document.getElementsById('containerp-5-1'){
}*/

/*var intro = document.getElementById('intro');
intro.style*/
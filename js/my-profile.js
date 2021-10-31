//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function saveDatos(evento) {


    evento.preventDefault();
 
    localStorage.setItem('User-Datos', JSON.stringify({name: txtNombre.value, Apellido: txtApellido.value, Edad: txtEdad.value, Mail: txtMail.value, Contact: txtNumero.value}));

    this.submit();

}
function showdatos() {
    let userData = localStorage.getItem('User-Datos');

    let printProfile = document.getElementById("txtNombre");

    let printProfile2 = document.getElementById("txtApellidouno");

    let printProfile3 = document.getElementById("txtEdaduno");

    let printProfile4 = document.getElementById("txtMailuno");

    let printProfile5 = document.getElementById("txtNumerouno");



    userData = JSON.parse(userData);

    printProfile.innerHTML = printProfile.innerHTML + '' + userData.name;

    printProfile2.innerHTML = printProfile.innerHTML + ' Apellido: ' + userData.Apellido;

    printProfile3.innerHTML = printProfile.innerHTML + ' Edad: ' + userData.Edad;

    printProfile4.innerHTML = printProfile.innerHTML + ' Correo:' + userData.Mail;

    printProfile5.innerHTML = printProfile.innerHTML + ' Contacto: ' + userData.Contact;





}
function previewFile() {
    let preview = document.getElementById('foto');
    let file = document.getElementById('inputFile').files[0];

    let reader = new FileReader();

    reader.onload = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }

}

function guardar() {
    let preview = document.getElementById('foto');

    localStorage.setItem('laimagen', JSON.stringify(preview.src));
    alert("Imagen Guardada")


}

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("formularioDos").addEventListener('submit', saveDatos);

    showdatos();

}, () => {
    let preview = document.getElementById('foto');
    let laImagen = JSON.parse(localStorage.getItem('laImagen'));

    if (laImagen != null) {
        preview.src = laImagen;
    }
});
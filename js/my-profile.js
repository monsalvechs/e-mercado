//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



function saveDatos(evento) {

    evento.preventDefault();

    localStorage.setItem('User-Datos', JSON.stringify({ Nombre: txtNombre.value, Apellido: txtApellido.value, Edad: txtEdad.value, Mail: txtMail.value, Contact: txtNumero.value }));

    this.submit();

}

function showdatos() {
    let userData = localStorage.getItem('User-Datos');

    let printProfile = document.getElementById("txtNombre");

    let printProfile2 = document.getElementById("txtApellido");

    let printProfile3 = document.getElementById("txtEdad");

    let printProfile4 = document.getElementById("txtMail");

    let printProfile5 = document.getElementById("txtNumero");





    if (userData) {
        userData = JSON.parse(userData);

        printProfile.innerHTML = printProfile.innerHTML+ '' + userData.Nombre;
        printProfile2.innerHTML = printProfile.innerHTML + '' + userData.Apellido;
        printProfile3.innerText = printProfile.innerText + '' + userData.Edad;
        printProfile4.innerText = printProfile.innerText + '' + userData.Mail;
        printProfile5.innerText = printProfile.innerText + '' + userData.Contact;
        
    }

    console.log(printProfile, printProfile2,printProfile3,printProfile4,printProfile5);

}

function previewFile(){
    let preview = document.getElementById('foto');
    let file = document.getElementById('inputFile').files[0];

    let reader = new FileReader();

    reader.onload= function(){
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }

}

function guardar(){
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
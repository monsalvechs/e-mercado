//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML present

let cartArray = [];



function showCart(array) {

  let info = "";

  for (let i = 0; i < array.length; i++) {
    let cart = array[i];

    info += `
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img  id= "imageCart" src="${cart.src}" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${cart.name}</h5> <small class="text-muted">${cart.count} disponibles</small></p>
          
          <p class="card-text" id="subTotal">${cart.unitCost} ${cart.currency}  C/u</p>
          <div class="input-group mb-3">
          <div class="input-group-append">

          <input type="number" class="form-out" value="1" onchange="calcsubtotal(${cart.unitCost}, ${i})" id="cantidad${i}"  min="1" max="5">
          
          
          <label class="input-group-text" for="inputGroupSelect02"><td>
          <h4 name="costoSubTotal" id= "costoSubTotal${i}">${cart.unitCost}</h4>
          <h4 id="currency${i}">${cart.currency}</h4></label>
          </div>
          </div>
                
        </div>
      </div>
    </div>
  </div>
      `
    document.getElementById("cart").innerHTML = info;
  };
};

function calcsubtotal(unitCost, i) {
  //Se carga el costo del subtotal del producto
  let cantidad = document.getElementById("cantidad" + i).value;
  let costoXCantidad = parseInt(unitCost * cantidad);
  document.getElementById("costoSubTotal" + i).innerHTML = costoXCantidad
  //Acá ya se cargó el costo del producto en el recuadro gris

  cargarSubtotalFinal()
}

function cargarSubtotalFinal() {
  let subTotal = 0;
  //Recorro todos los precios finales de los productos y los sumo en la variable subTotal
  //En caso que la moneda de algún producto sea dolares, hago la conversión x45
  document.querySelectorAll('h4[name="costoSubTotal"]').forEach((elem, i) => {
    //Obtengo la moneda del producto
    let currency = document.getElementById("currency" + i).innerHTML
    //Obtengo el precio de los productos
    let costoProducto = parseInt(document.getElementById("costoSubTotal" + i).innerHTML)
    //Convierto a dolares si es necesario
    if (currency == "USD") {
      costoProducto = costoProducto * 45;
    }
    //Sumo el precio del producto al subtotal
    subTotal += costoProducto
  });
  //Guardo el subtotal
  document.getElementById("subtotalFinal").innerHTML = subTotal;
  selectEnvio();

}
function selectEnvio(tipoDeEnvio) {
  if (!tipoDeEnvio) {
    tipoDeEnvio = document.querySelector('input[name="envio"]:checked').value
  }
let porcentaje;

  switch (tipoDeEnvio) {
    case "Premium":
      porcentaje = 1.15;
      break;
    case "Express":
      porcentaje= 1.07;
      break;
    case "Standard":
      porcentaje= 1.05;
      break;

    default:
      porcentaje = 1;
      break;
  }


  let subtotalFinal = parseInt(document.getElementById("subtotalFinal").innerHTML)
  let total = subtotalFinal * porcentaje
  console.log(total)
  console.log(porcentaje)
  document.getElementById("total").innerHTML = total

}

function unaValidacion() {
  let boton = document.getElementById("btnUno");
  let direccion = document.getElementById("direccion");
  let pais = document.getElementById("pais");
  let feedBack = document.getElementById("feedback");

  if ((direccion.value != "") & (pais.value != "") & (!document.querySelector('input[name="envio"]:checked'))) {
    boton.setAttribute("data-target", "#exampleModal");
    boton.click();
    feedBack.innerHTML = "";
  } else {
    boton.removeAttribute("data-bs-target");
    feedBack.innerHTML = "";
    feedBack.innerHTML += "llena los campos";
  }

}
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL_2).then(function (objResult) {
    if (objResult.status === "ok") {
      cartArray = objResult.data.articles;
      showCart(cartArray);
      unaValidacion();
      cargarSubtotalFinal()
    }
  });
  

  document.querySelectorAll('input[name="envio"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      var tipoEnvio = event.target.value;
      console.log(tipoEnvio);
      selectEnvio(tipoEnvio)
    });
  });
  
});
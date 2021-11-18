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

          <input type="number" class="form-out" onchange="calcsubtotal(${cart.unitCost},${i})" id="cantidad${i}"  min="1" max="5">
          
          
          <label class="input-group-text" for="inputGroupSelect02"><td><h4 id= "costoSubTotal${i}">${cart.unitCost}</h4>
          <h4>${cart.currency}</h4></label>
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
  let cantidad = document.getElementById("cantidad" + i).value;
  document.getElementById("costoSubTotal" + i).innerHTML = parseInt(unitCost * cantidad);
  document.getElementById("totaly" + i).innerHTML = parseInt(unitCost); x
}

function cartInfo() {
  let info = "";
  info += `
  <!--total-->
<br>
<h5>Total</h5>
<h4 id ="totaly">${cart.unitCost}</h4>
  <button type="submit" class="btn btn-success btn-block">Finalizar compra</button>
  `
  document.getElementById("cartTotal").innerHTML = info;
}
function calcTotal(unitCost, i) {
  let Total = document.getElementById("cantidad" + i).value;
  document.getElementById("totaly").innerHTML = parseInt(unitCost + Total);
}
function miValidacion() {
  let flag = true;
  let mensaje = "";
  let elementosDentro = document.getElementsByClassName("form-Inside");
  let outformulary = document.getElementsByClassName("form-out");
  document.getElementById("feedback").innerHTML = "";

  let cuentoDentro = 0;
  for (let i = 0; i < elementosDentro.length; i++) {
    const element = elementosDentro[i];
    if (element.value == "") {
      cuentoDentro += 1;
    }
  }
  if (cuentoDentro > 1) {
    flag = false;
    msg += "-Solo puede haber un campo vacío dentro del formulario <br>"
  }
  //Solo 1 vacío fuera:
  let cuentoFuera = 0;
  for (let i = 0; i < elementosFuera.length; i++) {
    const element = elementosFuera[i];
    if (element.value == "") {
      cuentoFuera += 1;
    }
  }

  if (cuentoFuera > 1) {
    flag = false;
    msg += "-Solo puede haber un campo vacío fuera del formulario <br>"
  }


  //Contenido igual:
  let iguales = false;
  for (let i = 0; i < elementosDentro.length; i++) {
    const elementIn = elementosDentro[i];
    for (let i = 0; i < elementosFuera.length; i++) {
      const elementOut = elementosFuera[i];
      if (elementIn.value !== "" && elementIn.value === elementOut.value) {
        iguales = true;
      }
    }
  }
  if (!iguales) {
    flag = false;
    msg += "-El contenido de uno de los campos de adentro debe ser igual al de uno de los de afuera <br>"
  }

  //Campo min y max
  let num = false;
  for (let i = 0; i < elementosFuera.length; i++) {
    const elementOut = elementosFuera[i];
    if (parseInt(elementOut.value) > 5 && parseInt(elementOut.value) < 10) {
      num = true;
    }
  }
  if (!num) {
    flag = false;
    msg += "-Uno de los campos fuera del formulario debe tener un valor númerico entre 6 y 9<br>"
  }

  //minlength maxlength
  let caracteres = false;
  for (let i = 0; i < elementosDentro.length; i++) {
    const elementIn = elementosDentro[i];
    if (elementIn.value.length > 7 && elementIn.value.length < 15) {
      caracteres = true;
    }
  }
  if (!caracteres) {
    flag = false;
    msg += "-Uno de los campos dentro del formulario debe tener entre 8 y 14 caracteres<br>"
  }

  document.getElementById("feedback").innerHTML = msg;
  return flag;

}

function selcEnvio({

})

document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL).then(function (objResult) {
    if (objResult.status === "ok") {
      cartArray = objResult.data.articles;


      showCart(cartArray);
      cartInfo();
      calcsubtotal();
      calcTotal();
      miValidacion();
    }
  });

if (document.querySelector('input[name="envio"]')) {
  document.querySelectorAll('input[name="envio"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
      var item = event.target.value;
      console.log(item);
    });
  });
}
});
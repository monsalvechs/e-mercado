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

          <input type="number" onchange="calcsubtotal(${cart.unitCost},${i})" id="cantidad${i}" value = "1" min="1" max="5">
          
          
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
}

function cartInfo() {
  let info = "";
  info += `
  <h5>Resumen de compra</h5>
  <br>
  <!-- Button trigger modal -->
<button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#exampleModal">
  Envio
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Formulario de envio</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
      <div class="form-group">
    <label for="inputAddress">Dirección</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
      <div class="form-group">
        <label for="exampleFormControlInput1">Email</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Tipo de envío</label>
        <select class="form-control" id="exampleFormControlSelect1">
        <option hidden selected>Selecciona una opción</option>
          <option id="premium">Premium 2-5 dias 15% sobre el subtotal</option>
          <option id="express">Express 7-8 días 7% sobre el subtotal</option>
          <option id="standar">Standard 12-15 días 5% sobre el subtotal</option>
        </select>
      </div>
    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">guardar cambios</button>
      </div>
    </div>
  </div>
</div>
<br>
<br>
  <form>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Forma de pago</label>
    <select class="form-control" id="exampleFormControlSelect1">
    <option hidden selected>Selecciona una opción</option>
      <option id="efectivo">Efectivo</option>
      <option id="tarjeta">Tarjeta</option>
    </select>
  </div>
</form>

<div>
<h4>Total</h4>
<h4 id ="totaly"></h4>
  <button type="button" class="btn btn-success btn-sm btn-block">Finalizar compra</button>
  `

  document.getElementById("cartInfo").innerHTML = info;
}
function calcTotal(unitCost, i) {
  let Total = document.getElementById("cantidad" + i).value;
  document.getElementById("totaly").innerHTML = (unitCost + Total);
}
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL_2).then(function (objResult) {
    if (objResult.status === "ok") {
      cartArray = objResult.data.articles;


      showCart(cartArray);
      cartInfo();
      calcsubtotal();
    }
  });


});
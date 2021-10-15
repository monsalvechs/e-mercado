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
        <img src="${cart.src}" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${cart.name}</h5>
          
          <p class="card-text" id="subTotal">${cart.unitCost}</p>

          <p class="card-text">${cart.currency}</p>

          <input type="number" onchange="calcsubtotal(${cart.unitCost},${i})" id="cantidad${i}" value = "1" min="1" max="2">
       
          <button type="button" class="btn btn-success">Comprar</button>
          
          <small class="text-muted">${cart.count} disponibles</small></p>

         <p id= "costoSubTotal${i}"> ${sub} pagar en pesos</p>

        </div>
      </div>
    </div>
  </div>
      `
    document.getElementById("cart").innerHTML = info;
  };
};


document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL).then(function (objResult) {
    if (objResult.status === "ok") {
      cartArray = objResult.data.articles;


      showCart(cartArray);
    }
  });
  //let sub = parseInt(document.getElementById("cantidad").value*cart.unitCost);*/


});
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showProducto(prod) {
  let info = "";

  info += `
    <div class="col">
    <h1 id= "productoInfo"> ${prod.name}</h1>
    </div>
    <br>
    <br>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="` + prod.images[0] + `" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="` + prod.images[1] + `" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="` + prod.images[2] + `" alt="Third slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="` + prod.images[3] + `" alt="Four slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="` + prod.images[4] + `" alt="Five slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
<br>
<br>
<h2> ${prod.cost + " " + prod.currency}</h2>
<div id= "estrellas">
    <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span> 3/5 puntaje promedio.
</div>
    <div class="d-flex w-100 justify-content-between">
    <small class="text-muted">${prod.soldCount} Vendidos</small>
    </div>
    <br>
    <p> ${prod.description}</p>
    <br>
    <br>
    `
  document.getElementById("contenido").innerHTML = info;
}
function showComentario(coment) {
  let comen = "";
  comen += `

    <ol class="list-group list-group-numbered" id="list-coment">
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${coment[0].user}</div>
        ${coment[0].description}<br>
        ${coment[0].dateTime}
      </div>
      <span class="badge bg-primary rounded-pill">${coment[0].score}/5</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${coment[1].user}</div>
        ${coment[1].description}<br>
        ${coment[1].dateTime}
      </div>
      <span class="badge bg-primary rounded-pill">${coment[1].score}/5</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${coment[2].user}</div>
        ${coment[2].description}<br>
        ${coment[2].dateTime}
      </div>
      <span class="badge bg-primary rounded-pill">${coment[2].score}/5</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto">
        <div class="fw-bold">${coment[3].user}</div>
        ${coment[3].description}<br>
        ${coment[3].dateTime}
      </div>
      <span class="badge bg-primary rounded-pill">${coment[3].score}/5</span>
    </li>
  </ol>
`;

  document.getElementById("coment").innerHTML = comen;
}

var array1 = [];
  var array2 = [
    1,
    3,
  ];

function showRelateProduct() {


  let product = "";

  for (i = 0; i < array1.length; i++){
    
    let producto = array1[array2[i]]

    product += `
    <a href="product-info.html" class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ producto.name + `</h4>
                <h3 class="text">`+ producto.cost + `</h3>
                <h3 class="priceTag">`+ producto.currency + ` </h3>
                <small class="text-muted">`+producto.soldCount+ ` Vendidos</small>
            </div>
            <p class="mb-1">` + producto.description + `</p>
        </div>
    </div>
</a>`
   
    
    document.getElementById("related").innerHTML = product;
    
  }
}
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(PRODUCT_INFO_URL).then(function (objResult) {

    if (objResult.status === "ok") {

      showProducto(objResult.data);

      getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
          showComentario(result.data);
        }
      });
    }
  });

  getJSONData(PRODUCTS_URL).then(function(objResult){
    if (objResult.status === "ok"){
      array1 = objResult.data
      showRelateProduct(array1);
    }
  });
});



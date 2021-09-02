//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var minCount = undefined;
    var maxCount = undefined;
if (((minCount == undefined) || (minCount != undefined && parseInt(loadProduct.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(loadProduct.productCount) <= maxCount)))
             



document.addEventListener("DOMContentLoaded", function (e) {

 getJSONData(PRODUCTS_URL).then (function (objResult) {
        if (objResult.status === "ok") {
            loadProducts(objResult.data);
        }
    })


    function loadProducts (arregloProductoHtml) {
        let contenidoHtml = "";
        for(let i = 0; i < arregloProductoHtml.length; i++){
            let product = arregloProductoHtml[i];

                contenidoHtml += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name +`</h4>
                                <h3 class="text">`+ product.cost + `</h3>
                                <h3 class="priceTag">`+ product.currency + ` </h3>
                            </div>
                            <p class="mb-1">` + product.description + `</p>
                        </div>
                    </div>
                </a>
                `
            

            document.getElementById("prod-list-container").innerHTML = contenidoHtml;
        }
    }
});
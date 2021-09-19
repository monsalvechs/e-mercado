const ORDER_ASC_BY_PRICE = "MIN";
const ORDER_DESC_BY_PRICE = "MAX";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductosArray = [];
var currentSortCriteria;
var minCount;
var maxCount;

function sortProducts(criterio, array) {
    let result = [];
    if (criterio === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}



function loadProducts() {

    let contenidoHtml = "";

    for (let i = 0; i < currentProductosArray.length; i++) {
        let product = currentProductosArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            contenidoHtml += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name + `</h4>
                                <h3 class="text">`+ product.cost + `</h3>
                                <h3 class="priceTag">`+ product.currency + ` </h3>
                                <small class="text-muted">`+product.soldCount+ ` Vendidos</small>
                            </div>
                            <p class="mb-1">` + product.description + `</p>
                        </div>
                    </div>
                </a>
                `
        }

        document.getElementById("prod-list-container").innerHTML = contenidoHtml;
    }
}


function sortAndShowProductos(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductosArray = productsArray;
    }

    currentProductosArray = sortProducts(currentSortCriteria, currentProductosArray);


    loadProducts();
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (objResult) {
        if (objResult.status === "ok") {
            sortAndShowProductos(ORDER_ASC_BY_PRICE, objResult.data);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProductos(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProductos(ORDER_DESC_BY_PRICE);
    });
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProductos(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        loadProducts();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{         
            maxCount = undefined;
        }

        loadProducts();
    });

});
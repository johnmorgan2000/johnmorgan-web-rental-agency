function renderProduct(inv) {
    var source = document.getElementById("item").innerHTML;
    var template = Handlebars.compile(source);
    var html = template({
        product: inv
    });
    document.getElementById("product").insertAdjacentHTML("beforeend", html);
}

renderProduct(INVENTORY);

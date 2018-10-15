const cart = [];

// Adds the product from the inventory to page
function renderProduct(inv) {
    var source = document.getElementById("item").innerHTML;
    var template = Handlebars.compile(source);
    var html = template({
        product: inv
    });
    document.getElementById("product").insertAdjacentHTML("beforeend", html);
}

// Adds eventlisters to the buttons to add it to cart
function selectItem() {
    var products = document.querySelectorAll(".product");
    for (const i of products) {
        let btn = i.querySelector("button");
        btn.addEventListener("click", () => {
            console.log(i.querySelector(".name").innerText);
        });
    }
}

// Takes the product from inventory and add it to cart
function addToCart(cart, inv) {
    cart.push();
}

renderProduct(INVENTORY);
selectItem();

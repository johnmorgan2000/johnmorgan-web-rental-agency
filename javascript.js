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
            addToCart(cart, INVENTORY, i);
            refreshCart(cart);
            viewCart(cart);
        });
    }
}

// Takes the product from inventory and adds it to cart
function addToCart(cart, inv, item) {
    for (obj of inv)
        if (obj.name === item.querySelector(".name").innerText) {
            obj.instock -= 1;
            cart.push(obj);
        }

    console.log(cart);
}

// Creates the cart menu
function viewCart(cart) {
    var source = document.getElementById("cart-content").innerHTML;
    var template = Handlebars.compile(source);
    var html = template({
        cart: cart
    });
    document.querySelector("#cart ul").insertAdjacentHTML("beforeend", html);
}

// This prevents the cart contents from copying itself when loop is run
function refreshCart(cart) {
    var cartMenu = document.querySelector("#cart ul");
    cartMenu.innerHTML = "";
}

function rent() {
    const btn = document.querySelector("#cart button");
    btn.addEventListener("click", () => {
        document.querySelector("#payment-form").style.display = "block";
    });
}

renderProduct(INVENTORY);
selectItem();
rent();

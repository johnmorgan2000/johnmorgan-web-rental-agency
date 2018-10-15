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

function refreshProduct(inv) {
    var product = document.querySelector("#product");
    product.innerHTML = "";
    renderProduct(INVENTORY);
    selectItem();
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
            refreshProduct(INVENTORY);
            cartAmount(cart);
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
}

// when the user clicks the remove button, that item is removed from cart and added back to stock
function removeFromCart(cart, inv) {
    let items = document.querySelectorAll("#cart ul li");
    for (const item of items) {
        let btn = item.querySelector("button");

        btn.addEventListener("click", () => {
            let name = item.querySelector(".name").innerText;

            var elementPos = cart
                .map(function(x) {
                    return x.name;
                })
                .indexOf(name);

            var obj = cart[elementPos];

            for (i of inv) {
                if (obj.name === i.name) {
                    cart.splice(elementPos, 1);
                    i.instock++;
                    break;
                }
            }

            refreshCart(cart);
            viewCart(cart);
            cartAmount(cart);
            refreshProduct(INVENTORY);
        });
    }
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
// The rent button displays the form for the user to validate
function rent() {
    const btn = document.querySelector("#cart button");
    btn.addEventListener("click", () => {
        document.querySelector("#payment-form").style.display = "block";
    });
}
// Counts how many items are in the cart
function cartAmount(cart) {
    let sum = 0;
    for (i of cart) {
        sum += 1;
    }
    let btn = document.getElementById("cart-button");
    btn.innerHTML = `Cart (${sum})`;
    return sum;
}

//Cancel the form
document.querySelector("#cancel").addEventListener("click", () => {
    document.querySelector("#payment-form").style.display = "none";
});

//restarts the removeFromCart Function
document.querySelector("#cart-button").addEventListener("click", () => {
    removeFromCart(cart, INVENTORY);
});

renderProduct(INVENTORY);

selectItem();
rent();
cartAmount(cart);
// cartUnlock(cart);

// Change navbar style on scroll
document.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  var isScrolling = window.scrollY > 0;
  navbar.classList.toggle("sticky-top", isScrolling);

  var navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(function (link) {
    link.classList.toggle("scrollColor", isScrolling);
  });

  var cartButton = document.querySelector(".cart-button");
  cartButton.setAttribute(
    "src",
    isScrolling
      ? "assets/imgMain/shopping-bag white.png"
      : "assets/imgMain/shopping-bag.png"
  );
});

// Popup functionality
var coursesButtons = document.querySelectorAll(".pop-up");
coursesButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var buttonClicked = this.getAttribute("id");
    var overlay = document.querySelector("#overlay");
    overlay.classList.add("overlay-active");

    var popup = document.querySelector("#" + buttonClicked + "-popup");
    popup.classList.remove("d-none");
  });
});

var closeButtons = document.getElementsByClassName("close-button");
Array.from(closeButtons).forEach(function (button) {
  button.addEventListener("click", function () {
    var coursesPopups = document.querySelectorAll("#courses-pop-up .col-6");
    coursesPopups.forEach(function (popup) {
      popup.classList.add("d-none");
    });
    overlay.classList.remove("overlay-active");
  });
});

// Submit button functionality
var submitButton = document.querySelector(".submit-button");
var submitMessage = document.querySelector(".submit-message");

submitButton.addEventListener("click", function () {
  submitMessage.classList.remove("d-none");
});

// Cart functionality
var cartButton = document.querySelectorAll(".cart-button");
var cartPage = document.querySelector("#cart");
var cartClose = document.querySelector(".cart-close");

cartButton.forEach(function(button){
  button.addEventListener("click", function () {
    cartPage.classList.add("active");
    overlay.classList.add("overlay-active");
  });
});

cartClose.addEventListener("click", function () {
  cartPage.classList.remove("active");
  overlay.classList.remove("overlay-active");
});

// Input increase and decrease functionality
function increaseFunction() {
  var numberElement = this.parentElement.parentElement.querySelector(".number");
  var numberValue = numberElement.innerHTML;
  var newValue = parseInt(numberValue) + 1;
  // parseint converts string into integer
  if (newValue < 10) {
    numberElement.innerHTML = "0" + newValue;
  } else {
    numberElement.innerHTML = newValue;
  }
}

function decreaseFunction() {
  var numberElement = this.parentElement.parentElement.querySelector(".number");
  var numberValue = numberElement.innerHTML;
  var newMinusValue = parseInt(numberValue) - 1;
  if (newMinusValue > 0) {
    if (newMinusValue < 10) {
      numberElement.innerHTML = "0" + newMinusValue;
    } else {
      numberElement.innerHTML = newMinusValue;
    }
  } else {
    console.log("Negative Value");
    alert("You cannot buy negative products");
  }
}

// Cart Item Remove
var productRemoveBtn = document.querySelectorAll(".cart-item-remove");
productRemoveBtn.forEach(function (button) {
  button.addEventListener("click", cartRemoveFunction);
});

function cartRemoveFunction(evt) {
  var removeClicked = evt.target;
  removeClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// Update Function
function updateCartTotal() {
  var product = document.querySelectorAll(".product");
  var total = 0;
  product.forEach(function (button) {
    var price = parseInt(
      button.querySelector(".card-price").innerText.replace(/[₹,]/g, "")
    );
    var quantity = parseInt(button.querySelector(".number").innerText);
    var indiviualTotal = button.querySelector(".card-total-price");
    indiviualTotal.innerText = price * quantity;
    total = total + price * quantity;
  });
  var totalElement = document.querySelector(".total-amount");
  totalElement.innerText = "Total:- ₹ " + total;
}

// Quantity Function
var quantityElement = document.querySelectorAll(".number");
quantityElement.forEach(function (button) {
  button.addEventListener("DOMSubtreeModified", quantityChangeFunction);
});

function quantityChangeFunction() {
  updateCartTotal();
}

// Add to cart function
var addToCartBtn = document.querySelectorAll(".add-to-cart-button");
addToCartBtn.forEach(function (button) {
  button.addEventListener("click", function (evt) {
    var productClicked = evt.target.parentElement;
    var productTitle = productClicked.querySelector(".pt-4").innerText;
    var productPrice = productClicked.querySelector("h3").innerText;
    var productImage = productClicked.querySelector("img").src;
    addToCartProduct(productTitle, productPrice, productImage);
    updateCartTotal();
  });
});

function addToCartProduct(productTitle, productPrice, productImage) {
  var cartItemsDefault = document.querySelector(".cart-items");
  var newItemCart = document.createElement("div");
  newItemCart.classList.add(
    "product",
    "card",
    "p-3",
    "bg-transparent",
    "my-2",
    "d-flex",
    "flex-row"
  );

  var productName = document.querySelectorAll(".cart-items .card-title");
  for (var i = 0; i < productName.length; i++) {
    if (productName[i].innerText == productTitle) {
      alert("Already In The Cart !");
      return;
    }
  }

  var newItemCartHtml = `
          <img src="${productImage}" alt="" class="card-img">
          <div class="card-body p-0 ms-3">
            <h2 class="card-title">${productTitle}</h2>
            <h6 class="card-text card-price text-secondary"> ${productPrice}</h6>
            <div class="container-fluid">
              <div class="row text-center">
                <div class="col-2 bg-secondary-subtle rounded-start-2 p-2 minus">
                    <span>-</span>
                </div>
                <div class="col-4 bg-light p-2">
                  <span class="number">01</span>
                </div>
                <div class="col-2 bg-secondary-subtle rounded-end-2 p-2 plus">
                  <span>+</span>
                </div>
                 <h6 class="card-text card-total-price col-4 p-2 text-dark fs-5">0</h6>
              </div>
            </div>
            <button class="btn btn-danger rounded-3 ms-auto d-block my-2 cart-item-remove">&times;</button>
          </div>
  `;

  newItemCart.innerHTML = newItemCartHtml;
  cartItemsDefault.append(newItemCart);
  newItemCart
    .querySelector(".cart-item-remove")
    .addEventListener("click", cartRemoveFunction);
  newItemCart
    .querySelector(".number")
    .addEventListener("DOMSubtreeModified", quantityChangeFunction);
  newItemCart
    .querySelector(".minus")
    .addEventListener("click", decreaseFunction);
  newItemCart
    .querySelector(".plus")
    .addEventListener("click", increaseFunction);
}

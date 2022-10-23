`use strict`;

const showCartBtn = document.querySelector(`.cart-btn`);
const shoppingCart = document.querySelector(`.cart`);
const itemsHolder = document.querySelector(`.items-holder`);
const cartItemsContainer = document.querySelector(`.cart-container`);
const itemsNumber = document.querySelector(`.products-quantity`);
const summaryAmount = document.querySelector(`.summary`);
const sortByHighBtn = document.querySelector(".btn.sort-by-highest");
const sortByLowBtn = document.querySelector(".btn.sort-by-lowest");

let cartProducts = [];

//localStorage stuff
const getLocalStorage = function () {
  if (localStorage.getItem(`cartProducts`) === null) {
    cartProducts = [];
  } else {
    cartProducts = JSON.parse(localStorage.getItem(`cartProducts`));
  }
  let cartProduct = ``;
  cartProducts.forEach((product) => {
    cartProduct += `<div class="cart-item" id="${product.id}">
    <div class="small-img">
    <img src="${product.img}"/>
    </div>
    <p class="item-title">${product.name}</p>
    <p class="item-price">${product.price}&euro;</p>

    <div class="quantity-box">
    <button class="btn decrease-qnt">Decrease</button>
    <div class="number">${product.quantity}</div>
    <button class="btn increase-qnt">Increase</button>
    </div>
    <button class="remove-btn"><i class="fas fa-remove fa-2x"></i>Remove</button>
    </div>`;
  });
  cartItemsContainer.innerHTML = cartProduct;
  countItemsInCart();
  countPriceofCart();
  showNotification();
};

const setLocalStorage = function (cartItem) {
  if (localStorage.getItem(`cartProducts`) === null) {
    cartProducts = [];
  } else {
    cartProducts = JSON.parse(localStorage.getItem(`cartProducts`));
  }
  cartProducts.push(cartItem);
  localStorage.setItem(`cartProducts`, JSON.stringify(cartProducts));
};

const removeItemfromStorage = function (itemId) {
  if (localStorage.getItem(`cartProducts`) === null) {
    cartProducts = [];
  } else {
    cartProducts = JSON.parse(localStorage.getItem(`cartProducts`));
  }
  cartProducts.forEach((product, i) => {
    if (product.id === itemId) {
      cartProducts.splice(i, 1);
    }
  });
  localStorage.setItem(`cartProducts`, JSON.stringify(cartProducts));
};

//Local stuff end

//UI-code
const showCart = function () {
  shoppingCart.classList.toggle(`visible`);
};

let products = [
  {
    name: "Black Adidas Orignal Hoodie",
    img: "imgs/Hoodie.jpg",
    price: 35.99,
  },
  {
    name: "Colorful Adidas Hoodie",
    img: "imgs/Hoodie2.jpg",
    price: 44.99,
  },
  {
    name: "Manchester United Dragon T-shirt",
    img: "imgs/ManUDragon.webp",
    price: 54.99,
  },
  {
    name: "Manchester United Away Jersey",
    img: "imgs/ManUtdAJersey.webp",
    price: 84.99,
  },
  {
    name: "Ajax Amsterdam Away Jersey",
    img: "imgs/Shirt1.webp",
    price: 84.99,
  },
  {
    name: "ADIDAS FORUM MID SHOES",
    img: "imgs/Shoe1.webp",
    price: 124.99,
  },
  {
    name: "WARSZAWA SPZL SHOES",
    img: "imgs/Shoe2.webp",
    price: 149.99,
  },
  {
    name: "ADIDAS 4DFWD PULSE SHOES",
    img: "imgs/Shoe3.webp",
    price: 95.99,
  },
  {
    name: "Yeezy Boost 350 Zebra",
    img: "imgs/Yeezy-zebra.webp",
    price: 339.99,
  },
  {
    name: "Adidas Blue T-Shirt",
    img: "imgs/T-shirrt.jpg",
    price: 14.99,
  },
  {
    name: "Adidas Golden Original T-Shirt",
    img: "imgs/T-shirrt2.jpg",
    price: 22.99,
  },
  {
    name: "Kermit Adidas Original T-Shirt",
    img: "imgs/T-shirrt3.jpg",
    price: 37.99,
  },
  {
    name: "Adidas 4D Run 1.0 Shoes",
    img: "imgs/4Drun.jpeg",
    price: 99.99,
  },
  {
    name: "Adidas Predator 20.3",
    img: "imgs/Predator_20.3.jpeg",
    price: 199.99,
  },
  {
    name: "Adidas Predator X 20.1",
    img: "imgs/Predator shoes.jpg",
    price: 159.99,
  },
];

//Displays all available products
const renderProducts = function () {
  let output = ``;

  products.forEach((product) => {
    output += `<div class="item" id="${product.name}">
  <div class="img-control">
    <img src="${product.img}"/>
  </div>
  <h5>${product.name}</h5>
  <p class="price">${product.price}	&euro;</p>
  <button class="add-to-cart">Add to cart</button>
</div>`;
  });

  itemsHolder.innerHTML = output;
};
renderProducts();

const sortByHighest = function () {
  products.sort((a, b) => {
    return b.price - a.price;
  });

  renderProducts();
};

const sortByLowest = function () {
  products.sort((a, b) => {
    return a.price - b.price;
  });

  renderProducts();
};

sortByHighBtn.addEventListener("click", sortByHighest);
sortByLowBtn.addEventListener("click", sortByLowest);
//Adds the item to an array and makes other things
const getProductToCart = function (e) {
  if (e.target.classList.contains(`add-to-cart`)) {
    const cartItemImg =
      e.target.parentElement.getElementsByTagName("img")[0].currentSrc;

    const cartItemId = e.target.parentElement.querySelector(`h5`).innerText;

    const cartItemName = e.target.parentElement.querySelector(`h5`).innerText;
    console.log(cartItemImg);

    const cartItemPrice = +e.target.parentElement
      .querySelector(`.price`)
      .innerText.split(`€`)[0];

    const cartItem = {
      id: cartItemId,
      img: cartItemImg,
      name: cartItemName,
      price: cartItemPrice,
      quantity: 1,
    };
    cartProducts.push(cartItem);
    setLocalStorage(cartItem);
    countItemsInCart();
    countPriceofCart();
  }
};

//Gathers the cost of entire products and count it together
function countPriceofCart() {
  let holder = 0;
  cartProducts.forEach((item) => {
    holder += item.price * item.quantity;
  });
  summaryAmount.innerHTML = `<h4>Your summary is equal:${
    holder === 0 ? "0.00" : holder.toFixed(2)
  }💶</h4>`;
}

//Shows the quantity of elements in cart, array etc.
function countItemsInCart() {
  let quantity = 0;

  cartProducts.forEach((product) => {
    quantity += product.quantity;
  });

  itemsNumber.innerHTML = quantity;
}
countItemsInCart();

//Shows Notification in case there is nothing in the cart
function showNotification() {
  if (cartProducts.length === 0) {
    const message = document.createElement(`p`);
    message.classList.add(`empty-msg`);
    message.innerHTML = `Your cart is empty 😥!`;
    cartItemsContainer.append(message);
    countPriceofCart();
  }
}
function addProductToCart(e) {
  e.preventDefault();
  let cartProduct = ``;
  if (e.target.classList.contains(`add-to-cart`)) {
    cartProducts.forEach((product) => {
      cartProduct += `<div class="cart-item" id="${product.id}">
      <div class="small-img">
      <img src="${product.img}" alt="${product.id}" />
      </div>
      <p class="item-title">${product.name}</p>
      
      <p class="item-price">${product.price}&euro;</p>

      <div class="quantity-box">
      <button class="btn decrease-qnt">Decrease</button>
      <div class="number">${product.quantity}</div>
      <button class="btn increase-qnt">Increase</button>
      </div>
      <button class="remove-btn">
      <i class="fas fa-remove fa-2x"></i>
      Remove
      </button>
      </div>`;
    });

    cartItemsContainer.innerHTML = cartProduct;
    countItemsInCart();
    countPriceofCart();
  }
}

function increaseQuantity(e) {
  if (e.target.classList.contains("increase-qnt")) {
    const quantityNumber = e.target.previousElementSibling;
    let qntyContent = +e.target.previousElementSibling.innerText;
    let priceHolder = e.target.parentElement.parentElement.childNodes[5];
    qntyContent++;
    quantityNumber.innerText = qntyContent;

    cartProducts.forEach((product, i) => {
      if (e.target.parentElement.parentElement.id === product.id) {
        product.quantity = +quantityNumber.innerText;

        let calculations = (product.quantity * product.price).toFixed(2);

        priceHolder.innerHTML = `${calculations}&euro;`;

        console.log(cartProducts[i].quantity);
        console.log(cartProducts);
      }
      countItemsInCart();
      countPriceofCart();
    });
  }
}

function decreaseQuantity(e) {
  if (e.target.classList.contains("decrease-qnt")) {
    const quantityNumber = e.target.nextElementSibling;
    let qntyContent = +e.target.nextElementSibling.innerText;
    let priceHolder = e.target.parentElement.parentElement.childNodes[5];
    console.log(priceHolder);
    qntyContent--;
    if (qntyContent <= 0) {
      qntyContent = 1;
    }
    quantityNumber.innerText = qntyContent;

    cartProducts.forEach((product, i) => {
      if (e.target.parentElement.parentElement.id === product.id) {
        cartProducts[i].quantity = +quantityNumber.innerText;

        let calculations = (
          cartProducts[i].quantity * cartProducts[i].price
        ).toFixed(2);

        priceHolder.innerHTML = `${calculations}&euro;`;

        console.log(cartProducts[i].quantity);
        console.log(cartProducts);
      }
      countItemsInCart();
      countPriceofCart();
    });
  }
}

cartItemsContainer.addEventListener("click", increaseQuantity);
cartItemsContainer.addEventListener("click", decreaseQuantity);

//Removes item from array and from from UI
function removeCartItem(e) {
  if (e.target.classList.contains("remove-btn")) {
    cartProducts.forEach((product, i) => {
      if (product.id === e.target.parentElement.id) {
        cartProducts.splice(i, 1);
        e.target.parentElement.remove();
        removeItemfromStorage(product.id);
        console.log(cartProducts);
        countItemsInCart();
        countPriceofCart();
      }
    });
    showNotification();
  }
}

document.addEventListener(`DOMContentLoaded`, getLocalStorage);
cartItemsContainer.addEventListener(`click`, removeCartItem);
itemsHolder.addEventListener(`click`, getProductToCart);
itemsHolder.addEventListener(`click`, addProductToCart);
showCartBtn.addEventListener(`click`, showCart);

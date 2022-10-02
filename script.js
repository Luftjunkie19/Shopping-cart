const showCartBtn = document.querySelector(`.cart-btn`);
const shoppingCart = document.querySelector(`.cart`);
const itemsHolder = document.querySelector(`.items-holder`);
const cartItemsContainer = document.querySelector(`.cart-container`);
const itemsNumber = document.querySelector(`.products-quantity`);
const summaryAmount = document.querySelector(`.summary`);

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
    <div class="number">${quantityOfProducts}</div>
    <button class="btn increase-qnt">Increase</button>
    </div>

    <p class="new-price"></p>
    
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
    };
    cartProducts.push(cartItem);
    setLocalStorage(cartItem);
    countItemsInCart();
    countPriceofCart();
  }
};

//Gathers the cost of entire products and count it together
const countPriceofCart = function () {
  let holder = 0;
  cartProducts.forEach((item) => {
    holder += item.price;
  });
  summaryAmount.innerHTML = `<h4>Your summary is equal:${
    holder === 0 ? "0.00" : holder.toFixed(2)
  }💶</h4>`;
  /*let entirePrice = cartAmount.reduce((a, b) => a + b, 0).toFixed(2);
  summaryAmount.innerHTML = `<h4>Your summary is equal:${entirePrice}💶</h4>`;*/
};

//Shows the quantity of elements in cart, array etc.
const countItemsInCart = function () {
  let quantity = cartProducts.length;
  itemsNumber.innerHTML = quantity;
};
countItemsInCart();

//Shows Notification in case there is nothing in the cart
const showNotification = function () {
  if (cartProducts.length === 0) {
    const message = document.createElement(`p`);
    message.classList.add(`empty-msg`);
    message.innerHTML = `Your cart is empty 😥!`;
    cartItemsContainer.append(message);
    countPriceofCart();
  }
};
showNotification();

let quantityOfProducts = 1;

//Adds product in UI
const addProductToCart = function (e) {
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
      <div class="number">${quantityOfProducts}</div>
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
};

const increaseQuantity = function (e) {
  if (e.target.classList.contains(`increase-qnt`)) {
    quantityOfProducts++;
    console.log(e.target.previousElementSibling);
    e.target.previousElementSibling.innerHTML = quantityOfProducts;
  } else {
    e.preventDefault();
  }
};

const decreaseQuantity = function (e) {
  if (e.target.classList.contains("decrease-qnt")) {
    quantityOfProducts--;
    if (quantityOfProducts < 1) {
      quantityOfProducts = 1;
      e.target.nextElementSibling.innerHTML = quantityOfProducts;
    }
    e.target.nextElementSibling.innerHTML = quantityOfProducts;
  } else {
    e.preventDefault();
  }
};

//Removes item from array and from from UI
const removeCartItem = function (e) {
  if (e.target.classList.contains("remove-btn")) {
    cartProducts.forEach((product, i) => {
      if (product.id === e.target.parentElement.id) {
        cartProducts.splice(i, 1);
        e.target.parentElement.remove();
        removeItemfromStorage(product.id);
        countItemsInCart();
        countPriceofCart();
      }
    });

    showNotification();
  }
};

//All events!
document.addEventListener(`DOMContentLoaded`, getLocalStorage);
cartItemsContainer.addEventListener(`click`, removeCartItem);
cartItemsContainer.addEventListener("click", increaseQuantity);
cartItemsContainer.addEventListener("click", decreaseQuantity);
itemsHolder.addEventListener(`click`, getProductToCart);
itemsHolder.addEventListener(`click`, addProductToCart);
showCartBtn.addEventListener(`click`, showCart);

function init() {
  includeHTML();
  loadLokal();
  renderMenuEntrys();
  renderBasket();

}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }
// render fuctions

  function renderMenuEntrys() {
    let contentRef = document.getElementById('pizzaContent');
    contentRef.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        let name = card[i].name;
        let ingredients = card[i].ingredients;
        let price = card[i].price;
        price = price.toFixed(2);
        price = price.replace(".", ",");
        contentRef.innerHTML += getMenuTemplate(name, ingredients, price, i, 'pizza');
    }
}

function renderMenuEntrys2() {
  let contentRef = document.getElementById('cupcakeContent');
  contentRef.innerHTML = "";
  for (let i = 4; i < 7; i++) {
      let name = card[i].name;
      let ingredients = card[i].ingredients;
      let price = card[i].price;
      price = price.toFixed(2);
      price = price.replace(".", ",");
      contentRef.innerHTML += getMenuTemplate(name, ingredients, price, i, 'cake');
  }
}

function renderMenuEntrys3() {
  let contentRef = document.getElementById('burgerContent');
  contentRef.innerHTML = "";
  for (let i = 7; i < 11; i++) {
      let name = card[i].name;
      let ingredients = card[i].ingredients;
      let price = card[i].price;
      price = price.toFixed(2);
      price = price.replace(".", ",");
      contentRef.innerHTML += getMenuTemplate(name, ingredients, price, i, 'burger');
  }
}

function renderMenuEntrys4() {
  let contentRef = document.getElementById('drinksContent');
  contentRef.innerHTML = "";
  for (let i = 11; i < 19; i++) {
      let name = card[i].name;
      let ingredients = card[i].ingredients;
      let price = card[i].price;
      price = price.toFixed(2);
      price = price.replace(".", ",");
      contentRef.innerHTML += getMenuTemplate(name, ingredients, price, i, 'drinks');
  }
}

function renderBasket() {
  let basketRef = document.getElementById('basket');
  basketRef.innerHTML = "";
  for (let j = 0; j < basket.length; j++) {
    let name = basket[j].name;
    let amount = basket[j].amount;
    calculatePrice(basket[j]);
    let price = basket[j].price;
    price = price.toFixed(2);
    price = price.replace(".", ",");
    basketRef.innerHTML += getBasketTemplate(name, amount, price, j);
  }
  calculateTotalPrice();
}

//interact local storage
function saveLokal() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadLokal(index) {
  const item = basket[index];
  let savedBasket = localStorage.getItem('basket');
  if (savedBasket) {basket = JSON.parse(savedBasket);
  }
}

//add to Basket functions
function addToBasket(idx) {
  let item = card[idx];

  let basketIndex = basket.findIndex(menu=>{
    return menu.name == item.name;
  })
  if(basketIndex === -1) {
    basket.push(item);
  }else{
    basket[basketIndex]['amount']++
  }  
  saveLokal();
  loadLokal();
  renderBasket();
}

function addAmount(idx) {
  let constItem = basket[idx];
  constItem.amount = constItem.amount +1;
 

  saveLokal();
  renderBasket();
}

function removeAmount(idx) {
  let basketItem = basket[idx];
  basketItem.amount--;
  if (basketItem.amount  ==0) {
    basket.splice(idx, 1);
  }
  calculatePrice(basketItem);
  saveLokal();
  renderBasket();
}

function calculatePrice(basketItem) {
  let item = card.find(x => {
    return x.name == basketItem.name
  });
  
  basketItem.price = item.price * basketItem.amount; 

  calculateTotalPrice();
  calculateTotal();
}

function calculateTotalPrice() {
  let totalPrice;
  if (basket.length == 0) {
    totalPrice = 0;
  } else {
  totalPrice = basket.map((product) => product.price).reduce((acc, curr) => acc + curr)
  }
  let formattedPrice = totalPrice;
  formattedPrice = formattedPrice.toFixed(2);
  formattedPrice = formattedPrice.replace('.', ',');
  document.getElementById('toPay').innerHTML = formattedPrice + '€';
}

function calculateTotal() {
  let totalPrice;
  if (basket.length == 0) {
    totalPrice = 0;
  } else {
  totalPrice = basket.map((product) => product.price).reduce((acc, curr) => acc + curr)
  }
  if (totalPrice < 26) {
    priceToPay = totalPrice + 5;
  } else {
    priceToPay = totalPrice;
  }
  priceToPay = priceToPay.toFixed(2);
  priceToPay = priceToPay.replace('.', ',');
  document.getElementById('priceTotal').innerHTML = priceToPay + '€';
}

function deleteItem(idx) {
  basket.splice(idx, 1);

  saveLokal();
  calculateTotal();
  renderBasket();
}

function deleteAll(index) {
  basket.splice(index);

  saveLokal();
  calculateTotal();
  renderBasket();
}

function showBasket() {
  var x = document.getElementById('aside');
  x.classList.toggle('asideShow');
}

function order() {
  if (basket.length < 1) {
    alert('Korb noch leer!')
  } else {
    deleteAll();
    alert('Aber das ist doch alles nicht echt!')
  }
}
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

  function renderMenuEntrys() {
    let contentRef = document.getElementById('pizzaContent');
    contentRef.innerHTML = "";
    for (let i = 0; i < pizza.length; i++) {
        let name = pizza[i].name;
        let ingredients = pizza[i].ingredients;
        let price = pizza[i].price;
        price = price.toFixed(2);
        price = price.replace(".", ",");
        contentRef.innerHTML += getMenuTemplate(name, ingredients, price, i, 'pizza');
    }
}

function renderMenuEntrys2() {
  let contentRef = document.getElementById('cupcakeConten');
  contentRef.innerHTML = "";
  for (let i = 0; i < cacke.length; i++) {
      let name = cacke[i].name;
      let ingredients = cacke[i].ingredients;
      let price = cacke[i].price;
      price = price.toFixed(2);
      price = price.replace(".", ",");
      contentRef.innerHTML += getMenuTemplate(name, ingredients, price, i, 'cacke');
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
    console.log(amount);
  }
  calculatePrice();
  calculateTotalPrice();
}


function saveLokal() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadLokal(index) {
  const item = basket[index];
  let savedBasket = localStorage.getItem('basket');
  if (savedBasket) {basket = JSON.parse(savedBasket);
  }
}

function addToBasket(idx, type) {
  let item = pizza[idx];
  if (type == pizza) {
    item = pizza[idx];
  } else  {
   item = cacke[idx];
  }

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
  console.log('remove');

  saveLokal();
  renderBasket();
}

function calculatePrice(basketItem) {
  let item = pizza.find(x => {
    return x.name == basketItem.name
  });
  
  basketItem.price = item.price * basketItem.amount; 
}

function calculateTotalPrice(basketIndex) {
  let basketItem = basket[basketIndex];
  let positionPriceTotal = document.getElementById(`${basketIndex}positionPriceTotal`);
  let positionPriceTotalValue = basketItem.amount * basketItem.price;
  positionPriceTotal.innerHTML = positionPriceTotalValue.toFixed(2).replace('.', ',') + '€';
}

function showTotalPrice() {
  let priceTotal = document.getElementById('toPay');
  let toPayValue = positionPriceTotalValue;

  priceTotal.innerHTML = toPayValue.toFixed(2).replace('.', ',') + '€';
}

function showBasket() {
  var x = document.getElementById('aside');
  x.classList.toggle('asideShow');
}

function deleteItem(idx) {
  basket.splice(idx, 1);

  saveLokal();
  init();
}
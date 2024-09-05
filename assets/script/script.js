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
        contentRef.innerHTML += getMenuTemplate(name, ingredients, price, i);
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
      contentRef.innerHTML += getMenuTemplate(name, ingredients, price);
  }
}

function renderBasket() {
  let basketRef = document.getElementById('basket');
  basketRef.innerHTML = "";
  for (let j = 0; j < basket.length; j++) {
    let name = basket[j].name;
    let amount = basket[j].amount;
    let price = basket[j].price;
    price = price.toFixed(2);
    price = price.replace(".", ",");
    basketRef.innerHTML += getBasketTemplate(name, amount, price, j);
    console.log(amount);
  }
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

function addToBasket(idx) {
  const item = pizza[idx];
  let basketIndex = basket.findIndex(menu=>{
    return menu.name == item.name;
  })
  if(basketIndex === -1) {
    basket.push(item);
  }else{
    basket[basketIndex]['amount']++
  }  
  saveLokal();
  init();
}


function addAmount(idx) {
  let constItem = basket[idx];
  constItem.amount = constItem.amount +1;
  calculatePrice(constItem);

  saveLokal();
  renderBasket();
}

function removeAmount(idx) {
  let basketItem = basket[idx];
  basketItem.amount--;
  calculatePrice(basketItem);
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

function showBasket() {
  var x = document.getElementById('aside');
  x.classList.toggle('asideShow');
}

function deleteItem(idx) {
  basket.splice(idx, 1);

  saveLokal();
  init();
}
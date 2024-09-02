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
  basket.push(item);
    
  saveLokal();
  init();
}

function addAmount(idx) {
  let constItem = basket[idx];
  constItem.amount++; 

  saveLokal();
  renderBasket();
}

function removeAmount(idx) {
  let constItem = basket[idx];
  constItem.amount--;
  if (constItem.amount  ==0) {
    basket.splice(idx, 1);
  }

  saveLokal();
  renderBasket();
}

function calculatePrice(idx) {

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
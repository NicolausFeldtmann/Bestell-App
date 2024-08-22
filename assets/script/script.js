function init() {
  includeHTML();
  renderMenuEntrys();
  loadLokal();
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

function saveLokal() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadLokal() {
  JSON.parse(localStorage.getItem("basket"));
}

function addToBasket(idx) {
  const item = basket[idx];
  console.log('st1');
  let pizza  = document.getElementById(`dish(${idx})`);
  console.log('st2');
  basket[idx].push(pizza[idx]);
  console.log('st3');
  
  
  saveLokal();
}

function showBasket() {
  var x = document.getElementById('aside');
  x.classList.toggle('asideShow');
}
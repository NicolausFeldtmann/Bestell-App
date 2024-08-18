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

  function init() {
    includeHTML();
    renderMenuEntrys();
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
        contentRef.innerHTML += getMenuTemplate(name, ingredients, price);
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
  console.log('save')
  localStorage.setItem('basket', JSON.stringify(cart));
}

function addToBasket() {
  


  saveLokal();

}

function showBasket() {
  var x = document.getElementById('aside');
  x.classList.toggle('asideShow');
}
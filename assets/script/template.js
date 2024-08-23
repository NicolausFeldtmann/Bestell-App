function getMenuTemplate(name, ingredients, price, idx) {
    
    return `
            <div class="dishes">
                <div class="dish" id="dish(${idx})">
                    <table>
                        <th id="name">${name}</th>
                        <td>${ingredients}</td>
                    </table>
                    <div class="dishInfo">
                        <div class="price" id="price">${price}€</div>
                        <img class="dishIcon" id="dishIcon" src="./assets/img/plus.png" onclick="addToBasket(${basket[idx]})">
                    </div>
                </div>
            </div>`;
}

function getBasketTemplate(basketItem, basketPrice, i) {
    return `<div class="basketPosition">
                <div class="basketPizza"><b>${basketItem[i]}</b></div>
                <div class="basketPrice">${basketPrice[i]}</div>
            </div>`;
}

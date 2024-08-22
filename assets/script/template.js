function getMenuTemplate(name, ingredients, price, idx) {
    
    return `
            <div class="dishes">
                <div class="dish" id="dish(${idx})">
                    <table>
                        <th>${name}</th>
                        <td>${ingredients}</td>
                    </table>
                    <div class="dishInfo">
                        <div class="price">${price}€</div>
                        <img class="dishIcon" id="dishIcon" src="./assets/img/plus.png" onclick="addToBasket(${idx})">
                    </div>
                </div>
            </div>`;
}

function getBasketTemplate(idx) {
    return `<div class="basketPosition">
                <div class="basketPizza"><b>${pizza[idx].name[idx]}</b></div>
                <div class="basketPrice">${pizza[idx].price[idx]}</div>
            </div>`;
}

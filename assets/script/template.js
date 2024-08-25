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
                        <img class="dishIcon" id="dishIcon" src="./assets/img/plus.png" onclick="addToBasket(${idx})">
                    </div>
                </div>
            </div>`;
}

function getBasketTemplate(name, price) {
    return `
        <div class="basketPosition">
                <div class="basketIconArea">
                    <img class="basketIcon" id="add" src="./assets/img/plus.png" onclick="addItem">
                    <img class="basketIcon" id="remove" src="./assets/img/minus.png" onclick="removeItem">
                </div>
                <div class="basketPizza"><b>${name}</b></div>
                <div class="basketPrice">${price}€</div>
            </div>`;
}

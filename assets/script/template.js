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

function getBasketTemplate(name, amount, price, j) {
    return `
        <div class="basketPosition">
                <div class="basketPizza"><b>${name}</b></div>
                <div class="positionInfo">
                    <div class="basketAmount" id="basketAmount">x ${amount}</div>
                    <div class="basketIconArea">
                        <img class="basketIcon" id="add" src="./assets/img/plus.png" onclick="addAmount(0)">
                        <img class="basketIcon" id="remove" src="./assets/img/minus.png" onclick="removeAmount(0)">
                    </div>
                    <div class="basketPrice" id="basketPrice">${price}€</div>
                    <img class="basketIcon" id="delete" src="./assets/img/trash-can.png" onclick="deleteItem(${j})">
                </div>
            </div>`;
}

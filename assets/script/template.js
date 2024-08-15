function getMenuTemplate(name, ingredients, price) {
    
    return `
            <div class="dishes">
                <div class="dish">
                    <table>
                        <th>${name}</th>
                        <td>${ingredients}</td>
                    </table>
                    <div class="dishInfo">
                        <div class="price">${price}</div>
                        <img class="dishIcon" src="./assets/img/plus.png">
                    </div>
                </div>
            </div>`;
}

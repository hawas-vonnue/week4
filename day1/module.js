const CartModule = (function cartModule() {
    let itemArray = [];

    return {
        addItem(item) {
            itemArray.push(item);
        },

        removeItem(itemId) {
            for (let item of itemArray) {
                if (item.id === itemId) {
                    let index = itemArray.indexOf(item);
                    itemArray.splice(index, 1);

                    return;
                }
            }
        },

        updateQuantity(itemId, newQuantitiy) {
            for (let item of itemArray) {
                if (item.id === itemId) {
                    item.quantity = newQuantitiy;

                    return;
                }
            }
        },

        getItems(itemId) {
            return itemArray;
        },

        getTotal() {
            let total = 0;
            for (let item of itemArray) {
                total += item.quantity * item.price;
            }

            return total;
        },

        clear() {
            itemArray = [];
        },
    };
})();

CartModule.addItem({ id: 10, quantity: 20, price: 100 });
console.log(CartModule.getItems());
CartModule.addItem({ id: 11, quantity: 20, price: 100 });
console.log(CartModule.getItems());
CartModule.removeItem(11);
console.log(CartModule.getItems());
console.log(CartModule.getTotal());
CartModule.clear();
console.log(CartModule.getItems());
CartModule.addItem({ id: 10, quantity: 20, price: 100 });
CartModule.updateQuantity(10, 10);
console.log(CartModule.getItems());

//this way be accesssed or modified
console.log(itemArray);

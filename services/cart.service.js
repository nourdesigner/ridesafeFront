function CartServiceFN($http) {
    var url = "http://localhost:3003/api/produit";
    this.add = function (item) {
        var cart = getCart();
        var idx = getIndexById(item._id);
        if (idx == -1) {
            item.qty = 1;
            cart.push(item);
        } else {
            cart[idx].qty++;
        }
        save(cart);
    }

    this.update = function (id, item) {
        var cart = getCart();
        var idx = getIndexById(id);
        cart[idx] = item;
        save(cart);
    }

    this.delete = function (id) {
        var cart = getCart();
        var idx = getIndexById(id);
        if (cart[idx].qty == 1) {
            cart.splice(idx, 1);
        } else {
            cart[idx].qty--;
        }
        save(cart);
    }
    this.getTotal = function () {
        var total = 0;
        var cart = getCart();
        for (var i = 0; i < cart.length; i++) {
            total += (cart[i].price * cart[i].qty);
        }
        return total;
    }

    this.getCart = getCart;
    this.updateNumItems = updateNumItems;

    this.checkout = function () {
        var cart = getCart();
        for (var i = 0; i < cart.length; i++) {
            $http.delete(url + "/" + cart[i]._id);
        }
        cart = new Array();
        save(cart);
        alert('checkout out');
    }


    function getIndexById(id) {
        var cart = getCart();
        for (var i = 0; i < cart.length; i++) {
            if (cart[i]._id == id) {
                return i;
            }
        }
        return -1;
    }

    function updateNumItems() {
        var totalItems = 0;
        var cart = getCart();
        for (var i = 0; i < cart.length; i++) {
            totalItems += cart[i].qty;
        }
        document.getElementById('numItems').innerHTML = totalItems;
    }

    function getCart() {
        return JSON.parse(localStorage.cart);
    }

    function save(cart) {
        localStorage.cart = JSON.stringify(cart);
        updateNumItems();
    }
}

angular
    .module("demo")
    .service("CartService", CartServiceFN);
if ((!localStorage.cart) || (localStorage.cart == "")) {
    localStorage.setItem('cart', "[]");
}
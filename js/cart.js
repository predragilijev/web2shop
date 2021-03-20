window.onload = function() {
    let productsCart = getItem("products");
    let productsInCart = getItem("productsCart");
    function printproductsInCart() {
        var cart;
        $('#cartList tbody').html('');
        for (let i in productsInCart) {
            var currentProduct2 = productsInCart[i];
            if(productsInCart.length != 0){
                cart = productsCart.filter(one => one.id == currentProduct2.id);
            }
            $('#cartList tbody').append(`<tr>
            <td class="cart_product_img">
                <a href="#"><img src="${cart[0].img.src}" alt="Product"></a>
            </td>
            <td class="cart_product_desc">
                <h5>${cart[0].name}</h5>
            </td>
            <td class="price">
                <span class="pri">$${cart[0].price.new*currentProduct2.quantity}</span>
            </td>
            <td class="qty">
                <div class="qty-btn d-flex">
                    <p>Qty</p>
                    <div class="quantity" id="${cart[0].id}">
                        <span class="qty-minus"><i class="fa fa-minus" aria-hidden="true"></i></span>
                        <input type="text" class="qty-text" step="1" min="1" max="300" name="quantity" value="${currentProduct2.quantity}">
                        <span class="qty-plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
                    </div>
                </div>
            </td>
        </tr>`);
        }
        var total = 0;
        for (let pr of productsInCart) {
            total += (pr.price * pr.quantity);
        }
        printTotalPrice(total);
    }
    
    if (productsInCart != null) {
        printproductsInCart();
    } else {
        $('#totalHere').html("<p>No products in cart.</p>");
    }
    

    
    
    $('.qty-minus').on('click', function() {
        let th = $(this).parent().attr('id');
        reduce(th);
    })
    $('.qty-plus').on('click', function() {
        let th = $(this).parent().attr('id');
        increase(th);
    })
    
    function printTotalPrice(totalPr) {
        let html = "";
        html+= `<li><span>subtotal:</span> <span class="totPr">$${totalPr}</span></li>
                <li><span>delivery:</span> <span>Free</span></li>
                <li><span>total:</span> <span class="totPr">$${totalPr}</span></li>`;
        $('#totalHere').html(html);
    }

    function updQuantityProd(prodId, ch){
        let id = prodId;
        let productsInCart = getItem("productsCart");
        for(let i in productsInCart)
        {
            if(productsInCart[i].id == id) {
                if (ch == "reduce") {
                    productsInCart[i].quantity--;
                    break;
                } else if (ch == "increase") {
                    productsInCart[i].quantity++;
                    break;
                }
            }      
        }
        setItem("productsCart", productsInCart);
    }
    
    function getItem(name){
        return JSON.parse(localStorage.getItem(name));
    }
    
    function setItem(name, data){
        localStorage.setItem(name, JSON.stringify(data));
    }

    function reduce(th) {
        let productsInCart = getItem('productsCart');
        let prodId = th;
        let priceOfProd;
        var fullPrice = 0;
        var index;
        for (let i in productsInCart) {
            if (prodId == productsInCart[i].id) {
                priceOfProd = productsInCart[i].price;
                index = i;
                break;
            }
        }
        let quant = productsInCart[index].quantity;
        if (quant > 1) {
            quant--;
            updQuantityProd(prodId, "reduce");
            let proba = document.getElementsByClassName('qty-text')[index];
            proba.innerHtml = proba.value--;
            // console.log($('.pri:eq('+index+')').text());
            $('.pri:eq('+index+')').html('$'+ quant * priceOfProd);
            arrPri = $('.pri').text();
            let arrPri2 = arrPri.split('$').slice(1);
            for (pri of arrPri2) {
                fullPrice += parseInt(pri);
            }
            $('.totPr').html("$" + fullPrice);
        } else if(quant == 1) {
            let newCart = productsInCart.slice(1);
            setItem('productsCart', newCart);
            if (newCart.length == 0) {
                localStorage.removeItem('productsCart');
            }
            location.reload();
        }
    }
    
    function increase(th) {
        let productsInCart = getItem('productsCart');
        let prodId = th;
        let priceOfProd;
        var fullPrice = 0;
        var index;
        for (let i in productsInCart) {
            
            
            if (prodId == productsInCart[i].id) {
                priceOfProd = productsInCart[i].price;
                index = i;
                break;
            }
        }
        let quant = productsInCart[index].quantity;
        if (quant < 9) {
            quant++;
            updQuantityProd(prodId, "increase");
            let proba = document.getElementsByClassName('qty-text')[index];
            proba.innerHtml = proba.value++;
            $('.pri:eq('+index+')').html('$'+ quant * priceOfProd);
            arrPri = $('.pri').text();
            let arrPri2 = arrPri.split('$').slice(1);
            for (pri of arrPri2) {
                fullPrice += parseInt(pri);
            }
            $('.totPr').html("$" + fullPrice);
        }
    }
}
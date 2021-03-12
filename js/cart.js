// window.onload = () => {
//     // CART LIST
//     function printCartDevices() {
//         let cartDevices = loadLocalStorage('cart');
//         $('#cartList tbody').html('');
//         for (let i in cartDevices) {
//             var currentDevice = cartDevices[i];
//             $('#cartList tbody').append(`<tr dataid="${currentDevice.id}" class="cartItem"><td class="colDeviceName">${currentDevice.name}
//             </td><td class="colPrice">${currentDevice.price}€</td><td class="colQuantity"><button class="btnPrimary btnQuantity btnDecrease">
//             <span>-</span></button><span class="quantity">${currentDevice.quantity}</span><button class="btnP
//             rimary btnQuantity btnIncrease"><span>+</span></button></td><td class="colRemove"><button
//             class="btnRemove"><i class="fas fa-minus"></i></button></td></tr>`);
//         }
//     }

//     printCartDevices();
//     // BUTTON QUANTITY
//     $('.btnQuantity').click(function() {
//         let cartDevices = loadLocalStorage('cart');
//         var deviceId = parseInt($(this).parents('tr').data('id'));
//         var index;
//         for (let i in cartDevices) {
//             if (deviceId == cartDevices[i].id) {
//                 index = i;
//                 break;
//             }
//         }
//         if ($(this).hasClass('btnIncrease')) {
//             if (cartDevices[index].quantity < 10) {
//                 cartDevices[index].quantity++;
//                 updateLocalStorage(cartDevices, 'cart');
//             }
//         } else {
//             if (cartDevices[index].quantity > 1) {
//                 cartDevices[index].quantity--;
//                 updateLocalStorage(cartDevices, 'cart');
//             }
//         }
//         $(this).siblings('.quantity').html(cartDevices[index].quantity);
//         printCartNumber();
//         printTotalPrice();
//     });
//     // BUTTON REMOVE
//     $('.btnRemove').click(function() {
//         let cartDevices = loadLocalStorage('cart');
//         var deviceId = parseInt($(this).parents('tr').data('id'));
//         for (let i in cartDevices) {
//             if (cartDevices[i].id == deviceId) {
//                 removeDevice(i);
//                 break;
//             }
//         }
//         printCartNumber();
//         printTotalPrice();
//         $(this).parents('tr').remove();
//     });

//     function removeDevice(index) {
//         let cartDevices = loadLocalStorage('cart');
//         cartDevices.splice(index, 1);
//         updateLocalStorage(cartDevices, 'cart');
//     }
//     // TOTAL PRICE
//     var totalPrice;

//     function printTotalPrice() {
//         let cartDevices = loadLocalStorage('cart');
//         totalPrice = 0;
//         for (let i in cartDevices) totalPrice += cartDevices[i].price * cartDevices[i].quan
//         tity;
//         $('#totalPrice').html(`Total Price: <span class="bold">${totalPrice}€</span>`);
//     }
//     printTotalPrice();
// }







function iscitajIzKorpe(podaci) {
    praznaKorpa();
    let cartDiv = document.getElementById("cart");
    if (!localStorage.getItem("zaKorpu")) {
        cartDiv.innerHTML = `<h2 class="textcenter donjiIgornjiPadding">Your cart is empty!</h2><a href="store.html"class="textcenter pb-4"><h4 class=" pb-4 text-primary">Go back to store</h4></a>`;
    } else {
        let products = JSON.parse(localStorage.getItem("zaKorpu"));
        let uredjajiUkorpi = [];
        products.forEach(el => {
            uredjajiUkorpi.push(el.id);
        });
        let zaPrikaz = podaci.filter(element => uredjajiUkorpi.includes(element.id))
        prikaziItemeIzKorpe(zaPrikaz);
    }
}

function prikaziItemeIzKorpe(items) {
    praznaKorpa();
    let divIspis = document.getElementById("cart");
    html = `<table class="table"><tr><td>#</td><td>Picture</td><td>Articles</td><td>Price</td
><td class="text-center">Quantity</td></tr>`;
    let br = 1;
    items.forEach(el => {
        html += `<tr class=""><td >${br++}</td><td><img src="${el.picture.src}" alt="${el.picture.alt}" class="imgfluid"></td><td>${el.name}</td><td>&dollar;${el.startingPrice}</td><td align="center"><button
class="dodaj d-block dugme bg-dark text-light " datapid="${el.id}">+</button><span id="q${el.id}"class=" ">${dajKolicinu(el.id)}</span><button cl
ass="oduzmi dugme bg-dark text-light d-block pl-2 pr-2" data-pid="${el.id}">-
</button><button data-pid="${el.id}" class="obrisi bg-dark mt-2 text-light dugme dblock"><i class="fas fa-trash-alt"></i></button></td></tr>`
    })
    html += `<tr><td colspan="5" class="textcenter"><b>Total:&dollar;${dajSumu(items)}</b></td></tr>`
    html += "</table>";
    divIspis.innerHTML = html;
    $(".oduzmi").click(umanjiKolicinu);
    $(".dodaj").click(dodajKolicinu);
    $(".obrisi").click(obrisiProizvod);
}

function dajKolicinu(idUredaja) {
    let products = JSON.parse(localStorage.getItem("zaKorpu"));
    let kolicina = products.filter(p => p.id == idUredaja)
    return kolicina[0].quantity;
    brojItemaUKorpi();
}

function dajSumu(items) {
    let suma = 0;
    items.forEach(el => {
        suma += el.startingPrice * dajKolicinu(el.id);
    })
    return suma;
}

function umanjiKolicinu(e) {
    e.preventDefault();
    let id = this.dataset.pid;
    let products = JSON.parse(localStorage.getItem("zaKorpu"));
    let obj = products.filter(p => p.id == id);
    obj[0].quantity -= 1;
    localStorage.setItem("zaKorpu", JSON.stringify(products));
    osveziKolicine(id);
    proveriKolicine(id);
    iscitajIzKorpe(svi);
    praznaKorpa();
    brojItemaUKorpi();

}

function dodajKolicinu(e) {
    e.preventDefault();
    let id = this.dataset.pid;
    let products = JSON.parse(localStorage.getItem("zaKorpu"));
    let obj = products.filter(p => p.id == id);
    obj[0].quantity += 1;
    localStorage.setItem("zaKorpu", JSON.stringify(products));
    osveziKolicine(id);
    proveriKolicine(id);
    iscitajIzKorpe(svi);
    brojItemaUKorpi();
}

function osveziKolicine(id) {
    let products = JSON.parse(localStorage.getItem("zaKorpu"));
    let kolicina = products.filter(p => p.id == id)
    document.getElementById(`q${id}`).innerHTML = kolicina[0].quantity;
    praznaKorpa();
    brojItemaUKorpi();
}

function proveriKolicine(id) {
    let prodid = id;
    let products = JSON.parse(localStorage.getItem("zaKorpu"));
    let productQ = products.filter(p => p.id == prodid)
    let quantity = productQ[0].quantity;
    let index = 0;
    if (quantity == 0) {
        for (var i in products) {
            if (products[i].id == prodid) {
                index = i;
            }
        }
        products.splice(index, 1);
        localStorage.setItem("zaKorpu", JSON.stringify(products));
        praznaKorpa();
    }
    brojItemaUKorpi();
}

function praznaKorpa() {
    let products = JSON.parse(localStorage.getItem("zaKorpu"));
    if (products == null || products.length === 0) {
        localStorage.removeItem("zaKorpu");
    }
}

function obrisiProizvod() {
    let id = this.dataset.pid;
    let products = JSON.parse(localStorage.getItem("zaKorpu"));
    for (var i in products) {
        if (products[i].id == id) {
            index = i;
        }
    }
    products.splice(index, 1);
    localStorage.setItem("zaKorpu", JSON.stringify(products));
    praznaKorpa();
    iscitajIzKorpe(svi);
    brojItemaUKorpi();
}

function brojItemaUKorpi() {

    let brojItema;
    if (!localStorage.getItem("zaKorpu"))
        brojItema = 0;
    else {
        let itemi = JSON.parse(localStorage.getItem("zaKorpu"));

        console.log(itemi);
        let kol = 0;
        itemi.forEach(item => {
            kol += item.quantity;
        })
        brojItema = kol;
    }
    document.getElementById("brojItema").innerHTML = brojItema;

}
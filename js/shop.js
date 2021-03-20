window.onload = function() {
    var chosen = "";
    showCartNum();
    // localStorage.removeItem("productsCart");
	$("#sorting").change(filterOnChange);
	$("#amado").change(filterOnChange);

	function getData(file, callback){
		$.ajax({
			url: "data/" + file + ".json",
			method: "get",
			dataType: "json",
			success: function(resp){
				callback(resp);
			},
			error: function(err){
				console.log(err);
			}
		});
	}

    getData("categories", showCateg);
	
	function showCateg(categArray){
		let html = "";
		for (let cat of categArray) {
			html += `<li><a href="#">${cat.name}</a></li>`;
		}
        $("#categHere").html(html);
		getData("brands", showBrands);
	}
	
	function showBrands(brandArray){
		let html = "";
		for (let brand of brandArray) {
			html += `<div class="form-check">
                        <input class="form-check-input brands" name="brands" type="checkbox" value="${brand.id}" id="${brand.name}">
                        <label class="form-check-label" for="${brand.name}">${brand.name}</label>
                    </div>`;
		}
        $("#brandHere").html(html);
		$('.brands').change(filterOnChange);
		getData("products", showProducts);
	}
	
	function showProducts(productArray){
        setItem("products", productArray);
        $("#btn_next").click(function() {
            chosen = 'nextPage';
            productArray = availableFilter(productArray);
            productArray = brandFiltering(productArray);
            productArray = sorting(productArray);
            pagFunct(productArray, chosen);
        });
        $("#btn_prev").click(function() {
            chosen = 'prevPage';
            productArray = availableFilter(productArray);
            productArray = brandFiltering(productArray);
            productArray = sorting(productArray);
            pagFunct(productArray, chosen);
        });
        productArray = availableFilter(productArray);
		productArray = brandFiltering(productArray);
		productArray = sorting(productArray);
        pagFunct(productArray, "");
	}
    function getProductStars(starNum){
        let htmlStars = "";
        for(let i=0; i<starNum; i++) {
            htmlStars+= '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        return htmlStars;
	}

    function getAvColor(stock) {
        if (stock == "Not available") {
            return "text-danger";
        } else {
            return "text-success";
        }
    }

    function sorting(dataArray){
        let chosen = $('#sorting').val();
        if (chosen == "ratingAsc") {
            return dataArray.sort((first, second) => first.stars > second.stars ? 1 : -1);
        } else if (chosen == "ratingDesc") {
            return dataArray.sort((first, second) => first.stars < second.stars ? 1 : -1);
        } else if (chosen == "priceLH") {
            return dataArray.sort((first, second) => first.price.new > second.price.new ? 1 : -1);
        } else if (chosen == "priceHL") {
            return dataArray.sort((first, second) => first.price.new < second.price.new ? 1 : -1);
        } else return dataArray;
	}

    function brandFiltering(dataArray){
		let selectedBrands = [];
		$('.brands:checked').each(function(){
			selectedBrands.push(parseInt($(this).val()));
		});
		if(selectedBrands.length != 0){
            var smth = dataArray.filter(first => first.brandId.some(second => selectedBrands.includes(second)));
            return smth;
		}
		return dataArray;
	}

	function availableFilter(dataArray){
		var availability = $(".stocks:checked").val();
        
		if(availability == "Available"){
			var smth = dataArray.filter(one => one.instock == "Available");
			return smth;
		}
		return dataArray;
	}

    // function priceFilter(dataArray) {
    //     dataArray.filter(function(one){return one.Price >= 250 && one.Price <= 800;});
    // }

    var current_page = 1;
    var records_per_page = 4;

    $("#viewProduct").change(prodView);

    function prodView() {
        let chosen = $('#viewProduct').val();
        if (chosen == "four") {
            current_page = 1;
            records_per_page = 4;
            filterOnChange();
        } else if (chosen = "eight") {
            current_page = 1;
            records_per_page = 8;
            filterOnChange();
        }
    }

    function pagFunct(prodArray, choice) {
        var prod = prodArray;
        if (choice == 'nextPage') {
            nextPage();
        } else if (choice == 'prevPage') {
            prevPage();
        } else {
            changePage(current_page);
        }
        $('#btn-next').click(nextPage);
        $('#btn-prev').click(prevPage);

        function prevPage()
        {
            if (current_page > 1) {
                current_page--;
                changePage(current_page);
            }
        }

        function nextPage()
        {
            if (current_page < numPages()) {
                current_page++;
                changePage(current_page);
            }
        }

        function changePage(page)
        {
            var inHtml = document.getElementById("prodHere");
            var pgSpan = document.getElementById("page");
            var pgItem = '';

            if (page < 1) page = 1;
            if (page > numPages()) page = numPages();

            var start = (page-1) * records_per_page;
            var end = (page * records_per_page);
            var prodPage = prodArray.slice(start, end);
            // console.log(prodPage);

            for(let oneProd of prodPage){
                pgItem += `
                <!-- Single Product Area -->
                <div class="col-12 col-sm-6 col-md-12 col-xl-6 promena">
                <div class="single-product-wrapper">
                    <!-- Product Image -->
                    <div class="product-img">
                        <img src="${oneProd.img.src}" alt="${oneProd.img.alt}">
                        <!-- Hover Thumb -->
                        <img class="hover-img" src="img/product-img/product2.jpg" alt="">
                    </div>
    
                    <!-- Product Description -->
                    <div class="product-description d-flex align-items-center justify-content-between">
                        <!-- Product Meta Data -->
                        <div class="product-meta-data">
                            <div class="line"></div>
                            <p class="product-price">$${oneProd.price.new}</p>
                            <p>$<s>${oneProd.price.old}</s></p>
                                <h5>${oneProd.name}</h5>
                                <p class="avcolor ${getAvColor(oneProd.instock)}">${oneProd.instock}</p>
                        </div>
                        <!-- Ratings & Cart -->
                        <div class="ratings-cart text-right">
                            <div class="ratings">
                                ${getProductStars(oneProd.stars)}
                            </div>
                            <div class="cart">
                                <a href="javascript:addToCart(${oneProd.id}, ${oneProd.price.new}, '${oneProd.instock}')" class="addToCart" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" class="btnCarts" alt="cart"></a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <!-- Single Product Area END -->`;
            }

            $('#prodHere').animate({'opacity': 0}, 300, function(){
                $(inHtml).html(pgItem).animate({'opacity': 1}, 400);    
            });
            
            pgSpan.innerHTML = page + "/" + numPages();

            if (page == 1) {
                $('#pag1').addClass('disabled');
            } else {
                $('#pag1').removeClass('disabled');
            }

            if (page == numPages()) {
                $('#pag2').addClass('disabled');
            } else {
                $('#pag2').removeClass('disabled');
            }
        }

        function numPages()
        {
            return Math.ceil(prod.length / records_per_page);
        }
    }
    function filterOnChange(){
        getData("products", showProducts);
    }
}

function addToCart(prodID, prodPrice, inStock){
    let id = prodID;
    let price = prodPrice;
    var productsFromCart = getItem("productsCart");
    if(inStock == "Available"){
        $('#myModal p').html('Item added to cart successfully!');
        $('#myModal p').css('color', '#00e600');
        if(productsFromCart){
            if(productIsAlreadyInCart()) {
                updQuantityProd();
                modalShow();
            } 
            else {
                addItem();
                showCartNum();
                modalShow();
            }
        }
        else{
            addFirstItemToCart();
            showCartNum();
            modalShow();
        }
    } else if(inStock == "Not available") {
        $('#myModal p').html('Product is not available.');
        $('#myModal p').css('color', '#e6001f');
        modalShow();
    }

    function addFirstItemToCart(){
        let products = [];
        products[0] = {
            id : id,
            price : price,
            quantity : 1
        };
        setItem("productsCart", products);
        
    }

    function productIsAlreadyInCart(){
        return productsFromCart.filter(p => p.id == id).length;
    }

    function updQuantityProd(){
        let prodFromLocStor = getItem("productsCart");
        for(let i in prodFromLocStor)
        {
            if(prodFromLocStor[i].id == id) {
                prodFromLocStor[i].quantity++;
                break;
            }      
        }

        setItem("productsCart", prodFromLocStor)
    }

    function addItem(){
        let prodFromLocStor = getItem("productsCart");

        prodFromLocStor.push({
            id : id,
            price : price,
            quantity : 1
        });
        setItem("productsCart", prodFromLocStor);
    }

}

function setItem(name, data){
    localStorage.setItem(name, JSON.stringify(data));
}

function getItem(name){
    return JSON.parse(localStorage.getItem(name));
}

function showCartNum(){
    var prodInCart = getItem("productsCart");
    if(prodInCart != null){
        let numberOfProducts = prodInCart.length;
        $('#cartHereNum').html(`(${numberOfProducts})`);
    }
    else{
        $('#cartHereNum').html(`(0)`);
    }
}



function modalShow() {
    var modal = $('#myModal');
    var span = $('.close');
    
    modal.fadeIn(300).css('display', 'block');
    span.click(function() {
        modal.css('display', 'none');
    });
    modal.click(function(event) {
        let mod = modal.attr('id');
        if (event.target.id == mod) {
            modal.css('display', 'none');
        }
    });
}


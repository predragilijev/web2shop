window.onload = () => {
// $(document).ready(function(){

	$("#sorting").change(filterOnChange);
	$("#amado").change(filterOnChange);
	
	function getData(file, callback){
		$.ajax({
			url: "data/" + file + ".json",
			method: "get",
			dataType: "json",
			success: function(response){
				callback(response);
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
		productArray = brandFiltering(productArray);
		// data = zanroviFilter(data);
		productArray = availableFilter(productArray);
		// data = pretraziKnjige(data);
		productArray = sorting(productArray);
        console.log(productArray);
		let html = "";
		for(let prod of productArray){
			html += `
            <!-- Single Product Area -->
            <div class="col-12 col-sm-6 col-md-12 col-xl-6 promena">
            <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img">
                    <a href="product-details.html">
                        <img src="${prod.img.src}" alt="${prod.img.alt}">
                        <!-- Hover Thumb -->
                        <img class="hover-img" src="img/product-img/product2.jpg" alt="">
                    </a>
                </div>

                <!-- Product Description -->
                <div class="product-description d-flex align-items-center justify-content-between">
                    <!-- Product Meta Data -->
                    <div class="product-meta-data">
                        <div class="line"></div>
                        <p class="product-price">$${prod.price.new}</p>
                        <p>$<s>${prod.price.old}</s></p>
                        <a href="product-details.html">
                            <h6>${prod.name}</h6>
                            <p class="avcolor ${getAvColor(prod.instock)}">${prod.instock}</p>
                        </a>
                    </div>
                    <!-- Ratings & Cart -->
                    <div class="ratings-cart text-right">
                        <div class="ratings">
                            ${getProductStars(prod.stars)}
                        </div>
                        <div class="cart">
                            <a href="cart.html" class=".addToCart" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt="cart"></a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <!-- Single Product Area END -->`;
		}
        $('#prodHere').animate({'opacity': 0}, 300, function(){
            $(this).html(html).animate({'opacity': 1}, 400);    
        });
        // $(".addToCart").click(addToCart);
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
            // $('.avcolor').addClass('text-danger');
            return "text-danger";
        } else {
            // $('.avcolor').addClass('text-primary');
            return "text-primary";
        }
    }

    function sorting(dataArray){
        let chosen = $('#sorting').val();
        if (chosen == "ratingAsc") {
            return dataArray.sort((first,second) => first.stars > second.stars ? 1 : -1);
        } else if (chosen == "ratingDesc") {
            return dataArray.sort((first,second) => first.stars < second.stars ? 1 : -1);
        } else if (chosen == "priceLH") {
            return dataArray.sort((first,second) => first.price.new > second.price.new ? 1 : -1);
        } else if (chosen == "priceHL") {
            return dataArray.sort((first,second) => first.price.new < second.price.new ? 1 : -1);
        } else return dataArray;
	}

    function brandFiltering(dataArray){
		let selectedBrands = [];
		$('.brands:checked').each(function(){
			selectedBrands.push(parseInt($(this).val()));
            console.log(selectedBrands);
		});
		if(selectedBrands.length != 0){
            var smth = dataArray.filter(first => first.brandId.some(second => selectedBrands.includes(second)));
            return smth;
		}
		return dataArray;
	}

    $('#chView').click(function() {
        $('.promena').removeClass('col-xl-6');
    });
    $('#chView2').click(function() {
        if ($('div.col-xl-6').length == false) {
            $('.promena').addClass('col-xl-6');
        }
    });

	function availableFilter(dataArray){
		var dostupnost = $(".stocks:checked").val();
		console.log(dostupnost);
		if(dostupnost == "Available"){
			var smth = dataArray.filter(x => x.instock == "Available");
			console.log(smth);
			return smth;
		}
		return dataArray;
	}

    // function addToCart(e) {
    //     e.preventDefault();
    //     let id = Number(this.dataset.prodid);
    //     let productInCarts = [];
    //     if (!localStorage.getItem("zaKorpu")) {
    //         let obj = {
    //             id: id,
    //             quantity: 1
    //         };
    //         productInCarts.push(obj);
    //         localStorage.setItem("zaKorpu", JSON.stringify(productInCarts));
    //     } else {
    //         let uKorpi = JSON.parse(localStorage.getItem("zaKorpu"))
    //         let postoji = uKorpi.filter(x => x.id == id);
    //         if (postoji.length) {
    //             postoji[0].quantity += 1;
    //             localStorage.setItem("zaKorpu", JSON.stringify(uKorpi));
    //         } else {
    //             let uKorpi = JSON.parse(localStorage.getItem("zaKorpu"));
    //             let obj = {
    //                 id: id,
    //                 quantity: 1
    //             }
    //             uKorpi.push(obj);
    //             localStorage.setItem("zaKorpu", JSON.stringify(uKorpi));
    //         }
    //     }
    //     alert("Device has been added to cart successfully");
    //     brojItemaUKorpi();
    // }

    function filterOnChange(){
        getData("products", showProducts);
    }
}


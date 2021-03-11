console.log("Ulaz u JS");
// window.onload() {}
// ajax callback function

window.onload = () => {
	
	let categories = [];
	let brands = [];

	

	$("#sorting").change(filterOnChange);
	// $(".stanje").change(filterOnChange);
	// $("#pretraga").keyup(filterOnChange);
	
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
		categories = categArray;
        console.log(categories);
		// $('.zanr').change(filterOnChange);
		
		getData("brands", showBrands);
	}
	
	function showBrands(brandArray){
		let html = "";
		for (let brand of brandArray) {
			html += `<div class="form-check">
                        <input class="form-check-input brands" name="brands" type="checkbox" value="${brand.id}" id="amado">
                        <label class="form-check-label" for="amado">${brand.name}</label>
                    </div>`;
		}
        $("#brandHere").html(html);
		brands = brandArray;
		$('.brands').change(filterOnChange);
		
		getData("products", showProducts);
	}
	
	function showProducts(productArray){
		productArray = brandFiltering(productArray);
		// data = zanroviFilter(data);
		// data = dostupnostFilter(data);
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
                            <a href="cart.html" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt=""></a>
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
		// $("#prodHere").html(html);
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

    function filterOnChange(){
        getData("products", showProducts);
    }
    

    // var chosen = $("#slajder .vidljiv");

	// function dohvatiPiscaKnjige(id){
	// 	let imePisca = pisci.filter(b => b.id == id)[0].ime;
	// 	let prezimePisca = pisci.filter(b => b.id == id)[0].prezime;
	// 	return imePisca + " " + prezimePisca;
	// }
	
	// function dohvatiZanroveKnjige(ids){
	// 	let html = "";
	// 	let zanroviKnjige = zanrovi.filter(c => ids.includes(c.id));
	// 	for(let i in zanroviKnjige){
	// 		html += zanroviKnjige[i].naziv;
	// 		if(i != zanroviKnjige.length - 1){
	// 			html += ", ";
	// 		}
	// 	}
	// 	return html;
	// }
	
	// function sort(data){
	// 	const sortType = document.getElementById('sort').value;
	// 	if(sortType == 'asc'){
	// 		return data.sort((a,b) => a.price.novaCena > b.price.novaCena ? 1 : -1);
	// 	}
	// 	return data.sort((a,b) => a.price.novaCena < b.price.novaCena ? 1 : -1);
	// }
	
	// function pisacFilter(data){
	// 	let selectedPisci = [];
	// 	$('.pisac:checked').each(function(el){
	// 		selectedPisci.push(parseInt($(this).val()));
	// 	});
	// 	if(selectedPisci.length != 0){
	// 		return data.filter(x => selectedPisci.includes(x.pisacID));	
	// 	}
	// 	return data;
	// }
	
	// function zanroviFilter(data){
	// 	let selectedZanrovi = [];
	// 	$('.zanr:checked').each(function(el){
	// 		selectedZanrovi.push(parseInt($(this).val()));
	// 	});
	// 	if(selectedZanrovi.length != 0){
	// 		return data.filter(x => x.zanrovi.some(y => selectedZanrovi.includes(y)));	
	// 	}
	// 	return data;
	// }
	// function dostupnostFilter(data){
	// 	var dostupnost = $("input[name='stanje']:checked").val();
	// 	if(dostupnost == "dostupno"){
	// 		return data.filter(x => x.naStanju);
	// 	}if(dostupnost == "nedostupno"){
	// 		return data.filter(x => !x.naStanju);
	// 	}
	// 	return data;
	// }
	// function pretraziKnjige(data){
	// 	let pretragaValue = $("#pretraga").val().toLowerCase();
	// 	if(pretragaValue){
	// 		return data.filter(function(el){
	// 			return el.naslov.toLowerCase().indexOf(pretragaValue) !== -1;
	// 		})
	// 	}
	// 	return data;
	// }
	// function filterChange(){
	// 	getData("knjige", showProducts);
	// }
}


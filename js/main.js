window.onload = () => {
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

    getData("mainPgProducts", showProdMain);
    //<div class="amado-pro-catagory clearfix">
    function showProdMain(dataArray) {
        let html = '';
		for (let prodPart of dataArray) {
			html += `<div class="single-products-catagory clearfix">
                        <a href="shop.html">
                            <img src="${prodPart.img}" alt="${prodPart.name}">
                            <div class="hover-content">
                                <div class="line"></div>
                                <p>From $${prodPart.priceFrom}</p>
                                <h4>${prodPart.name}</h4>
                            </div>
                        </a>
                    </div>`;
		}
        // html += "</div>";
        $("#putProdHere").html(html);
		// getData("brands", showBrands);
    }
}










/* <div class="single-products-catagory clearfix">
    <a href="shop.html">
        <img src="img/bg-img/1.jpg" alt="">
        <div class="hover-content">
            <div class="line"></div>
            <p>From $180</p>
            <h4>Modern Chair</h4>
        </div>
    </a>
</div> */
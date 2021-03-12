    let socialMedArray = ["fa fa-pinterest", "fa fa-instagram", "fa fa-facebook", "fa fa-twitter"];
    let socialMedArray2 = ["https://www.pinterest.com", "https://www.instagram.com", "https://www.facebook.com", "https://www.twitter.com"];
    showSocMed(socialMedArray, socialMedArray2);
    function showSocMed(dataArray, dataArray2) {
        let html = "";
        let i = 0;
        for (let socPart of dataArray) {
            html += `<a href="${dataArray2[i++]}"><i class="${socPart}" aria-hidden="true"></i></a>`;
        }
        $("#soc").html(html);
    }
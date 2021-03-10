console.log("Ulaz u JS");
// ajax callback function
function ajaxCallBack(url, method, result){
    $.ajax({
        url: url,
        method: method,
        dataType: "json",
        success: result,
        error: function(xhr){console.log(xhr);}
    });
}
// PAGING
var trenutniBrojStrane;
// enablePaging();

function enablePaging() {
    trenutniBrojStrane = 1;
    $('.page:not(:first)').hide();
    $('.btnPage:first').addClass('activePage');
    $('.prevPage').addClass('disabled');
    if ($('.page').length == 1) $('.nextPage').addClass('disabled');
    $('#paging a').click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass('disabled')) {
            if ($(this).hasClass('prevPage') || $(this).hasClass('nextPage')) {
                if ($(this).hasClass('prevPage')) {
                    if (trenutniBrojStrane > 1) trenutniBrojStrane--;
                } else if (trenutniBrojStrane < $('.page').length) trenutniBrojStrane++;
                $('.page').hide();
                $(`#page${trenutniBrojStrane}`).show();
                $('.btnPage').removeClass('activePage').eq(trenutniBrojStrane - 1).addClass('activePage');
            } else {
                let page = $(this).data('page');
                $('.page').hide();
                $(`#page${page}`).show();
                $('.btnPage').removeClass('activePage');
                $(this).addClass('activePage');
                trenutniBrojStrane = page;
            }
            if (trenutniBrojStrane == 1) $('.prevPage').addClass('disabled');
            else $('.prevPage').removeClass('disabled');
            if (trenutniBrojStrane == $('.page').length) $('.nextPage').addClass('disabled');
            else $('.nextPage').removeClass('disabled');
        }
    });
}
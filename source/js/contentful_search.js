$(function() {

    var findGetParameter = function(parameterName) {
        var result = null,
        tmp = [];
        location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
        return result;
    }

    $('#sdk-search').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            console.log($(this).val());
            return false;
        }
    });

    $('#sdk-search-trigger').click(function (e) {
        e.preventDefault();
        console.log($('#sdk-search').val());
    });


    $('#sdk-clear-filter-btn').click(function (e) {
        window.location.href = './all_sdk.html';
    });

    if (findGetParameter('f')) {
        $('#sdk-clear-filter-btn').addClass('active')
    }


});
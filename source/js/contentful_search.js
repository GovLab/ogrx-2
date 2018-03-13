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

    $('#sdk-open-button').click(function (e) {
        var open = findGetParameter('open');

        if (open != 'true') {
            open = '?f=true&open=true';
        } else {
            open = '?f=true';
        }

        var category = findGetParameter('category');
        var methodology = findGetParameter('methodology');
        var objective = findGetParameter('objective');
        var type = findGetParameter('type');
        category = (category === null) ? '' : '&category=' + category;
        methodology = (methodology === null) ? '' : '&methodology=' + methodology;
        objective = (objective === null) ? '' : '&objective=' + objective;
        type = (type === null) ? '' : '&type=' + type;

        window.location.href = './all_sdk.html' + open + category + methodology + objective + type;
    });

    var open = findGetParameter('open');
    if (open == 'true') {
        $('#sdk-open-switch').prop('checked', true);
    } else {
        $('#sdk-open-switch').prop('checked', false);
    }


});
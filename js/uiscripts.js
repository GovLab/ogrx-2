// general ad-hoc scripts for UI components
$(function() {

    $('#clear-filter-btn').click(function() {
        $( document ).trigger( 'filter:clearRebind' );
        $('#lunr-filter').val('');

        $('select.b-filter option').prop('selected', false).removeClass('m-active');
        $("#filter-organization option[data-filter='*']").prop('selected', true).addClass('m-active');
        $("#filter-objective option[data-filter='**']").prop('selected', true).addClass('m-active');
        $("#filter-methodology option[data-filter='***']").prop('selected', true).addClass('m-active');
        $("#filter-sector option[data-filter='****']").prop('selected', true).addClass('m-active');
        $("#filter-region option[data-filter='*****']").prop('selected', true).addClass('m-active');
        $("#filter-type option[data-filter='******']").prop('selected', true).addClass('m-active');
        $("#filter-tools option[data-filter='*******']").prop('selected', true).addClass('m-active');
    });

    $('.js-open-modal-multi').click(function (e) {
        e.preventDefault();
        $($(this).attr('data-modal')).addClass('m-active');
        $('#overlay').addClass('m-active');
    });

    // error form ui code
    var confirm = function () {
        var $errorhtml = $('#error-modal-content').clone();
        var $thanks = $('<h3>Thank you!</h3>');
        $thanks.append(
            $('<a class="b-button" id="error-close" href="#">Close</a>').click(function() {
                $('#error-modal').removeClass('m-active');
                $('#overlay').removeClass('m-active');
                $('#error-modal-content').empty().append($errorhtml);
            })
            );
        $('#error-modal-content').empty().append($thanks);
    }

    $(document).on('submit', '#error-form', confirm);

});

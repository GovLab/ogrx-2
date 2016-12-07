// scroll-visible fixed button
$(function() {
    var s, offset = $('.b-fixed-button-trigger').offset().top;

    $(window).scroll(function(e) {

        s = $(window).scrollTop();

        if (s >= offset) {
            $('.b-fixed-button').addClass('m-show');
        } else {
            $('.b-fixed-button').removeClass('m-show');
        }

    });
});
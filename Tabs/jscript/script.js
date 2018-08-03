$(document).ready(function () {

    $('.click').click(function () {

        if (!$(this).hasClass('open')) {
            hideTab($('.tab'));
            showTab($(this));
            $(this).addClass('open');
            $(this).parent().addClass('active');
            console.log($(this).parent());

        }
    });

    function hideTab(tab) {
        tab.hide();
        $('.menu-item').removeClass('active');
        $('.click.open').removeClass('open');

    }

    function showTab(aClick) {
        var windowId = aClick.data('target');
        $(windowId).show(500);
    }

});




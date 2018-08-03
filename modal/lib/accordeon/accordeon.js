$(document).ready(function () {

    $('.accordeon-header').click(function () {
        if (!$(this).hasClass('open')) {
            closeAllAccordeonText($(this).closest('.accordeon'));
            openAccordeonText($(this).next('.accordeon-text'));
            $(this).addClass('open');
        }
    });

    function closeAllAccordeonText(accordeon) {
        accordeon.find('.accordeon-header.open + .accordeon-text').slideUp();
        accordeon.find('.accordeon-header.open').removeClass('open');
    }

    function openAccordeonText(accordeonText) {
        accordeonText.slideDown();
    }

});
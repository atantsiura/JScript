$(document).ready(function () {

});

var $anchors = $('a[href^="#"]').not('[href="#"]');

$anchors.click(function (e) {
    e.preventDefault();

    var id = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 500);
});
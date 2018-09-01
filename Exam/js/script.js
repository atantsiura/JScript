$(document).ready(function () {

    $('.slickholder').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        slide: ".slickitem",
        dots: true
    });

    $('.isotope').isotope({
        // options
        itemSelector: '.isotope_item',
        layoutMode: 'masonry'
    });



    var mapHolder = document.getElementById('map'),
        lat = 49.568583,
        lon = 34.585416;

    displayMap(mapHolder, lat, lon);

    function displayMap(mapHolder, lat, lon) {
        var center = new google.maps.LatLng(lat, lon),
            marker = new google.maps.Marker({
                position: center,
                animation: google.maps.Animation.BOUNCE
            }),
            mapProp= {
                center: center,
                zoom: 16,
                disableDefaultUI: true
            };

        var map = new google.maps.Map(mapHolder, mapProp);

        marker.setMap(map);
        $(mapHolder).show();
    }

    var $anchors = $('a[href^="#"]').not('[href="#"]');

    $anchors.click(function (e) {
        e.preventDefault();

        var id = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 1000);
    });
});
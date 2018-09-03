$(document).ready(function () {

    $('.slickholder').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        slide: ".slickitem",
        //appendDots: $(".dotholder"),
        dots: true

    });

    $('.isotope').isotope({
        // options
        layoutMode: 'masonry',
        itemSelector: '.isotope_item'
    });


    $('.filter-button').click(function () {
        var filterValue = $(this).data('filter');

        $('.isotope').isotope({
            filter: filterValue
        });
    });


    var mapHolder = document.getElementById('map'),
        lat = 49.569483,
        lon = 34.586399,
        latmarker = 49.568583,
        lonmarker = 34.585416;

    displayMap(mapHolder, lat, lon);

    function displayMap(mapHolder, lat, lon) {
        var center = new google.maps.LatLng(lat, lon),
            markerplace = new google.maps.LatLng(latmarker, lonmarker),
            marker = new google.maps.Marker({
                position: markerplace,
                icon:'../img/favicon.png',
                animation: google.maps.Animation.BOUNCE
            }),
            mapProp= {
                center: center,
                zoom: 15.9,
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


    function isotopFilter(data) {
        $grid.isotope({ filter: data });
    }
});
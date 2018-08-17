$(document).ready(function () {

    var    convertArray = {
        '01d': 'wi-day-sunny',
        '02d': 'wi-day-cloudy',
        '03d': 'wi-cloud',
        '04d': 'wi-day-hail',
        '09d': 'wi-day-showers',
        '10d': 'wi-rain',
        '11d': 'wi-thunderstorm',
        '13d': 'wi-snow',
        '50d': 'wi-day-haze',
        '01n': 'wi-night-clear',
        '02n': 'wi-night-partly-cloudy',
        '03n': 'wi-night-alt-cloudy',
        '04n': 'wi-night-alt-hail',
        '09n': 'wi-night-alt-showers',
        '10n': 'wi-night-alt-rain',
        '11n': 'wi-night-alt-snow-thunderstorm',
        '13n': 'wi-night-snow',
        '50n': 'wi-night-cloudy-gusts'
    };
    var mapElement = document.getElementById("map");
    $(mapElement).hide();

// Reading city from input field
    var cityFromUserInput;

    $('#city_button').click(function () {
        cityFromUserInput = $('#city_input').val();
        console.log(cityFromUserInput);
        console.log('click');
        $('#city_input').val('');
        //Creating AJAX request from the city, got from user. Only in Ukraine, at the moment. The next upgrade would be the
        //object with the cities ID and cities names, for big cities of Ukraine.
        if (cityFromUserInput) {
            var appId = '47e5ad34afbd0cad1fbeabe4bed16e64',
                url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityFromUserInput + ',ua&units=metric&lang=ua&APPID=' + appId;
            request = $.ajax({
                url: url,
                method: "GET",
                dataType: "json"
            });
            url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityFromUser + ',ua&units=metric&lang=ua&APPID=' + appId;
            request.done(function (msg) {
                display(msg);
                //showMap(mapElement, msg.city.coord);

            });
            request.fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
            $('.slick_holder').slick({
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: true
            });
        } else {
            alert('Название города не введено');
            }

    });
    console.log($('#city_button'));

    var //appId = '47e5ad34afbd0cad1fbeabe4bed16e64',
        //url = 'https://api.openweathermap.org/data/2.5/forecast?q=Kyrylivka,ua&units=metric&lang=ua&APPID=' + appId,
        //request = $.ajax({
        //    url: url,
        //    method: "GET",
        //    dataType: "json"
        //}),
        $city = $('#city'),
        $cityDetails = $('.city_details'),
        cityFromUser,
        $weather = $('#weatherpart');




    //request.fail(function( jqXHR, textStatus ) {
    //    alert( "Request failed: " + textStatus );
    //});

    function display(msg) {
        var cityData = msg.city,
            weather = msg.list,
            weatherHtml = '';

        $cityDetails.find('#city').text(cityData.name);
        $cityDetails.find('.city_country').text('Country: ' + cityData.country);
        $cityDetails.find('.city_coords').text('Coordinates: ' + cityData.coord.lon + ' / ' + cityData.coord.lat);
        $cityDetails.find('.city_population').text('Population: ' + cityData.population);

        for(var i = 0; i < weather.length; i++) {
            weatherHtml += '<div class = "slider_element">' + weather[i].dt_txt + ' ' + weather[i].main.temp + '&deg;C' + ' ';
            weatherHtml += '<i class="wi ' + changeIcon(weather[i].weather[0].icon) + '"></i>' + ' ' + weather[i].weather[0].description + '</div>';
        }

        $weather.html(weatherHtml);
    }

    function showMap(mapElement, coords) {
        var center = new google.maps.LatLng(coords.lat, coords.lon);

        var marker = new google.maps.Marker({
            position: center,
            animation: google.maps.Animation.BOUNCE
        });

        var mapProp= {
            center: center,
            zoom: 5
        };
        var map =new google.maps.Map(document.getElementById("map"), mapProp);
        marker.setMap(map);
        $(mapElement).show();
    }

    function changeIcon(icon) {
        for (var key in convertArray) {
            //console.log(key);
            //console.log(icon);
            if (key === icon) {
                //console.log('true');
                return convertArray[key]
            }
        }
    }

    //$('.slick_holder').slick({
    //    slidesToShow: 3,
    //    slidesToScroll: 3,
    //    arrows: true
    //});

});
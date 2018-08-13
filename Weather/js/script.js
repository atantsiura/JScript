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

    cityFromUser = prompt('Your city');

    if (cityFromUser) {
        var appId = '47e5ad34afbd0cad1fbeabe4bed16e64',
            url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityFromUser + ',ua&units=metric&lang=ua&APPID=' + appId;
            request = $.ajax({
                url: url,
                method: "GET",
                dataType: "json"
            }),
        console.log(cityFromUser);
            console.log(url);
        url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityFromUser + ',ua&units=metric&lang=ua&APPID=' + appId;
        request.done(function(msg) {
            console.log(msg);
            display(msg);
        //showMap(mapElement, msg.city.coord);
        });
    }


    //request.done(function(msg) {
    //    console.log(msg);
    //    display(msg);
        //showMap(mapElement, msg.city.coord);
    //});

    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });

    function display(msg) {
        var cityData = msg.city,
            weather = msg.list,
            weatherHtml = '';

        $cityDetails.find('#city').text(cityData.name);
        $cityDetails.find('.city_country').text('Country: ' + cityData.country);
        $cityDetails.find('.city_coords').text('Coordinates: ' + cityData.coord.lon + ' / ' + cityData.coord.lat);
        $cityDetails.find('.city_population').text('Population: ' + cityData.population);

        for(var i = 0; i < weather.length; i++) {
            weatherHtml += '<p>' + weather[i].dt_txt + ' ' + weather[i].main.temp + '&deg;C' + ' ';
            weatherHtml += '<i class="wi ' + changeIcon(weather[i].weather[0].icon) + '"></i>' + ' ' + weather[i].weather[0].description + '"></p>';
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

    function objectLenght(obj) {
        var counter = 0;
        for (var key in obj) {
            console.log(key);
            counter++;
        }
        return counter;
    }

    //console.log(objectLenght(convertArray));
});
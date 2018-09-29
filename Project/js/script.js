$(document).ready(function () {

// Animated counter in section counter. Using JS library
    var target_block = $(".counter");
    var blockStatus = true;
    $(window).scroll(function () {
        var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
        if (scrollEvent && blockStatus) {
            blockStatus = false;
            $(".spincrement").spincrement({
                thousandSeparator: "",
                duration: 3000
            });
        }
    });

    //Form submit block to prevent page refreshing

    $('#submitForm').click(function (e) {
        //e.preventDefault();
    });

    //AJAX request information about people for TEAM section from randomuser.me

    var url = 'https://randomuser.me/api/?results=6&gender=male&nat=us&inc=name,email,phone,cell,picture&noinfo';
    request = $.ajax({
        url: url,
        method: "GET",
        dataType: "json"
    });

    request.done(function (msg) {
        display(msg);
        $('.slider-ajax').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false,
            slide: ".ajax-slider-item",
            dots: true
        });

    });
    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });

    //Slider Team Members on click details modal window
    //var sliderItems = $('.ajax-slider-item');
    $('.slider-ajax').click(function (e) {
        var modale = $('#teamMemberInfo');
        var modaleMemberDiv = modale.find('.modal-content');
        modale.addClass('in');
        modale.modal('show');
        console.log('click');
        //var div = e.target;
        var dest = $(e.target);
        dest = dest.closest('.ajax-slider-item');
        console.log(dest);
        //dest = dest.parent().parent();

        var details = {};
        details.src =  dest.find('img').attr("src");
        details.name = dest.find('h4').text();
        details.specialization = dest.find('h5').text();
        details.email = dest.find('.teamMemberDetails').attr("data-email");
        details.phone = dest.find('.teamMemberDetails').attr("data-phone");
        details.cell = dest.find('.teamMemberDetails').attr("data-cell");
        console.log(details);
        modaleMemberDiv.find('img').attr("src", dest.find('img').attr("src"));
        modaleMemberDiv.find('h4').text(dest.find('h4').text());
        modaleMemberDiv.find('h5').text(dest.find('h5').text());
        modaleMemberDiv.find('.email').text(dest.find('.teamMemberDetails').attr("data-email"));
        modaleMemberDiv.find('.phone').text(dest.find('.teamMemberDetails').attr("data-phone"));
        modaleMemberDiv.find('.cell').text(dest.find('.teamMemberDetails').attr("data-cell"));

        //console.log(modaleMemberDiv.find('img'));

    });



    //Isotope layout

    $('.isotope').isotope({
        // options
        layoutMode: 'masonry',
        itemSelector: '.isotope-item'
    });

    //First slider initiation

    $('.slider-first').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        slide: ".slider-item",
        //appendDots: $(".dotholder"),
        dots: false
    });

    //Second slider initiation

    $('.slider-two').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        slide: ".slider-item",
        //appendDots: $(".dotholder"),
        dots: true
    });

    //Smooth scroll on links animation

    var $anchors = $('a[href^="#"]').not('[href^="#collapse"]').not('[href="#"]');

    $anchors.click(function (e) {
        e.preventDefault();

        var id = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 1000);
    });

    //Google Map initiation and options

    var mapHolder = document.getElementById('map'),
        lat = 47.608,
        lon = -122.335,
        latmarker = 47.609689,
        lonmarker = -122.338956;

    displayMap(mapHolder, lat, lon);


    function displayMap(mapHolder, lat, lon) {
        var center = new google.maps.LatLng(lat, lon),
            markerplace = new google.maps.LatLng(latmarker, lonmarker),
            marker = new google.maps.Marker({
                position: markerplace,
                icon:'img/HOME.svg',
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

    //Function for Ajax-request operating
    function display(msg) {
        var teamArray = msg.results,
            teamMemberInfo = {},
            teamLocalImg = [
                'img/team1.jpg',
                'img/team2.jpg',
                'img/team3.jpg',
                'img/team4.jpg',
                'img/team5.jpg',
                'img/team6.jpg'
            ],
            teamSpecialization = [
                'Graphic Design',
                'Branding/UX design',
                'Developer',
                'Developer',
                'WEB Design',
                'Photographer'
            ],

            slickItem = document.createElement('div');
        var template = _.template('<div class="ajax-slider-item"><div  class="img-wrapper">\n' +
            '            <img class="img-responsive teamMemberPhoto" src="<%- src %>" alt="Team member image">\n' +
            '            <div class="hover-effect">\n' +
            '                <div class="text-holder">\n' +
            '                    <i class="fas fa-hand-point-up"></i>\n' +
            '                    <h6>Click for details</h6>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="hover-green">\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <h4 class="name"><%- name %></h4>\n' +
            '        <h5><%- specialization %></h5>\n' +
            '        <div class="teamMemberDetails" data-email="<%- email %>" data-phone="<%- phone %>" data-cell="<%- cell %>"></div></div>');

        slickItem.className = 'slider-item';
        var destination = $('.slider-ajax');



        for (var i=0; i < teamArray.length; i++) {
            teamMemberInfo.src=teamArray[i].picture.large;
            teamMemberInfo.name=teamArray[i].name.first + ' ' + teamArray[i].name.last;
            teamMemberInfo.email=teamArray[i].email;
            teamMemberInfo.cell=teamArray[i].cell;
            teamMemberInfo.phone=teamArray[i].phone;
            slickItem.innerHTML = template({'src': teamLocalImg[i], 'name': teamMemberInfo.name, 'specialization':teamSpecialization[i], 'email': teamMemberInfo.email, 'phone': teamMemberInfo.phone, 'cell': teamMemberInfo.cell});
            destination.append(slickItem.innerHTML);
        }
        //slickItem.innerHTML = template({'src': teamMemberInfo.src, 'name': teamMemberInfo.name, 'email': teamMemberInfo.email, 'phone': teamMemberInfo.phone, 'cell': teamMemberInfo.cell});
        //console.log(slickItem);
        //$('#test').append(slickItem);
    }
});
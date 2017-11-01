var doc = $(document);

doc.ready(function(){

	setTimeout(function(){
		if ($('video').length){
 			$('video').get(0).play();
		}
	}, 0)

	//fix float menu
	setTimeout(function(){
		header_height_fix();
		$(window).resize(header_height_fix)
	},0)


	$('.city-block .custom-select').select2({
		dropdownParent: $('header')
	});

	$('.custom-select-modal').select2({
		width: '100%',
		dropdownParent: $('#office-city')
	});

	$('#city-change').on('select2:change')


	$('.custom-select-modal').on('select2:select', function(e){
		if ($('.adress').length){
			$('.adress').val('');
		}
	})

	var owlMain = $('.main-slider .owl-carousel');

    owlMain.owlCarousel({
        items:1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 6500
    });

  	$('.main-slider-timer').addClass('fill');

    owlMain.on('translated.owl.carousel', function(){
        $('.main-slider-timer').removeClass('fill');
        setTimeout(function(){
           $('.main-slider-timer').addClass('fill');
        },100);
    });

    $('form').on('submit', function(e){
		e.preventDefault();
		var form = $(this);
		var error = checkFields(form);
		if (error){
			console.log('error');
		} else {
			if (form.hasClass('big-form')) {
				console.log(1);
				form.fadeOut(300, function(){
					$('.big-succes').fadeIn(300);
				})
			}
		}
	});

	doc.on('keyup', '.required', function(){
		$(this).removeClass('error');
		$(this).attr('placeholder', '');
	});

	var markers = [{lat:55.74896697871972, lng:37.600305423681675},{lat:55.76635369983922,lng:37.593782291357456},{lat:55.76278039560151,lng:37.617299900000035},{lat:55.77214755116835,lng:37.65094552988285},{lat:55.74751773539566,lng:37.65214715952152}];
	if ($('#map_section').length){
		setTimeout(function(){
			initMap(markers);
		}, 500);
	}

	doc.on('click', '.show-phones', function(e){
		e.preventDefault();
		$(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
		$(this).find('p').text(function(i, text){
			return text == 'показать все телефоны' ? 'скрыть все телефоны' : 'показать все телефоны';
		});
		$(this).parent().find('.invisible-phone').slideToggle('300');
	})

	$('.office-wrapper-block').mCustomScrollbar({
		theme: 'minimal-dark'
	});

	doc.on('click', '.office-street .mobile-show', function(e){
		e.preventDefault();
		$('.maps-block').toggleClass('active');
	});

	doc.on('click', '.mobile-map-close', function(e){
		e.preventDefault();
		$('.maps-block').toggleClass('active');
	})

	doc.on('click', '.faq-title', function(e){
		e.preventDefault();
		$(this).parent().toggleClass('active');
		$(this).parent().find('p').slideToggle(300);
	})

	if ($('input[type="tel"]').length){
		$('input[type="tel"]').mask('+7 (000) 000-00-00');
	}

	$('#money_on_card').change(function(){
		if ($(this).prop('checked')){
			$(this).parents('.form-block').find('input[type="text"]').addClass('disabled');
			$(this).parents('.form-block').find('input[type="text"]').prop('disabled', true);
			$('.custom-select-modal').prop('disabled', true);
		} else {
			$(this).parents('.form-block').find('input[type="text"]').removeClass('disabled');
			$(this).parents('.form-block').find('input[type="text"]').prop('disabled', false);
			$('.custom-select-modal').prop('disabled', false);
		}
	})

	$('#accept').change(function(){
		if ($(this).prop('checked')){
			$(this).parents('.lone-calc').find('input[type="submit"]').prop('disabled', false);
		} else {
			$(this).parents('.lone-calc').find('input[type="submit"]').prop('disabled', true);
		}
	})

	if ($('#map_office').length){
		$('.show-on-map').click(function(){
			setTimeout(function(){
				initMap_lone();
			}, 300);
		})
	}

	if ($('#range').length){
		$('#range').ionRangeSlider({
			type: 'single',
			min: 3000,
			max: 70000,
			step: 1000,
		    grid: false,
		    onStart: function(data){
		    	$('.summ').text(data.from_pretty + ' .-')
		    },
		    onChange: function(data){
		    	$('.summ').text(data.from_pretty + ' .-')
		    }
		});
	}


	doc.on('click', '.forgot-btn a', function(){
		if ($(this).parents('.login').length){
			$('.small-modal .login').fadeOut(300, function(){
				$('.small-modal .forgot-login').fadeIn(300);
			})
		} else {
			$('.small-modal .forgot-login').fadeOut(300, function(){
				$('.small-modal .login').fadeIn(300);
			})
		}
	})

	$(function () {
        let outerDiv = $('.divvideo');
        let videoTag = outerDiv.find('video');
        $(window).resize(resize);
        resize();
        function resize() {
            let width = outerDiv.width();
            let height = outerDiv.height();
            let aspectW = 16;
            let aspectH = 9;
            let scaleX = width / aspectW;
            let scaleY = height / aspectH;
            let scale = Math.max(scaleX, scaleY);
            let w = Math.ceil(aspectW * scale);
            let h = Math.ceil(aspectH * scale);
            let x = 0;
            let y = 0;
            if (w > width) x = -(w - width) * 0.5;
            if (h > height) y = -(h - height) * 0.5;
            videoTag.css({
                width: w,
                height: h,
                top: y,
                left: x
            });
        }
    });

    if ($('.text-menu').length){
    	textCategorySelect();
    	$(window).resize(textCategorySelect)
    }

}); // end of ready

function textCategorySelect(){
	var $ul = $('.text-menu > ul'),
		$select = $('.mobile-select').select2();
	if ($(window).width() < 800){
		$ul.css('display', 'none');
		$select.select2({
			minimumResultsForSearch: Infinity,
			width: '100%'
		});
	} else {
		$ul.css('display', 'block');
		$select.select2("destroy");
	}
}
// End ready
function header_height_fix(){
	var h = $('header').outerHeight(true);
	var f_h = $('footer').outerHeight(true);
	$('.footer-height').height(f_h);
	$('.header-height').height(h);
}

function checkFields(form){
	var error = false;
	form.find('.required').each(function(){
		if ($(this).val() == ''){
			$(this).addClass('error');
			$(this).attr('placeholder', 'Неправильно заполненное поле');
			error = true;
		}
	})
	return error;
}


function initMap_lone(){
	var center = {lat: 55.755826, lng: 37.617299900000035};
	var map = new google.maps.Map(document.getElementById('map_office'), {
      	zoom: 13,
      	center: center,
      	disableDefaultUI: true,
        scrollwheel: false,
    	zoomControl: true
    });

	var marker_icon = {
		url: 'img/marker_icon.svg',
		scaledSize: new google.maps.Size(126, 150),
		origin: new google.maps.Point(0, 0)
	}
	var geocoder = new google.maps.Geocoder();
	let marker, i;
	var markers = [{lat:55.74896697871972, lng:37.600305423681675},{lat:55.76635369983922,lng:37.593782291357456},{lat:55.76278039560151,lng:37.617299900000035},{lat:55.77214755116835,lng:37.65094552988285},{lat:55.74751773539566,lng:37.65214715952152}];
	for (i = 0; i < markers.length; i++){
		marker = new google.maps.Marker({
            position: markers[i],
            icon: marker_icon,
            map: map,
            optimized: false
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            	var val = $('#adress option:eq('+i+')').val();
            	$('#adress').val(val).trigger('change');
            	$('#office-city .close').click();
            }
        })(marker, i));
	}

}

function initMap(markers){
	var center = {lat: 55.755826, lng: 37.617299900000035};
	var map = new google.maps.Map(document.getElementById('map'), {
      	zoom: 13,
      	center: center,
      	disableDefaultUI: true,
        scrollwheel: false,
    	zoomControl: true
    });

	var marker_icon = {
		url: 'img/marker_icon.svg',
		scaledSize: new google.maps.Size(126, 150),
		origin: new google.maps.Point(0, 0)
	}

	var marker_icon_active = {
		url: 'img/marker_icon_active.svg',
		scaledSize: new google.maps.Size(126, 150),
		origin: new google.maps.Point(0, 0)
	}

	let marker, i;
	var arMarkers = [];

	for (i = 0; i < markers.length; i++){
		if (i == 0){
			marker = new google.maps.Marker({
	            position: markers[i],
	            icon: marker_icon_active,
	            map: map,
	            optimized: false
	        });
		} else {
			marker = new google.maps.Marker({
	            position: markers[i],
	            icon: marker_icon,
	            map: map,
	            optimized: false
	        });
		}

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            	var latLng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
            	for (var j = 0; j < arMarkers.length; j++){
            		arMarkers[j].setIcon('img/marker_icon.svg');
            	}
              	marker.setIcon('img/marker_icon_active.svg');
              	map.panTo(latLng);
              	$('.office-row').removeClass('active');
              	$('.office-row').eq(i).addClass('active');
              	$('.office-wrapper-block').mCustomScrollbar('scrollTo', $('.office-row:eq('+i+')'));
            }
        })(marker, i));

		$('.office-row').click(function(){
			var id = $(this).index()-1;
			new google.maps.event.trigger(arMarkers[id], 'click');
		})

		arMarkers.push(marker);
	}
}
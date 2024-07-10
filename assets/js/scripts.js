
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    /*
        Wow
    */
    new WOW().init();
    
    /*
	    Countdown initializer
	*/
	var now = new Date();
	var countTo = 25 * 24 * 60 * 60 * 1000 + now.valueOf();    
	$('.timer').countdown(countTo, function(event) {
		$(this).find('.days').text(event.offset.totalDays);
		$(this).find('.hours').text(event.offset.hours);
		$(this).find('.minutes').text(event.offset.minutes);
		$(this).find('.seconds').text(event.offset.seconds);
	});
	
	/*
	    Subscription form
	*/
	$('.success-message').hide();
	$('.error-message').hide();
	
	jQuery(document).ready(function() {

		function validateEmail(email) {
			var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return re.test(email);
		}
	
		$('.subscribe form').submit(function(e) {
			e.preventDefault();
			var email = $('.subscribe-email').val().trim();
			
			if (!validateEmail(email)) {
				$('.success-message').hide();
				$('.error-message').hide();
				$('.error-message').html('Please enter a valid email address.');
				$('.error-message').fadeIn();
				return;
			}
	
			var postdata = $('.subscribe form').serialize();
			$.ajax({
				type: 'POST',
				url: 'assets/subscribe.php',
				data: postdata,
				dataType: 'json',
				success: function(json) {
					console.log('Response:', json); // Log the response
					if (json.valid === 0) {
						$('.success-message').hide();
						$('.error-message').hide();
						$('.error-message').html(json.message);
						$('.error-message').fadeIn();
					} else {
						$('.error-message').hide();
						$('.success-message').hide();
						$('.subscribe form').hide();
						$('.success-message').html(json.message + ' You have successfully subscribed.');
						$('.success-message').fadeIn();
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.error('AJAX Error:', textStatus, errorThrown); // Log the error
					$('.success-message').hide();
					$('.error-message').hide();
					$('.error-message').html('An error occurred. Please try again later.');
					$('.error-message').fadeIn();
				}
			});
		});
	
	});	
    
});


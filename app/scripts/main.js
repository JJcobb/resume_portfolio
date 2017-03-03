$(document).ready(function() {

	/* Page layout */
	$('#fullpage').fullpage({

		navigation: true,
		normalScrollElements: '.modal'

	});

	/* Materialize Carousel */
    $('.carousel').carousel({

     	indicators: true

    });

    //$('.carousel.carousel-slider').carousel({fullWidth: true});


    /* Materialize Modal */
    $('.modal').modal({

    });



    $('#contact-form').on('submit', function(e){

		e.preventDefault();

		var form = $(this);

		$(form).fadeOut(500, function(){


            Materialize.toast('Thanks for contacting! We will be in touch soon.', 4000, 'dialog-center', function(){

            	$(form).find(':input').val('');

				$(form).fadeIn(500);    

				$("#toast-container").toggle();

            });
        });

	});


	/*$('.carousel-item').on('hover', function(){

		$(this).filter('.active').addClass('tooltipped');
	});*/

	



});
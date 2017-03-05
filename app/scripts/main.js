$(document).ready(function() {

	/* Page layout */
	$('#fullpage').fullpage({

		navigation: true,
		/*anchors:['intro', 'education', 'skills', 'experience', 'portfolio', 'contact'],*/
		normalScrollElements: '.modal',
		onLeave: function(index, nextIndex, direction){

			if (nextIndex == 1) {
			   $('#pieChart').addClass('animated rollOut');

			}

			if (nextIndex == 2) {
				$('#pieChart').removeClass('animated rollOut');
			    $('#pieChart').addClass('animated rollIn');

			    $('#segmentText').addClass('animated shake');
			}

			if (nextIndex == 3) {
			    $('#pieChart').addClass('animated rollOut');

			    $('#skills .section-title').addClass('animated zoomIn');
			}

			if (nextIndex == 4) {
				$('#pieChart').addClass('animated rollOut');

			    $('.sapUiBody').addClass('animated bounceInDown');
			}

			if (nextIndex == 5) {
				$('#pieChart').addClass('animated rollOut');
				
				$('.carousel').addClass('animated fadeInUpBig')
			}

			if (nextIndex == 6) {
				$('#pieChart').addClass('animated rollOut');
				
				$('#contact-form').addClass('animated slideInLeft');
			}

		}

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

            	$(form).find(':input').val('').removeClass('valid');

				$(form).fadeIn(500);    

				$('#toast-container').toggle();

            });
        });


		/*$('.validate', this).each(function(){

			if( $(this).is('.valid') ){

				var form = $(this);

				$(form).fadeOut(500, function(){


		            Materialize.toast('Thanks for contacting! We will be in touch soon.', 4000, 'dialog-center', function(){

		            	$(form).find(':input').val('').removeClass('valid');

						$(form).fadeIn(500);    

						$('#toast-container').toggle();

		            });
		        });

			}
			else{
				$(this).addClass('invalid');
			}

		});*/



		/*if( $('.validate', this).is('.valid') ){

			var form = $(this);

			$(form).fadeOut(500, function(){


	            Materialize.toast('Thanks for contacting! We will be in touch soon.', 4000, 'dialog-center', function(){

	            	$(form).find(':input').val('').removeClass('valid');

					$(form).fadeIn(500);    

					$('#toast-container').toggle();

	            });
	        });

		}
		else{
			$(this).each(function(){

				$(this).addClass('invalid');
			});
		}*/


	});


	/*$('.carousel-item').on('hover', function(){

		$(this).filter('.active').addClass('tooltipped');
	});*/

	$('#intro .section-title').textillate();

	$('#intro .section-title').on('inAnimationEnd.tlt', function () {

		$('.sub-intro').css('opacity', '1');
		
		$('.sub-intro').textillate()

	});

	/*$('.sub-intro:eq(0)').on('inAnimationEnd.tlt', function () {

		$('.sub-intro:eq(1)').css('opacity', '1');
		
		$('.sub-intro:eq(1)').textillate()
		
	});*/


	$(document).on('click', '#sidenav', '.drag-target', function(e) {
	//in responsive mode?
	    if($('.fp-responsive').length){

			$('body').css('overflow', 'visible');

		}

	});


	$('.button-collapse').sideNav({

		closeOnClick: true,
		draggable: true
	});



	if( $('#pieChart').css('max-width') == '100%' ){

		$('#resetPie').removeClass('btn-large').addClass('btn-med');
	};

});
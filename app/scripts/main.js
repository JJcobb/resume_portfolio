$(document).ready(function() {


	/* Materialize Carousel */
    // $('.carousel').carousel({
    //  	indicators: true
    // });


	$('#portfolio .carousel.carousel-slider').carousel({
    	fullWidth: true,
    	indicators: true 
    });

    $('#observer .carousel.carousel-slider').carousel({
    	fullWidth: true,
    	indicators: true 
    });

    $('#nfl .carousel.carousel-slider').carousel({
    	fullWidth: true,
    	indicators: true 
    });

    $('#scoop .carousel.carousel-slider').carousel({
    	fullWidth: true,
    	indicators: true 
    });

    $('#oconee .carousel.carousel-slider').carousel({
    	fullWidth: true,
    	indicators: true 
    });

    $('#resume .carousel.carousel-slider').carousel({
    	fullWidth: true,
    	indicators: true 
    });





	var autoplay_interval;


    function autoplay(this_carousel) {

	    autoplay_interval = setInterval(function(){
							    $(this_carousel).carousel('next');
							}, 6000);

	};


	function pause_autoplay(){

		if(autoplay_interval){
			clearInterval(autoplay_interval);
		}

	};


	


	/* Remove loader */
	$('#loader').fadeOut(400, function(){
		$('#loader').remove();
	});



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
				/* Resume Page */
				$('#pieChart').removeClass('animated rollOut');
			    $('#pieChart').addClass('animated rollIn');
 
			    $('#segmentText').addClass('animated shake'); 


			    /* Portfolio Page */
			    $('#observer .black-screen').addClass('animated fadeOut'); 

			    $('#observer .project-info').addClass('animated slideInLeft');
			}

			if (nextIndex == 3) {
			    $('#pieChart').addClass('animated rollOut');

			    $('#skills .section-title').addClass('animated zoomIn');


			    /* Portfolio Page */
			    $('#nfl .black-screen').addClass('animated fadeOut');

			    $('#nfl .project-info').addClass('animated slideInRight');
			}

			if (nextIndex == 4) {
				$('#pieChart').addClass('animated rollOut');

			    $('.sapUiBody').addClass('animated bounceInDown');


			    /* Portfolio Page */
			    $('#scoop .black-screen').addClass('animated fadeOut');

			    $('#scoop .project-info').addClass('animated slideInLeft');
			}

			if (nextIndex == 5) {
				$('#pieChart').addClass('animated rollOut');
				
				//$('#portfolio .carousel').addClass('animated fadeInUpBig');

				$('#portfolio .black-screen').addClass('animated fadeOut');

				$('#portfolio .project-info').addClass('animated slideInLeft');

				autoplay('#portfolio .carousel');


				/* Portfolio Page */
			    $('#oconee .black-screen').addClass('animated fadeOut');

			    $('#oconee .project-info').addClass('animated slideInRight');
			}

			if (nextIndex == 6) {
				$('#pieChart').addClass('animated rollOut');
				
				$('#contact #contact-form').addClass('animated slideInUp');


				/* Portfolio Page */
				$('#resume .black-screen').addClass('animated fadeOut');

			    $('#resume .project-info').addClass('animated slideInLeft');
			}

			if (nextIndex == 7) {
				$('#contact-form').addClass('animated slideInUp');
			}


			if (nextIndex != 5){
				pause_autoplay();
			}

		}

	});




    /* Materialize Modal */
    $('.modal').modal({

    });



    $('#contact-form').on('submit', function(e){

		e.preventDefault();

		var form = $(this);



		/*var post_url = form.attr('action');

	    var post_data = form.serialize();

	    $.ajax({
	        type: 'POST',
	        url: post_url,
	        data: post_data,
	        success: function(msg) {

        		if(msg == 'Success'){


        			$(form).fadeOut(500, function(){

			            Materialize.toast('Thanks for contacting! We will be in touch soon.', 4000, 'dialog-center', function(){

			            	$(form).find(':input').val('').removeClass('valid');

							$(form).fadeIn(500);    

							$('#toast-container').toggle();

			            });
			        });


        		}
        		else if(msg == 'Email error'){

        			Materialize.toast('Error. Please enter a valid email address.', 4000, 'dialog-center');
        		}
        		else if(msg == 'Error'){

        			Materialize.toast('Sorry! There was an error submitting the form. Please try again...', 4000, 'dialog-center');
        		}


	        }
	    });*/




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

	$('#intro .section-title').not('.section-title-small').textillate();

	$('#intro .section-title').on('inAnimationEnd.tlt', function () {

		$('.sub-intro').css('opacity', '1');
		
		$('.sub-intro').textillate();

		$('.section-title-small').textillate();
		$('.section-title-small').css('opacity', '1');

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




	if( $(window).width() < 700 ){

		$('.carousel .carousel-item')
			.removeClass('tooltipped')
			.attr('data-position', '')
			.attr('data-delay', '')
			.attr('data-tooltip', '')
			.attr('data-tooltip-id', '');

	}



});
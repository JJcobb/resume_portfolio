$(document).ready(function() {


	/* Materialize Carousel */
    // $('.carousel').carousel({
    //  	indicators: true
    // });


	// $('#portfolio .carousel.carousel-slider').carousel({
 //    	fullWidth: true,
 //    	indicators: true 
 //    });

 //    $('#observer .carousel.carousel-slider').carousel({
 //    	fullWidth: true,
 //    	indicators: true 
 //    });

 //    $('#nfl .carousel.carousel-slider').carousel({
 //    	fullWidth: true,
 //    	indicators: true 
 //    });

 //    $('#scoop .carousel.carousel-slider').carousel({
 //    	fullWidth: true,
 //    	indicators: true 
 //    });

 //    $('#oconee .carousel.carousel-slider').carousel({
 //    	fullWidth: true,
 //    	indicators: true 
 //    });

 //    $('#resume .carousel.carousel-slider').carousel({
 //    	fullWidth: true,
 //    	indicators: true 
 //    });


    $('.carousel.carousel-slider').carousel({
    	fullWidth: true,
    	indicators: true 
    });


    var setCarouselHeightBackup = function(this_carousel) {
      var firstImage = this_carousel.find('.carousel-item img').first();
      if (firstImage.length) {
        if (firstImage.prop('complete')) {
          this_carousel.css('height', firstImage.height());
        } else {
          firstImage.on('load', function(){
            this_carousel.css('height', $(this).height());
          });
        }
      } else {
        var imageHeight = this_carousel.find('.carousel-item').first().height();
        this_carousel.css('height', imageHeight);
      }
    };


    $('.carousel-slider').each(function(){

    	setCarouselHeightBackup( $(this) );
    })





	//var autoplay_interval;

	var autoplay_intervals = [];


    function autoplay(this_carousel, page_index) {

	    var autoplay_interval = setInterval(function(){
							    $(this_carousel).carousel('next');
							}, 6000);


	    console.log('Carousel: ' + this_carousel + ' | Page index: ' + page_index);

	    //autoplay_intervals[page_index] = autoplay_interval;

	    autoplay_intervals.splice(page_index, 0, autoplay_interval);
	};


	function pause_autoplay(page_index){

		// if(autoplay_interval){
		// 	clearInterval(autoplay_interval);
		// }

		if( autoplay_intervals[page_index] != undefined ){
			clearInterval( autoplay_intervals[page_index] );

			console.log('Carousel at index: ' + page_index + ' has been stopped');
		}



		autoplay_intervals.splice(page_index, 1);

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


			if ( nextIndex != 2 && autoplay_intervals[2] != undefined ){
				pause_autoplay(2);
			}
			if (nextIndex != 3 && autoplay_intervals[3] != undefined ){
				pause_autoplay(3);
			}
			if (nextIndex != 4 && autoplay_intervals[4] != undefined ){
				pause_autoplay(4);
			}
			if (nextIndex != 5 && autoplay_intervals[5] != undefined ){
				pause_autoplay(5);
			}
			if (nextIndex != 6 && autoplay_intervals[6] != undefined ){
				pause_autoplay(6);
			}


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

			    //autoplay('#observer .carousel', 2);
			}

			if (nextIndex == 3) {
			    $('#pieChart').addClass('animated rollOut');

			    $('#skills .section-title').addClass('animated zoomIn');


			    /* Portfolio Page */
			    $('#nfl .black-screen').addClass('animated fadeOut');

			    $('#nfl .project-info').addClass('animated slideInRight');

			   // autoplay('#nfl .carousel', 3);
			}

			if (nextIndex == 4) {
				$('#pieChart').addClass('animated rollOut');

			    $('.sapUiBody').addClass('animated bounceInDown');


			    /* Portfolio Page */
			    $('#scoop .black-screen').addClass('animated fadeOut');

			    $('#scoop .project-info').addClass('animated slideInLeft');

			    //autoplay('#scoop .carousel', 4);
			}

			if (nextIndex == 5) {
				$('#pieChart').addClass('animated rollOut');
				
				//$('#portfolio .carousel').addClass('animated fadeInUpBig');

				$('#portfolio .black-screen').addClass('animated fadeOut');

				$('#portfolio .project-info').addClass('animated slideInLeft');

				if( $('#portfolio .carousel').length > 0 ){
					autoplay('#portfolio .carousel', 5);
				}


				/* Portfolio Page */
			    $('#oconee .black-screen').addClass('animated fadeOut');

			    $('#oconee .project-info').addClass('animated slideInRight');

			    if( $('#oconee .carousel').length > 0 ){
				    //autoplay('#oconee .carousel', 5);
				}

			}

			if (nextIndex == 6) {
				$('#pieChart').addClass('animated rollOut');
				
				$('#contact #contact-form').addClass('animated slideInUp');


				/* Portfolio Page */
				$('#resume .black-screen').addClass('animated fadeOut');

			    $('#resume .project-info').addClass('animated slideInLeft');

			    //autoplay('#resume .carousel', 6);
			}

			if (nextIndex == 7) {
				$('#contact-form').addClass('animated slideInUp');
			}


		}

	});




    /* Materialize Modal */
    $('.modal').modal({

    });






    $('#contact-form').on('submit', function(e){

		e.preventDefault();

		var form = $(this);

		
		var form_name = $('#name', form).val();
		var form_email = $('#email', form).val();
		var form_subject = $('#subject', form).val();
		var form_message = $('#message', form).val();


		$.ajax({
		    url: "https://formspree.io/jacobvogelbacher@gmail.com", 
		    method: "POST",
		    data: {name: form_name, email: form_email, subject: form_subject, message: form_message},
		    dataType: "json"
		});




		$(form).fadeOut(500, function(){

            Materialize.toast('Thanks for contacting! We will be in touch soon.', 4000, 'dialog-center', function(){

            	$(form).find(':input').val('').removeClass('valid');

				$(form).fadeIn(500);    

				$('#toast-container').toggle();

            });
        });



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



	}); //END Contact Form



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
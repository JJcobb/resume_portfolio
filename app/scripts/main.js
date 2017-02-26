/*$(document).ready(function() {*/

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

    $('.modal').modal({

    });

    //$.fn.fullpage.setAllowScrolling(false);



    /*$('#modal-scoop').openModal({

    	ready: function(modal, trigger) {

	        console.log("Modal Opened");

	        $.fn.fullpage.setAllowScrolling(false);

	    },
	    complete: function() { 

	    	console.log("Modal Closed");

	    	$.fn.fullpage.setAllowScrolling(true); 
	    }

    });*/


    /*var onModalHide = function() {
    alert("Modal closed!");
	};

	$("#modal-scoop").openModal({
	    complete : onModalHide
	});*/


/*);*/
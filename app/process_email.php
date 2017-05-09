<?php

    /* Subject */
    if( isset( $_POST['subject'] ) ){

      /*$subject = $_POST['subject'];*/

      $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    }
    else {
      $subject = "Jacob Vogelbacher Contact Form";
    }


    $to = "jacob_vogelbacher@knights.ucf.edu";

    /*$name = $_POST['name'];*/

    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);

    /*$email = $_POST['email'];*/

    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    /*$msg = $_POST['message'];*/

    $msg = filter_var($_POST['message'], FILTER_SANITIZE_STRING);


    $body = "Message sent from Jacob Vogelbacher Contact form\n\nName:\n$name\n\nEmail:\n$email\n\nMessage:\n$msg";

    
    $headers = "From: $name <$email> \r\n";
    $headers .= "Reply-To: $email \r\n";


    /* Success Message */
    $success = "<div class='alert alert-success' role='alert'>
                    <p class='no-bottom'><strong>Sent!</strong> Thank you for contacting Pure Scoop.</p>
                </div>";

    /* Failure Message */
    $error = "<div class='alert alert-danger' role='alert'>
                    <p class='no-bottom'><strong>Sorry!</strong> There was an error submitting the form. Please try again...</p>
                </div>";

    $email_error = "<div class='alert alert-danger' role='alert'>
                    <p class='no-bottom'><strong>Error.</strong> Please enter a valid email address</p>
                </div>";


    if ( filter_var($email, FILTER_VALIDATE_EMAIL ) === false) {
        echo "Email error";
    }
    else if ( mail($to, $subject, $body, $headers) ) {
      echo "Success";
    }
    else {
      echo "Error";
    }

?>
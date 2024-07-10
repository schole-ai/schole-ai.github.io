<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'php-error.log'); // You can change this path if needed


function isEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Enter the email where you want to receive the notification when someone subscribes
    $emailTo = 'schole.edtech@gmail.com';

    $subscriber_email = addslashes(trim($_POST['email']));

    if (!isEmail($subscriber_email)) {
        $array = array();
        $array['valid'] = 0;
        $array['message'] = 'Insert a valid email address!';
        echo json_encode($array);
    } else {
        $array = array();
        $array['valid'] = 1;
        $array['message'] = 'Thanks for your subscription!';
        echo json_encode($array);

        // Send email
        $subject = 'New Subscriber (Scholé)!';
        $body = "Thank you for your interest in Scholé! We'll keep you updated on our latest developments.\n\nEmail: " . $subscriber_email;
        
        // Headers
        $headers = "From: no-reply@schole.com\r\n"; // Change this to an appropriate from address
        $headers .= "Reply-To: " . $subscriber_email . "\r\n";

        // Send the email
        if (!mail($emailTo, $subject, $body, $headers)) {
            error_log("Failed to send email to $emailTo");
        }
    }
}
?>

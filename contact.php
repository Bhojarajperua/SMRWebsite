<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {

    $name = $_POST['name'] ?? '';
    $company = $_POST['company'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $service = $_POST['service'] ?? '';
    $message = $_POST['message'] ?? '';

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = 'aryankumarperua@gmail.com';
    $mail->Password = 'dvys youv xeis bnzj';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('YOUR_GMAIL@gmail.com', 'SMR Roadlines Website');
    $mail->addAddress('bhojarajperua@gmail.com');

    $mail->isHTML(true);
    $mail->Subject = 'New Quote Request - SMR Roadlines';

    $mail->Body = "
        <h2>New Quote Inquiry</h2>

        <p><strong>Name:</strong> $name</p>
        <p><strong>Company:</strong> $company</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Service:</strong> $service</p>
        <p><strong>Message:</strong><br>$message</p>
    ";

    $mail->send();

    echo "success";

} catch (Exception $e) {
    echo "error";
}
?>
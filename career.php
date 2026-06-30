<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if($_SERVER["REQUEST_METHOD"]=="POST"){

$name=$_POST['name'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$position=$_POST['position'];
$experience=$_POST['experience'];
$qualification=$_POST['qualification'];
$location=$_POST['location'];
$dob=$_POST['dob'];
$current=$_POST['current_salary'];
$expected=$_POST['expected_salary'];
$message=$_POST['message'];

$resumeName=$_FILES['resume']['name'];
$tmp=$_FILES['resume']['tmp_name'];

$folder=__DIR__ . "/uploads/";

$newName=time()."_".$resumeName;

$allowed=['pdf','doc','docx'];

$ext=strtolower(pathinfo($resumeName,PATHINFO_EXTENSION));

if(!in_array($ext,$allowed)){

die("Invalid Resume Format");

}

move_uploaded_file($tmp,$folder.$newName);

$mail=new PHPMailer(true);

try{

$mail->isSMTP();

$mail->Host='smtp.gmail.com';

$mail->SMTPAuth=true;

$mail->Username='aryankumarperua@gmail.com';

$mail->Password='dvys youv xeis bnzj';

$mail->SMTPSecure='tls';

$mail->Port=587;

$mail->setFrom('YOUR_GMAIL@gmail.com','SMR Roadlines');

$mail->addAddress('bhojarajperua@gmail.com');

$mail->addReplyTo($email,$name);

$mail->addAttachment($folder.$newName);

$mail->isHTML(true);

$mail->Subject="New Job Application - ".$position;

$mail->Body="

<h2>New Career Application</h2>

<b>Name:</b> $name <br><br>

<b>Email:</b> $email <br><br>

<b>Phone:</b> $phone <br><br>

<b>Position:</b> $position <br><br>

<b>Experience:</b> $experience <br><br>

<b>Qualification:</b> $qualification <br><br>

<b>Location:</b> $location <br><br>

<b>DOB:</b> $dob <br><br>

<b>Current Salary:</b> $current <br><br>

<b>Expected Salary:</b> $expected <br><br>

<b>Cover Letter:</b><br>

$message

";

$mail->send();

header("Location: career.html?status=success");
exit();

}
catch(Exception $e){

echo "Mailer Error: " . $mail->ErrorInfo;

}

}

?>
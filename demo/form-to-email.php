<?php
if (!isset($_POST['submit'])) {
    //This page should not be accessed directly. Need to submit the form.
    echo "error; you need to submit the form!";
}
$nombre = $_POST['nombre'];
$codigo = $_POST['codigo'];
$visitor_email = $_POST['email'];
$carrera = $_POST['carrera'];
$semestre = $_POST['semestre'];

//Validate first
if (empty($name) || empty($visitor_email)) {
    echo "Todos los datos son obligatorios!";
    exit;
}

if (IsInjected($visitor_email)) {
    echo "Email incorrecto!";
    exit;
}

$email_from = 'contaco@ieee.udistrital.edu.co'; //<== update the email address
$email_subject = "Nuevo formulario";
$email_body = "Un nuevo usuario se ha registrado: \n" .
    "Nombre: $nombre.\n" .
    "Codigo: $codigo.\n" .
    "Email: $visitor_email.\n" .
    "Carrera: $carrera.\n" .
    "Semestre: $semestre.\n";

$to = "rama.distrital@gmail.com, hollwann@gmail.com"; //<== update the email address
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
//Send the email!
mail($to, $email_subject, $email_body, $headers);
//done. redirect to thank-you page.
header('Location: index.html');


// Function to validate against any email injection attempts
function IsInjected($str)
{
    $injections = array(
        '(\n+)',
        '(\r+)',
        '(\t+)',
        '(%0A+)',
        '(%0D+)',
        '(%08+)',
        '(%09+)'
    );
    $inject = join('|', $injections);
    $inject = "/$inject/i";
    if (preg_match($inject, $str)) {
        return true;
    } else {
        return false;
    }
}

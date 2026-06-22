<?php

use models\SQLQueries\LoginModel;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../models/SQLQueries/LoginModel.php';

$data = json_decode(file_get_contents('php://input'), true);

$rm = new LoginModel();
$result = $rm->login($data['username'],$data['password']);

header('Content-Type: application/json; charset=utf-8');   
exit(json_encode($result));
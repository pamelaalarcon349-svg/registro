<?php

use models\SQLQueries\RequestModel;


require '../models/SQLQueries/RequestModel.php';

$data = json_decode(file_get_contents('php://input'), true);

// var_dump($data);


$rm = new RequestModel();
$result = $rm->getRequests();


header('Content-Type: application/json; charset=utf-8');   
exit(json_encode($result));
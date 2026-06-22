
<?php

getResponses();

function getResponses(): void {


    header('Content-Type: application/json; charset=utf-8');

    $data = [
        'email' => 'info_sistema',
        'contrasenia' => 'Ch4NS3O24@+/--'
    ];

    $apiUrl = 'https://www.inaoep.mx/tramites/serviciosweb/posgrados/?formato=json';

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_COOKIEFILE => "/tmp/cookie.txt",
        CURLOPT_POSTFIELDS => http_build_query($data)
    ]);

    $response = curl_exec($curl);
    curl_close($curl);
    exit($response);
}

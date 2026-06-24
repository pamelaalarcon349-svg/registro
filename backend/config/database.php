<?php
// Configuración de conexión a SQL Server
$config = [
    'server' => '192.168.32.155',
    'database' => 'pRegistro',
    'username' => 'uri', // O 'usuario_app'
    'password' => '123456'
];

function getConnection() {
    global $config;
    
    try {
        $connectionInfo = [
            "Database" => $config['database'],
            "UID" => $config['username'],
            "PWD" => $config['password'],
            "CharacterSet" => "UTF-8",
            "Encrypt" => false,
            "TrustServerCertificate" => true
        ];
        
        $conn = sqlsrv_connect($config['server'], $connectionInfo);
        
        if ($conn === false) {
            throw new Exception("Error de conexión: " . print_r(sqlsrv_errors(), true));
        }
        
        return $conn;
    } catch (Exception $e) {
        die("❌ Error de conexión a SQL Server: " . $e->getMessage());
    }
}
?>
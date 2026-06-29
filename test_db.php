<?php
require_once __DIR__ . '/config/settings.php';
require_once __DIR__ . '/models/DBConnectionModel.php';

echo "=== Prueba de conexión a SQL Server ===\n\n";

$db = new DBConnectionModel();

if ($db->createConnection()) {
    echo "✅ Conexión exitosa a la base de datos.\n";
    echo "  Servidor: " . DB_SERVER . "\n";
    echo "  Base de datos: " . DB_DATABASE . "\n";
    echo "  Usuario: " . DB_USERNAME . "\n";
    $db->closeConnection();
} else {
    echo "❌ Error de conexión:\n";
    echo "  " . $db->getErrorMessage() . "\n";
}

echo "\n=== Extensiones cargadas ===\n";
echo "sqlsrv: " . (extension_loaded('sqlsrv') ? '✅' : '❌') . "\n";
echo "mbstring: " . (extension_loaded('mbstring') ? '✅' : '❌') . "\n";
?>
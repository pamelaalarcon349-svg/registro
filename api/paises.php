<?php
// ============================================================
// api/paises.php - Obtiene todos los países
// MÉXICO SIEMPRE SERÁ ID 1
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../models/DBConnectionModel.php';
require_once __DIR__ . '/../models/SQLQueries/DatabaseQueries.php';

$db = new DBConnectionModel();
if (!$db->createConnection()) {
    echo json_encode(['error' => 'Error de conexión a la base de datos']);
    exit;
}

$conn = $db->getConnection();

// Obtener todos los países de cat_paises_gentilisio
// México tiene ID 120 en la tabla original, pero lo forzamos a 1
$sql = "SELECT ID, NombrePais, Gentilicio 
        FROM cat_paises_gentilisio 
        ORDER BY CASE WHEN ID = 120 THEN 0 ELSE 1 END, NombrePais";

$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    echo json_encode(['error' => 'Error en la consulta SQL']);
    $db->closeConnection();
    exit;
}

$paises = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    // Si es México (ID 120), lo forzamos a ID 1
    $idPais = ($row['ID'] == 120) ? 1 : (int)$row['ID'];
    
    $paises[] = [
        'id' => $idPais,  // México será 1, los demás su ID original
        'nombre' => trim($row['NombrePais']),
        'gentilicio' => trim($row['Gentilicio']),
        'id_original' => (int)$row['ID']
    ];
}

sqlsrv_free_stmt($stmt);
$db->closeConnection();

echo json_encode($paises);
?>
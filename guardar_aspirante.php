<?php
// ============================================================
// guardar_aspirante.php - Punto de entrada para guardar aspirante
// ============================================================

// Desactivar la visualización de errores en producción
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// Configurar respuesta como JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar solicitud OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ============================================================
// CARGAR ARCHIVOS
// ============================================================
$rutaSettings = __DIR__ . '/config/settings.php';

if (!file_exists($rutaSettings)) {
    echo json_encode([
        'success' => false,
        'error' => 'No se encuentra el archivo settings.php en: ' . $rutaSettings
    ]);
    exit;
}

require_once $rutaSettings;

$archivos = [
    'models/DBConnectionModel.php',
    'models/SQLQueries/DatabaseQueries.php',
    'models/SQLQueries/AspiranteQueries.php'
];

foreach ($archivos as $archivo) {
    $ruta = __DIR__ . '/' . $archivo;
    if (!file_exists($ruta)) {
        echo json_encode([
            'success' => false,
            'error' => 'No se encuentra el archivo: ' . $ruta
        ]);
        exit;
    }
}

require_once __DIR__ . '/models/DBConnectionModel.php';
require_once __DIR__ . '/models/SQLQueries/DatabaseQueries.php';
require_once __DIR__ . '/models/SQLQueries/AspiranteQueries.php';

// ============================================================
// PROCESAR LA SOLICITUD
// ============================================================

// Recibir datos JSON del formulario
$input = json_decode(file_get_contents('php://input'), true);

// Si no hay datos, devolver error
if (!$input) {
    echo json_encode([
        'success' => false,
        'error' => 'No se recibieron datos del formulario'
    ]);
    exit;
}

// Conectar a la base de datos
$db = new DBConnectionModel();

if (!$db->createConnection()) {
    echo json_encode([
        'success' => false,
        'error' => 'Error de conexión a la base de datos: ' . $db->getErrorMessage()
    ]);
    exit;
}

try {
    // Crear instancia del query
    $aspiranteQueries = new AspiranteQueries($db->getConnection());

    // Verificar si el CURP ya existe (solo si es mexicano)
    $curp = $input['curp'] ?? '';
    $nacionalidad = $input['nacionalidad'] ?? 'Mexicana';
    
    if (!empty($curp) && $nacionalidad === 'Mexicana' && $aspiranteQueries->existeCurp($curp)) {
        $db->closeConnection();
        echo json_encode([
            'success' => false,
            'error' => 'El CURP ya se encuentra registrado'
        ]);
        exit;
    }

    // Guardar el aspirante
    $resultado = $aspiranteQueries->guardarAspirante($input);

    if ($resultado) {
        // Obtener el ID del registro insertado
        $idAspirante = $aspiranteQueries->obtenerUltimoId();
        
        $db->closeConnection();
        echo json_encode([
            'success' => true,
            'message' => 'Solicitud guardada exitosamente',
            'idAspirante' => $idAspirante
        ]);
    } else {
        $error = $aspiranteQueries->getLastError() ?: 'Error desconocido al guardar';
        $db->closeConnection();
        echo json_encode([
            'success' => false,
            'error' => 'Error al guardar: ' . $error
        ]);
    }
} catch (Exception $e) {
    $db->closeConnection();
    echo json_encode([
        'success' => false,
        'error' => 'Excepción: ' . $e->getMessage()
    ]);
}
?>
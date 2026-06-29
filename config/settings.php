<?php
// ============================================================
// config/settings.php - Configuración de la base de datos
// ============================================================

// ==========================================
// CONFIGURACIÓN DE SQL SERVER
// ==========================================
define('DB_SERVER', 'DESKTOP-I7L34OR\PAMEUWU');
define('DB_USERNAME', 'pame');
define('DB_PASSWORD', '12345');
define('DB_DATABASE', 'pRegistro1');

// ==========================================
// CONFIGURACIÓN DE LA APLICACIÓN
// ==========================================
define('APP_NAME', 'INAOE - Solicitud de Admisión');
define('APP_VERSION', '1.0.0');
define('APP_DEBUG', true); // Cambiar a false en producción

// ==========================================
// CONFIGURACIÓN DE ZONA HORARIA
// ==========================================
date_default_timezone_set('America/Mexico_City');

// ==========================================
// CONFIGURACIÓN DE ERRORES
// ==========================================
if (APP_DEBUG) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    ini_set('display_startup_errors', 0);
    error_reporting(0);
}

// ==========================================
// CONFIGURACIÓN DE CABECERAS
// ==========================================
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// ==========================================
// VERIFICACIÓN DE EXTENSIONES
// ==========================================
$requiredExtensions = ['sqlsrv', 'mbstring'];
$missingExtensions = [];

foreach ($requiredExtensions as $ext) {
    if (!extension_loaded($ext)) {
        $missingExtensions[] = $ext;
    }
}

if (!empty($missingExtensions)) {
    $errorMsg = 'Error: Extensiones faltantes: ' . implode(', ', $missingExtensions) . '. ';
    $errorMsg .= 'Instala los drivers necesarios para SQL Server en PHP.';
    if (APP_DEBUG) {
        die($errorMsg);
    } else {
        die('Error de configuración del servidor. Contacte al administrador.');
    }
}

// ==========================================
// CONSTANTES ADICIONALES
// ==========================================
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10 MB
define('UPLOAD_PATH', __DIR__ . '/../uploads/');

// Crear directorio de uploads si no existe
if (!is_dir(UPLOAD_PATH)) {
    mkdir(UPLOAD_PATH, 0755, true);
}
?>
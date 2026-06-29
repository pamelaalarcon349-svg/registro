<?php
// test_rutas.php - Verifica que todos los archivos existan

echo "<h1>Verificación de rutas</h1>";
echo "<p>Directorio actual: " . __DIR__ . "</p>";

$archivos = [
    'config/settings.php',
    'models/DBConnectionModel.php',
    'models/SQLQueries/DatabaseQueries.php',
    'models/SQLQueries/AspiranteQueries.php',
    'guardar_aspirante.php'
];

echo "<h2>Verificando archivos:</h2>";
foreach ($archivos as $archivo) {
    $ruta = __DIR__ . '/' . $archivo;
    echo "<p><strong>$archivo</strong> → ";
    if (file_exists($ruta)) {
        echo "<span style='color:green'>✅ EXISTE</span>";
    } else {
        echo "<span style='color:red'>❌ NO EXISTE</span>";
    }
    echo " (Ruta: $ruta)</p>";
}

echo "<h2>Contenido de la carpeta config/:</h2>";
if (is_dir(__DIR__ . '/config')) {
    $archivos_config = scandir(__DIR__ . '/config');
    echo "<ul>";
    foreach ($archivos_config as $item) {
        if ($item != '.' && $item != '..') {
            echo "<li>$item</li>";
        }
    }
    echo "</ul>";
} else {
    echo "<p style='color:red'>❌ La carpeta config/ NO EXISTE</p>";
}

echo "<h2>Contenido de la carpeta models/:</h2>";
if (is_dir(__DIR__ . '/models')) {
    $archivos_models = scandir(__DIR__ . '/models');
    echo "<ul>";
    foreach ($archivos_models as $item) {
        if ($item != '.' && $item != '..') {
            echo "<li>$item" . (is_dir(__DIR__ . '/models/' . $item) ? ' (CARPETA)' : '') . "</li>";
        }
    }
    echo "</ul>";
} else {
    echo "<p style='color:red'>❌ La carpeta models/ NO EXISTE</p>";
}

echo "<h2>Contenido de la carpeta models/SQLQueries/:</h2>";
if (is_dir(__DIR__ . '/models/SQLQueries')) {
    $archivos_sql = scandir(__DIR__ . '/models/SQLQueries');
    echo "<ul>";
    foreach ($archivos_sql as $item) {
        if ($item != '.' && $item != '..') {
            echo "<li>$item</li>";
        }
    }
    echo "</ul>";
} else {
    echo "<p style='color:red'>❌ La carpeta models/SQLQueries/ NO EXISTE</p>";
}

// Probar conexión a la base de datos
echo "<h2>Probando conexión a la base de datos:</h2>";
try {
    require_once __DIR__ . '/config/settings.php';
    require_once __DIR__ . '/models/DBConnectionModel.php';
    
    $db = new DBConnectionModel();
    if ($db->createConnection()) {
        echo "<p style='color:green;font-weight:bold'>✅ ¡Conexión exitosa a la base de datos!</p>";
        $db->closeConnection();
    } else {
        echo "<p style='color:red;font-weight:bold'>❌ Error de conexión: " . $db->getErrorMessage() . "</p>";
    }
} catch (Exception $e) {
    echo "<p style='color:red;font-weight:bold'>❌ Excepción: " . $e->getMessage() . "</p>";
}
?>
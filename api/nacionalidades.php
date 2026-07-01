<?php
// test_nacionalidad.php - Prueba de nacionalidades

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>🔍 Verificando nacionalidades en la BD</h2>";

require_once 'config/settings.php';
require_once 'models/DBConnectionModel.php';

$db = new DBConnectionModel();
if (!$db->createConnection()) {
    die("❌ Error de conexión: " . $db->getErrorMessage());
}

echo "✅ Conexión exitosa<br><br>";

$conn = $db->getConnection();

// ==========================================
// 1. VERIFICAR QUÉ TABLAS EXISTEN
// ==========================================
echo "<h3>📋 Tablas en la base de datos:</h3>";
$sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME";
$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    echo "❌ Error al listar tablas: " . print_r(sqlsrv_errors(), true) . "<br>";
} else {
    echo "<ul>";
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $tabla = $row['TABLE_NAME'];
        $esTarget = (stripos($tabla, 'pais') !== false || stripos($tabla, 'nacion') !== false || stripos($tabla, 'gentil') !== false);
        echo "<li>" . ($esTarget ? "⭐ " : "") . $tabla . "</li>";
    }
    echo "</ul>";
    sqlsrv_free_stmt($stmt);
}

echo "<br>";

// ==========================================
// 2. VERIFICAR TABLA cat_paises_gentilisio
// ==========================================
echo "<h3>📋 Verificando tabla 'cat_paises_gentilisio':</h3>";

// Verificar si la tabla existe
$sql = "SELECT COUNT(*) as existe FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'cat_paises_gentilisio'";
$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    echo "❌ Error al verificar tabla: " . print_r(sqlsrv_errors(), true) . "<br>";
} else {
    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
    $existe = $row['existe'] ?? 0;
    sqlsrv_free_stmt($stmt);
    
    if ($existe == 0) {
        echo "❌ La tabla 'cat_paises_gentilisio' NO existe en la base de datos.<br>";
        echo "💡 Buscando tablas similares...<br><br>";
        
        // Buscar tablas similares
        $sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME LIKE '%pais%' OR TABLE_NAME LIKE '%nacion%' OR TABLE_NAME LIKE '%gentil%'";
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt !== false) {
            echo "Tablas encontradas:<br><ul>";
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                echo "<li>" . $row['TABLE_NAME'] . "</li>";
            }
            echo "</ul>";
            sqlsrv_free_stmt($stmt);
        }
    } else {
        echo "✅ La tabla 'cat_paises_gentilisio' EXISTE<br><br>";
        
        // ==========================================
        // 3. MOSTRAR DATOS DE LA TABLA
        // ==========================================
        echo "<h3>📋 Datos de cat_paises_gentilisio:</h3>";
        
        // Ver estructura de la tabla
        $sql = "SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = 'cat_paises_gentilisio' 
                ORDER BY ORDINAL_POSITION";
        $stmt = sqlsrv_query($conn, $sql);
        
        if ($stmt === false) {
            echo "❌ Error al obtener estructura: " . print_r(sqlsrv_errors(), true) . "<br>";
        } else {
            echo "<h4>Estructura de la tabla:</h4>";
            echo "<table border='1'>";
            echo "<tr><th>Columna</th><th>Tipo</th><th>Longitud</th></tr>";
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                echo "<tr>";
                echo "<td>" . $row['COLUMN_NAME'] . "</td>";
                echo "<td>" . $row['DATA_TYPE'] . "</td>";
                echo "<td>" . ($row['CHARACTER_MAXIMUM_LENGTH'] ?? 'NULL') . "</td>";
                echo "</tr>";
            }
            echo "</table><br>";
            sqlsrv_free_stmt($stmt);
        }
        
        // Mostrar datos
        $sql = "SELECT * FROM cat_paises_gentilisio ORDER BY ID";
        $stmt = sqlsrv_query($conn, $sql);
        
        if ($stmt === false) {
            echo "❌ Error al consultar datos: " . print_r(sqlsrv_errors(), true) . "<br>";
        } else {
            echo "<h4>Datos de la tabla:</h4>";
            echo "<table border='1'>";
            echo "<tr><th>ID</th><th>NombrePaís</th><th>Gentilicio</th></tr>";
            
            $contador = 0;
            while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $contador++;
                $id = $row['ID'] ?? $row['id'] ?? 'N/A';
                $nombre = $row['NombrePais'] ?? $row['nombre'] ?? $row['pais'] ?? 'N/A';
                $gentilicio = $row['Gentilicio'] ?? $row['gentilicio'] ?? $row['gentil'] ?? 'N/A';
                
                $esMexico = ($id == 1 || $id == 120 || stripos($nombre, 'MEXICO') !== false);
                $filaClass = $esMexico ? "style='background-color: #ffff99; font-weight: bold;'" : "";
                
                echo "<tr $filaClass>";
                echo "<td>" . $id . ($esMexico ? " ⭐" : "") . "</td>";
                echo "<td>" . $nombre . "</td>";
                echo "<td>" . $gentilicio . "</td>";
                echo "</tr>";
            }
            echo "</table>";
            echo "<br>Total de registros: <strong>$contador</strong><br>";
            sqlsrv_free_stmt($stmt);
        }
    }
}

$db->closeConnection();

echo "<br><hr>";
echo "<h3>💡 Nota:</h3>";
echo "Si la tabla 'cat_paises_gentilisio' no existe, significa que tus países están en otra tabla.<br>";
echo "Busca en la lista de tablas de arriba cuál contiene los países y sus gentilicios.";
?>
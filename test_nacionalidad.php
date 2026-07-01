<?php
// test_nacionalidad.php - Prueba de nacionalidades

require_once 'config/settings.php';
require_once 'models/DBConnectionModel.php';

$db = new DBConnectionModel();
if (!$db->createConnection()) {
    die("Error de conexión");
}

$conn = $db->getConnection();

// Ver todas las nacionalidades
$sql = "SELECT ID, Gentilicio FROM cat_paises_gentilisio ORDER BY ID";
$stmt = sqlsrv_query($conn, $sql);

echo "<h2>Nacionalidades disponibles en la BD:</h2>";
echo "<table border='1'>";
echo "<tr><th>ID</th><th>Gentilicio</th></tr>";

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $id = $row['ID'];
    $nombre = $row['Gentilicio'];
    $esMexico = ($id == 1 || $id == 120) ? '⭐ MÉXICO' : '';
    echo "<tr><td>$id</td><td>$nombre $esMexico</td></tr>";
}

echo "</table>";

$db->closeConnection();
?>
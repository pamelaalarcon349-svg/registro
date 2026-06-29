<?php
// ============================================================
// CLASE DE CONEXIÓN (IGUAL A LA QUE FUNCIONA)
// ============================================================
class DBConnectionModel
{
    private $server;
    private $username;
    private $password;
    private $database;
    private $connection;
    private $errorMessage;

    public function __construct()
    {
        $this->server   = 'DESKTOP-I7L34OR\PAMEUWU';
        $this->username = 'pame';
        $this->password = '12345';
        $this->database = 'pRegistro';
    }

    public function createConnection(): bool
    {
        $connectionOptions = [
            "Database"   => $this->database,
            "CharacterSet" => "UTF-8",
            "Uid"        => $this->username,
            "PWD"        => $this->password
        ];

        $this->connection = sqlsrv_connect($this->server, $connectionOptions);

        if (!$this->connection) {
            $this->errorMessage = print_r(sqlsrv_errors(), true);
            return false;
        }

        $this->errorMessage = null;
        return true;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function getErrorMessage(): ?string
    {
        return $this->errorMessage;
    }
}

// ============================================================
// USAMOS LA CLASE (IGUAL QUE TU ARCHIVO DE PRUEBA)
// ============================================================

$db = new DBConnectionModel();

if ($db->createConnection()) {
    echo "✅ Conexión exitosa a la base de datos.<br><br>";

    $conn = $db->getConnection();

    // --- CONSULTA PARA VER TODOS LOS ASPIRANTES ---
    $query = "SELECT * FROM Aspirante ORDER BY id_Aspirante DESC";
    $stmt = sqlsrv_query($conn, $query);

    if ($stmt === false) {
        echo "Error en la consulta: " . print_r(sqlsrv_errors(), true);
    } else {
        // Mostrar cada registro como Array igual que tu ejemplo
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            print_r($row);
            echo "<br>";
        }
        sqlsrv_free_stmt($stmt);
    }

    sqlsrv_close($conn);
} else {
    echo "❌ No se pudo conectar.<br>";
    echo "Error: " . $db->getErrorMessage();
}
?>
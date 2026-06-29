<?php
// ============================================================
// ÚNICO ARCHIVO: conexión + prueba en el mismo sitio
// ============================================================

// 1. DEFINIMOS LA CLASE DE CONEXIÓN (sin namespace para simplificar)
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
        $this->server  = 'DESKTOP-I7L34OR\PAMEUWU';
        $this->username = 'pame';
        $this->password = '12345';
        $this->database = 'pRegistro1';



        // Tus datos de conexión
       /* $this->server   = 'DESKTOP-I7L34OR\PAMEUWU';
        $this->username = 'pame';
        $this->password = '12345';
        $this->database = 'pRegistro';*/
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
// 2. USAMOS LA CLASE
// ============================================================

$db = new DBConnectionModel();

if ($db->createConnection()) {
    echo "✅ Conexión exitosa a la base de datos.<br>";

    $conn = $db->getConnection();

    // --- (opcional) Prueba con una consulta real ---
    // Cambia "algunaTabla" por una tabla que exista en tu base de datos
    $query = "SELECT * FROM sga_cat_nacionalidad";
    $stmt = sqlsrv_query($conn, $query);

    if ($stmt === false) {
        echo "Error en la consulta: " . print_r(sqlsrv_errors(), true);
    } else {
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            print_r($row);
        }
        sqlsrv_free_stmt($stmt);
    }

    sqlsrv_close($conn);
} else {
    echo "❌ No se pudo conectar.<br>";
    echo "Error: " . $db->getErrorMessage();
}
?>
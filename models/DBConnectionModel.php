<?php
// ============================================================
// models/DBConnectionModel.php
// ============================================================

class DBConnectionModel
{
    private $connection;
    private $errorMessage;

    /**
     * Crea la conexión a la base de datos SQL Server
     */
    public function createConnection(): bool
    {
        // Verificar que las constantes estén definidas
        if (!defined('DB_SERVER') || !defined('DB_USERNAME') || 
            !defined('DB_PASSWORD') || !defined('DB_DATABASE')) {
            $this->errorMessage = 'Constantes de configuración no definidas';
            return false;
        }

        // Verificar extensión sqlsrv
        if (!extension_loaded('sqlsrv')) {
            $this->errorMessage = 'La extensión sqlsrv no está instalada. Descarga los drivers de SQL Server para PHP.';
            return false;
        }

        // Configurar la conexión
        $connectionOptions = [
            'Database' => DB_DATABASE,
            'UID' => DB_USERNAME,
            'PWD' => DB_PASSWORD,
            'Encrypt' => false,
            'TrustServerCertificate' => true,
            'CharacterSet' => 'UTF-8',
            'ReturnDatesAsStrings' => true
        ];

        // Intentar conectar
        $this->connection = sqlsrv_connect(DB_SERVER, $connectionOptions);

        if ($this->connection === false) {
            $this->errorMessage = $this->getLastErrorMessage();
            return false;
        }

        return true;
    }

    /**
     * Obtiene la conexión activa
     */
    public function getConnection()
    {
        return $this->connection;
    }

    /**
     * Cierra la conexión
     */
    public function closeConnection(): void
    {
        if ($this->connection) {
            sqlsrv_close($this->connection);
            $this->connection = null;
        }
    }

    /**
     * Obtiene el último mensaje de error
     */
    public function getErrorMessage(): string
    {
        return $this->errorMessage ?: 'Error desconocido';
    }

    /**
     * Obtiene el último error de sqlsrv
     */
    private function getLastErrorMessage(): string
    {
        $errors = sqlsrv_errors();
        if ($errors) {
            $messages = [];
            foreach ($errors as $error) {
                $code = $error['code'] ?? '00000';
                $message = $error['message'] ?? 'Error SQL Server';
                $messages[] = "[$code] $message";
            }
            return implode(' | ', $messages);
        }
        return 'Error de conexión SQL Server';
    }

    /**
     * Verifica si la conexión está activa
     */
    public function isConnected(): bool
    {
        return $this->connection !== null && $this->connection !== false;
    }

    /**
     * Destructor: cierra la conexión automáticamente
     */
    public function __destruct()
    {
        $this->closeConnection();
    }
}
?>
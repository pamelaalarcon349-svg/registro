<?php
// ============================================================
// models/SQLQueries/DatabaseQueries.php
// ============================================================

class DatabaseQueries
{
    protected $connection;
    protected $lastError;

    public function __construct($connection)
    {
        $this->connection = $connection;
        $this->lastError = null;
    }

    /**
     * Ejecuta una consulta con parámetros
     */
    protected function executeQuery(string $sql, array $params = [])
    {
        try {
            $stmt = sqlsrv_prepare($this->connection, $sql, $params);
            if ($stmt === false) {
                $this->lastError = $this->getLastErrorMessage();
                return false;
            }

            if (!sqlsrv_execute($stmt)) {
                $this->lastError = $this->getLastErrorMessage();
                sqlsrv_free_stmt($stmt);
                return false;
            }

            return $stmt;
        } catch (Exception $e) {
            $this->lastError = $e->getMessage();
            return false;
        }
    }

    /**
     * Ejecuta un INSERT y verifica el resultado
     */
    protected function executeInsert(string $sql, array $params): bool
    {
        $stmt = $this->executeQuery($sql, $params);
        if ($stmt === false) {
            return false;
        }

        // Verificar filas afectadas
        $rowsAffected = sqlsrv_rows_affected($stmt);
        sqlsrv_free_stmt($stmt);

        if ($rowsAffected === false) {
            $this->lastError = $this->getLastErrorMessage();
            return false;
        }

        return $rowsAffected > 0;
    }

    /**
     * Limpia una cadena para evitar problemas de codificación
     */
    protected function cleanString(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        // Convertir a UTF-8 y eliminar caracteres no deseados
        $value = trim($value);
        $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
        
        // Eliminar caracteres de control excepto saltos de línea
        $value = preg_replace('/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/', '', $value);
        
        return $value ?: null;
    }

    /**
     * Limpia un valor flotante
     */
    protected function cleanFloat($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        // Reemplazar coma por punto
        $value = str_replace(',', '.', $value);
        $value = floatval($value);

        return $value;
    }

    /**
     * Obtiene el último error
     */
    public function getLastError(): ?string
    {
        return $this->lastError;
    }

    /**
     * Obtiene el último mensaje de error de sqlsrv
     */
    private function getLastErrorMessage(): string
    {
        $errors = sqlsrv_errors();
        if ($errors) {
            $messages = [];
            foreach ($errors as $error) {
                $message = $error['message'] ?? 'Error SQL Server';
                $messages[] = $message;
            }
            return implode(' | ', $messages);
        }
        return 'Error desconocido en SQL Server';
    }
}
?>
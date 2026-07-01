<?php
// ============================================================
// models/SQLQueries/AspiranteQueries.php
// ============================================================

require_once __DIR__ . '/DatabaseQueries.php';

class AspiranteQueries extends DatabaseQueries
{
    /**
     * Guarda un nuevo aspirante en la base de datos
     */
    public function guardarAspirante(array $data): bool
    {
        $sql = "INSERT INTO Aspirante (
            nacionalidad_asp, 
            curp_asp, 
            nombre_asp, 
            primer_apellido_asp, 
            segundo_apellido_asp,
            genero_asp, 
            fecha_nacimiento_asp, 
            lugar_nacimiento_asp,
            lada_internacional_asp, 
            telefono_fijo_asp, 
            extension_telefonica_asp, 
            telefono_movil_asp,
            correo_electronico_asp,
            codigo_postal_asp, 
            estado_pais_asp, 
            municipio_asp, 
            localidad_asp, 
            colonia_asp,
            tipo_calle_asp, 
            calle_asp, 
            numero_exterior_asp, 
            numero_interior_asp, 
            pais_asp,
            nombre_contacto_emg, 
            primer_apellido_emg, 
            segundo_apellido_emg,
            lada_internacional_emg, 
            telefono_fijo_emg, 
            extension_emg, 
            telefono_movil_emg, 
            tipo_parentesco_emg,
            posgrado_ingresar_asp, 
            anio_ingreso_posgrado_asp, 
            periodo_ingreso_posgrados_asp,
            institucion_educativa_asp, 
            grado_academico_obtenido_asp, 
            anio_obtencion_grado_asp,
            promedio_obtenido_asp, 
            tipo_titulacion_asp,
            ingles_oral_asp, 
            ingles_escrito_asp, 
            ingles_auditivo_asp, 
            ingles_lectora_asp,
            institucion_empresa_asp, 
            tipo_experiencia_asp, 
            puesto_funciones_asp, 
            tiempo_laborado_asp,
            titulo_publicacion_asp, 
            tipo_publicacion_asp, 
            doi_articulo_asp,
            razon_estudio_inaoe_asp, 
            medio_enterado_asp,
            estatus_solicitud_asp, 
            fecha_creacion
        ) VALUES (
            ?, ?, ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?, ?,
            ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?, ?, ?,
            ?, ?, ?,
            ?, ?, ?,
            ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?,
            ?, ?,
            1, GETDATE()
        )";

        $params = $this->prepareParams($data);
        return $this->executeInsert($sql, $params);
    }

    /**
     * Obtiene el último ID insertado
     */
    public function obtenerUltimoId(): ?int
    {
        $sql = "SELECT SCOPE_IDENTITY() as id";
        $stmt = $this->executeQuery($sql);
        
        if ($stmt === false) {
            return null;
        }
        
        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        sqlsrv_free_stmt($stmt);
        
        return $row['id'] ?? null;
    }

    /**
     * Prepara los parámetros para la consulta SQL
     * 🔥 CORREGIDO: Ahora usa el ID real de la nacionalidad
     */
  // models/SQLQueries/AspiranteQueries.php - SOLO LA PARTE DE NACIONALIDAD

private function prepareParams(array $data): array
{
    // 🔥 DEPURACIÓN EN PHP - Ver qué llega
    error_log("=== DATOS RECIBIDOS EN PHP ===");
    error_log("nacionalidad: " . ($data['nacionalidad'] ?? 'NULL'));
    error_log("nacionalidadExtranjeraId: " . ($data['nacionalidadExtranjeraId'] ?? 'NULL'));
    error_log("nacionalidadExtranjera: " . ($data['nacionalidadExtranjera'] ?? 'NULL'));
    
    // ==========================================
    // 1. NACIONALIDAD - CORREGIDO
    // ==========================================
    $nacionalidadSeleccionada = $data['nacionalidad'] ?? 'Mexicana';
    $nacionalidadId = 1; // Default: México
    
    if ($nacionalidadSeleccionada === 'Mexicana') {
        $nacionalidadId = 1;
        error_log("✅ Es Mexicana - ID: 1");
    } else {
        error_log("🔍 Es Extranjera - Buscando ID...");
        
        // 🔥 PRIMERO: Usar el ID que viene del frontend
        if (isset($data['nacionalidadExtranjeraId']) && !empty($data['nacionalidadExtranjeraId'])) {
            $nacionalidadId = (int)$data['nacionalidadExtranjeraId'];
            error_log("  - ID desde frontend: " . $nacionalidadId);
            
            if ($nacionalidadId == 120) {
                $nacionalidadId = 1;
                error_log("  - Era México (120) → convertido a 1");
            }
        } 
        // 🔥 SEGUNDO: Si no viene ID, buscar por nombre
        else if (isset($data['nacionalidadExtranjera']) && !empty($data['nacionalidadExtranjera'])) {
            $nombre = strtoupper(trim($data['nacionalidadExtranjera']));
            if (strpos($nombre, '(') !== false) {
                $nombre = trim(explode('(', $nombre)[0]);
            }
            error_log("  - Buscando por nombre: " . $nombre);
            
            $sql = "SELECT ID FROM cat_paises_gentilisio WHERE UPPER(Gentilicio) = ?";
            $stmt = $this->executeQuery($sql, [$nombre]);
            if ($stmt) {
                $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
                $nacionalidadId = $row['ID'] ?? null;
                sqlsrv_free_stmt($stmt);
                
                if ($nacionalidadId == 120) {
                    $nacionalidadId = 1;
                }
                error_log("  - ID encontrado por nombre: " . $nacionalidadId);
            }
        }
        
        // 🔥 Si aún no tenemos ID, usar 2 como fallback
        if (empty($nacionalidadId)) {
            $nacionalidadId = 2;
            error_log("  - ⚠️ FALLBACK: usando ID 2");
        }
    }
    
    error_log("🏁 ID FINAL de nacionalidad: " . $nacionalidadId);
        // ==========================================
        // 2. GÉNERO (1 = Hombre, 2 = Mujer, 3 = No binario)
        // ==========================================
        $sexo = strtoupper($data['sexo'] ?? 'HOMBRE');
        $genero = 1;
        if ($sexo === 'MUJER') $genero = 2;
        if ($sexo === 'NO BINARIO') $genero = 3;

        // ==========================================
        // 3. POSGRADO (1 = Maestría, 2 = Doctorado, 3 = Especialidad)
        // ==========================================
        $posgrado = $data['datosAcademicos']['posgrado'] ?? '';
        $posgradoId = 1;
        if ($posgrado === 'Doctorado') $posgradoId = 2;
        if ($posgrado === 'Especialidad') $posgradoId = 3;

        // ==========================================
        // 4. PERIODO - SIEMPRE 1 por restricción
        // ==========================================
        $periodoId = 1;

        // ==========================================
        // 5. PARENTESCO (1-6)
        // ==========================================
        $parentescoMap = [
            'MADRE' => 1,
            'PADRE' => 2,
            'HERMANO(A)' => 3,
            'HERMANO' => 3,
            'TIO(A)' => 4,
            'TIO' => 4,
            'PRIMO(A)' => 5,
            'PRIMO' => 5,
            'HIJO(A)' => 6,
            'HIJO' => 6,
            'OTRO' => 6
        ];
        $parentesco = strtoupper($data['contactoEmergencia']['parentesco'] ?? '');
        $tipoParentesco = $parentescoMap[$parentesco] ?? 1;

        // ==========================================
        // 6. TIPO DE TITULACIÓN (1, 2, 3)
        // ==========================================
        $titulacionMap = [
            'TESIS' => 1,
            'ESTUDIOS DE MAESTRÍA' => 2,
            'OTRO' => 3
        ];
        $tipoTitulacion = strtoupper($data['estudiosPrevios']['tipoTitulacion'] ?? '');
        $tipoTitulacionId = $titulacionMap[explode(' - ', $tipoTitulacion)[0]] ?? 1;

        // ==========================================
        // 7. TIPO DE CALLE (1-5)
        // ==========================================
        $tipoCalleMap = [
            'CALLE' => 1,
            'AVENIDA' => 2,
            'BULEVAR' => 3,
            'CAMINO' => 4,
            'PRIVADA' => 5,
            'OTRO' => 5
        ];
        $tipoCalle = strtoupper($data['domicilio']['tipoCalle'] ?? '');
        $tipoCalleId = $tipoCalleMap[$tipoCalle] ?? 1;

        // ==========================================
        // 8. PAÍS - MÉXICO SIEMPRE 1
        // ==========================================
        $pais = $data['domicilio']['pais'] ?? '';
        $paisNombre = 'MÉXICO';
        
        if (is_numeric($pais)) {
            $paisId = (int)$pais;
            if ($paisId == 1 || $paisId == 120) {
                $paisNombre = 'MÉXICO';
            } else {
                // Buscar nombre del país por ID
                $sql = "SELECT NombrePais FROM cat_paises_gentilisio WHERE ID = ?";
                $stmt = $this->executeQuery($sql, [$paisId]);
                if ($stmt) {
                    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
                    $paisNombre = $row['NombrePais'] ?? 'MÉXICO';
                    sqlsrv_free_stmt($stmt);
                }
            }
        } else {
            $paisNombre = strtoupper(trim($pais)) ?: 'MÉXICO';
        }

        // ==========================================
        // 9. NIVEL DE INGLÉS (1, 2, 3)
        // ==========================================
        $nivelMap = [
            'BÁSICO' => 1,
            'BASICO' => 1,
            'INTERMEDIO' => 2,
            'AVANZADO' => 3
        ];
        $ingles = $data['dominioIngles'] ?? [];
        $inglesOral = $nivelMap[strtoupper($ingles['expresionOral'] ?? '')] ?? null;
        $inglesEscrito = $nivelMap[strtoupper($ingles['expresionEscrita'] ?? '')] ?? null;
        $inglesAuditivo = $nivelMap[strtoupper($ingles['comprensionAuditiva'] ?? '')] ?? null;
        $inglesLector = $nivelMap[strtoupper($ingles['comprensionLectora'] ?? '')] ?? null;

        // ==========================================
        // 10. EXPERIENCIA LABORAL
        // ==========================================
        $experiencia = $data['experienciaLaboral'] ?? [];
        $institucionEmpresa = null;
        $tipoExperiencia = null;
        $puestoFunciones = null;
        $tiempoLaborado = null;
        
        if (!empty($experiencia)) {
            $primeraExp = $experiencia[0];
            $institucionEmpresa = $this->cleanString($primeraExp['institucion'] ?? '');
            $tipoExp = strtoupper($primeraExp['tipoExperiencia'] ?? '');
            $tipoExperiencia = 1;
            if ($tipoExp === 'DOCENTE') $tipoExperiencia = 2;
            if ($tipoExp === 'OTRO') $tipoExperiencia = 3;
            $puestoFunciones = $this->cleanString($primeraExp['puesto'] ?? '');
            $tiempoLaborado = $this->cleanString($primeraExp['tiempoLaborado'] ?? '');
        }

        // ==========================================
        // 11. PUBLICACIONES
        // ==========================================
        $publicaciones = $data['publicaciones'] ?? [];
        $tituloPublicacion = null;
        $tipoPublicacion = null;
        $doi = null;
        
        if (!empty($publicaciones)) {
            $primeraPub = $publicaciones[0];
            $tituloPublicacion = $this->cleanString($primeraPub['titulo'] ?? '');
            $tipoPublicacion = $this->cleanString($primeraPub['tipoPublicacion'] ?? '');
            $doi = $this->cleanString($primeraPub['doi'] ?? '');
        }

        // ==========================================
        // 12. MEDIO (1, 2, 3, 4)
        // ==========================================
        $medioMap = [
            'FERIA DE POSGRADOS' => 1,
            'PÁGINA DE INTERNET' => 2,
            'PAGINA DE INTERNET' => 2,
            'AMIGO' => 3,
            'OTRO' => 4
        ];
        $medio = strtoupper($data['motivacion']['medio'] ?? '');
        $medioId = $medioMap[$medio] ?? 1;

        // ==========================================
        // 13. FECHA
        // ==========================================
        $fechaNacimiento = $this->cleanString($data['fechaNacimiento'] ?? '');
        if ($fechaNacimiento) {
            $fechaNacimiento = $this->convertirFecha($fechaNacimiento);
        }

        // ==========================================
        // 14. CONSTRUIR PARÁMETROS (51 en total)
        // ==========================================
        return [
            // 1-5: Datos generales
            $nacionalidadId,  // ← ESTE ES EL ID CORRECTO AHORA
            $this->cleanString($data['curp'] ?? ''),
            $this->cleanString($data['nombre'] ?? ''),
            $this->cleanString($data['primerApellido'] ?? ''),
            $this->cleanString($data['segundoApellido'] ?? ''),
            
            // 6-8: Género y fecha
            $genero,
            $fechaNacimiento,
            $this->cleanString($data['lugarNacimiento'] ?? ''),
            
            // 9-13: Contacto
            $this->cleanString($data['contacto']['lada'] ?? ''),
            $this->cleanString($data['contacto']['telFijo'] ?? ''),
            $this->cleanString($data['contacto']['ext'] ?? ''),
            $this->cleanString($data['contacto']['telMovil'] ?? ''),
            $this->cleanString($data['contacto']['email'] ?? ''),
            
            // 14-22: Domicilio
            $this->cleanString($data['domicilio']['cp'] ?? ''),
            $this->cleanString($data['domicilio']['estado'] ?? ''),
            $this->cleanString($data['domicilio']['municipio'] ?? ''),
            $this->cleanString($data['domicilio']['localidad'] ?? ''),
            $this->cleanString($data['domicilio']['colonia'] ?? ''),
            $tipoCalleId,
            $this->cleanString($data['domicilio']['calle'] ?? ''),
            $this->cleanString($data['domicilio']['numExt'] ?? ''),
            $this->cleanString($data['domicilio']['numInt'] ?? ''),
            $paisNombre,
            
            // 23-30: Contacto emergencia
            $this->cleanString($data['contactoEmergencia']['nombre'] ?? ''),
            $this->cleanString($data['contactoEmergencia']['primerApellido'] ?? ''),
            $this->cleanString($data['contactoEmergencia']['segundoApellido'] ?? ''),
            $this->cleanString($data['contactoEmergencia']['lada'] ?? ''),
            $this->cleanString($data['contactoEmergencia']['telFijo'] ?? ''),
            $this->cleanString($data['contactoEmergencia']['ext'] ?? ''),
            $this->cleanString($data['contactoEmergencia']['telMovil'] ?? ''),
            $tipoParentesco,
            
            // 31-38: Datos académicos
            $posgradoId,
            $this->cleanString($data['datosAcademicos']['anioIngreso'] ?? ''),
            $periodoId,
            $this->cleanString($data['estudiosPrevios']['institucion'] ?? ''),
            $this->cleanString($data['estudiosPrevios']['gradoAcademico'] ?? ''),
            $this->cleanString($data['estudiosPrevios']['anioGrado'] ?? ''),
            $this->cleanFloat($data['estudiosPrevios']['promedio'] ?? 0),
            $tipoTitulacionId,
            
            // 39-42: Inglés
            $inglesOral,
            $inglesEscrito,
            $inglesAuditivo,
            $inglesLector,
            
            // 43-46: Experiencia
            $institucionEmpresa,
            $tipoExperiencia,
            $puestoFunciones,
            $tiempoLaborado,
            
            // 47-49: Publicaciones
            $tituloPublicacion,
            $tipoPublicacion,
            $doi,
            
            // 50-51: Motivación
            $this->cleanString($data['motivacion']['razon'] ?? ''),
            $medioId
        ];
    }

    /**
     * Convierte fecha a formato YYYY-MM-DD
     */
    private function convertirFecha(string $fecha): ?string
    {
        if (empty($fecha)) {
            return null;
        }

        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) {
            return $fecha;
        }

        if (preg_match('/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/', $fecha, $matches)) {
            return $matches[3] . '-' . $matches[2] . '-' . $matches[1];
        }

        $timestamp = strtotime($fecha);
        if ($timestamp !== false) {
            return date('Y-m-d', $timestamp);
        }

        return null;
    }

    /**
     * Limpia una cadena
     */
    protected function cleanString(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }
        $value = trim($value);
        $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
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
        $value = str_replace(',', '.', $value);
        return floatval($value);
    }

    /**
     * Verifica si un CURP ya existe
     */
    public function existeCurp(string $curp): bool
    {
        $sql = "SELECT COUNT(*) as total FROM Aspirante WHERE curp_asp = ?";
        $stmt = $this->executeQuery($sql, [$curp]);

        if ($stmt === false) {
            return false;
        }

        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        sqlsrv_free_stmt($stmt);

        return ($row['total'] ?? 0) > 0;
    }

    /**
     * Obtiene un aspirante por su ID
     */
    public function obtenerPorId(int $id): ?array
    {
        $sql = "SELECT * FROM Aspirante WHERE id_Aspirante = ?";
        $stmt = $this->executeQuery($sql, [$id]);

        if ($stmt === false) {
            return null;
        }

        $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        sqlsrv_free_stmt($stmt);

        return $row ?: null;
    }
}
?>
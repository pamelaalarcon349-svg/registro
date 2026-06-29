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
            nacionalidad_asp, curp_asp, nombre_asp, primer_apellido_asp, segundo_apellido_asp,
            genero_asp, fecha_nacimiento_asp, lugar_nacimiento_asp,
            lada_internacional_asp, telefono_fijo_asp, extension_telefonica_asp, telefono_movil_asp,
            correo_electronico_asp,
            codigo_postal_asp, estado_pais_asp, municipio_asp, localidad_asp, colonia_asp,
            tipo_calle_asp, calle_asp, numero_exterior_asp, numero_interior_asp, pais_asp,
            nombre_contacto_emg, primer_apellido_emg, segundo_apellido_emg,
            lada_internacional_emg, telefono_fijo_emg, extension_emg, telefono_movil_emg, tipo_parentesco_emg,
            posgrado_ingresar_asp, anio_ingreso_posgrado_asp, periodo_ingreso_posgrados_asp,
            institucion_educativa_asp, grado_academico_obtenido_asp, anio_obtencion_grado_asp,
            promedio_obtenido_asp, tipo_titulacion_asp,
            ingles_oral_asp, ingles_escrito_asp, ingles_auditivo_asp, ingles_lectora_asp,
            institucion_empresa_asp, tipo_experiencia_asp, puesto_funciones_asp, tiempo_laborado_asp,
            titulo_publicacion_asp, tipo_publicacion_asp, doi_articulo_asp,
            razon_estudio_inaoe_asp, medio_enterado_asp,
            estatus_solicitud_asp, fecha_creacion
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
     * Obtiene el último ID insertado usando SCOPE_IDENTITY()
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
     */
    private function prepareParams(array $data): array
    {
        // ==========================================
        // 1. NACIONALIDAD (1 = Mexicana, 2 = Extranjera)
        // ==========================================
        $nacionalidadId = ($data['nacionalidad'] ?? 'Mexicana') === 'Mexicana' ? 1 : 2;

        // ==========================================
        // 2. GÉNERO (1 = Hombre, 2 = Mujer, 3 = No binario)
        // ==========================================
        $sexo = strtoupper($data['sexo'] ?? 'HOMBRE');
        $genero = match($sexo) {
            'HOMBRE' => 1,
            'MUJER' => 2,
            'NO BINARIO' => 3,
            default => 1
        };

        // ==========================================
        // 3. POSGRADO (1 = Maestría, 2 = Doctorado, 3 = Especialidad)
        // ==========================================
        $posgrado = $data['datosAcademicos']['posgrado'] ?? '';
        $posgradoId = match($posgrado) {
            'Maestría' => 1,
            'Doctorado' => 2,
            'Especialidad' => 3,
            default => 1
        };

        // ==========================================
        // 4. PERIODO - ⚠️ SOLO PERMITE '1' SEGÚN LA RESTRICCIÓN
        // ==========================================
        // La restricción check_periodo_ingreso_posgrados_asp SOLO permite '1'
        // Así que siempre enviamos 1
        $periodoId = 1; // Fijo en 1 por la restricción

        // ==========================================
        // 5. PARENTESCO (1-6 según restricción)
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
            'OTRO' => 6  // ⚠️ 'OTRO' también va a 6 porque la restricción solo permite 1-6
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
        $tipoTitulacionId = $titulacionMap[strtoupper(explode(' - ', $tipoTitulacion)[0])] ?? 1;

        // ==========================================
        // 7. TIPO DE CALLE (1-5 según restricción)
        // ==========================================
        $tipoCalleMap = [
            'CALLE' => 1,
            'AVENIDA' => 2,
            'BULEVAR' => 3,
            'CAMINO' => 4,
            'PRIVADA' => 5,
            'OTRO' => 5  // ⚠️ 'OTRO' va a 5 porque la restricción solo permite 1-5
        ];
        $tipoCalle = strtoupper($data['domicilio']['tipoCalle'] ?? '');
        $tipoCalleId = $tipoCalleMap[$tipoCalle] ?? 1;

        // ==========================================
        // 8. NIVEL DE INGLÉS (1, 2, 3)
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
        // 9. TIPO DE EXPERIENCIA (1, 2, 3)
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
            $tipoExperiencia = match($tipoExp) {
                'PROFESIONAL' => 1,
                'DOCENTE' => 2,
                'OTRO' => 3,
                default => 1
            };
            $puestoFunciones = $this->cleanString($primeraExp['puesto'] ?? '');
            $tiempoLaborado = $this->cleanString($primeraExp['tiempoLaborado'] ?? '');
        }

        // ==========================================
        // 10. PUBLICACIONES
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
        // 11. MEDIO (1, 2, 3, 4)
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
        // 12. CONVERTIR FECHA
        // ==========================================
        $fechaNacimiento = $this->cleanString($data['fechaNacimiento'] ?? '');
        if ($fechaNacimiento) {
            $fechaNacimiento = $this->convertirFecha($fechaNacimiento);
        }

        // ==========================================
        // 13. CONSTRUIR ARRAY DE PARÁMETROS
        // ==========================================
        return [
            // Datos generales
            $nacionalidadId,                                    // 0
            $this->cleanString($data['curp'] ?? ''),            // 1
            $this->cleanString($data['nombre'] ?? ''),          // 2
            $this->cleanString($data['primerApellido'] ?? ''),  // 3
            $this->cleanString($data['segundoApellido'] ?? ''), // 4
            
            // Género y fecha
            $genero,                                            // 5
            $fechaNacimiento,                                   // 6
            $this->cleanString($data['lugarNacimiento'] ?? ''), // 7
            
            // Contacto
            $this->cleanString($data['contacto']['lada'] ?? ''),    // 8
            $this->cleanString($data['contacto']['telFijo'] ?? ''), // 9
            $this->cleanString($data['contacto']['ext'] ?? ''),     // 10
            $this->cleanString($data['contacto']['telMovil'] ?? ''),// 11
            $this->cleanString($data['contacto']['email'] ?? ''),   // 12
            
            // Domicilio
            $this->cleanString($data['domicilio']['cp'] ?? ''),         // 13
            $this->cleanString($data['domicilio']['estado'] ?? ''),     // 14
            $this->cleanString($data['domicilio']['municipio'] ?? ''),  // 15
            $this->cleanString($data['domicilio']['localidad'] ?? ''),  // 16
            $this->cleanString($data['domicilio']['colonia'] ?? ''),    // 17
            $tipoCalleId,                                               // 18
            $this->cleanString($data['domicilio']['calle'] ?? ''),      // 19
            $this->cleanString($data['domicilio']['numExt'] ?? ''),     // 20
            $this->cleanString($data['domicilio']['numInt'] ?? ''),     // 21
            $this->cleanString($data['domicilio']['pais'] ?? ''),       // 22
            
            // Contacto de emergencia
            $this->cleanString($data['contactoEmergencia']['nombre'] ?? ''),          // 23
            $this->cleanString($data['contactoEmergencia']['primerApellido'] ?? ''),  // 24
            $this->cleanString($data['contactoEmergencia']['segundoApellido'] ?? ''), // 25
            $this->cleanString($data['contactoEmergencia']['lada'] ?? ''),            // 26
            $this->cleanString($data['contactoEmergencia']['telFijo'] ?? ''),         // 27
            $this->cleanString($data['contactoEmergencia']['ext'] ?? ''),             // 28
            $this->cleanString($data['contactoEmergencia']['telMovil'] ?? ''),        // 29
            $tipoParentesco,                                        // 30
            
            // Datos académicos
            $posgradoId,                                            // 31
            $this->cleanString($data['datosAcademicos']['anioIngreso'] ?? ''), // 32
            $periodoId,                                             // 33 ⚠️ SIEMPRE 1
            $this->cleanString($data['estudiosPrevios']['institucion'] ?? ''), // 34
            $this->cleanString($data['estudiosPrevios']['gradoAcademico'] ?? ''), // 35
            $this->cleanString($data['estudiosPrevios']['anioGrado'] ?? ''), // 36
            $this->cleanFloat($data['estudiosPrevios']['promedio'] ?? 0), // 37
            $tipoTitulacionId,                                      // 38
            
            // Inglés
            $inglesOral,    // 39
            $inglesEscrito, // 40
            $inglesAuditivo,// 41
            $inglesLector,  // 42
            
            // Experiencia laboral
            $institucionEmpresa, // 43
            $tipoExperiencia,    // 44
            $puestoFunciones,    // 45
            $tiempoLaborado,     // 46
            
            // Publicaciones
            $tituloPublicacion, // 47
            $tipoPublicacion,   // 48
            $doi,               // 49
            
            // Motivación
            $this->cleanString($data['motivacion']['razon'] ?? ''), // 50
            $medioId                                                // 51
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

        // Si ya está en formato YYYY-MM-DD
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) {
            return $fecha;
        }

        // Si está en formato DD/MM/YYYY
        if (preg_match('/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/', $fecha, $matches)) {
            return $matches[3] . '-' . $matches[2] . '-' . $matches[1];
        }

        // Intentar con strtotime
        $timestamp = strtotime($fecha);
        if ($timestamp !== false) {
            return date('Y-m-d', $timestamp);
        }

        return null;
    }

    /**
     * Verifica si un CURP ya existe en la base de datos
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
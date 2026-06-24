<?php
// Permitir CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Si es una solicitud OPTIONS (preflight), terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir configuraciones
require_once '../config/database.php';
require_once '../includes/functions.php';

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Use POST.'
    ]);
    exit();
}

// Obtener datos del body
$input = json_decode(file_get_contents('php://input'), true);

// Validar que llegaron datos
if (!$input || !isset($input['nombre']) || !isset($input['primerApellido'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Faltan datos obligatorios: nombre y apellido'
    ]);
    exit();
}

function registro(nacionalidad,curp,nombre,primerApellido,segundoApellido){


$conn = getConnection();
$idAspirante = null;

$params = [
        // Datos personales
        $input['nacionalidad'] === 'Mexicana' ? 1 : 2,
        $input['curp'] ?? null,
        $input['nombre'],
        $input['primerApellido'],
        $input['segundoApellido'] ?? null,
        obtenerGenero($input['sexo']),
        parseFecha($input['fechaNacimiento']),
        $input['lugarNacimiento'],
        $input['contacto']['lada'] ?? '',
        $input['contacto']['telFijo'] ?? null,
        $input['contacto']['ext'] ?? null,
        $input['contacto']['telMovil'] ?? '',
        $input['contacto']['email'] ?? '',
        
        // Domicilio
        $input['domicilio']['cp'] ?? '',
        $input['domicilio']['estado'] ?? '',
        $input['domicilio']['municipio'] ?? '',
        $input['domicilio']['localidad'] ?? '',
        $input['domicilio']['colonia'] ?? '',
        $input['domicilio']['tipoCalle'] ?? '',
        $input['domicilio']['calle'] ?? '',
        $input['domicilio']['numExt'] ?? '',
        $input['domicilio']['numInt'] ?? null,
        $input['domicilio']['pais'] ?? '',
        
        // Contacto emergencia
        $input['contactoEmergencia']['nombre'] ?? '',
        $input['contactoEmergencia']['primerApellido'] ?? '',
        $input['contactoEmergencia']['segundoApellido'] ?? null,
        $input['contactoEmergencia']['lada'] ?? '',
        $input['contactoEmergencia']['telFijo'] ?? '',
        $input['contactoEmergencia']['ext'] ?? null,
        $input['contactoEmergencia']['telMovil'] ?? '',
        obtenerParentesco($input['contactoEmergencia']['parentesco'] ?? 'OTRO'),
        
        // Datos académicos
        ($input['datosAcademicos']['posgrado'] ?? '') === 'Maestría' ? 1 : 2,
        $input['datosAcademicos']['anioIngreso'] ?? '',
        1, // periodo fijo
        
        // Estudios previos
        $input['estudiosPrevios']['institucion'] ?? '',
        $input['estudiosPrevios']['gradoAcademico'] ?? '',
        $input['estudiosPrevios']['anioGrado'] ?? '',
        floatval($input['estudiosPrevios']['promedio'] ?? 0),
        obtenerTipoTitulacion($input['estudiosPrevios']['tipoTitulacion'] ?? ''),
        
        // Inglés
        obtenerNivelIngles($input['dominioIngles']['expresionOral'] ?? ''),
        obtenerNivelIngles($input['dominioIngles']['expresionEscrita'] ?? ''),
        obtenerNivelIngles($input['dominioIngles']['comprensionAuditiva'] ?? ''),
        obtenerNivelIngles($input['dominioIngles']['comprensionLectora'] ?? ''),
        
        // Experiencia laboral (solo la primera)
        $input['experienciaLaboral'][0]['institucion'] ?? null,
        obtenerTipoExperiencia($input['experienciaLaboral'][0]['tipoExperiencia'] ?? ''),
        $input['experienciaLaboral'][0]['puesto'] ?? null,
        $input['experienciaLaboral'][0]['tiempoLaborado'] ?? null,
        
        // Publicaciones (solo la primera)
        $input['publicaciones'][0]['titulo'] ?? null,
        $input['publicaciones'][0]['tipoPublicacion'] ?? null,
        $input['publicaciones'][0]['doi'] ?? null,
        
        // Motivación
        $input['motivacion']['razon'] ?? '',
        obtenerMedioEnterado($input['motivacion']['medio'] ?? ''),
        1, // estatus_solicitud_asp
        date('Y-m-d H:i:s') // fecha_creacion
    ];
    



try {






// ============================================
    // INSERTAR EN Aspirante
    // ============================================
    $sql = "INSERT INTO Aspirante (
        nacionalidad_asp, curp_asp, nombre_asp, primer_apellido_asp, segundo_apellido_asp,
        genero_asp, fecha_nacimiento_asp, lugar_nacimiento_asp, lada_telefonica_asp,
        telefono_fijo_asp, extension_telefonica_asp, telefono_movil_asp,
        correo_electronico_asp, codigo_postal_asp, estado_pais_asp, municipio_asp,
        localidad_asp, colonia_asp, tipo_calle_asp, calle_asp, numero_exterior_asp,
        numero_interior_asp, pais_asp, nombre_contacto_emg, primer_apellido_emg,
        segundo_apellido_emg, lada_emg, telefono_fijo_emg, extencion_emg,
        telefono_movil_emg, tipo_parentesco_emg, posgrado_ingresar_asp,
        anio_ingreso_posgrado_asp, periodo_ingreso_posgrados_asp, institucion_educativa_asp,
        grado_academico_obtenido_asp, anio_obtencion_grado_asp, promedio_obtenido_asp,
        tipo_titulacion_asp, ingles_oral_asp, ingles_escrito_asp, ingles_auditivo_asp,
        ingles_lectora_asp, institucion_empresa_asp, tipo_experiencia_asp,
        puesto_funciones_asp, tiempo_laborado_asp, titulo_publicacion_asp,
        tipo_publicacion_asp, doi_articulo_asp, razon_estudio_inaoe_asp,
        medio_enterado_asp, estatus_solicitud_asp, fecha_creacion
    ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?
    )";
    
    
    $stmt = sqlsrv_query($conn, $sql, $params);
    
    if ($stmt === false) {
        throw new Exception("Error en INSERT: " . print_r(sqlsrv_errors(), true));
    }
    
    // Obtener el ID insertado
    $idSql = "SELECT SCOPE_IDENTITY() AS id";
    $idStmt = sqlsrv_query($conn, $idSql);
    $idRow = sqlsrv_fetch_array($idStmt, SQLSRV_FETCH_ASSOC);
    $idAspirante = $idRow['id'];
    
    // ============================================
    // INSERTAR EN Registro_Aspirante
    // ============================================
    $sqlRegistro = "INSERT INTO Registro_Aspirante (
        id_Aspirante, estatus, fecha_movimiento, correo_electronico_asp
    ) VALUES (?, ?, ?, ?)";
    
    $paramsRegistro = [
        $idAspirante,
        1,
        date('Y-m-d H:i:s'),
        $input['contacto']['email'] ?? ''
    ];
    
    $stmtRegistro = sqlsrv_query($conn, $sqlRegistro, $paramsRegistro);
    
    if ($stmtRegistro === false) {
        throw new Exception("Error en INSERT Registro: " . print_r(sqlsrv_errors(), true));
    }
    
    // ============================================
    // RESPUESTA EXITOSA
    // ============================================
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => '🎉 Aspirante registrado exitosamente',
        'idAspirante' => $idAspirante,
        'data' => $input
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al registrar el aspirante',
        'error' => $e->getMessage()
    ]);
} finally {
    // Cerrar conexión
    if (isset($conn)) {
        sqlsrv_close($conn);
    }
}


}

?>
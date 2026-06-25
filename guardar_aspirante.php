<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ============================================================
// CLASE DE CONEXIÓN
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
// RECIBIR DATOS
// ============================================================
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode([
        'success' => false,
        'error' => 'No se recibieron datos del formulario'
    ]);
    exit;
}

// Conectar
$db = new DBConnectionModel();
if (!$db->createConnection()) {
    echo json_encode([
        'success' => false,
        'error' => 'Error de conexión: ' . $db->getErrorMessage()
    ]);
    exit;
}
$conn = $db->getConnection();

// ============================================================
// CORREGIR FECHA DE NACIMIENTO (dd/mm/yyyy -> yyyy-mm-dd)
// ============================================================
$fechaNacimiento = $input['fechaNacimiento'] ?? '';

if (!empty($fechaNacimiento)) {
    // Si viene en formato dd/mm/yyyy
    if (strpos($fechaNacimiento, '/') !== false) {
        $partes = explode('/', $fechaNacimiento);
        if (count($partes) === 3) {
            // dd/mm/yyyy -> yyyy-mm-dd
            $fechaNacimiento = $partes[2] . '-' . $partes[1] . '-' . $partes[0];
        }
    }
    // Intentar convertir cualquier otro formato
    $timestamp = strtotime($fechaNacimiento);
    if ($timestamp !== false) {
        $fechaNacimiento = date('Y-m-d', $timestamp);
    }
} else {
    $fechaNacimiento = null;
}

// ============================================================
// MAPEAR DATOS DEL FORMULARIO
// ============================================================
$nacionalidad = $input['nacionalidad'] ?? 'Mexicana';
$nacionalidadId = ($nacionalidad === 'Mexicana') ? 1 : 2;

$curp = $input['curp'] ?? null;
$nombre = $input['nombre'] ?? '';
$primerApellido = $input['primerApellido'] ?? '';
$segundoApellido = $input['segundoApellido'] ?? null;

$sexo = $input['sexo'] ?? 'HOMBRE';
$genero = ($sexo === 'HOMBRE') ? 1 : (($sexo === 'MUJER') ? 2 : 3);

$lugarNacimiento = $input['lugarNacimiento'] ?? '';

// --- CONTACTO ---
$contacto = $input['contacto'] ?? [];
$lada = $contacto['lada'] ?? '';
$telFijo = $contacto['telFijo'] ?? null;
$ext = $contacto['ext'] ?? null;
$telMovil = $contacto['telMovil'] ?? '';
$email = $contacto['email'] ?? '';

// --- DOMICILIO ---
$domicilio = $input['domicilio'] ?? [];
$cp = $domicilio['cp'] ?? '';
$estado = $domicilio['estado'] ?? '';
$municipio = $domicilio['municipio'] ?? '';
$localidad = $domicilio['localidad'] ?? '';
$colonia = $domicilio['colonia'] ?? '';
$tipoCalle = $domicilio['tipoCalle'] ?? '';
$calle = $domicilio['calle'] ?? '';
$numExt = $domicilio['numExt'] ?? '';
$numInt = $domicilio['numInt'] ?? null;
$pais = $domicilio['pais'] ?? '';

// --- CONTACTO DE EMERGENCIA ---
$emergencia = $input['contactoEmergencia'] ?? [];
$nombreEmergencia = $emergencia['nombre'] ?? '';
$primerApellidoEmergencia = $emergencia['primerApellido'] ?? '';
$segundoApellidoEmergencia = $emergencia['segundoApellido'] ?? null;
$ladaEmergencia = $emergencia['lada'] ?? '';
$telFijoEmergencia = $emergencia['telFijo'] ?? '';
$extEmergencia = $emergencia['ext'] ?? null;
$telMovilEmergencia = $emergencia['telMovil'] ?? '';

$parentescoMap = [
    'MADRE' => 1, 'PADRE' => 2, 'HERMANO' => 3, 'HERMANA' => 4,
    'TIO' => 5, 'TIA' => 6, 'ABUELO' => 7, 'ABUELA' => 8,
    'PRIMO' => 9, 'PRIMA' => 10, 'HIJO' => 11, 'HIJA' => 12,
    'OTRO' => 13
];
$parentesco = $emergencia['parentesco'] ?? '';
$tipoParentesco = $parentescoMap[$parentesco] ?? 13;

// --- DATOS ACADÉMICOS ---
$academicos = $input['datosAcademicos'] ?? [];
$posgrado = $academicos['posgrado'] ?? '';
$posgradoId = ($posgrado === 'Maestría') ? 1 : (($posgrado === 'Doctorado') ? 2 : 1);
$anioIngreso = $academicos['anioIngreso'] ?? '';
$periodo = $academicos['periodo'] ?? '';
$periodoId = ($periodo === 'Agosto-Diciembre') ? 1 : 2;

// --- ESTUDIOS PREVIOS ---
$estudios = $input['estudiosPrevios'] ?? [];
$institucion = $estudios['institucion'] ?? '';
$gradoAcademico = $estudios['gradoAcademico'] ?? '';
$anioGrado = $estudios['anioGrado'] ?? '';
$promedio = floatval($estudios['promedio'] ?? 0);

$tipoTitulacion = $estudios['tipoTitulacion'] ?? '';
$titulacionMap = ['Tesis' => 1, 'Estudios de Maestría' => 2, 'Otro' => 3];
$tipoTitulacionId = $titulacionMap[explode(' - ', $tipoTitulacion)[0]] ?? 1;

// --- DOMINIO INGLÉS ---
$ingles = $input['dominioIngles'] ?? [];
$nivelMap = ['básico' => 1, 'intermedio' => 2, 'avanzado' => 3];
$inglesOral = $nivelMap[$ingles['expresionOral'] ?? ''] ?? null;
$inglesEscrito = $nivelMap[$ingles['expresionEscrita'] ?? ''] ?? null;
$inglesAuditivo = $nivelMap[$ingles['comprensionAuditiva'] ?? ''] ?? null;
$inglesLector = $nivelMap[$ingles['comprensionLectora'] ?? ''] ?? null;

// --- EXPERIENCIA LABORAL (solo primer registro) ---
$experiencia = $input['experienciaLaboral'] ?? [];
$institucionEmpresa = '';
$tipoExperiencia = null;
$puestoFunciones = '';
$tiempoLaborado = '';
if (!empty($experiencia)) {
    $primeraExp = $experiencia[0];
    $institucionEmpresa = $primeraExp['institucion'] ?? '';
    $tipoExp = $primeraExp['tipoExperiencia'] ?? '';
    $tipoExperiencia = ($tipoExp === 'PROFESIONAL') ? 1 : (($tipoExp === 'DOCENTE') ? 2 : 3);
    $puestoFunciones = $primeraExp['puesto'] ?? '';
    $tiempoLaborado = $primeraExp['tiempoLaborado'] ?? '';
}

// --- PUBLICACIONES (solo primer registro) ---
$publicaciones = $input['publicaciones'] ?? [];
$tituloPublicacion = '';
$tipoPublicacion = '';
$doi = '';
if (!empty($publicaciones)) {
    $primeraPub = $publicaciones[0];
    $tituloPublicacion = $primeraPub['titulo'] ?? '';
    $tipoPublicacion = $primeraPub['tipoPublicacion'] ?? '';
    $doi = $primeraPub['doi'] ?? '';
}

// --- MOTIVACIÓN ---
$motivacion = $input['motivacion'] ?? [];
$razon = $motivacion['razon'] ?? '';
$medio = $motivacion['medio'] ?? '';
$medioMap = ['Feria de posgrados' => 1, 'Página de internet' => 2, 'Amigo' => 3, 'Otro' => 4];
$medioId = $medioMap[$medio] ?? 1;

// ============================================================
// CONSULTA SQL CON FECHA CORREGIDA
// ============================================================
$sql = "INSERT INTO Aspirante (
    nacionalidad_asp, curp_asp, nombre_asp, primer_apellido_asp, segundo_apellido_asp,
    genero_asp, fecha_nacimiento_asp, lugar_nacimiento_asp,
    lada_telefonica_asp, telefono_fijo_asp, extension_telefonica_asp, telefono_movil_asp,
    correo_electronico_asp,
    codigo_postal_asp, estado_pais_asp, municipio_asp, localidad_asp, colonia_asp,
    tipo_calle_asp, calle_asp, numero_exterior_asp, numero_interior_asp, pais_asp,
    nombre_contacto_emg, primer_apellido_emg, segundo_apellido_emg,
    lada_emg, telefono_fijo_emg, extencion_emg, telefono_movil_emg, tipo_parentesco_emg,
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
    1, CONVERT(DATETIME, GETDATE())
)";

$params = [
    $nacionalidadId, $curp, $nombre, $primerApellido, $segundoApellido,
    $genero, $fechaNacimiento, $lugarNacimiento,
    $lada, $telFijo, $ext, $telMovil,
    $email,
    $cp, $estado, $municipio, $localidad, $colonia,
    $tipoCalle, $calle, $numExt, $numInt, $pais,
    $nombreEmergencia, $primerApellidoEmergencia, $segundoApellidoEmergencia,
    $ladaEmergencia, $telFijoEmergencia, $extEmergencia, $telMovilEmergencia, $tipoParentesco,
    $posgradoId, $anioIngreso, $periodoId,
    $institucion, $gradoAcademico, $anioGrado,
    $promedio, $tipoTitulacionId,
    $inglesOral, $inglesEscrito, $inglesAuditivo, $inglesLector,
    $institucionEmpresa, $tipoExperiencia, $puestoFunciones, $tiempoLaborado,
    $tituloPublicacion, $tipoPublicacion, $doi,
    $razon, $medioId
];

// ============================================================
// EJECUTAR CONSULTA
// ============================================================
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    echo json_encode([
        'success' => false,
        'error' => 'Error al guardar: ' . print_r(sqlsrv_errors(), true)
    ]);
} else {
    sqlsrv_free_stmt($stmt);
    
    echo json_encode([
        'success' => true,
        'message' => 'Solicitud guardada exitosamente'
    ]);
}

sqlsrv_close($conn);
?>
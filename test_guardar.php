<?php
// test_guardar.php - Prueba directa del guardado

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Prueba de guardado</h2>";

require_once 'config/settings.php';
require_once 'models/DBConnectionModel.php';
require_once 'models/SQLQueries/DatabaseQueries.php';
require_once 'models/SQLQueries/AspiranteQueries.php';

// Datos de prueba
$datos = [
    'nacionalidad' => 'Mexicana',
    'curp' => 'GODE900101HDFRRL09',
    'nombre' => 'JUAN',
    'primerApellido' => 'PEREZ',
    'segundoApellido' => 'GOMEZ',
    'sexo' => 'HOMBRE',
    'fechaNacimiento' => '1990-01-01',
    'lugarNacimiento' => 'CDMX',
    'contacto' => [
        'lada' => '+52',
        'telFijo' => '5555555555',
        'ext' => '123',
        'telMovil' => '5555555555',
        'email' => 'juan@test.com'
    ],
    'domicilio' => [
        'cp' => '12345',
        'estado' => 'CDMX',
        'municipio' => 'CDMX',
        'localidad' => 'CDMX',
        'colonia' => 'CENTRO',
        'tipoCalle' => 'CALLE',
        'calle' => 'PRINCIPAL',
        'numExt' => '123',
        'numInt' => 'A',
        'pais' => '1'
    ],
    'contactoEmergencia' => [
        'nombre' => 'MARIA',
        'primerApellido' => 'LOPEZ',
        'segundoApellido' => 'GARCIA',
        'lada' => '+52',
        'telFijo' => '5555555555',
        'ext' => '456',
        'telMovil' => '5555555555',
        'parentesco' => 'MADRE'
    ],
    'datosAcademicos' => [
        'posgrado' => 'Maestría',
        'anioIngreso' => '2026',
        'periodo' => 'Agosto - Diciembre'
    ],
    'estudiosPrevios' => [
        'institucion' => 'UNAM',
        'gradoAcademico' => 'LICENCIATURA',
        'anioGrado' => '2015',
        'promedio' => '8.5',
        'tipoTitulacion' => 'TESIS'
    ],
    'dominioIngles' => [
        'expresionEscrita' => 'intermedio',
        'expresionOral' => 'intermedio',
        'comprensionLectora' => 'avanzado',
        'comprensionAuditiva' => 'intermedio'
    ],
    'experienciaLaboral' => [],
    'publicaciones' => [],
    'motivacion' => [
        'razon' => 'ME GUSTA LA CIENCIA',
        'medio' => 'Página de internet'
    ]
];

echo "Conectando a la base de datos...<br>";
$db = new DBConnectionModel();
if (!$db->createConnection()) {
    die("Error de conexión: " . $db->getErrorMessage());
}
echo "✅ Conexión exitosa<br>";

$conn = $db->getConnection();
$aspiranteQueries = new AspiranteQueries($conn);

echo "Intentando guardar...<br>";
$resultado = $aspiranteQueries->guardarAspirante($datos);

if ($resultado) {
    $id = $aspiranteQueries->obtenerUltimoId();
    echo "✅ ¡Registro insertado con éxito! ID: $id<br>";
} else {
    echo "❌ Error: " . $aspiranteQueries->getLastError() . "<br>";
}

$db->closeConnection();
?>
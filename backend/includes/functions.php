<?php
// Funciones auxiliares para mapear valores

function obtenerGenero($sexo) {
    $mapa = [
        'HOMBRE' => 1,
        'MUJER' => 2,
        'NO BINARIO' => 3
    ];
    return $mapa[strtoupper($sexo)] ?? 1;
}

function parseFecha($fechaStr) {
    if (empty($fechaStr)) return null;
    
    // Formato: dd/mm/yyyy
    if (strpos($fechaStr, '/') !== false) {
        $partes = explode('/', $fechaStr);
        if (count($partes) === 3) {
            return $partes[2] . '-' . $partes[1] . '-' . $partes[0];
        }
    }
    return $fechaStr;
}

function obtenerParentesco($parentesco) {
    $mapa = [
        'MADRE' => 1,
        'PADRE' => 2,
        'HERMANO' => 3,
        'HERMANA' => 4,
        'TIO' => 5,
        'TIA' => 6,
        'ABUELO' => 7,
        'ABUELA' => 8,
        'PRIMO' => 9,
        'PRIMA' => 10,
        'HIJO' => 11,
        'HIJA' => 12,
        'OTRO' => 13
    ];
    return $mapa[strtoupper($parentesco)] ?? 13;
}

function obtenerTipoTitulacion($titulacion) {
    $upper = strtoupper($titulacion);
    if (strpos($upper, 'TESIS') !== false) return 1;
    if (strpos($upper, 'MAESTRÍA') !== false || strpos($upper, 'ESTUDIOS DE MAESTRÍA') !== false) return 2;
    return 3;
}

function obtenerNivelIngles($nivel) {
    $mapa = [
        'básico' => 1,
        'intermedio' => 2,
        'avanzado' => 3,
        'basico' => 1
    ];
    $nivel = strtolower($nivel);
    return $mapa[$nivel] ?? null;
}

function obtenerMedioEnterado($medio) {
    $mapa = [
        'Feria de posgrados' => 1,
        'Página de internet' => 2,
        'Amigo' => 3,
        'Otro' => 4
    ];
    return $mapa[$medio] ?? 1;
}

function obtenerTipoExperiencia($tipo) {
    $mapa = [
        'PROFESIONAL' => 1,
        'DOCENTE' => 2,
        'OTRO' => 3,
        'INVESTIGACIÓN' => 4
    ];
    return $mapa[strtoupper($tipo)] ?? null;
}
?>
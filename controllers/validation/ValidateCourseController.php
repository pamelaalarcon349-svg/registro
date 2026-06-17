<?php

namespace controllers\validateCourse;

use JetBrains\PhpStorm\NoReturn;
use LDAP\Result;
use Exception;
use services\validation\ValidateCourseService;
use repositories\validation\ValidateCourseRepository;

require_once __DIR__ . '/../../autoload.php';

class validateCourseController
{
  private ValidateCourseService $validateCourseService;

  // Constructor de la clase
  public function __construct(ValidateCourseService $validateCourseService)
  {
    $this->validateCourseService = $validateCourseService;
  }

  // Método principal para manejar las solicitudes
  public function handleRequest(): void
  {
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $requestUri = $_SERVER['REQUEST_URI'];

    // Extraer el ID del certificado de la URI (si existe)
    $urlParts = explode('/', trim($requestUri, '/'));
    $id = isset($urlParts[2]) ? intval($urlParts[2]) : null;

    // Manejar la solicitud según el método HTTP
    switch ($requestMethod) {
      case 'POST':
        $this->validateCertificatePost();
        break;
      case 'GET':
        $this->validateCertificate();
        break;
      case 'OPTIONS':
        $this->sendJsonResponse(['message' => 'Options request handled']);
        break;
      default:
        $this->sendJsonResponse(['error' => 'Método no permitido'], 405);
        break;
    }
  }

  // Método para validar el certificado (GET)
  public function validateCertificate(): void
  {
    try {
      $folio = $_GET['folio'] ?? $_POST['folio'] ?? null;

      if ($folio !== null) {
        $result = $this->validateCourseService->validateCertificate($folio);

        if ($result) {
          // Asegúrate de que $result esté en el formato correcto antes de acceder a los datos
          $certificateData = $result[0] ?? null; // Asegura que estamos trabajando con el primer elemento (si hay más)

          if ($certificateData) {
            // Verificar el valor de id_cat_certificate en la respuesta
            $idCatCertificate = $certificateData['id_cat_certificate'] ?? null;

            if ($idCatCertificate === "CURSOS IMPARTIDOS") {
              echo "<script>
                                sessionStorage.setItem('constancia', JSON.stringify(" . json_encode($result) . "));
                                window.location.href = '../../views/constancy/validateCertificate/validatedCertificatesDetails.html';
                            </script>";
            } elseif ($idCatCertificate === "PARTICIPACIÓN DE EXAMEN DE GRADO") {
              echo "<script>
                                sessionStorage.setItem('constancia', JSON.stringify(" . json_encode($result) . "));
                                window.location.href = '../../views/constancy/validateCertificate/validateCertificateDegreeExamResult.html';
                            </script>";
            } else {
              // Caso donde el id_cat_certificate no coincide con ninguna opción conocida
              $this->sendJsonResponse(['error' => 'Categoría desconocida'], 400);
            }
          } else {
            $this->sendJsonResponse(['error' => 'No se encontró la información del certificado'], 400);
          }
        } else {
          $this->sendJsonResponse(['error' => 'Constancia no encontrada']);
        }
      } else {
        $this->sendJsonResponse(['error' => 'Folio no proporcionado'], 400);
      }
    } catch (Exception $e) {
      // Manejo de errores
      $this->sendJsonResponse(['error' => $e->getMessage()], 500);
    }
  }

  // Método para validar el certificado (POST)
  public function validateCertificatePost(): void
  {
    try {
      $folio = isset($_GET['folio']) ? $_GET['folio'] : null;

      // Realizar la acción solo si $folio no es null
      if ($folio !== null) {
        $result = $this->validateCourseService->validateCertificate($folio);

        // Enviar el JSON sin la clave "constancia"
        $this->sendJsonResponse($result);
      }
    } catch (Exception $e) {
      // Manejo de errores
      $this->sendJsonResponse(['error' => $e->getMessage()]);
    }
  }

  // Método para enviar respuestas JSON
  #[NoReturn] protected function sendJsonResponse($data, $statusCode = 200): void
  {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
  }

}

// Crear instancias de las dependencias y manejar la solicitud
$validateCourseRepository = new ValidateCourseRepository();
$validateCourseService = new ValidateCourseService($validateCourseRepository);
$controller = new ValidateCourseController($validateCourseService);
$controller->handleRequest();

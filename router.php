<?php

require_once 'controllers/zapatillaController.php';

class Router
{
    public function handleRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = $_SERVER['REQUEST_URI'];

        $uri = strtok($uri, '?');

        if (strpos($uri, '/zapatillas') === 0) {
            $zapatillaController = new zapatillaController();

            switch ($method) {
                case 'GET':
                    if (preg_match('/\/zapatillas\/(\d+)/', $uri, $matches)) {
                        $zapatillaController->getZapatillas($matches[1]);
                    } else {
                        $zapatillaController->getAllZapatillas();
                    }
                    break;

                case 'POST':
                    $zapatillaController->createZapatilla();
                    break;

                case 'PUT':
                    if (preg_match('/\/zapatillas\/(\d+)/', $uri, $matches)) {
                        $zapatillaController->updateZapatilla($matches[1]);
                    }
                    break;

                case 'DELETE':
                    if (preg_match('/\/zapatillas\/(\d+)/', $uri, $matches)) {
                        $zapatillaController->deleteZaptilla($matches[1]);
                    }
                    break;

                default:
                    http_response_code(405);
                    echo json_encode(["error" => "Método no permitido"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Ruta no encontrada"]);
        }
    }
}
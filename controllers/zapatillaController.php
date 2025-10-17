<?php

require_once 'models/zapatilla.php';

class ZapatillaController
{
    private $zapatillaModel;

    public function __construct()
    {
        $this->zapatillaModel = new Zapatilla();
    }

    public function getAllZapatillas()
    {
        $zapatillas = $this->zapatillaModel->getAll();

        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

        $page = $page < 1 ? 1 : $page;
        $limit = $limit < 1 ? 10 : $limit;

        $offset = ($page - 1) * $limit;

        $paginatedZapatillas = array_slice($zapatillas, $offset, $limit);

        $total = count($zapatillas);
        $totalPages = ceil($total / $limit);

        echo json_encode([
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'totalPages' => $totalPages,
            'zapatillas' => $paginatedZapatillas
        ]);
    }

    public function getZapatillas($id)
    {
        $zapatillas = $this->zapatillaModel->getById($id);
        if ($zapatillas) {
            echo json_encode($zapatillas);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "zapatilla nmo encontrada"]);
            exit;
        }
    }

    public function createZapatilla()
    {
        $data = $_POST;

        if (empty($data['imagen'])) {
            echo json_encode(['error' => 'La imagen (URL) es requerida', 'status' => 400]);
            return;
        }

        if (!filter_var($data['imagen'], FILTER_VALIDATE_URL)) {
            echo json_encode(['error' => 'La URL de imagen no es valida', 'status' => 400]);
            return;
        }

        $newZapatilla = $this->zapatillaModel->create($data);
        echo json_encode($newZapatilla);
    }

    public function updateZapatilla($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $updateZapatilla = $this->zapatillaModel->update($id, $data);

        if ($updateZapatilla) {
            echo json_encode(["mensaje" => "producto actualziado correctamente"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "zapatilla NO actualziada"]);
        }
    }

    public function deleteZaptilla($id)
    {
        $zapatillaDelete = $this->zapatillaModel->delete($id);
        if ($zapatillaDelete) {
            echo json_encode(["menssage" => "Zapatilla eliminada"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "zapatilla no encontrada"]);
        }
    }
}

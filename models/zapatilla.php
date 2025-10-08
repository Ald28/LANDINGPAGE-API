<?php

class Zapatilla
{
    private $zapatillas = [];
    private $nextId = 1;
    private $file = __DIR__ . '/../storage/zapatillas.json';

    public function __construct()
    {

        if (file_exists($this->file)) {
            $jsonData = file_get_contents($this->file);
            $this->zapatillas = json_decode($jsonData, true) ?? [];

            if (!empty($this->zapatillas)) {
                $ids = array_column($this->zapatillas, 'id');
                $this->nextId = max($ids) + 1;
            }
        } else {

            $this->zapatillas = [
                1 => ['id' => 1, 'marca' => 'Nike', 'modelo' => 'Air Max', 'color' => 'Rojo', 'precio' => 120.00, 'imagen' => 'https://www.moov.com.ar/marcas/nike/airmax90', 'genero' => 'hombre', 'edad' => 'adulto', 'descripcion' => 'Zapatillas deportivas Nike Air Max para hombre.', 'tallas' => [40, 41, 42, 43, 44, 45]],
                2 => ['id' => 2, 'marca' => 'Adidas', 'modelo' => 'Ultraboost', 'color' => 'Verde', 'precio' => 150.00, 'imagen' => 'https://www.adidas.com.ar/ultraboost', 'genero' => 'mujer', 'edad' => 'adulto', 'descripcion' => 'Zapatillas Adidas Ultraboost para mujer.', 'tallas' => [36, 37, 38, 39, 40, 41]],
            ];

            $this->nextId = 3;
            $this->save();
        }
    }

    private function save()
    {
        file_put_contents($this->file, json_encode($this->zapatillas, JSON_PRETTY_PRINT));
    }

    public function getAll()
    {
        return array_values($this->zapatillas);
    }

    public function getById($id)
    {
        return $this->zapatillas[$id] ?? null;
    }

    public function create($data)
    {

        $genero = ucfirst(strtolower($data['genero']));
        $edad = ucfirst(strtolower($data['edad']));

        $generoValido = in_array($genero, ['Hombre', 'Mujer']);
        $edadValida = in_array($edad, ['Niño', 'Adulto']);

        if (!$generoValido || !$edadValida) {
            return ['error' => 'Género o edad inválidos', 'status' => 400];
        }

        $zapatilla = [
            'id' => $this->nextId++,
            'marca' => $data['marca'],
            'modelo' => $data['modelo'],
            'color' => $data['color'],
            'precio' => $data['precio'],
            'imagen' => $data['imagen'],
            'genero' => $genero,
            'edad' => $edad,
            'descripcion' => $data['descripcion'],
            'tallas' => $data['tallas'] ?? [40, 41, 42, 43, 44, 45],
        ];
        $this->zapatillas[$zapatilla['id']] = $zapatilla;
        $this->save();
        return $zapatilla;
    }

    public function update($id, $data)
    {
        if (!isset($this->zapatillas[$id])) {
            return false;
        }

        $this->zapatillas[$id] = array_merge($this->zapatillas[$id], $data);
        $this->save();
        return $this->zapatillas[$id];
    }

    public function delete($id)
    {
        if (!isset($this->zapatillas[$id])) {
            return false;
        }

        unset($this->zapatillas[$id]);
        $this->save();
        return true;
    }
}

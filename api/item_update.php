<?php
require 'db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['idInventario'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos ou ID ausente']);
    exit;
}

$sql = "UPDATE itens SET
    nome = :nome,
    entidade = :entidade,
    status = :status,
    comentarios = :comentarios,
    rede = :rede,
    localizacao = :localizacao,
    numeroSerie = :numeroSerie,
    tipo = :tipo,
    modelo = :modelo,
    fabricante = :fabricante,
    ultimaAtualizacao = :ultimaAtualizacao
WHERE idInventario = :idInventario";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([
        ':nome' => $data['nome'],
        ':entidade' => $data['entidade'],
        ':status' => $data['status'],
        ':comentarios' => $data['comentarios'],
        ':rede' => $data['rede'],
        ':localizacao' => $data['localizacao'],
        ':numeroSerie' => $data['numeroSerie'],
        ':tipo' => $data['tipo'],
        ':modelo' => $data['modelo'],
        ':fabricante' => $data['fabricante'],
        ':ultimaAtualizacao' => $data['ultimaAtualizacao'],
        ':idInventario' => $data['idInventario']
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

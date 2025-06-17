<?php
require 'db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

$sql = "INSERT INTO itens 
(nome, entidade, status, comentarios, rede, localizacao, numeroSerie, tipo, modelo, fabricante, idInventario, ultimaAtualizacao) 
VALUES 
(:nome, :entidade, :status, :comentarios, :rede, :localizacao, :numeroSerie, :tipo, :modelo, :fabricante, :idInventario, :ultimaAtualizacao)";

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
        ':idInventario' => $data['idInventario'],
        ':ultimaAtualizacao' => $data['ultimaAtualizacao']
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

<?php
require 'db.php';

header('Content-Type: application/json');

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID não fornecido']);
    exit;
}

$sql = "DELETE FROM itens WHERE idInventario = :id";

$stmt = $pdo->prepare($sql);

try {
    $stmt->execute([':id' => $id]);

    if ($stmt->rowCount()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Item não encontrado']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

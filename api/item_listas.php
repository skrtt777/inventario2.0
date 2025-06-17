<?php
require 'db.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM itens ORDER BY id DESC");
    $itens = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($itens);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

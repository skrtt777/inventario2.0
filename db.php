<?php
$host = "192.168.0.188";
$db   = "inventario_qr";
$user = "root";
$pass = "sua_senha"; // 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Instead of die(), log the error and send a JSON error response
    error_log("Database Connection Error: " . $e->getMessage()); // Log the error to your PHP error log
    http_response_code(500); // Set HTTP status code to 500 Internal Server Error
    echo json_encode(["error" => "Database connection failed."]); // Send a JSON error message
    exit; // Stop script execution
}
?>
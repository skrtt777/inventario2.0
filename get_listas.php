<?php
ini_set('display_errors', 0); // Disable error display
ini_set('log_errors', 1);    // Enable error logging
error_reporting(E_ALL);      // Report all errors
// You might want to specify a log file path here
// ini_set('error_log', '/path/to/your/php_errors.log');

header("Access-Control-Allow-Origin: http://192.168.0.188:5173");
header("Content-Type: application/json; charset=UTF-8");



// Include your database connection (choose one: config.php or db.php)
// For better practice, use config.php and a .env file for credentials.
// For demonstration, let's assume you're using db.php for simplicity, but config.php is recommended for production.
require_once 'db.php'; // Or require_once 'config.php';

$listas = [];

try {
    // Assuming 'listas' is your table name for inventory lists
    $stmt = $pdo->query("SELECT id, nome, descricao, cor FROM listas");
    $listas = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // Log the error for debugging, but don't expose sensitive info to the client
    error_log("Database Error: " . $e->getMessage());
    // Send an appropriate error response to the client
    http_response_code(500);
    echo json_encode(["error" => "Internal Server Error"]);
    exit;
}

echo json_encode($listas);
?>
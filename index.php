
<?php
require_once 'app/controllers/ItemController.php';

$controller = new ItemController();
$action = $_GET['action'] ?? 'list';

switch($action) {
    case 'create':
        $controller->create();
        break;
    case 'store':
        $controller->store();
        break;
    case 'export':
        $controller->exportCSV();
        break;
    default:
        $controller->list();
        break;
}
?>

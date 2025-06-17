
<?php
require_once 'app/models/Item.php';

class ItemController {
    public function list() {
        $model = new Item();
        $filters = $_GET;
        $page = $_GET['page'] ?? 1;
        $items = $model->getAll($filters, $page);
        require 'app/views/item_list.php';
    }

    public function create() {
        require 'app/views/item_create.php';
    }

    public function store() {
        $model = new Item();
        $model->save($_POST, $_FILES);
        header('Location: index.php');
    }

    public function exportCSV() {
        $model = new Item();
        $model->exportCSV();
    }
}
?>

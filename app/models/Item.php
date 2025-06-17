
<?php
require_once 'db.php';

class Item {
    private $pdo;
    private $perPage = 10;

    public function __construct() {
        global $pdo;
        $this->pdo = $pdo;
    }

    public function getAll($filters, $page) {
        $offset = ($page - 1) * $this->perPage;
        $sql = "SELECT * FROM items WHERE 1=1";
        $params = [];

        if (!empty($filters['status'])) {
            $sql .= " AND status = :status";
            $params[':status'] = $filters['status'];
        }

        if (!empty($filters['localizacao'])) {
            $sql .= " AND localizacao LIKE :localizacao";
            $params[':localizacao'] = "%" . $filters['localizacao'] . "%";
        }

        $sql .= " LIMIT :offset, :perPage";
        $stmt = $this->pdo->prepare($sql);
        foreach ($params as $key => $val) {
            $stmt->bindValue($key, $val);
        }
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        $stmt->bindValue(':perPage', (int)$this->perPage, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function save($data, $files) {
        $imagem = null;
        if (!empty($files['imagem']['name'])) {
            $imagem = 'uploads/' . basename($files['imagem']['name']);
            move_uploaded_file($files['imagem']['tmp_name'], $imagem);
        }

        $sql = "INSERT INTO items (nome, descricao, status, localizacao, imagem) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$data['nome'], $data['descricao'], $data['status'], $data['localizacao'], $imagem]);
    }

    public function exportCSV() {
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment;filename=itens.csv');

        $output = fopen('php://output', 'w');
        fputcsv($output, ['ID', 'Nome', 'Descrição', 'Status', 'Localização', 'Imagem']);

        $stmt = $this->pdo->query("SELECT * FROM items");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            fputcsv($output, $row);
        }
        fclose($output);
    }
}
?>

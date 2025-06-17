require 'Item.php';
$item = new Item($pdo);

$itens = $item->getAll([], 10000, 0);  // Exportar até 10 mil itens

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="itens.csv"');

$output = fopen('php://output', 'w');
fputcsv($output, ['Nome', 'Status', 'Localização']);

foreach ($itens as $item) {
    fputcsv($output, [$item['nome'], $item['status'], $item['localizacao']]);
}
fclose($output);
exit;


<!DOCTYPE html>
<html>
<head><title>Lista de Itens</title></head>
<body>
<h1>Itens</h1>
<a href="index.php?action=create">Adicionar Item</a>
<a href="index.php?action=export">Exportar CSV</a>

<form method="get">
    <input type="text" name="localizacao" placeholder="Localização" value="<?= $_GET['localizacao'] ?? '' ?>">
    <select name="status">
        <option value="">Status</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
    </select>
    <button type="submit">Filtrar</button>
</form>

<table border="1">
    <tr><th>ID</th><th>Nome</th><th>Status</th><th>Localização</th><th>Imagem</th></tr>
    <?php foreach ($items as $item): ?>
    <tr>
        <td><?= $item['id'] ?></td>
        <td><?= $item['nome'] ?></td>
        <td><?= $item['status'] ?></td>
        <td><?= $item['localizacao'] ?></td>
        <td><?php if ($item['imagem']): ?><img src="<?= $item['imagem'] ?>" width="50"><?php endif; ?></td>
    </tr>
    <?php endforeach; ?>
</table>

<a href="?page=<?= ($page - 1) ?>">Anterior</a>
<a href="?page=<?= ($page + 1) ?>">Próximo</a>
</body>
</html>

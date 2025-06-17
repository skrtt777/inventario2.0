
<!DOCTYPE html>
<html>
<head><title>Criar Item</title></head>
<body>
<h1>Criar Item</h1>
<form method="post" action="index.php?action=store" enctype="multipart/form-data">
    <input type="text" name="nome" placeholder="Nome" required><br>
    <textarea name="descricao" placeholder="Descrição"></textarea><br>
    <input type="text" name="status" placeholder="Status"><br>
    <input type="text" name="localizacao" placeholder="Localização"><br>
    <input type="file" name="imagem"><br>
    <button type="submit">Salvar</button>
</form>
</body>
</html>

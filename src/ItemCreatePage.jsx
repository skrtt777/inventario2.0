import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ItemForm from './ItemForm';

function ItemCreatePage() {
  const navigate = useNavigate();

  const handleCreate = (newItem) => {
    console.log('Novo item:', newItem);
    // Aqui futuramente será: await api.post('/itens', newItem)
    alert('Item criado com sucesso!');
    navigate('/');
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Novo Item</h2>
      <ItemForm onSubmit={handleCreate} />
      <Link to="/" className="text-blue-600 hover:underline mt-4 block">← Voltar</Link>
    </div>
  );
}

export default ItemCreatePage;

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ItemForm from './ItemForm';

// Simula banco de dados
const mockData = [
  { id: 1, nome: 'Notebook', entidade: 'TI', status: 'ativo', comentarios: 'Sem comentários', rede: '192.168.0.1', localizacao: 'Mesa 1', numeroSerie: 'ABC123', tipo: 'térmica', modelo: 'Inspiron', fabricante: 'Dell', idInventario: 101, ultimaAtualizacao: '2025-05-27' },
  // outros itens...
];

function ItemEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = mockData.find(i => i.id === parseInt(id));

  const handleUpdate = (updatedItem) => {
    console.log('Item atualizado:', updatedItem);
    // Aqui futuramente será: await api.put(`/itens/${id}`, updatedItem)
    alert('Item atualizado com sucesso!');
    navigate('/');
  };

  if (!item) {
    return <div className="p-6 text-center">Item não encontrado.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Editar Item</h2>
      <ItemForm initialData={item} onSubmit={handleUpdate} />
      <Link to="/" className="text-blue-600 hover:underline mt-4 block">← Voltar</Link>
    </div>
  );
}

export default ItemEditPage;

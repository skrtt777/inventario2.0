import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const channel = new BroadcastChannel('inventario_channel');

export default function EditarItem({ data, updateData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemId = parseInt(id);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const found = data.itens.find(i => i.id === itemId);
    setItem(found);
  }, [data.itens, itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedItems = data.itens.map(i => i.id === item.id ? item : i);
    updateData('itens', updatedItems);
    channel.postMessage({ type: 'UPDATE', item });
    navigate('/');
  };

  if (!item) return <p className="p-4">Item não encontrado</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar {item.nome}</h2>

      <label className="block mb-2">Nome:</label>
      <input
        name="nome"
        value={item.nome}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2">Localização:</label>
      <input
        name="localizacao"
        value={item.localizacao}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block mb-2">Observações:</label>
      <textarea
        name="observacoes"
        value={item.observacoes}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Salvar e Voltar
      </button>
    </div>
  );
}

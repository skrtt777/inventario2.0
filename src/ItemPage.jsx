import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ItemPage() {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    nome: '',
    entidade: '',
    status: 'ativo',
    comentarios: '',
    rede: '',
    localizacao: '',
    numeroSerie: '',
    tipo: 'térmica',
    modelo: '',
    fabricante: '',
    idInventario: '',
    ultimaAtualizacao: new Date().toISOString().split('T')[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({
      ...prev,
      [name]: value,
      ultimaAtualizacao: new Date().toISOString().split('T')[0],
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Exemplo de envio ao backend — substitua a URL pelo seu endpoint real
      const response = await fetch('https://sua-api.com/itens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar item');
      }

      alert('Item cadastrado com sucesso!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Novo Item</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {Object.entries({
        nome: 'Nome',
        entidade: 'Entidade',
        comentarios: 'Comentários',
        rede: 'Rede',
        localizacao: 'Localização',
        numeroSerie: 'Número de Série',
        modelo: 'Modelo',
        fabricante: 'Fabricante',
        idInventario: 'ID Inventário'
      }).map(([field, label]) => (
        <label key={field} className="block mb-2">
          {label}:
          <input
            type={field === 'idInventario' ? 'number' : 'text'}
            name={field}
            value={item[field]}
            onChange={handleChange}
            className="border p-1 w-full"
          />
        </label>
      ))}

      <label className="block mb-2">Status:
        <select name="status" value={item.status} onChange={handleChange} className="border p-1 w-full">
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="suspenso">Suspenso</option>
          <option value="inativo e vago">Inativo e Vago</option>
        </select>
      </label>

      <label className="block mb-2">Tipo:
        <select name="tipo" value={item.tipo} onChange={handleChange} className="border p-1 w-full">
          <option value="térmica">Térmica</option>
          <option value="lazer">Lazer</option>
        </select>
      </label>

      <label className="block mb-4">Última Atualização:
        <input type="date" value={item.ultimaAtualizacao} readOnly className="border p-1 w-full bg-gray-100" />
      </label>

      <button
        onClick={handleSave}
        disabled={isSubmitting}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
      >
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </button>
      <Link to="/" className="bg-black text-white px-4 py-2 rounded">Cancelar</Link>
    </div>
  );
}

export default ItemPage;

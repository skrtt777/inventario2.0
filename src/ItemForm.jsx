import React, { useState } from 'react';

function ItemForm({ onSave }) {
  const [formData, setFormData] = useState({
    nome: '',
    entidade: '',
    status: 'Ativo',
    comentarios: '',
    rede: '',
    localizacao: '',
    numeroSerie: '',
    tipo: 'Térmica',
    modelo: '',
    fabricante: '',
    idInventario: '',
    ultimaAtualizacao: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ultimaAtualizacao: new Date().toISOString().split('T')[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold">Cadastro de Item</h2>

      <input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="input" required />
      <input name="entidade" placeholder="Entidade" value={formData.entidade} onChange={handleChange} className="input" />
      
      <select name="status" value={formData.status} onChange={handleChange} className="input">
        <option>Ativo</option>
        <option>Inativo</option>
        <option>Suspenso</option>
        <option>Vago</option>
      </select>

      <textarea name="comentarios" placeholder="Comentários" value={formData.comentarios} onChange={handleChange} className="input"></textarea>

      <input name="rede" placeholder="Rede" value={formData.rede} onChange={handleChange} className="input" />
      <input name="localizacao" placeholder="Localização" value={formData.localizacao} onChange={handleChange} className="input" />
      <input name="numeroSerie" placeholder="Número de Série" value={formData.numeroSerie} onChange={handleChange} className="input" />
      
      <select name="tipo" value={formData.tipo} onChange={handleChange} className="input">
        <option>Térmica</option>
        <option>Lazer</option>
      </select>

      <input name="modelo" placeholder="Modelo" value={formData.modelo} onChange={handleChange} className="input" />
      <input name="fabricante" placeholder="Fabricante" value={formData.fabricante} onChange={handleChange} className="input" />
      <input name="idInventario" placeholder="ID Inventário" type="number" value={formData.idInventario} onChange={handleChange} className="input" />

      <p>Última atualização: {formData.ultimaAtualizacao}</p>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  );
}

export default ItemForm;

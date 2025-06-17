import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ChevronRight, ArrowLeftCircle } from 'lucide-react';

function InventorySystem() {
  const navigate = useNavigate();

  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  fetch('http://192.168.0.188/get_listas.php')
    .then(res => {
      if (!res.ok) throw new Error('Erro ao carregar os dados');
      return res.json();
    })
    .then(data => {
      setListas(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);

  if (loading) return <div>Carregando listas...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-4">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Escolha uma Lista</h1>

        <button 
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate('/')}
        >
          <ArrowLeftCircle size={20} />
          <span>Voltar para Início</span>
        </button>

        {listas.map(lista => (
          <div 
            key={lista.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`/listas/${lista.id}`)}
          >
            <div 
              className="p-4 text-white flex items-center space-x-3"
              style={{ backgroundColor: lista.cor }}
            >
              <Tag size={20} />
              <div>
                <h2 className="text-xl font-bold">{lista.nome}</h2>
                <p className="text-sm opacity-90">{lista.descricao}</p>
              </div>
              <ChevronRight className="ml-auto" />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default InventorySystem;

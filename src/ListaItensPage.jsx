import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, ArrowLeft, Box } from 'lucide-react';

const mockItens = [
  { id: 1, nome: 'Notebook Dell Inspiron', lista_id: 1, localizacao: 'Mesa 1', quantidade: 2, status: 'Ativo' },
  { id: 2, nome: 'Monitor Samsung 24"', lista_id: 1, localizacao: 'Mesa 2', quantidade: 3, status: 'Ativo' },
  { id: 4, nome: 'Papel A4 500fls', lista_id: 2, localizacao: 'Prateleira B', quantidade: 50, status: 'Ativo' },
  { id: 6, nome: 'JavaScript: The Good Parts', lista_id: 3, localizacao: 'Prateleira A', quantidade: 1, status: 'Emprestado' },
  { id: 8, nome: 'Camisa Polo M', lista_id: 4, localizacao: 'Seção Masculina', quantidade: 15, status: 'Ativo' },
];

function ListaItensPage() {
  const { id } = useParams();
  const listaId = parseInt(id);
  const itens = mockItens.filter(item => item.lista_id === listaId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Package size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">Itens da Lista {listaId}</h1>
        </div>

        <Link 
          to="/listas" 
          className="inline-flex items-center text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="mr-2" /> Voltar para Listas
        </Link>

        <div className="space-y-4">
          {itens.length > 0 ? itens.map(item => (
            <div 
              key={item.id} 
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-3">
                <Box className="text-gray-600" />
                <div>
                  <h2 className="text-lg font-semibold">{item.nome}</h2>
                  <p className="text-sm text-gray-600">Localização: {item.localizacao}</p>
                  <p className="text-sm text-gray-600">Quantidade: {item.quantidade}</p>
                  <p className={`text-sm font-medium ${item.status === 'Ativo' ? 'text-green-600' : 'text-yellow-600'}`}>
                    Status: {item.status}
                  </p>
                </div>
              </div>

              <Link 
                to={`/item/${item.id}`} 
                className="text-blue-500 hover:underline text-sm"
              >
                Ver Detalhes
              </Link>
            </div>
          )) : (
            <p className="text-gray-500">Nenhum item encontrado para esta lista.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListaItensPage;

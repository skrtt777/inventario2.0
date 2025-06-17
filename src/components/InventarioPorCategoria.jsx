import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

export default function InventarioPorCategoria({ data }) {
  return (
    <div className="p-6 space-y-6">
      {data.categorias.map(cat => (
        <div key={cat.id} className="border-l-4 p-4 rounded bg-white shadow" style={{ borderColor: cat.cor }}>
          <h2 className="text-xl font-bold mb-4">{cat.nome}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.itens.filter(i => i.categoria_id === cat.id).map(item => (
              <div key={item.id} className="p-4 border rounded bg-gray-50 shadow hover:bg-gray-100">
                <h3 className="font-semibold">{item.nome}</h3>
                <p className="text-sm text-gray-500">{item.localizacao}</p>
                <div className="my-2">
                  <QRCode value={`${window.location.origin}/editar-item/${item.id}`} size={64} />
                </div>
                <Link to={`/editar-item/${item.id}`} className="text-blue-500 hover:underline">
                  Editar Item
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

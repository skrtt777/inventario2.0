import React, { useEffect, useRef, useState } from 'react';
import { QrCode, ArrowLeftCircle, Search } from 'lucide-react';

import { BrowserMultiFormatReader } from '@zxing/browser';

function QRCodePage() {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [item, setItem] = useState(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let active = true;

    codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
      if (!active) return;

      if (result) {
        const data = result.getText();
        setScannedData(data);
        setSearchQuery(data); // ✅ cola o resultado na barra de busca

        console.log('QR Code lido:', data);

        // Opcional: parar a câmera
        const stream = videoRef.current?.srcObject;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }

        active = false;

        // ✅ Executa busca local
        buscarItem(data);
      }

      if (err && !err.name.startsWith('NotFoundException')) {
        console.error(err);
        setError('Erro ao ler QR Code. Tente novamente.');
      }
    });

    return () => {
      active = false;
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const buscarItem = (query) => {
    // Exemplo: simula uma busca em banco de dados
    console.log('Buscando item:', query);
    setItem({ nome: `Item para: ${query}`, descricao: 'Descrição do item.' });
  };

  const handleSearch = () => {
    buscarItem(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <QrCode size={32} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Leitor de QR Code</h1>
      </div>

      <div className="w-full max-w-xs bg-white p-4 rounded-xl shadow-lg">
        <video ref={videoRef} className="w-full rounded-lg" />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex space-x-2 w-full max-w-xs">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Digite ou escaneie..."
          className="flex-1 px-3 py-2 rounded border"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          <Search />
        </button>
      </div>

      {item && (
        <div className="bg-white p-4 rounded shadow w-full max-w-xs">
          <h2 className="font-bold text-lg">{item.nome}</h2>
          <p>{item.descricao}</p>
        </div>
      )}

      <button
        onClick={() => window.location.href = '/'}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        <ArrowLeftCircle size={20} />
        <span>Voltar para Início</span>
      </button>
    </div>
  );
}

export default QRCodePage;

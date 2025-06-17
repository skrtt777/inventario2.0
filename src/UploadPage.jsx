import { useState } from 'react';
import * as XLSX from 'xlsx';

function UploadPage() {
  const [error, setError] = useState('');
  const expectedColumns = [
    'Nome', 'Entidade', 'Status', 'Comentários', 'Rede', 'Localização',
    'Número de série', 'Tipo', 'Modelo', 'Fabricante', 'ID_inventario', 'Última_atualização'
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const fileColumns = Object.keys(jsonData[0] || {});

      const missing = expectedColumns.filter(col => !fileColumns.includes(col));

      if (missing.length > 0) {
        setError(`Colunas faltando: ${missing.join(', ')}`);
      } else {
        setError('');
        console.log('Dados validados:', jsonData);
        alert('Arquivo válido e processado com sucesso!');
        // Aqui você pode setar no estado global ou enviar para o backend
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h2 className="text-2xl font-bold">Upload de Banco de Dados (Excel)</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default UploadPage;

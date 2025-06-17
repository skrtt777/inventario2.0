import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-4xl font-bold">Bem-vindo ao Sistema de Inventário</h1>
      <button 
        className="bg-blue-500 text-white px-6 py-3 rounded"
        onClick={() => navigate('/upload')}
      >
        Subir Banco de Dados
      </button>
      <button 
        className="bg-green-500 text-white px-6 py-3 rounded"
        onClick={() => navigate('/listas')}
      >
        Escolher Lista
      </button>

      <button 
        className="bg-purple-500 text-white px-6 py-3 rounded"
        onClick={() => navigate('/qrcode')}
      >
        Qrcode
      </button> 

    </div>
    
  );
}

export default Home;

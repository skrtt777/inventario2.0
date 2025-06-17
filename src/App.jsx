import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import UploadPage from './UploadPage';
import InventorySystem from './InventorySystem';
import ListaItensPage from './ListaItensPage';
import ItemPage from './ItemPage';
import ItemForm from './ItemForm';
import ItemCreatePage from './ItemCreatePage';
import ItemEditPage from './ItemEditPage';
import Qrcode from './qrcode';
import './index.css';

function App() {  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/listas" element={<InventorySystem />} />
         <Route path="/listas/:id" element={<ListaItensPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/item/:id/edit" element={<ItemEditPage />} />
        <Route path="/item/novo" element={<ItemCreatePage />} />
        <Route path="/cadastrar" element={<ItemForm onSave={(data) => console.log('Item salvo:', data)} />} />
        <Route path="/qrcode" element={<Qrcode />} />
      </Routes>
    </Router>
  );
}

export default App;

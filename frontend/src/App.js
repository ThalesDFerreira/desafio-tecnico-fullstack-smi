import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ListDemands from './pages/CadastroClientes';
import AddDemand from './pages/VisitarClientes';
import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route exact path='/' element={<Navigate to='/home' />} />
        <Route path='/lista-demandas' element={<ListDemands />} />
        <Route path='/add-demanda' element={<AddDemand />} />
      </Routes>
    </>
  );
};

export default App;
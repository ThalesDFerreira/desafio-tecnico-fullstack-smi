import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const redirectAddDemand = () => {
    navigate('/add-demanda');
  };

  const redirectListDemands = () => {
    navigate('/lista-demandas');
  };

  return (
    <>
      <div className='flex flex-col min-h-screen bg-rgb-azul-claro'>
        <Header />
        <main className='flex-grow bg-slate-200'>
          <div className='container mx-auto mt-10'>
            <h1 className='text-3xl font-bold mb-4 text-center'>
              Bem-vindo ao Sistema de planejamento de Demandas
            </h1>
            <div className='flex justify-center space-x-10 mt-20'>
              <div>
                <button
                  onClick={redirectAddDemand}
                  className='bg-neutral-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                  Cadastrar Demandas
                </button>
              </div>
              <div>
                <button
                  onClick={redirectListDemands}
                  className='bg-neutral-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                >
                  Listar Demandas
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;

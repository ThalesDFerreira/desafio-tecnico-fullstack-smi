import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const onClickChange = () => {
    navigate('/home');
  };

  return (
    <div className='bg-gray-800 text-white p-4 flex justify-center'>
      <button type='button' onClick={onClickChange}>
        <h1 className='text-2xl font-bold'>
          Sistema de planejamento de Demandas
        </h1>
      </button>
    </div>
  );
};

export default Header;

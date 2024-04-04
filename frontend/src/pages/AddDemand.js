import { useState } from 'react';
import { requestGet, requestPost } from '../services/requests';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const AddDemand = () => {
  const [demand, setDemand] = useState('');

  const btnRequestInsertPosts = async () => {
    try {
      const getPosts = await requestGet('/posts');
      const result = await getPosts.every((post) => post.demand !== demand);

      if (!demand) {
        toast.error('⚠️ O campo "Demanda" não pode estar vazio!');
      } else if (getPosts.length === 0) {
        const result = await requestPost('/posts', {
          demand: demand,
        });
        toast.success(result.message);
        setDemand('');
      } else if (result) {
        const result = await requestPost('/posts', {
          demand: demand,
        });
        toast.success(result.message);
        setDemand('');
      } else {
        toast.error('⚠️ Demanda já cadastrada!');
        setDemand('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='p-2 flex-grow bg-rgb-azul-claro'>
          <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
            <h1 className='py-2 flex justify-center text-xl text-black'>
              Adicionar nova demanda:
            </h1>
            <div className='flex flex-col text-slate-100'>
              <div className='overflow-x-auto'>
                <div className='inline-block min-w-full py-2'>
                  <div className='overflow-hidden'>
                    <table className='min-w-full text-center text-sm font-light md:text-lg'>
                      <thead className='bg-neutral-800 bg-opacity-40 font-medium text-slate-100'>
                        <tr>
                          <th scope='col' className='px-2 py-2'>
                            Demanda
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Cadastrar
                          </th>
                        </tr>
                      </thead>
                      <tbody className='break-all'>
                        <tr>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <input
                              className='p-1 text-black rounded-md w-full'
                              type='text'
                              onChange={({ target: { value } }) =>
                                setDemand(value)
                              }
                              value={demand}
                              placeholder='Digite aqui ...'
                            />
                          </td>
                          <td className='whitespace-nowrap px-2 py-2 flex justify-center'>
                            <button
                              className='text-center mb-2 bg-blue-400 hover:bg-blue-600 text-slate-100 p-2 w-20 flex justify-center rounded-xl font-bold'
                              type='button'
                              onClick={btnRequestInsertPosts}
                            >
                              Enviar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AddDemand;

import { useState } from 'react';
import { requestGet, requestPost } from '../services/requests';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const AddDemand = () => {
  const [optionsPriority, setOptionsPriority] = useState('1'); // A escala de prioridade vai de 1 até 10
  const [demand, setDemand] = useState('');
  const [optionsStatus, setOptionsStatus] = useState('1'); // status=1 (Não realizada); status=2 (Em andamento); status=3 (Finalizada);

  const btnRequestInsertPosts = async () => {
    try {
      const getPosts = await requestGet('/posts');
      const verifyPostsNoEqual = await getPosts.every(
        (post) => post.demand !== demand
      );

      if (!demand) {
        toast.error('⚠️ O campo "Demanda" não pode estar vazio!');
      } else if (getPosts.length === 0) {
        const result = await requestPost('/posts', {
          priority: Number(optionsPriority),
          demand: demand,
          status: Number(optionsStatus),
        });
        toast.success(result.message);
        setOptionsPriority('1');
        setDemand('');
        setOptionsStatus('1');
      } else if (verifyPostsNoEqual) {
        const result = await requestPost('/posts', {
          priority: Number(optionsPriority),
          demand: demand,
          status: Number(optionsStatus),
        });
        toast.success(result.message);
        setOptionsPriority('1');
        setDemand('');
        setOptionsStatus('1');
      } else {
        toast.error('⚠️ Demanda já cadastrada!');
        setOptionsPriority('1');
        setDemand('');
        setOptionsStatus('1');
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
                            Prioridade
                            <p className='text-xs'>0 (baixa) até 10 (alta)</p>
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Demanda
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Status
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Cadastrar
                          </th>
                        </tr>
                      </thead>
                      <tbody className='break-all'>
                        <tr>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <select
                              id='select-add-priority'
                              name='select-add-priority'
                              className='py-1 text-black rounded-md w-24 md:w-full'
                              onChange={({ target: { value } }) =>
                                setOptionsPriority(value)
                              }
                              value={optionsPriority}
                            >
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                              <option value='6'>6</option>
                              <option value='7'>7</option>
                              <option value='8'>8</option>
                              <option value='9'>9</option>
                              <option value='10'>10</option>
                            </select>
                          </td>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <input
                              id='input-add-demand'
                              name='input-add-demand'
                              className='p-1 text-black rounded-md w-full'
                              type='text'
                              onChange={({ target: { value } }) =>
                                setDemand(value)
                              }
                              value={demand}
                              placeholder='Digite aqui ...'
                            />
                          </td>
                          <td className='whitespace-nowrap px-2 py-2 font-medium'>
                            <select
                              id='select-add-status'
                              name='select-add-status'
                              className='py-1 text-black rounded-md w-24 md:w-full'
                              onChange={({ target: { value } }) =>
                                setOptionsStatus(value)
                              }
                              value={optionsStatus}
                            >
                              <option value='1'>Não realizado</option>
                              <option value='2'>Em andamento</option>
                              <option value='3'>Finalizado</option>
                            </select>
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

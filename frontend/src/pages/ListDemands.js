import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import { requestGet, requestPut, requestDelete } from '../services/requests';
import Editar from '../../src/assets/edit.png';
import Deletar from '../assets/delete.png';
import Confirmar from '../assets/check.png';
import Cancelar from '../assets/close.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListDemands = () => {
  const [listPosts, setListPosts] = useState([]);
  const [listPostsClone, setListPostsClone] = useState([]);
  const [existPosts, setExistPosts] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postSelectedEdit, setPostSelectedEdit] = useState('');
  const [priorityUpdate, setPriorityUpdate] = useState('');
  const [demandUpdate, setDemandUpdate] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [optionsFindPosts, setOptionsFindPosts] = useState('demand');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [postSelectedDelete, setPostSelectedDelete] = useState('');

  const getPosts = async () => {
    try {
      const result = await requestGet('/posts');
      if (result.length !== 0) {
        setExistPosts(true);
        setListPosts(result);
        setListPostsClone(result);
      } else {
        setExistPosts(false);
      }
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 4000,
        }
      );
    }
  };

  const handleOpenModalEdit = (id, priority, demand, status) => {
    setPostSelectedEdit(id);
    setPriorityUpdate(priority);
    setDemandUpdate(demand);
    setStatusUpdate(status);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleOpenModalDelete = (id) => {
    setPostSelectedDelete(id);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const btnRequestEditPost = async () => {
    try {
      const filterRemoveIdList = listPosts.filter(
        (post) => post.id !== postSelectedEdit
      );

      const filterListPosts = filterRemoveIdList.some(
        (post) => post.demand === demandUpdate
      );

      if (!demandUpdate) {
        return toast.error('⚠️ Demanda não estar vazia!');
      } else if (filterListPosts) {
        return toast.error('⚠️ Demanda já existe!');
      } else {
        const result = await requestPut('/posts', {
          id: Number(postSelectedEdit),
          priority: Number(priorityUpdate),
          demand: demandUpdate,
          status: Number(statusUpdate),
        });
        getPosts();
        setPriorityUpdate('');
        setDemandUpdate('');
        setStatusUpdate('');
        toast.success(result.message);
        handleCloseModalEdit();
      }
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 3000,
        }
      );
    }
  };

  const btnRequestDeletePost = async () => {
    try {
      const result = await requestDelete(`/posts?id=${postSelectedDelete}`);
      getPosts();
      toast.success(result.message);
      handleCloseModalDelete();
    } catch (error) {
      toast(
        '🛑 Desculpe! Estamos enfrentando problemas técnicos.\n\nTente realizar a operação novamente \n\n ou entre em contato com nosso suporte técnico.',
        {
          duration: 3000,
        }
      );
    }
  };

  const inputSearchPosts = async ({ target }) => {
    const valueInput = target.value;
    let newArray = [];
    const arraySearch = [...listPostsClone];
    if (optionsFindPosts === 'demand' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (
          element.demand &&
          element.demand.toLowerCase().includes(valueInput.toLowerCase())
        ) {
          newArray.push(element);
        }
      }
      setListPosts(newArray);
    }

    if (optionsFindPosts === 'priority' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];

        if (element.priority === Number(valueInput)) {
          newArray.push(element);
        }
      }
      setListPosts(newArray);
    }

    if (optionsFindPosts === 'status' && valueInput !== '') {
      for (let index = 0; index < arraySearch.length; index += 1) {
        const element = arraySearch[index];
        if (element.status === Number(valueInput)) {
          newArray.push(element);
        }
      }
      setListPosts(newArray);
    }

    if (valueInput === '') {
      setListPosts(listPostsClone);
    }
  };

  const btnLoadListFull = () => {
    setListPosts(listPostsClone);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const verifyStatus = (post) => {
    if (post.status === 1) {
      return 'Não realizado';
    } else if (post.status === 2) {
      return 'Em andamento';
    }
    return 'Finalizado';
  };

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='p-2 flex-grow bg-rgb-azul-claro'>
          <section className='bg-rgb-preto bg-opacity-20 rounded-2xl flex-col auto-cols-max text-slate-100 mb-5'>
            <h1 className='py-2 flex justify-center text-xl text-black'>
              Lista de Demandas:
            </h1>
            <div className='flex justify-end text-black'>
              <div className='flex justify-center items-center mr-5'>
                <div className='flex mr-3'>
                  <div className='mr-1'>
                    <label htmlFor='select-filter-demand'>Filtrar por:</label>
                  </div>
                  <div>
                    <select
                      id='select-filter-demand'
                      name='select-filter-demand'
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      onChange={({ target: { value } }) =>
                        setOptionsFindPosts(value)
                      }
                      value={optionsFindPosts}
                    >
                      <option value='priority'>Prioridade</option>
                      <option value='demand'>Demanda</option>
                      <option value='status'>Status</option>
                    </select>
                  </div>
                </div>
                <div>
                  {optionsFindPosts === 'demand' && (
                    <input
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      id='input-filter-demand'
                      name='input-filter-demand'
                      type='text'
                      placeholder='Pesquise aqui ...'
                      onChange={inputSearchPosts}
                    />
                  )}
                  {optionsFindPosts === 'priority' && (
                    <select
                      id='select-filter-priority'
                      name='select-filter-priority'
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      onChange={inputSearchPosts}
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
                  )}
                  {optionsFindPosts === 'status' && (
                    <select
                      id='select-filter-status'
                      name='select-filter-status'
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      onChange={inputSearchPosts}
                    >
                      <option value='1'>Não realizado</option>
                      <option value='2'>Em andamento</option>
                      <option value='3'>Finalizado</option>
                    </select>
                  )}
                </div>
                <div>
                  {optionsFindPosts !== 'demand' && (
                    <button
                      className='bg-neutral-800 hover:bg-blue-700 ml-3 text-white text-xs font-bold py-2 px-2 rounded'
                      type='button'
                      onClick={btnLoadListFull}
                    >
                      Voltar lista completa
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className='flex flex-col text-black'>
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
                            Editar
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Deletar
                          </th>
                        </tr>
                      </thead>
                      <tbody className='break-all'>
                        {existPosts ? (
                          listPosts.map((post) => (
                            <tr
                              className='border-b border-solid border-rgb-cinza'
                              key={`radio-form-${post.id}`}
                            >
                              <td className='whitespace-nowrap px-2 py-2'>
                                <span>{post.priority}</span>
                              </td>
                              <td className='whitespace-normal px-2 py-2'>
                                <span>{post.demand}</span>
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <span>{verifyStatus(post)}</span>
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <button
                                  className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                  type='button'
                                  onClick={() =>
                                    handleOpenModalEdit(
                                      post.id,
                                      post.priority,
                                      post.demand,
                                      post.status
                                    )
                                  }
                                >
                                  <img src={Editar} alt='Editar' />
                                </button>
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <button
                                  className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                  type='button'
                                  onClick={() => handleOpenModalDelete(post.id)}
                                >
                                  <img src={Deletar} alt='Deletar' />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className='flex justify-center mt-10 text-black'>
                            <td>Não existe demandas cadastradas!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className='flex justify-center'>
            <Modal show={openModalEdit} onHide={handleCloseModalEdit}>
              <Modal.Body className='flex flex-col flex-grow'>
                <table className='w-full'>
                  <thead>
                    <tr>
                      <th>Demanda</th>
                    </tr>
                  </thead>
                  <tbody className='break-all'>
                    <tr>
                      <td>
                        <select
                          id='select-edit-priority'
                          name='select-edit-priority'
                          className='py-1 text-black rounded-md w-24 md:w-full'
                          onChange={({ target: { value } }) =>
                            setPriorityUpdate(value)
                          }
                          value={priorityUpdate}
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
                      <td>
                        <input
                          id='input-edit-demand'
                          name='input-edit-demand'
                          className='text-center p-1 text-black rounded-md bg-gray-200 w-full'
                          type='text'
                          onChange={({ target: { value } }) =>
                            setDemandUpdate(value)
                          }
                          value={demandUpdate}
                          placeholder='Digite aqui ...'
                        />
                      </td>
                      <td>
                        <select
                          id='select-filter-status'
                          name='select-filter-status'
                          className='py-1 text-black rounded-md w-24 md:w-full'
                          onChange={({ target: { value } }) =>
                            setStatusUpdate(value)
                          }
                          value={statusUpdate}
                        >
                          <option value='1'>Não realizado</option>
                          <option value='2'>Em andamento</option>
                          <option value='3'>Finalizado</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer className='justify-between'>
                <Button onClick={handleCloseModalEdit}>
                  <img className='w-7 h-7' src={Cancelar} alt='Cancelar' />
                </Button>
                <Button onClick={btnRequestEditPost}>
                  <img className='w-7 h-7' src={Confirmar} alt='Confirmar' />
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <Modal show={openModalDelete} onHide={handleCloseModalDelete}>
              <Modal.Body>
                Tem certeza que deseja excluir essa demanda?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className='text-black'
                  type='button'
                  onClick={handleCloseModalDelete}
                >
                  Não
                </Button>
                <Button
                  className='text-black'
                  type='button'
                  onClick={btnRequestDeletePost}
                >
                  Sim
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </main>
      </div>
    </>
  );
};

export default ListDemands;

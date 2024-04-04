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
  const [demandUpdate, setDemandUpdate] = useState('');
  const [optionsFindPosts, setOptionsFindPosts] = useState('demanda');
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

  const handleOpenModalEdit = (id, demand) => {
    setPostSelectedEdit(id);
    setDemandUpdate(demand);
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
      const filterPostId = listPosts.filter(
        (post) => post.id === postSelectedEdit
      );

      const filterRemoveIdList = listPosts.filter(
        (post) => post.id !== postSelectedEdit
      );

      const filterListPosts = filterRemoveIdList.some(
        (post) => post.demand === demandUpdate
      );

      if (!demandUpdate) {
        return toast.error('⚠️ Demanda não estar vazia!');
      } else if (filterPostId[0].demand === demandUpdate) {
        return toast.error('⚠️ Demanda não alterada!');
      } else if (filterListPosts) {
        return toast.error('⚠️ Demanda já existe!');
      } else {
        const result = await requestPut('/posts', {
          id: Number(postSelectedEdit),
          demand: demandUpdate,
        });
        getPosts();
        setDemandUpdate('');
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
    if (optionsFindPosts === 'demanda' && valueInput !== '') {
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

    if (valueInput === '') {
      setListPosts(listPostsClone);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

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
                      className='py-1 text-black rounded-md w-24 md:w-full'
                      onChange={({ target: { value } }) =>
                        setOptionsFindPosts(value)
                      }
                      value={optionsFindPosts}
                    >
                      <option value='demanda'>Demanda</option>
                    </select>
                  </div>
                </div>
                <div>
                  <input
                    className='py-1 text-black rounded-md w-24 md:w-full'
                    name='input-filter-demand'
                    type='text'
                    placeholder='Pesquise aqui ...'
                    onChange={inputSearchPosts}
                  />
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
                            Número
                          </th>
                          <th scope='col' className='px-2 py-2'>
                            Demanda
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
                                <label htmlFor={`radio-${post.id}`}>
                                  {post.id}
                                </label>
                              </td>
                              <td className='whitespace-normal px-2 py-2'>
                                <label htmlFor={`radio-${post.id}`}>
                                  {post.demand}
                                </label>
                              </td>
                              <td className='whitespace-nowrap px-2 py-2'>
                                <button
                                  className='bg-gray-200 hover:bg-gray-400 p-1 rounded-xl'
                                  type='button'
                                  onClick={() =>
                                    handleOpenModalEdit(post.id, post.demand)
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
                        <input
                          className='text-center p-1 text-black rounded-md bg-gray-200 w-full'
                          type='text'
                          onChange={({ target: { value } }) =>
                            setDemandUpdate(value)
                          }
                          value={demandUpdate}
                          placeholder='Digite aqui ...'
                        />
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

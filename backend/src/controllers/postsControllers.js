const status = require('http-status');
const {
  getPostsServices,
  insertPostsServices,
  updatePostsServices,
  deletePostsServices,
} = require('../services/postsServices');

const getPostsControllers = async (req, res) => {
  try {
    const getPosts = await getPostsServices();
    return res.status(status.OK).json(getPosts);
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ message: error.message });
  }
};

const insertPostsControllers = async (req, res) => {
  try {
    await insertPostsServices(req);
    return res
      .status(status.OK)
      .json({ message: '✔️ Demanda inserida com sucesso!' });
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ message: error.message });
  }
};

const updatePostsControllers = async (req, res) => {
  try {
    await updatePostsServices(req);
    return res
      .status(status.OK)
      .json({ message: '✔️ Demanda alterada com sucesso!' });
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ message: error.message });
  }
};

const deletePostsControllers = async (req, res) => {
  try {
    await deletePostsServices(req);
    return res
      .status(status.OK)
      .json({ message: '✔️ Demanda deletada com sucesso!' });
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  getPostsControllers,
  insertPostsControllers,
  updatePostsControllers,
  deletePostsControllers,
};

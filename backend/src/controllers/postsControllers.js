const status = require('http-status');
const {
  getPostsServices,
  insertPostsServices,
  updatePostsServices,
} = require('../services/postsServices');

const getPostsControllers = async (req, res) => {
  try {
    const getPosts = await getPostsServices();
    return res.status(status.OK).json(getPosts);
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};

const insertPostsControllers = async (req, res) => {
  try {
    const insertPosts = await insertPostsServices(req);
    return res.status(status.OK).json(insertPosts);
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};

const updatePostsControllers = async (req, res) => {
  try {
    const updatePosts = await updatePostsServices(req);
    return res.status(status.OK).json(updatePosts);
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};



module.exports = {
  getPostsControllers,
  insertPostsControllers,
  updatePostsControllers,
};
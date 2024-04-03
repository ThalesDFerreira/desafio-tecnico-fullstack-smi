const status = require('http-status');
const {
  getPostsServices,
} = require('../services/postsServices');

const getPostsControllers = async (req, res) => {
  try {
    const clients = await getPostsServices();
    return res.status(status.OK).json(clients);
  } catch (error) {
    console.log(error);
    return res.status(status.BAD_REQUEST).json({ erro: error.message });
  }
};

module.exports = {
  getPostsControllers,
};
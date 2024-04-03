const router = require('express').Router();
const status = require('http-status');

const {
  getPostsControllers,
  insertPostsControllers,
  updatePostsControllers,
  deletePostsControllers,
} = require('../controllers/postsControllers');

const {
  bodyInsertPostsValidation,
  bodyUpdatePostsValidation,
} = require('../middlewares/validations');

router.get('/', (req, res) => {
  try {
    return res.status(status.OK).json({
      message: 'Server ready, waiting action !!!',
    });
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
});

// ROTAS DE DEMANDAS "LATINHAS LLC".
router.get('/posts', getPostsControllers);
router.post('/posts', bodyInsertPostsValidation, insertPostsControllers);
router.put('/posts', bodyUpdatePostsValidation, updatePostsControllers);
router.delete('/posts', deletePostsControllers);

module.exports = router;

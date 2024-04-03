const router = require('express').Router();
const status = require('http-status');

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
// router.get('/posts', getPostsControllers);
// router.post('/posts', bodyPostsValidation, insertPostsControllers);
// router.put('/posts', bodyPostsValidation, editPostsControllers);
// router.delete('/posts', deletePostsControllers);

module.exports = router;

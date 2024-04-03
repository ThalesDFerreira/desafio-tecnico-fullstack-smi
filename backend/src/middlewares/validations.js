const status = require('http-status');

const bodyInsertPostsValidation = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: 'Body não pode estar vazio!' });
  }

  if (!req.body.demand) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: `Body não possui a chave "demand" ou está vazia!` });
  }
  next();
};

const bodyUpdatePostsValidation = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: 'Body não pode estar vazio!' });
  }

  if (!req.body.demand) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: `Body não possui a chave "demand" ou está vazia!` });
  }

  if (!req.body.id) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: `Body não possui a chave "id" ou está vazia!` });
  }
  next();
};

module.exports = {
  bodyInsertPostsValidation,
  bodyUpdatePostsValidation,
};
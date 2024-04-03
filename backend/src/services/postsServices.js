const db = require('../db/db');

const getPostsServices = async () => {
  const result = db.posts;
  return result;
};

module.exports = {
  getPostsServices,
};

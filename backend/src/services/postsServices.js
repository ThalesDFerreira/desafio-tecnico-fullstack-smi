const { openDb } = require('../db/configDB');

const getPostsServices = async () => {
  const db = await openDb();
  const getPosts = await db.all('SELECT * FROM posts');
  await db.close();
  return getPosts;
};

const insertPostsServices = async (req) => {
  const db = await openDb();
  const insertPosts = await db.run('INSERT INTO posts(demand) VALUES (?)', [
    req.body.demand,
  ]);
  await db.close();
  return insertPosts;
};

const updatePostsServices = async (req) => {
  const db = await openDb();
  const updatePosts = await db.run('UPDATE posts SET demand=? WHERE id=?', [req.body.demand, req.body.id]);
  await db.close();
  return updatePosts;
};

module.exports = {
  getPostsServices,
  insertPostsServices,
  updatePostsServices,
};

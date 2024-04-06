const { openDb } = require('../db/configDB');

const getPostsServices = async () => {
  const db = await openDb();
  const getPosts = await db.all('SELECT * FROM posts');
  await db.close();
  return getPosts;
};

const insertPostsServices = async (req) => {
  const db = await openDb();
  const insertPosts = await db.run('INSERT INTO posts(priority, demand, status) VALUES (?, ?, ?)', [
    req.body.priority,
    req.body.demand,
    req.body.status,
  ]);
  await db.close();
  return insertPosts;
};

const updatePostsServices = async (req) => {
  const db = await openDb();
  const updatePosts = await db.run('UPDATE posts SET priority=?, demand=?, status=? WHERE id=?', [
    req.body.priority,
    req.body.demand,
    req.body.status,
    req.body.id,
  ]);
  await db.close();
  return updatePosts;
};

const deletePostsServices = async (req) => {
  const db = await openDb();
  const deletePosts = await db.get('DELETE FROM posts WHERE id=?', [
    req.query.id,
  ]);
  await db.close();
  return deletePosts;
};

module.exports = {
  getPostsServices,
  insertPostsServices,
  updatePostsServices,
  deletePostsServices,
};

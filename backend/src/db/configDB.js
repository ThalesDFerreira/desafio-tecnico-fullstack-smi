const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const openDb = async () => {
  return await open({
    filename: './src/db/database.db',
    driver: sqlite3.Database,
  });
};

const createTable = async () => {
  try {
    const result = await openDb().then((db) => {
      db.exec(
        'CREATE TABLE IF NOT EXISTS posts( id INTEGER PRIMARY KEY AUTOINCREMENT, demand TEXT)'
      );
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  openDb,
  createTable,
};

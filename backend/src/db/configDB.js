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
    const openDBPromise = await openDb();
    const createTable = await openDBPromise.exec(
      `CREATE TABLE IF NOT EXISTS posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        priority INTEGER NOT NULL,
        demand TEXT NOT NULL,
        status INTEGER NOT NULL
    )`
    );
    await openDBPromise.close();
    return createTable;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  openDb,
  createTable,
};

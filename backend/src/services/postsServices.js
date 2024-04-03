



const fs = require('fs');
const path = require('path');
console.log(db);

// let DATA_BASE = arrayDB;

const getPostsServices = async () => {
  const result = DATA_BASE;
  return result;
};

const insertPostsServices = async (req) => {
  // Usando o método reduce para encontrar o maior ID
  let lastId = DATA_BASE.reduce((maxId, post) => {
    return Math.max(maxId, post.id);
  }, 0);
  console.log(lastId);
  // const result = [...DATA_BASE, { id: lastId + 1, demand: req.body.demand }];
  const result = [...DATA_BASE, { id: lastId + 1, demand: 'a' }];
  DATA_BASE = result;
  const filePathDB = path.join(__dirname, '..', 'db', 'db.js');

  const arrayString = JSON.stringify(DATA_BASE);

  fs.writeFile(filePathDB, arrayString, (err) => {
    if (err) {
      console.error('Ocorreu um erro ao escrever no arquivo:', err);
      return;
    }
    console.log('Os dados foram gravados com sucesso no arquivo:', filePathDB);
  });
  return DATA_BASE;
};

// insertPostsServices();

module.exports = {
  getPostsServices,
  insertPostsServices,
};

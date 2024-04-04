const fs = require('fs');
const path = require('path');

// Caminho para o arquivo do banco de dados SQLite
const dbPath = path.join(
  __dirname,
  // '..',
  'database.db'
);

// Verifica se o arquivo do banco de dados existe
fs.access(dbPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error('Erro ao acessar o banco de dados:', err);
    return;
  }

  // Exclui o arquivo do banco de dados
  fs.unlink(dbPath, (err) => {
    if (err) {
      console.error('Erro ao excluir o banco de dados:', err);
      return;
    }
    console.log('Banco de dados excluído com sucesso.');
  });
});

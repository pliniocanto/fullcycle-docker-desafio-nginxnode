const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql');

const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(nome) VALUES('Plinio Marco Canto')`;
connection.query(sql);
connection.end();
console.log('user added');

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config);
  connection.query(`SELECT * FROM people`, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }

    console.log("Resultado: " + JSON.stringify(result));
    const htmlTable = generateHtmlTable(result);
    res.send(`<h1>Full Cycle!!!</h1><br>${htmlTable}`);
  });

  connection.end();
  console.log('Lista de usuários');
});

app.listen(port, () => {
  console.log(`App em execução na porta ${port}`);
});

function generateHtmlTable(data) {
  let html = '<table border="1">';

  // Gerar cabeçalho da tabela
  html += '<tr>';
  for (const key in data[0]) {
    html += `<th>${key}</th>`;
  }
  html += '</tr>';

  // Gerar linhas da tabela
  data.forEach(item => {
    html += '<tr>';
    for (const key in item) {
      html += `<td>${item[key]}</td>`;
    }
    html += '</tr>';
  });

  html += '</table>';
  return html;
}
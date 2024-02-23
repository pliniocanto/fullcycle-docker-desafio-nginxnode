const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

app.get('/', (req, res) => {
  const mysql = require('mysql');
  const connection = mysql.createConnection(config);

  const sql = `INSERT INTO people(name) VALUES('Plinio')`;
  connection.query(sql);
  connection.end();

  res.send('<h1>Full Cycle!!!</h1');
  console.log('user added');
})

app.listen(port, () => {
  console.log(`Running app listening at port :${port}`);
})
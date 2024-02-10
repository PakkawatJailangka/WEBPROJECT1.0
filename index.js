const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static("."));
app.use(bodyParser.urlencoded({ extended: true }));
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.stack);
      return;
    }
    console.log('เชื่อมต่อสำเร็จ');
  });

  app.get('/data', (req, res) => {
    connection.query('SELECT * FROM stock', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });

  app.get('/login_admin', (req, res) => {
    res.sendFile(__dirname+ "/admin_login.html")
  });

app.get("/customer", (req, res) => {
  res.sendFile(__dirname + "/index1.html");
});

/////////////////////////////////
const users = [
  { username: 'admin', password: '123' },
  { username: 'owner', password: '123' },
  { username: 'son', password: '123' },
];

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.redirect('/stock');
  } else {
    res.send('Invalid username or password');
  }
});

app.get("/stock", (req, res) => {
  res.sendFile(__dirname + "/index2.html");
});
//////////////////////////////////
/*
app.post('/insert-stock', (req, res) => {
  const numeng = req.body.numeng;
  const name = req.body.name;
  const year = req.body.year;
  const type = req.body.type;
  const color = req.body.color;
  const brand = req.body.brand;
  const seat = req.body.seat;
  const gear = req.body.gear;

  // create an array of values to insert into the database
  const values = [numeng, name, year, type, color, brand, seat, gear];

  // build the SQL query using placeholders for the values
  const query = 'INSERT INTO stock (numeng, name, year, type, color, brand, seat, gear) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  // execute the query with the values
  connection.query(query, values, (error, results, fields) => {
    if (error) throw error;
    res.redirect('/');
  });
});
*/

/////////////////////////////////////////////////////////////////
app.get('/add', (req, res) => {
  res.sendFile(__dirname + '/customer.html');
});
app.post('/insert-customer', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const tel = req.body.tel;
  const money = req.body.money;

  const query = 'INSERT INTO test.customer (name, email, tel, money) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, tel, money], (error, results) => {
    if (error) {
      console.log('Error inserting customer', error);
      res.send('Error inserting customer');
    } else {
      console.log(`Inserted customer with ID: ${results.insertId}`);
      res.send('Inserted customer');
    }
  });
});
/////////////////////////////////////////////////////

app.get('/data_customer', (req, res) => {
  connection.query('SELECT * FROM test.customer', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});
app.listen(3308, () => {
  console.log('Server is listening on port 3308');
});




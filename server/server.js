
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

const my_sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
}).promise();

app.use(cors({origin: 'http://localhost:5173'}));

app.get("/api", (req, res) => {
  res.json({users: ["userOne", "userTwo", "userThree"]})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

async function fetchEmitterData() {
  try {
      const [rows] = await pool.query("SELECT * FROM emitter");
      console.log(rows);
      return rows;
  } catch (error) {
      console.error("Error fetching emitter data:", error);
      throw error;
  }
}

app.use(cors());

app.get("/api", async (req, res) => {
  const emitterData = await fetchEmitterData();
  res.json({emitters: emitterData});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
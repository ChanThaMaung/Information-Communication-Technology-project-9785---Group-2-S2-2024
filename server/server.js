
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const pool = require('./database/db');

const emitterRouter = require('./routes/Emitter');
const issuerRouter = require('./routes/Issuer');
const verifierRouter = require('./routes/Verifier');



app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

app.use('/emitter', emitterRouter(pool));
app.use('/issuer', issuerRouter(pool));
app.use('/verifier', verifierRouter(pool));

// app.get("/api", async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM some_table");
//     res.json(rows);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});